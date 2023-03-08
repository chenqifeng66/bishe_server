const { Message } = require("../../model/message");
const ReturnData = require("../../config/returnData");

module.exports = async (req, res) => {
  const { fromUserID, toUserID, message, types } = req.body;

  const messages = [
    {
      fromUserID: fromUserID,
      toUserID: toUserID,
      message: message,
      types: types,
    },
    {
      fromUserID: toUserID,
      toUserID: fromUserID,
      message: message,
      types: types,
    },
  ];

  Message.insertMany(messages, (err, result) => {
    if (err) {
      res.status(500).send(new ReturnData(500));
    } else {
      res.send(new ReturnData(200, "消息发送成功"));
    }
  });
};
