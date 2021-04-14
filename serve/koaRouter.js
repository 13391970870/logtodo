const Router = require('koa-router');
const api = new Router();
const KoaBody = require('koa-body');


const blog = require('./api/blog.js');
const user = require('./api/user.js');
const record = require('./api/record.js');

api.get('/api/blog', blog.getBlog);
api.post('/api/blog/update', KoaBody(), blog.updateBlog);
api.post('/api/blog/delete', KoaBody(), blog.deleteBlog);
api.post('/api/blog/search', KoaBody(), blog.searchBlog);

api.post('/api/setUser', KoaBody(), user.setUser)
api.post('/api/login', KoaBody(), user.login)

api.post('/api/record/update', KoaBody(), record.updateRecord)
api.get('/api/record',record.getRecord)
api.post('/api/record/delete', KoaBody(), record.deleteRecord)

module.exports = api;