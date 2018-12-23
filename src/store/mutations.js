import * as types from './mutation-types'

const mutations = {
  [types.SET_STORE](state, payload) {
    for (let key in payload) {
      state[key] = payload[key]
    }
  },
  [types.SET_ISREMODIFYPACKAGES](state, payload) {
    state.remodifyPackages = payload
  },
  [types.SET_USERINFO](state, payload) {
    state.userinfo = payload
  },
  [types.SET_PACKAGELIST](state, payload) {
    state.packageList = payload
  },
  [types.SET_ADDITEMLIST](state, payload) {
    state.addItemList = payload
  },
  [types.SET_SHOPPINGSTATUS](state, payload) {
    state.shoppingStatus = payload
  },
  [types.SET_SHOPPINGLIST](state, payload) {
    if (payload.select) {
      state.shoppingList.push(payload)
    } else {
      let res = []
      res = state.shoppingList.filter(element => {
        return element.select === true
      })
      state.shoppingList = res
    }
  },
  [types.CLEAN_SHOPPINGLIST](state) {
    state.addItemList.forEach(element => {
      element.select = false
    })
    state.shoppingList = []
  },
  [types.SET_SELECTEDPACKAGEINFO](state, payload) {
    state.selectedPackageInfo = { ...state.selectedPackageInfo, ...payload }
  },
  [types.CLEAN_SELECTEDPACKAGEINFO](state) {
    state.selectedPackageInfo = {}
  },
  [types.DEL_SELECTEDPACKAGEINFOFREEPAG](state, payload) {
    state.selectedPackageInfo.free_package_name.forEach((ele, index) => {
      if (ele === payload) {
        state.selectedPackageInfo.free_package_name.splice(index, 1)
      }
    })
  },
  [types.DEL_SELECTEDPACKAGEINFOFREEIDS](state, payload) {
    let tempArr = state.selectedPackageInfo.free_add_item_ids.split(',')
    tempArr.forEach((ele, index) => {
      if (Number(ele) === Number(payload.id)) {
        tempArr.splice(index, 1)
      }
    })
    state.selectedPackageInfo.free_add_item_ids = tempArr.join()
  }
}

export default mutations
