import * as types from './mutation-types'
import * as REQUEST from '../assets/js/http/index'
export const getUserinfo = function ({ commit, state }, _params) {
  // 异步事件的成功回调
  commit(types.SET_USERINFO)
}

export const getPackageList = function ({ commit, state }, _params) {
  return REQUEST.getPackageList(_params).then(
    res => {
      // 给 添加自费加项包 + - 按钮 用的
      res.data.pay_package.list.forEach(ele => {
        ele.select = false
      })
      commit(types.SET_PACKAGELIST, res.data)
      return res
    },
    err => {
      Promise.reject(err)
    }
  )
}
