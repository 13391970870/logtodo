var exports = module.exports;
const common = require('../lib/common.js');
const jsonwebtoken = require("jsonwebtoken");
const {
  SECRET
} = require("../lib/config.js");


exports.setUser = async function (ctx) {
  let data = ctx.request.body;
  let [repeatUser] = await common.query(
    `select * from user2 where username='${data.userName}'`
  );
  if (repeatUser) {
    ctx.body = {
      status: true,
      content: '用户已存在',
    }
  } else {
    let categories = await common.query(
      `insert into user2 values(0,'${data.userName}','${data.password}','${common.dateFormat(new Date())}');`
    );
    ctx.body = {
      status: true,
      content: '',
    }
  }
}

exports.login = async function (ctx) {
  let data = ctx.request.body;
  let [user] = await common.query(
    `SELECT * FROM user2 WHERE username='${data.userName}' AND password='${data.password}'`,
  );
  if (user) {
    const token = jsonwebtoken.sign({
      uId: user.id
    }, SECRET, {
      expiresIn: "2h",
    });


    ctx.body = {
      status: true,
      content: '',
      data: {
        token,
      }
    }
  } else {
    ctx.body = {
      status: false,
      content: '用户名或密码错误',
      data: {

      }
    }
  }
}