const mongoose = require("mongoose");

// 数据库
const dataBase = "yike";
// 连接数据库
const db = mongoose.createConnection("mongodb://localhost:27017/" + dataBase);
// 出现错误时打印错误信息
db.on("error", console.error.bind(console, "connection error:"));
// 连接成功时，输出信息
db.once("open", () => console.info(`数据库${dataBase} 连接成功`));

module.exports = db;
