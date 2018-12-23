import axios from 'axios'
import qs from 'qs'
import * as API_PATH from './api'
import {
  urlEncode
} from '../util'

const MIDDLEWARE_URL = 'http://123.207.100.25:8999/api'
// config
const baseURL = process.env.NODE_ENV === 'production' ? 'http://daishu.com' : 'http://test.daishutijian.com/tijianlocal/TencentServices/apps/api'
axios.defaults.timeout = 5000
axios.withCredentials = true
axios.crossDomain = true
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.responseType = 'json'
axios.defaults.baseURL = baseURL
axios.interceptors.request.use(
  config => {
    if (config.method === 'post' || config.method === 'put' || config.method === 'delete') {
      config.data = qs.stringify(config.data)
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// method
export function test() {
  let url = 'org/list_by_package_names'
  return $get({
    url: MIDDLEWARE_URL,
    param: {
      realUrl: url
    }
  })
}

export function appointDetail(id) {
  let url = API_PATH.appointDetail
  return $get({
    url: MIDDLEWARE_URL,
    param: {
      realUrl: url,
      order_id: id
    }
  })
}

export function organizationList(city, lonlag, mainpack, packages) {
  let url = API_PATH.organizationList
  return $get({
    url: MIDDLEWARE_URL,
    param: {
      realUrl: url,
      city_id: city,
      lon_lat: lonlag,
      main_package_name: mainpack,
      package_names: packages
    }
  })
}

export function cancelOrder(id) {
  let url = API_PATH.cancelOrder
  return $post({
    url: MIDDLEWARE_URL,
    data: {
      realUrl: url,
      order_id: id
    }
  })
}

export function orderComfirmInfo(options) {
  let url = API_PATH.orderComfirmInfo
  options.realUrl = url
  return $get({
    url: MIDDLEWARE_URL,
    param: options
  })
}

export function orgSchedule(options) {
  let url = API_PATH.orgSchedule
  options.realUrl = url
  return $get({
    url: MIDDLEWARE_URL,
    param: options
  })
}

export function cityList() {
  let url = API_PATH.cityList
  return $get({
    url: MIDDLEWARE_URL,
    param: {
      realUrl: url
    }
  })
}

export function orderDetail(options) {
  let url = API_PATH.orderDetail
  return $get({
    url: MIDDLEWARE_URL,
    param: {
      realUrl: url,
      order_id: options.id
    }
  })
}

export function orderReserve(options) {
  let url = API_PATH.orderReserve
  options.realUrl = url
  return $post({
    url: MIDDLEWARE_URL,
    data: options
  })
}

export function examIndex() {
  let url = API_PATH.examIndex
  return $get({
    url: MIDDLEWARE_URL,
    param: {
      realUrl: url
    }
  })
}

export function personCenter() {
  let url = API_PATH.personCenter
  return $get({
    url: MIDDLEWARE_URL,
    param: {
      realUrl: url
    }
  })
}

export function personCenterBoss() {
  let url = API_PATH.personCenterBoss
  return $get({
    url: MIDDLEWARE_URL,
    param: {
      realUrl: url
    }
  })
}

export function bossList() {
  let url = API_PATH.bossList
  return $get({
    url: MIDDLEWARE_URL,
    param: {
      realUrl: url
    }
  })
}

export function changeIdentity(id) {
  let url = API_PATH.changeIdentity
  return $post({
    url: MIDDLEWARE_URL,
    data: {
      realUrl: url,
      rtx: id
    }
  })
}

/**
 * @param orderId  订单ID
 */
export function getHistoryOrders(orderId) {
  return $get({
    url: MIDDLEWARE_URL,
    param: {
      realUrl: API_PATH.historyOrders,
      order_id: orderId
    }
  })
}

/** **********************套餐接口***********************/
/**
 * @param city_id   城市ID
 */
export function getPackageList(cityId) {
  return $get({
    url: MIDDLEWARE_URL,
    param: {
      realUrl: API_PATH.packageList,
      city_id: cityId
    }
  })
}

/**
 * @param org_id     机构id
 * @param package_id 套餐ID
 */
export function getPackageDetail({
  orgId,
  packageId
}) {
  return $get({
    url: MIDDLEWARE_URL,
    param: {
      realUrl: API_PATH.packageDetail,
      org_id: orgId,
      package_id: packageId
    }
  })
}

/** **********************get  post的封装***********************/
export function $get({
  url = '',
  param = {}
}) {
  if (window.localStorage.getItem('rtx')) {
    param.rtx = window.localStorage.getItem('rtx')
  }
  if (JSON.stringify(param) !== '{}') {
    url += urlEncode(param)
  }
  return new Promise((resolve, reject) => {
    axios.get(url)
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export function $post({
  url = '',
  param = {},
  data = {}
}) {
  if (window.localStorage.getItem('rtx')) {
    param.rtx = window.localStorage.getItem('rtx')
  }
  if (JSON.stringify(param) !== '{}') {
    url += urlEncode(param)
  }
  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
