const bcrypt = require("bcryptjs");

// 生成hash密码
exports.encryption = (pwd) => {
  // 生成随机的 salt
  let salt = bcrypt.genSaltSync(10);

  // 生成 hash 密码
  let hash_pwd = bcrypt.hashSync(pwd, salt);

  return hash_pwd;
};

// 密码匹配
exports.verification = (pwd, hash_pwd) => {
  // 将前端传入的密码与数据库中加密后的密码进行对比
  let verif = bcrypt.compareSync(pwd, hash_pwd);

  return verif;
};
