const express = require("express");

const friend = express.Router();

// 申请好友
friend.post("/apply", require("./friend/apply"));

// 添加好友
friend.post("/add", require("./friend/add"));

// 删除好友
friend.post("/delete", require("./friend/delete"));

module.exports = friend;
