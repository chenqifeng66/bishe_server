const express = require("express");
const app = express();
const port = 3000;

// 导入 body-parser中间件解析表单数据
const bodyParser = require("body-parser");
// 引入 jwt 模块
const jwt = require("./dao/jwt");

// 引入路由文件
const login = require("./router/login");
const search = require("./router/search");
const update = require("./router/update");
const verifCode = require("./router/verifCode");
const friend = require("./router/friend");
const message = require("./router/message");

// 引入自定义响应数据类
const ReturnData = require("./config/returnData");

// 解决跨域问题
app.all("*", (req, res, next) => {
  // 设置允许跨域的域名,*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin", "*");
  // 允许的header类型
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept"
  );
  res.header("Access-Control-Allow-Credentials", true);
  // 跨域允许的请求方式
  res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
  if (req.method == "OPTIONS")
    res.sendStatus(200); // 让options 尝试请求快速结束
  else next();
});

// 解析 url-encoded 格式的表单数据
app.use(bodyParser.urlencoded({ extended: false }));

// 解析 json 格式的表单数据
app.use(bodyParser.json());

// token 判断,要在导入路由之前
app.use((req, res, next) => {
  // url为login开头的不进行token验证
  const url = req.url.split("/")[1];
  // 跳过验证
  if (url == "login") return next();

  // 取出token
  let token = req.headers.authorization;

  if (token) {
    // 处理 token 匹配
    let tokenMatch = jwt.verifyToken(token);
    if (tokenMatch == 1) {
      // 通过验证
      return next();
    }
  }

  // 未通过验证或未携带token
  res.status(401).send(new ReturnData(401, "token无效"));
});

// 导入路由
// require("./router/index")(app);
app.use("/login", login);
app.use("/search", search);
app.use("/update", update);
app.use("/verifcode", verifCode);
app.use("/friend", friend);
app.use("/message", message);

// 404 处理
app.use((req, res, next) => {
  // 创建一个错误对象
  let err = new Error("Not Found");
  // 设置状态码：404 找不到页面
  err.status = 404;
  // 抛出错误
  next(err);
});

// 500 处理
app.use((err, req, res, next) => {
  // 响应状态码
  res.status(err.status || 500);
  // 向前端发送错误信息
  res.send(err.message);
});

app.listen(port, () => {
  console.log(`服务已启动 http://localhost:${port}/`);
});
