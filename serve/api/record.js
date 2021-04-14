var exports = module.exports;
const common = require('../lib/common.js');
const fs = require('fs');

exports.getRecord = async function (ctx) {
  let categories = Array.from(await common.query(
    "select * from record1;"
  ))

  categories.forEach(index => {
    const innerHTML = fs.readFileSync(index.file_path, (err) => {

    })
    index.innerHTML = innerHTML.toString();
  })
  ctx.body = categories;
}

exports.updateRecord = async function (ctx) {
  let data = ctx.request.body;
  const now = new Date();
  const filePath = `./public/record/${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()}/`;
  const fileName = `${now.getHours()}${now.getMinutes()}${now.getSeconds()}.html`

  if (data.id) {
    fs.writeFile(data.file_path, data.content, (err) => {})
    let categories = await common.query(
      `update record1 set title='${data.title}',record_type='${data.record_type}',introduce='${data.introduce}',username='${data.username}',updateTime='${data.updateTime}' where record_id=${data.id}`
    );
  } else {
    common.mkdirs(filePath, () => {
      fs.writeFile(filePath + fileName, data.content, (err) => {})
    })
    let categories = await common.query(
      `insert into record1 (title,file_path,record_type,introduce,username,time) values ('${data.title}','${filePath + fileName}','${data.record_type}','${data.introduce}','${data.username}','${data.time}')`
    );
  }

  ctx.body = {
    status: true,
    content: '创建成功',
  }
}

exports.deleteRecord = async function (ctx) {
  let data = ctx.request.body;
  console.log(data);
  fs.unlink(data.file_path, function (err) {
  })

  let categories = await common.query(
    `delete from record1 where record_id=${data.id}`
  );

  ctx.body = {
    status: true,
    content: '删除成功',
  }
}