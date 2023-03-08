const { Group } = require("../../model/group");

const ReturnData = require("../../config/returnData");

// 搜索群
module.exports = async (req, res) => {
  let { keyword } = req.query;

  let whereStr = {
    name: { $regex: keyword },
  };

  let out = {};

  Group.find(whereStr, out, (err, result) => {
    if (err) {
      res.status(500).send(new ReturnData(500));
    } else {
      res.send(new ReturnData(200, "查找成功", result));
    }
  });
};
