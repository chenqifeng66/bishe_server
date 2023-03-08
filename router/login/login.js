const bcrypt = require("../../dao/bcrypt");
const jwt = require("../../dao/jwt");
const { User } = require("../../model/user");
const ReturnData = require("../../config/returnData");

// 用户登录
module.exports = async (req, res) => {
  let { data, password } = req.body;

  // 先对用户名或邮箱进行验证，如果成功再验证密码
  // $or：查询name或email
  let whereStr = {
    $or: [
      {
        name: data,
      },
      {
        email: data,
      },
    ],
  };

  // 要输出的字段
  // out：0代表不输出，1代表输出
  let out = {
    name: 1,
    imgUrl: 1,
    password: 1,
  };

  // 查找用户
  User.find(whereStr, out, (err, result) => {
    if (err) {
      res.status(500).send(new ReturnData(500));
    } else {
      // 未找到
      if (result == "") {
        res.status(400).send(new ReturnData(400, "用户名或密码错误"));
      } else {
        // 找到用户
        result.map(async (e) => {
          // 验证密码
          const verif = await bcrypt.verification(password, e.password);
          // 密码正确
          if (verif) {
            // 生成 token
            let token = await jwt.generateToken(e._id);
            let back = {
              id: e._id,
              name: e.name,
              imgUrl: e.imgUrl,
              token: token,
            };
            // 登录成功，返回 token
            res.send(new ReturnData(200, "登录成功", back));
          } else {
            // 登录失败
            res.status(400).send(new ReturnData(400, "用户名或密码错误"));
          }
        });
      }
    }
  });
};
