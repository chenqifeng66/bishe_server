const { Friend } = require("../../model/friend");
const ReturnData = require("../../config/returnData");

// 查找好友
module.exports = async (req, res) => {
  const { userID, keyword } = req.query;

  let whereStr = {
    userID: userID,
    state: 0, // 已是好友
  };

  // 联合查询：populate("要联合查询的字段","要输出的字段")
  // 返回Promise对象：exec(function(){})
  await Friend.find(whereStr)
    .populate("friendID", "_id name imgUrl")
    .exec((err, result) => {
      if (err) {
        res.status(500).send(new ReturnData(500));
      } else {
        // 符合搜索条件的好友信息
        const friendsInfo = [];

        // 所有好友
        if (result) {
          // 取出含有搜索关键字的好友
          let hasKeywordFriends = result.filter((e) => {
            return e.friendID.name.toLowerCase().includes(keyword);
          });

          // 将符合条件的添加到friendsInfo返回给前端
          hasKeywordFriends.forEach((e) => {
            friendsInfo.push(e.friendID);
          });
        }
        res.send(new ReturnData(200, "查询成功", friendsInfo));
      }
    });
};
