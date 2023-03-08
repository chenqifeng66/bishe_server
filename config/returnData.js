function ReturnData(code = 200, message = "成功", data = {}) {
  // 状态码
  this.code = code;

  // 状态码为500时，默认返回【服务器错误】信息
  if (code === 500) {
    this.message = "服务器错误";
  } else {
    // 信息
    this.message = message;
  }

  // 数据
  this.data = data;
}

module.exports = ReturnData;
