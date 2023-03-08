const express = require("express");

const verifCode = express.Router();

// 发送验证码
verifCode.get("/", require("./verifCode/index"));

module.exports = verifCode;
