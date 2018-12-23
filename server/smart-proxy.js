const axios = require('axios');
const crypto = require('crypto');
const config = require('../config/index').getUrl()
const token = config.token;

function sha256(string) {
  var hash = crypto.createHash('sha256');
  hash.update(string);
  return hash.digest('hex'); // 返回16进制hash码

}
module.exports = function () {
  return async function (ctx, next) {
    if (process.env.NODE_ENV === 'development') {
      ctx.staffInfo = {
        staffId: 337088,
        staffName: 'boneyxiang'
      }
      await next();
      return;
    }
    var timestamp = ctx.header['timestamp'];
    var signature = ctx.header['signature'];
    var staffId = ctx.header['staffid'];
    var staffName = ctx.header['staffname'];
    var xRioSeq = ctx.header['x-rio-seq'];
    var xExtData = ctx.header['x-ext-data'] || ''; // 办公网访问，这里要设置成空字符串

    var nowTimestamp = (new Date().getTime() / 1000).toFixed(0);

    // 校验时间戳,误差不得超过180秒
    if (Math.abs(nowTimestamp - timestamp) > 180) {
      ctx.status = 403;
      ctx.body = 'smart-proxy signature check fail';
      return;
    }

    // 签名为大写英文
    var computedSignature = sha256(`${timestamp}${token}${xRioSeq},${staffId},${staffName},${xExtData}${timestamp}`).toUpperCase();
    // 校验签名
    if (computedSignature !== signature) {
      ctx.status = 403;
      ctx.body = 'smart-proxy signature check fail';

      return;
    }

    // openId转换
    // await axios.get(`${config.openIdchangeurl}api/exchangeid?from=wxa156b2d5d5d01b77&to=wxedf73eec775a99df&sourceid=${xExtData}&rtx=${staffName}`).then((res) => {
    //   if (res.data.code === 0 && res.data.data) {
    //     xExtData = res.data.data
    //   }
    // }).catch((err) => {
    //   console.log(err)
    // })

    ctx.staffInfo = {
      staffId: staffId,
      staffName: staffName
    }
    await next()
  }
}