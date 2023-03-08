// 引入 token 插件
const jwt = require("jsonwebtoken");

// 生成 token 的方法
exports.generateToken = (id) => {
  // 根据前端传入的 id 来识别 token
  let payload = {
    id: id,
    time: new Date(),
  };
  // 密钥
  let secret = "yikeshiguang";
  // 生成 token
  // 过期时间为 30天
  let token = jwt.sign(payload, secret, { expiresIn: 60 * 60 * 24 * 30 });

  return token;
};

// 解码 token 的方法
exports.verifyToken = (e) => {
  // 密钥
  let secret = "yikeshiguang";
  // 根据前端返回的 token 进行验证
  let payload;
  jwt.verify(e, secret, (err, result) => {
    if (err) {
      payload = 0;
    } else {
      payload = 1;
    }
  });

  return payload;
};
