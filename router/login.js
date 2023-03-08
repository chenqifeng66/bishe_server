const express = require("express");

const login = express.Router();

// 用户注册
login.post("/register", require("./login/register"));

// 用户登录
login.post("/login", require("./login/login"));

module.exports = login;
