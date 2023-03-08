const bcrypt = require("../dao/bcrypt");

// 引入 token
const jwt = require("../dao/jwt");

const { User, validateUser } = require("../model/user");
const { Friend } = require("../model/friend");
const { Group } = require("../model/group");
const { GroupUser } = require("../model/groupUser");

// 新建用户的方法
const buildUser = async (data, res) => {
  let { name, email, password } = data;

  try {
    // 验证数据
    await validateUser(data);
  } catch (e) {
    // 发送验证错误信息
    return res.status(400).send({ message: e.message });
  }

  // 密码加密
  let hashPassword = await bcrypt.encryption(password);

  // 要插入数据库的数据
  let insertData = {
    name: name,
    email: email,
    password: hashPassword,
  };

  let user = new User(insertData);

  // 保存数据到数据库中
  await user.save((err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).end();
    }
  });
};

// 验证用户名/邮箱是否存在的方法
const countUserValue = async (data, type, res) => {
  let wherestr = {};
  // type：name/email
  // data：需要验证的用户名/邮箱
  wherestr[type] = data;

  // 查询用户表
  await User.countDocuments(wherestr, (err, result) => {
    if (err) {
      res.send({ status: 500 });
    } else {
      res.send({ status: 200, result });
    }
  });
};

// 用户登录验证的方法
const userMatch = async (data, pwd, res) => {
  // 先对用户名或邮箱进行验证，如果成功再验证密码
  // $or：查询name或email
  let wherestr = {
    $or: [
      {
        name: data,
      },
      {
        email: data,
      },
    ],
  };

  // 要输出的字段
  // out：0代表不输出，1代表输出
  let out = {
    name: 1,
    imgUrl: 1,
    psw: 1,
  };

  // 查找用户
  await User.find(wherestr, out, (err, result) => {
    if (err) {
      res.send({ status: 500 });
    } else {
      // 未找到
      if (result == "") {
        res.send({ status: 400 });
      } else {
        // 找到用户
        result.map(async (e) => {
          // 验证密码
          const pwdMatch = await bcrypt.verification(pwd, e.psw);
          // 密码正确
          if (pwdMatch) {
            // 生成 token
            let token = await jwt.generateToken(e._id);
            let back = {
              id: e._id,
              name: e.name,
              imgUrl: e.imgUrl,
              token: token,
            };
            // 登录成功，返回 token
            res.send({ status: 200, back });
          } else {
            // 登录失败
            res.send({ status: 400 });
          }
        });
      }
    }
  });
};

// 搜索用户
const searchUser = async (data, res) => {
  // 查询字符串
  // $regex：模糊查找
  let wherestr = {
    $or: [
      {
        name: { $regex: data },
      },
      {
        email: { $regex: data },
      },
    ],
  };

  // 要输出的字段
  let out = {
    name: 1,
    email: 1,
    imgUrl: 1,
  };

  await User.find(wherestr, out, (err, result) => {
    if (err) {
      res.send({ status: 500 });
    } else {
      res.send({ status: 200, result });
    }
  });
};

// 判断是否为好友
const isFriend = async (uid, fid, res) => {
  // 查询字符串
  let wherestr = {
    userID: uid,
    friendID: fid,
    state: 0, // 0为是好友
  };

  await Friend.findOne(wherestr, out, (err, result) => {
    if (err) {
      res.send({ status: 500 });
    } else {
      // 是好友
      if (result) {
        res.send({ status: 200 });
      } else {
        // 不是好友
        res.send({ status: 400 });
      }
    }
  });
};

// 搜索群
const searchGroup = async (data, res) => {
  // 查询字符串
  let wherestr = {
    name: { $regex: data },
  };

  // 要输出的字段
  let out = {
    name: 1,
    imgUrl: 1,
  };

  await Group.find(wherestr, out, (err, result) => {
    if (err) {
      res.send({ status: 500 });
    } else {
      res.send({ status: 200, result });
    }
  });
};

// 是否在群内
const isInGroup = async (uid, gid, res) => {
  // 查询字符串
  let wherestr = {
    userID: uid,
    groupID: gid,
  };

  await GroupUser.findOne(wherestr, out, (err, result) => {
    if (err) {
      res.send({ status: 500 });
    } else {
      // 在群内
      if (result) {
        res.send({ status: 200 });
      } else {
        // 不在群内
        res.send({ status: 400 });
      }
    }
  });
};

// 用户详情
const userDetial = async (id, res) => {
  let wherestr = { _id: id };

  let out = { psw: 0 };

  await User.findOne(wherestr, out, (err, result) => {
    if (err) {
      res.send({ status: 500 });
    } else {
      res.send({ status: 200, result });
    }
  });
};

// 用户信息修改
const userUpdate = async (data, res) => {
  let wherestr = { _id: data.id };
  let out = { psw: 0 };

  // 更新的数据
  let updatestr = {};

  // 判断是否修改密码
  if (data.pwd) {
    await User.find(wherestr, out, (err, result) => {
      if (err) {
        res.send({ status: 500 });
      } else {
        // 有密码
        result.map(async (e) => {
          // 密码验证
          const pwdMatch = await bcrypt.verification(data.pwd, e.psw);
          if (pwdMatch) {
            // 密码验证成功
            // 如果为修改密码，先加密
            if (data.type == "psw") {
              // 密码加密
              let password = await bcrypt.encryption(data.data);
              updatestr[data.type] = password;
            } else {
              updatestr[data.type] = data.data;
            }

            // 查找并修改
            await User.findByIdAndUpdate(data.id, updatestr, (err, resu) => {
              if (err) {
                res.send({ status: 500 });
              } else {
                // 修改成功
                res.send({ status: 200 });
              }
            });
          } else {
            // 密码匹配失败
            res.send({ status: 400 });
          }
        });
      }
    });
  } else {
    updatestr[data.type] = data.data;
    await User.findByIdAndUpdate(data, id, updatestr, (err, result) => {
      if (err) {
        // 修改失败
        res.send({ status: 500 });
      } else {
        // 修改成功
        res.send({ status: 200 });
      }
    });
  }
};

// 获取好友昵称
const getMarkName = async (data, res) => {
  let wherestr = {
    userID: data.id,
    friendID: data.fid,
  };

  let out = {
    markname: 1,
  };

  await Friend.findOne(wherestr, out, (err, result) => {
    if (err) {
      // 获取失败
      res.send({ status: 500 });
    } else {
      // 获取成功
      res.send({ status: 200, result });
    }
  });
};

// 修改好友昵称
const updateMarkName = async (data, res) => {
  let wherestr = {
    userID: data.id,
    friendID: data.fid,
  };

  let updatestr = {
    markname: data.name,
  };

  await Friend.updateOne(wherestr, updatestr, (err, result) => {
    if (err) {
      res.send({ status: 500 });
    } else {
      // 修改成功
      res.send({ status: 200 });
    }
  });
};

module.exports = {
  buildUser,
  countUserValue,
  userMatch,
  searchUser,
  isFriend,
  searchGroup,
  isInGroup,
  userDetial,
  userUpdate,
  getMarkName,
  updateMarkName,
};
