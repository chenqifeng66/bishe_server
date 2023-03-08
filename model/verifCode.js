const mongoose = require("mongoose");
const db = require("../config/db");

// 验证码表
const verifCodeSchema = new mongoose.Schema({
  // 验证码id
  codeID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  // 过期时间
  expireTime: {
    type: Date,
    default: () => {
      return new Date(Date.now() + 1000 * 60 * 3);
    },
  },
  // 验证码
  code: { type: String },
});

const VerifCode = db.model("VerifCode", verifCodeSchema);
// db.VerifCode.
module.exports = {
  VerifCode,
};
