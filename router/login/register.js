const bcrypt = require("../../dao/bcrypt");
const { User, validateUser } = require("../../model/user");
const ReturnData = require("../../config/returnData");

// 用户注册
module.exports = async (req, res) => {
  try {
    // 验证数据
    await validateUser(req.body);
  } catch (e) {
    // 发送验证错误信息
    return res.status(400).send(new ReturnData(400, e.message));
  }

  let { name, email, password } = req.body;

  // 验证用户名/邮箱是否存在
  // 查询字段
  let whereStr = {
    $or: [
      {
        name: name,
      },
      {
        email: email,
      },
    ],
  };

  // 输出字段
  let out = {
    name: 1,
    email: 1,
  };

  User.findOne(whereStr, out, async (err, result) => {
    if (err) {
      res.status(500).send(new ReturnData(500));
    } else {
      if (result) {
        res.status(400).send(new ReturnData(400, "用户名或邮箱已存在"));
      } else {
        // 密码加密
        let hashPassword = await bcrypt.encryption(password);

        // 要插入数据库的数据
        let insertData = {
          name: name,
          email: email,
          password: hashPassword,
        };

        let user = new User(insertData);

        // 保存数据到数据库中
        user.save((err, result) => {
          if (err) {
            res.status(500).send(new ReturnData(500));
          } else {
            res.send(new ReturnData(200, "用户创建成功"));
          }
        });
      }
    }
  });
};
