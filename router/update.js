const express = require("express");

const update = express.Router();

// 更新用户名
update.post("/username", require("./update/userName"));

// 更新密码
update.post("/password", require("./update/password"));

// 更新邮箱
update.post("/email", require("./update/email"));

module.exports = update;
