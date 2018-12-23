import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import * as actions from './actions'
import * as getters from './getters'

Vue.use(Vuex)

let state = {
  userinfo: {},
  packageList: {}, // 定制套餐页的请求数据
  addItemList: [],
  shoppingList: [],
  shoppingStatus: false, // 购物状态. 支付完成改为true
  selectedPackageInfo: {}, // 定制套餐页传值用的
  remodifyPackages: false
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
