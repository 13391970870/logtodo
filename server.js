const Koa = require('koa')
const serve = require('koa-static')

const staticPath = '/public'
const api = require('./serve/koaRouter.js');
const { SECRET } = require("./serve/lib/config.js");
const koaJwt = require("koa-jwt");

const fs = require('fs')
const path = require('path')
const mount = require('koa-mount')
const webpack = require('webpack')
const { koaDevMiddleware, koaHotMiddleware } = require('./hmr')
const webpackDevConfig = require('./build/webpack.dev.js')
const { isProd } = false;

const webpackCompiler = webpack(webpackDevConfig)


const app = new Koa()
if (isProd) {
  const staticPath = path.resolve(__dirname, './dist/static')
  const indexHtml = path.resolve(__dirname, './dist/index.html')
  app.use(mount('/static/', serve(staticPath)))
  app.use(ctx => {
    ctx.body = fs.readFileSync(indexHtml, { encoding: 'utf8' })
  })
} else {
  app.use(koaDevMiddleware(webpackCompiler, {
    noInfo: true,
  }))
  app.use(koaHotMiddleware(webpackCompiler, {
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000,
  }))
}

app.use(serve(__dirname , staticPath));

app.use(koaJwt({ secret: SECRET }).unless({ path: [/^\/api\/login/,/^\/api\/setUser/] }));
app.use(api.routes());

app.listen(3000, () => {
  console.log(`Server is listening on 3001 port`)
})