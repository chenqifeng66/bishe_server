const { User } = require("../../model/user");

const ReturnData = require("../../config/returnData");

// 搜索用户
module.exports = async (req, res) => {
  let { keyword } = req.query;
  // 查询字符串
  // $regex：模糊查找
  let whereStr = {
    $or: [
      {
        name: { $regex: keyword },
      },
      {
        email: { $regex: keyword },
      },
    ],
  };

  // 要输出的字段
  let out = {
    name: 1,
    email: 1,
    imgUrl: 1,
  };

  User.find(whereStr, out, (err, result) => {
    if (err) {
      res.status(500).send(new ReturnData(500));
    } else {
      res.send(new ReturnData(200, "查找成功", result));
    }
  });
};
