// 引入数据库 验证码 表
const { VerifCode } = require("../../model/verifCode");
// 引入 用户 表
const { User } = require("../../model/user");
// 引入 发送邮箱验证码方法
const { emailVerifCode } = require("../../dao/emailServer");
// 引入 自定义响应数据
const ReturnData = require("../../config/returnData");

// 发送验证码并保存到数据库
module.exports = async (req, res) => {
  let { id } = req.query;

  // 查找用户
  User.findById(id, "email", async (err, result) => {
    if (err) {
      res.status(500).send(new ReturnData(500));
    } else {
      // 找到用户
      if (result) {
        // 已绑定的邮箱
        let oldEmail = result.email;

        // 发送验证码
        const emailverifCode = await emailVerifCode(oldEmail);

        // console.log(verifCode);
        // 判断是否发送状态
        if (typeof emailverifCode == "string") {
          // 发送成功
          // 将状态码存入到数据库

          // 要插入的数据
          const insterData = {
            code: emailverifCode,
            codeID: id,
          };

          const verifCode = new VerifCode(insterData);

          // 保存到 verifcodes 表中
          verifCode.save((err, result) => {
            if (err) {
              res.status(500).send(new ReturnData(500));
              console.log(err);
            } else {
              res.send(new ReturnData(200, "发送成功"));
            }
          });
        } else {
          // 发送失败
          res.status(500).send(new ReturnData(500, verifCode.message));
        }
      } else {
        res.status(400).send(new ReturnData(400, "用户不存在"));
      }
    }
  });
};
