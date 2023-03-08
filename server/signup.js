const dbServer = require("../dao/dbServer");

// 用户注册
exports.signUp = async (req, res) => {
  await dbServer.buildUser(req.body, res);
};

// 用户或邮箱是否占用判断
exports.judgeValue = (req, res) => {
  let { data, type } = req.body;

  dbServer.countUserValue(data, type, res);
};
