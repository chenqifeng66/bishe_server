const { Friend } = require("../../model/friend");
const { Message } = require("../../model/message");
const ReturnData = require("../../config/returnData");

// 删除好友
// 删除好友表中的数据和消息表中的数据
module.exports = async (req, res) => {
  const { userID, friendID } = req.body;

  // 删除字段
  let deleteStr = {
    // userID为userID和friendID的两条数据
    userID: {
      $in: [userID, friendID],
    },
  };

  // 同时删除好友表两条记录
  Friend.deleteMany(deleteStr, (err, result) => {
    if (err) {
      res.status(500).send(new ReturnData(500));
    } else {
      // 删除消息表中的记录
      deleteStr = {
        fromUserID: {
          $in: [fromUserID, toUserID],
        },
        toUserID: {
          $in: [toUserID, fromUserID],
        },
      };

      Message.deleteMany(deleteStr, (err, result) => {
        if (err) {
          res.status(500).send(new ReturnData(500));
        } else {
          res.send(new ReturnData(200, "删除成功"));
        }
      });
    }
  });
};
