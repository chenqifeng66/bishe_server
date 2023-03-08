// 引入 自定义响应数据
const ReturnData = require("../../config/returnData");
// 引入数据库 验证码 表
const { VerifCode } = require("../../model/verifCode");
// 引入 用户 表
const { User, validateUserEmail } = require("../../model/user");

// 修改用户邮箱
// 发送验证码到id所绑定的邮箱中
// 校验验证码，正确则可修改
module.exports = async (req, res) => {
  let { id, newEmail, code } = req.body;

  // 验证邮箱格式
  try {
    await validateUserEmail(newEmail);
  } catch (e) {
    // 发送验证错误信息
    return res.status(400).send(new ReturnData(400, e.message));
  }

  // 查询字段
  let whereStr = {
    codeID: id,
    code: code,
  };

  // 根据 用户id 跟 验证码 查询
  VerifCode.findOne(whereStr, (err, result) => {
    if (err) {
      res.status(500).send(new ReturnData(500));
    } else {
      // 查询
      if (result) {
        // 获取过期时间的时间戳
        const expireTime = new Date(result.expireTime).getTime();

        // 判断是否过期
        if (expireTime > Date.now()) {
          // 未过期
          // 修改邮箱

          // 更新字段
          let updateStr = {
            email: newEmail,
          };

          // 根据 用户id 修改 邮箱
          User.findByIdAndUpdate(id, updateStr, (err, result) => {
            if (err) {
              res.status(500).send(new ReturnData(500));
            } else {
              res.send(new ReturnData(200, "修改成功"));
            }
          });
        } else {
          // 验证码过期
          res.status(400).send(new ReturnData(400, "验证码错误"));
        }
      } else {
        // 验证码不存在
        res.status(400).send(new ReturnData(400, "验证码错误"));
      }
    }
  });
};
