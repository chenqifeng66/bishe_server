const express = require("express");

const message = express.Router();

// 发送消息
message.post("/send", require("./message/send"));

// 获取消息
message.get("/get", require("./message/get"));

module.exports = message;
