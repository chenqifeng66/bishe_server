const { Friend } = require("../../model/friend");
const ReturnData = require("../../config/returnData");

// 添加好友
module.exports = async (req, res) => {
  const { userID, friendID, markname } = req.body;

  let whereStr = {
    userID: userID,
    friendID: friendID,
  };

  let updateStr = {
    state: 0,
    markname: markname,
  };

  Friend.findOneAndUpdate(whereStr, updateStr, (err, result) => {
    if (err) {
      res.status(500).send(new ReturnData(500));
    } else {
      // 有结果
      if (result) {
        whereStr = {
          userID: friendID,
          friendID: userID,
        };
        Friend.findOneAndUpdate(whereStr, { state: 0 }, (err, result) => {
          if (err) {
            res.status(500).send(new ReturnData(500));
          } else {
            if (result) {
              res.send(new ReturnData(200, "添加好友成功"));
            } else {
              res.status(400).send(new ReturnData(400, "用户id或好友id错误"));
            }
          }
        });
      } else {
        res.status(400).send(new ReturnData(400, "用户id或好友id错误"));
      }
    }
  });
};
