const { Message } = require("../../model/message");
const ReturnData = require("../../config/returnData");

module.exports = async (req, res) => {
  const { fromUserID, toUserID } = req.query;

  let whereStr = {
    fromUserID: {
      $in: [fromUserID, toUserID],
    },
    toUserID: {
      $in: [toUserID, fromUserID],
    },
  };

  Message.find(whereStr, (err, result) => {
    if (err) {
      res.status(500).send(new ReturnData(500));
    } else {
      if (result) {
        res.send(new ReturnData(200, "获取好友消息成功", result));
      }
    }
  });
};
