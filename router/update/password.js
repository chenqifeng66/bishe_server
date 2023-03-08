const ReturnData = require("../../config/returnData");
const { User, validateUserPassword } = require("../../model/user");
const bcrypt = require("../../dao/bcrypt");

module.exports = async (req, res) => {
  let { id, oldPassword, newPassword } = req.body;

  // 根据id查找并输出密码
  User.findById(id, "password", async (err, result) => {
    if (err) {
      res.status(500).send(new ReturnData(500));
    } else {
      // 查找到用户
      if (result) {
        // 对比旧密码是否正确
        let verif = await bcrypt.verification(oldPassword, result.password);

        // 密码正确
        if (verif) {
          // 验证新密码格式是否正确
          try {
            await validateUserPassword({ password: newPassword });
          } catch (e) {
            // 发送验证错误信息
            return res.status(400).send(new ReturnData(400, e.message));
          }

          // 对新密码进行加密
          let hashNewPassword = await bcrypt.encryption(newPassword);

          // 更新password字段
          let updateStr = {
            password: hashNewPassword,
          };

          // 通过id查找并更新
          User.findByIdAndUpdate(id, updateStr, (err, result) => {
            if (err) {
              res.status(500).send(new ReturnData(500));
            } else {
              res.send(new ReturnData(200, "更新成功"));
            }
          });
        } else {
          // 密码错误
          res.status(400).send(new ReturnData(400, "密码错误"));
        }
      } else {
        // 未找到用户
        res.status(400).send(new ReturnData(400, "用户不存在"));
      }
    }
  });
};
