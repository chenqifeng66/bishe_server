const mongoose = require("mongoose");
const db = require("../config/db");

// 群消息表
const groupMsgSchema = new mongoose.Schema({
  // id：mongodb会自动随机生成
  // 群id
  groupID: { type: mongoose.Schema.Types.ObjectId, ref: "Group" },
  // 用户id
  userID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  // 发送内容
  message: { type: String },
  // 内容类型（0：文字，1：图片链接，2：音频链接...）
  types: { type: String },
  // 发送时间
  time: { type: Date, default: Date.now },
});

const GroupMsg = db.model("GroupMsg", groupMsgSchema);

module.exports = {
  GroupMsg,
};
