const express = require("express");

const search = express.Router();

// 搜索用户
search.get("/user", require("./search/user"));

// 搜索好友
search.get("/friend", require("./search/friend"));

// 搜索群
search.get("/group", require("./search/group"));

module.exports = search;
