const { Friend } = require("../../model/friend");
const { Message } = require("../../model/message");
const ReturnData = require("../../config/returnData");

// 申请好友
module.exports = async (req, res) => {
  const { userID, friendID, markname, message } = req.body;

  let whereStr = {
    userID: userID,
    friendID: friendID,
  };

  // 查询是否申请过
  Friend.findOne(whereStr, (err, result) => {
    if (err) {
      res.status(500).send(new ReturnData(500));
    } else {
      // 申请过
      if (result) {
      } else {
        // 未申请过,申请添加
        // 申请方和被申请方
        const friends = [
          {
            userID: userID,
            friendID: friendID,
            markname: markname,
            state: 1,
          },
          {
            userID: friendID,
            friendID: userID,
            state: 2,
          },
        ];

        // 同时插入两条数据
        Friend.insertMany(friends, (err, result) => {
          if (err) {
            res.status(500).send(new ReturnData(500));
          } else {
            // 并发送申请消息
            const messages = [
              {
                fromUserID: userID,
                toUserID: friendID,
                message: message,
                types: 0,
              },
              {
                fromUserID: toUserID,
                toUserID: fromUserID,
                message: message,
                types: 0,
              },
            ];

            Message.insertMany(messages, (err, result) => {
              if (err) {
                res.status(500).send(new ReturnData(500));
              } else {
                res.send(new ReturnData(200, "申请消息发送成功"));
              }
            });
          }
        });
      }
    }
  });
};
