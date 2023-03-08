const mongoose = require("mongoose");
const db = require("../config/db");

// 群成员表
const groupUserSchema = new mongoose.Schema({
  // id：mongodb会自动随机生成
  // 群id
  groupID: { type: mongoose.Schema.Types.ObjectId, ref: "Group" },
  // 用户id
  userID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  // 群内名称
  name: { type: String },
  // 未读消息数
  tip: { type: Number, default: 0 },
  // 加入时间
  time: { type: Date },
  // 是否屏蔽群消息（0：不屏蔽，1：屏蔽）
  shield: { type: Number },
});

const GroupUser = db.model("GroupUser", groupUserSchema);

module.exports = {
  GroupUser,
};
