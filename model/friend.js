const mongoose = require("mongoose");
const db = require("../config/db");

// 好友表
const friendSchema = new mongoose.Schema({
  // id：mongodb会自动随机生成
  // 用户id
  userID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  // 好友id
  friendID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  // 好友状态( 0：已为好友，1：申请方(未同意)，2：被申请方(未同意) )
  state: { type: String },
  // 好友昵称
  markname: { type: String },
  // 生成时间
  time: { type: Date, default: Date.now },
});

const Friend = db.model("Friend", friendSchema);

module.exports = {
  Friend,
};
