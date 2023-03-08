// 引入插件
const nodeMailer = require("nodemailer");
// 引入证书文件
const credentials = require("../config/credentials");

// 创建传输方式
const transporter = nodeMailer.createTransport({
  // 选择邮箱服务
  service: "qq",
  // 配置证书
  auth: {
    user: credentials.qq.user,
    pass: credentials.qq.pass,
  },
});

// 注册发送邮件给用户
exports.emailSignUp = (email, res) => {
  // 发送的邮件信息内容
  let options = {
    from: "839860616@qq.com",
    to: email,
    subject: "感谢您在yike注册",
    html: "<span>yike欢迎您的加入</span><a href='http://localhost:8080/'>点击</a>",
  };

  // 发送邮件
  transporter.sendMail(options, (err, msg) => {
    if (err) {
      res.send(err);
    } else {
      res.send("邮箱发送成功！");
    }
  });
};

// 发送验证码
exports.emailVerifCode = async (email) => {
  // 生成四位验证码 1000-9999
  let verifCode = Math.ceil(Math.random() * 8999 + 1000).toString();

  // 发送的邮件信息内容
  let options = {
    from: "839860616@qq.com",
    to: email,
    subject: "yike验证码",
    html: `【yike】验证码为:${verifCode}。5分钟内有效，请勿告知他人`,
  };

  // 发送邮件
  try {
    const result = await transporter.sendMail(options);
    if (result) {
      return verifCode;
    }
  } catch (e) {
    return e;
  }
};
