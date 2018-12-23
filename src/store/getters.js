export const getUserinfo = state => state.userinfo
export const getAddItemList = state => state.addItemList
export const getPackageList = state => state.packageList
export const getSelectedPackageInfo = state => state.selectedPackageInfo
export const getShoppingList = state => state.shoppingList
export const getShppingStatus = state => state.shoppingStatus
export const currentCity = state => state.currentCity
export const getShoppingListPrice = state => {
  if (state.shoppingList.length === 0) {
    return 0
  } else {
    let sum = 0
    state.shoppingList.forEach(element => {
      sum += Number(element.price)
    })
    return sum
  }
}
