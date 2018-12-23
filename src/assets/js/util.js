// 拼接params
export function urlEncode(param) {
  if (param === null) return ''
  let paramStr = ''
  for (let k in param) {
    paramStr += `&${k}=${param[k]}`
  }
  return '/?' + paramStr.substring(1)
}

// 身份证验证 如果身份证号正确会返回一个身份信息的数组,如果有返回错误信息就直接显示
export function testIdCard (sId) {
  if (!sId) {
    return '请输入证件号码'
  }
  sId = String(sId)
  if (!sId.match(/^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/ig)) {
    return '身份证号格式不正确'
  }

  var cardArea = {
    11: '北京',
    12: '天津',
    13: '河北',
    14: '山西',
    15: '内蒙古',
    21: '辽宁',
    22: '吉林',
    23: '黑龙江',
    31: '上海',
    32: '江苏',
    33: '浙江',
    34: '安徽',
    35: '福建',
    36: '江西',
    37: '山东',
    41: '河南',
    42: '湖北',
    43: '湖南',
    44: '广东',
    45: '广西',
    46: '海南',
    50: '重庆',
    51: '四川',
    52: '贵州',
    53: '云南',
    54: '西藏',
    61: '陕西',
    62: '甘肃',
    63: '青海',
    64: '宁夏',
    65: '新疆',
    71: '台湾',
    81: '香港',
    82: '澳门',
    91: '国外'
  }
  var iSum = 0
  var cardInfo = Array(2)
  sId = sId.replace(/x$/i, 'a')
  if (sId.length === 0) {
    return '身份证为空'
  }

  if (cardArea[parseInt(sId.substr(0, 2))] === null) {
    return '非法证件，你的地区填写有错误请仔细填写'
  }
  var sBirthday = sId.substr(6, 4) + '-' + Number(sId.substr(10, 2)) + '-' + Number(sId.substr(12, 2))
  var d = new Date(sBirthday.replace(/-/g, '/'))
  if (sBirthday !== (d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate())) {
    return '非法证件，请仔细填写'
  }

  for (var i = 17; i >= 0; i--) {
    iSum += (Math.pow(2, i) % 11) *
        parseInt(sId.charAt(17 - i), 11)
  }

  if (iSum % 11 !== 1 || sId.length > 19) {
    return '非法证号，请认真填写'
  }

  var age = new Date().getFullYear() - d.getFullYear()
  cardInfo[0] = cardArea[parseInt(sId.substr(0, 2))]
  cardInfo[1] = sBirthday
  cardInfo[2] = age
  cardInfo[3] = sId.substr(16, 1) % 2 ? '男' : '女'
  return cardInfo
}

// 手机号验证 成功返回true 否则false
export function testPhone(tel) {
  if (!tel) {
    return false
  }
  if (!(/^1\d{10}$/ig).test(tel)) {
    return false
  }
  return true
}

// 判断数据类型 调用方式：getType( [1,2,3], 'Array') => true
export function getType(obj, type) {
  var objType = Object.prototype.toString.call(obj).slice(8, -1)
  return objType === type
}
