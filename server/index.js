const Koa = require('koa');
// const smartProxy = require('./smart-proxy'); //腾讯验证
const app = new Koa();
const part = 8999;
const path = require('path')
const router = require('./router');
const bodyParser = require('koa-bodyparser');
const cors = require('koa-cors');
// const views = require('koa-views');
const static = require('koa-static')   //静态资源服务插件

app.use(cors());
app.use(bodyParser())
// 配置静态资源
const staticPath = '../dist'
app.use(static(
    path.join( __dirname, staticPath),
    {extensions: ['html']}
))
// app.use(views(path.resolve(__dirname,'../dist')))
// app.use(smartProxy()) 
app.use(router.routes())
app.on('error', (err, ctx) =>
  console.error('server error', err)
);

app.listen(part, ()=>{
    console.log('\033[42;30m DONE \033[40;32m node service is running here: http://127.0.0.1:' + part + '\033[0m')
});
