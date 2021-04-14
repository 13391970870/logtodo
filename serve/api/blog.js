var exports = module.exports;
const common = require('../lib/common.js');
const fs = require('fs');

exports.getBlog = async function (ctx) {
  let categories = Array.from(await common.query(
    "select * from blog1;"
  ))

  categories.forEach(index => {
    const innerHTML = fs.readFileSync(index.file_path, (err) => {})
    index.innerHTML = innerHTML.toString();
  })
  ctx.body = categories;
}

exports.updateBlog = async function (ctx) {
  let data = ctx.request.body;
  const now = new Date();
  const filePath = `./public/blog/${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()}/`;
  const fileName = `${now.getHours()}${now.getMinutes()}${now.getSeconds()}.html`

  if (data.id) {
    fs.writeFile(data.file_path, data.content, (err) => {})
    let categories = await common.query(
      `update blog1 set title='${data.title}',log_type='${data.log_type}',introduce='${data.introduce}',username='${data.username}',updateTime='${data.updateTime}' where blog_id=${data.id}`
    );
  } else {
    common.mkdirs(filePath, () => {
      fs.writeFile(filePath + fileName, data.content, (err) => {})
    })
    let categories = await common.query(
      `insert into blog1 (title,file_path,log_type,introduce,username,time) values ('${data.title}','${filePath + fileName}','${data.log_type}','${data.introduce}','${data.username}','${data.time}')`
    );
  }

  ctx.body = {
    status: true,
    content: '创建成功',
  }
}

exports.deleteBlog = async function (ctx) {
  let data = ctx.request.body;

  fs.unlink(data.file_path, function (err) {})

  let categories = await common.query(
    `delete from blog1 where blog_id=${data.id}`
  );

  ctx.body = {
    status: true,
    content: '删除成功',
  }
}

exports.searchBlog = async function (ctx) {
  let data = ctx.request.body;
  let searchs = ``
  data.log_type.forEach((item,i)=>{
    searchs += searchs == ``?`where`:``;
    searchs += ` FIND_IN_SET('${data.log_type}',log_type) ${i + 1 < data.log_type.length?`or`:``}`;
  })
  console.log(searchs);
  let categories = await common.query(
    `SELECT * FROM blog1 ${searchs} LIMIT ${(data.page - 1) * data.limit},${((data.page - 1) * data.limit) + data.limit}`
  );
  let allBlog = await common.query(
    `SELECT * FROM blog1 ${searchs}`
  );
  ctx.body = {
    pages: categories,
    allPages: allBlog.length
  };
}