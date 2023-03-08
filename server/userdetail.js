const dbServer = require("../dao/dbServer");

// 用户详情
exports.userDetail = (req, res) => {
  let id = req.query.id;
  dbServer.userDetial(id, res);
};

// 修改用户信息
exports.userUpdate = (req, res) => {
  let data = req.body;
  dbServer.userUpdate(data, res);
};

// 获取好友昵称
exports.getMarkName = (req, res) => {
  let data = req.query;
  dbServer.getMarkName(data, res);
};

// 修改好友昵称
exports.updateMarkName = (req, res) => {
  let data = req.body;
  dbServer.updateMarkName(data, res);
};
