// 用户登录

// 导入操作数据库的模块
const dbServer = require("../dao/dbServer");
// 导入jwt模块
const jwt = require("../dao/jwt");

// 用户登录的方法
exports.signIn = (req, res) => {
  let { data, pwd } = req.body;

  // 登录验证
  dbServer.userMatch(data, pwd, res);
};
