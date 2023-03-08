const ReturnData = require("../../config/returnData");
const { User } = require("../../model/user");

// 更新用户名
module.exports = async (req, res) => {
  let { id, name } = req.body;

  let whereStr = {
    name: name,
  };

  // 判断用户名是否重复
  User.findOne(whereStr, (err, result) => {
    if (err) {
      res.status(500).send(new ReturnData(500));
    } else {
      // 用户名存在
      if (result) {
        res.status(400).send(new ReturnData(400, "用户名已存在"));
      } else {
        // 用户名不存在
        let updateStr = {
          name: name,
        };

        // 查找并更新
        User.findByIdAndUpdate(id, updateStr, (err, result) => {
          if (err) {
            res.status(500).send(new ReturnData(500));
          } else {
            res.send(new ReturnData(200, "更新成功"));
          }
        });
      }
    }
  });
};
