const router = require('koa-router')()
const Request = require('request');
const fs = require('fs');
const baseURL = process.env.NODE_ENV === 'production' ? 'http://daishu.com/' : 'http://test.daishutijian.com/tijianlocal/TencentServices/apps/api'

router.get('/', async (ctx, next) => { //页面渲染
})

router.get('/api', async (ctx, next) => { //get接口请求
  // console.log(ctx);
  let query = {
    url: parseQueryString(ctx.originalUrl.replace('/api', '')).realUrl + ctx.originalUrl.replace('/api', ''),
  }
  let response = await realRequest(query);
  ctx.response.body = response;
})

router.post('/api', async (ctx, next) => { //post接口请求
  let query = {
    url: ctx.request.body.realUrl,
    params: ctx.request.body,
  }
  let response = await realRequest(query, 'post');
  ctx.response.body = response;
})

router.get('/admin', async (ctx, next) => { //页面转发
  let query = {
    url: parseQueryString(ctx.originalUrl.replace('/admin', '')).realUrl,
  }
  let response = await realRequest(query);
  ctx.response.body = response;
})



var realRequest = (options, type = 'get') => {
  // console.log( baseURL + options.url )
  return new Promise(function (resolve, reject) {
    Request[type]({
      url: baseURL + options.url,
      form: options.params,
      originalHostHeaderName: 'Host'
    }, function (error, response, body) {
      if (error) {
        console.error('xiexin this is err')
        console.error(error)
        resolve(error);
        return;
      }
      resolve(body);
    })
  })
}

var parseQueryString = function (url) {
  var hash;
  var myJson = {};
  var hashes = url.slice(url.indexOf('?') + 1).split('&');
  for (var i = 0; i < hashes.length; i++) {
    hash = hashes[i].split('=');
    myJson[hash[0]] = hash[1];
  }
  return myJson;
}

module.exports = router;
