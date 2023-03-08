const mongoose = require("mongoose");
const db = require("../config/db");

// 一对一消息表
const messageSchema = new mongoose.Schema({
  // id：mongodb会自动随机生成
  // 发送方id
  fromUserID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  // 接收方id
  toUserID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  // 发送内容
  message: { type: String },
  // 内容类型（0：文字，1：图片链接，2：音频链接...）
  types: { type: String },
  // 发送时间
  time: { type: Date, default: Date.now },
  // 消息状态（0：已读，1：未读）
  state: { type: Number, default: 1 },
});

const Message = db.model("Message", messageSchema);

module.exports = {
  Message,
};
