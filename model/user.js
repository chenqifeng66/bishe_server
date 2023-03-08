const mongoose = require("mongoose");
const db = require("../config/db");

// 引入 joi 验证数据插件
const Joi = require("joi");

// 用户表
const userSchema = new mongoose.Schema({
  // id：mongodb会自动随机生成
  // 用户名
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 2,
    maxlength: 20,
  },
  // 密码
  password: { type: String, required: true },
  // 邮箱
  email: { type: String, required: true, unique: true },
  // 性别
  sex: { type: String, default: "asexual" },
  // 生日
  birth: { type: Date },
  // 电话
  phone: { type: Number },
  // 介绍
  explain: { type: String },
  // 用户头像
  imgUrl: { type: String, default: "user,png" },
  // 注册时间
  time: { type: Date, default: Date.now },
});

const User = db.model("User", userSchema);

// 验证用户信息
const validateUser = (user) => {
  // 定义对象的验证规则
  const schema = Joi.object({
    name: Joi.string()
      .min(2)
      .max(12)
      .required()
      .error(new Error("用户名不符合验证规则")),
    email: Joi.string()
      .email()
      .required()
      .error(new Error("邮箱格式不符合验证规则")),
    password: Joi.string()
      .regex(/^[a-zA-Z0-9]{3,30}$/)
      .required()
      .error(new Error("密码格式不符合验证规则")),
  });

  // 实施验证
  return schema.validateAsync(user);
};

// 单独验证用户密码
const validateUserPassword = (password) => {
  // 定义对象的验证规则
  const schema = Joi.object({
    password: Joi.string()
      .regex(/^[a-zA-Z0-9]{3,30}$/)
      .required()
      .error(new Error("密码格式不符合验证规则")),
  });

  // 实施验证
  return schema.validateAsync(password);
};

// 单独验证用户邮箱
const validateUserEmail = (email) => {
  // 定义对象的验证规则
  const schema = Joi.object({
    email: Joi.string()
      .email()
      .required()
      .error(new Error("邮箱格式不符合验证规则")),
  });

  // 实施验证
  return schema.validateAsync(email);
};

module.exports = {
  User,
  validateUser,
  validateUserPassword,
  validateUserEmail,
};
