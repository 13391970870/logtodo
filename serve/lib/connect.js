var exports = module.exports;
const mysql = require('mysql2');

exports.connection = mysql.createConnection({
  host: '182.92.179.158',
  user: 'root',
  password: 'Zsm940222',
  database: 'USER'
})