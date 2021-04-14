var exports = module.exports;
const connect = require('./connect.js');
const fs = require('fs');
const path = require('path');

exports.query = function (sql) {
  return new Promise((resolve, reject) => {
    connect.connection.query(
      sql,
      function (err, result, fidlds) {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    )
  })
}

exports.mkdirs = function(dirname, callback) {
  fs.exists(dirname, function (exists) {
    if (exists) {
      callback();
    } else {
      exports.mkdirs(path.dirname(dirname), function () {
        fs.mkdir(dirname, callback);
      });
    }
  });
}

exports.dateFormat = function(date, fmt) {
  if (!fmt) {
    fmt = 'YYYY-mm-dd HH:MM:SS'
  }
  let ret;
  const opt = {
    "Y+": date.getFullYear().toString(), // 年
    "m+": (date.getMonth() + 1).toString(), // 月
    "d+": date.getDate().toString(), // 日
    "H+": date.getHours().toString(), // 时
    "M+": date.getMinutes().toString(), // 分
    "S+": date.getSeconds().toString() // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (let k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
    };
  };
  return fmt;
}
