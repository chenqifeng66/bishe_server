// 搜索

const dbServer = require("../dao/dbServer");

// 搜索用户
exports.searchUser = (req, res) => {
  let data = req.query.data;

  dbServer.searchUser(data, res);
};

// 判断是否为好友
exports.isFriend = (req, res) => {
  let { uid, fid } = req.query;

  dbServer.isFriend(uid, fid, res);
};

// 搜索群
exports.searchGroup = (req, res) => {
  let data = req.query.data;

  dbServer.searchGroup(data, res);
};

// 判断是否在群内
exports.isInGroup = (req, res) => {
  let { uid, gid } = req.query;

  dbServer.isInGroup(uid, gid, res);
};
