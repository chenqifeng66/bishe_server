const mongoose = require("mongoose");
const db = require("../config/db");

// 群表
const groupSchema = new mongoose.Schema({
  // id：mongodb会自动随机生成
  // 群主id
  userID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  // 群名称
  name: { type: String },
  // 群头像
  imgUrl: { type: String, default: "group.png" },
  // 创建时间
  time: { type: Date, default: Date.now },
  // 群公告
  notice: { type: String },
});

const Group = db.model("Group", groupSchema);

module.exports = {
  Group,
};
