<template>
  <div>
    <div class="container">
      <h2 class="title">添加自费加项包</h2>
      <!-- 其他 -->
      <OtherAddItem :resData="getPackageList" @change="handleChange"/>
      <!-- 智能推荐 -->
      <SmartRecommendItem :resData="getPackageList" v-if="!true"/>
    </div>
    <!-- 底部购物车 -->
    <div class="shopcart" :class="showPopup ? 'none-shadow' : ''" @click.stop="viewcart">
      <p>
        <span class="shopcart-icon"></span>
        <span class="shopcart-amount">{{getShoppingList.length}}</span>
      </p>
      <p>
        ¥ {{getShoppingListPrice}}
        <span>起</span>
      </p>
      <ComBtn type="large" @click.stop="handleNext">下一步</ComBtn>
    </div>

    <ComPopup :showPopup.sync="showPopup">
      <div class="cart">
        <header class="top">
          <p>已选加项目包 ({{getShoppingList.length}})</p>
          <p class="clean-cart">
            <span class="clean-cart-icon"></span>
            <span @click.stop="clearCart">清除</span>
          </p>
        </header>
        <div class="cart-content">
          <p
            v-if="getShoppingList.length===0"
            style="fontSize:12px;textAlign:center;marginTop:20px"
          >购物车空空如也~</p>
          <div v-else class="item-info" v-for="(item,index) in getShoppingList" :key="index">
            <p>{{item.package_name}}</p>
            <p>
              <span class="price">¥ {{item.price}}起</span>
              <ComAddOrDel :select="item.select" :id="item.id" @change="handleChange"/>
            </p>
          </div>
        </div>
      </div>
    </ComPopup>
  </div>
</template>
<script>
import math from 'mathjs'
import OtherAddItem from '@/components/custom-add-items/other-add-item'
import SmartRecommendItem from '@/components/custom-add-items/smart-recommend-item'
import ComBtn from '@/components/common/button'
import ComAddOrDel from '@/components/common/add-or-del'
import ComPopup from '../../components/common/popup'
import { saveStorage } from '../../assets/js/cache.js'
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'custom-add-items',
  data() {
    return {
      showPopup: false,
      selectItemCount: 0,
      selectItemList: []
    }
  },
  computed: {
    ...mapGetters(['getShoppingList', 'getShoppingListPrice', 'getPackageList', 'getShppingStatus'])
  },
  components: {
    OtherAddItem,
    SmartRecommendItem,
    ComBtn,
    ComAddOrDel,
    ComPopup
  },
  methods: {
    ...mapMutations(['SET_SHOPPINGLIST', 'CLEAN_SHOPPINGLIST', 'SET_ADDITEMLIST', 'SET_SELECTEDPACKAGEINFO', 'DEL_SELECTEDPACKAGEINFOFREEPAG', 'DEL_SELECTEDPACKAGEINFOFREEIDS']),
    viewcart() {
      this.showPopup = !this.showPopup
    },
    handleNext() {
      this.showPopup = false
      const payload = {
        price: 0,
        pay_add_item_ids: '',
        pay_packageName: []
      }
      let payArr = []
      this.getShoppingList.forEach(ele => {
        payload.pay_packageName.push(ele.package_name)
        payArr.push(ele.id)
        payload.price = Number(math.format((math.add(math.bignumber(payload.price), math.bignumber(ele.price)))))
      })
      payload.pay_add_item_ids = payArr.join()

      this.SET_SELECTEDPACKAGEINFO(payload)
      saveStorage('sessionState', this.$store.state)
      this.$router.push({ path: '/organizationlist' })
    },
    close() {
      this.showPopup = false
    },
    showShoppingCart() {
      this.showPopup = true
    },
    // 购物车
    clearCart() {
      this.CLEAN_SHOPPINGLIST()
      if (this.getShoppingList.length === 0) {
        this.getPackageList.pay_package.list.forEach(element => {
          element.select = false
        })
        this.close()
      }
    },
    handleChange(id) {
      let flag = false
      let arr = this.getPackageList.pay_package.list
      for (let i = 0; i < arr.length; i++) { // 删的是 自费加项包的话
        if (arr[i].id === id) {
          arr[i].select = !arr[i].select
          this.SET_SHOPPINGLIST(arr[i])
          break
        }
        if (i === arr.length - 1) {
          flag = true
        }
      }
      if (flag) { // 即删到的可能是 上一页面的免费加项包或是乙肝
        this.getShoppingList.forEach(ele => {
          if (ele.name && ele.name === 'check_hepatitis_b') { // 删了乙肝要改变 VUEX中的乙肝状态
            this.SET_SELECTEDPACKAGEINFO({ check_hepatitis_b: 0 })
          }
          if (ele.id === id) {
            ele.select = false
            this.SET_SHOPPINGLIST(ele) // 删购物车中对应的
            this.DEL_SELECTEDPACKAGEINFOFREEPAG(ele.package_name) // 删免费加项包的名, 给机构页查询用
            this.DEL_SELECTEDPACKAGEINFOFREEIDS(ele) // 删免费加项包id 给提交订单用的
          }
        })
      }
      if (this.getShoppingList.length === 0) this.close()
    }
  },
  beforeMount() {
    this.$Lazyload.config({ lazyComponent: true, loading: 'https://i.ibb.co/tLXYkZw/item-placeholder.png', error: 'https://i.ibb.co/tLXYkZw/item-placeholder.png' })
  },
  mounted() {
    if (this.$store.state.remodifyPackages) {
      this.showShoppingCart()
    }
  }
}
</script>
<style lang="less" scoped>
@import "../../assets/css/var.less";
.container {
  background-color: #fff;
  margin-bottom: 60px;
}
.title {
  font-family: PingFangSC-Medium;
  font-size: 22PX;
  padding: 16px 0px;
  margin: 0 16px;
  font-weight: 600;
  text-align: left;
  border-bottom: 1px dashed #c6d2d4;
  background-color: #fff;
}
.shopcart {
  box-sizing: border-box;
  position: fixed;
  z-index: 1000;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  bottom: 0;
  padding: 8px 10px;
  width: 100%;
  height: 60px;
  background: #ffffff;
  box-shadow: 0 -3px 25px 0 rgba(100, 160, 171, 0.2);
  p:first-child {
    position: relative;
    margin-left: 4px;
    & > .shopcart-icon {
      display: inline-block;
      width: 20px;
      height: 20px;
      background: url("../../assets/images/ic_shopcart.svg") no-repeat center;
      background-size: 20px 20px;
      margin-right: 16PX;
    }
    & > .shopcart-amount {
      position: absolute;
      top: -5px;
      left: 15px;
      display: inline-block;
      width: 14PX;
      height: 14PX;
      border-radius: 100%;
      font-size: 10PX;
      color: @white;
      background-color: @red;
      text-align: center;
      line-height: 15PX;
    }
  }
  p:nth-child(2) {
    color: @red;
    font-size: 17px;
    line-height: 24px;
    font-weight: 600;
    flex: 1;
    & > span {
      font-size: 12px;
    }
  }
}
.none-shadow {
  box-shadow: 0 0 0 0 transparent;
}

.cart {
  // position: fixed;
  bottom: 60px;
  min-height: 100px;
  width: 100%;
  background-color: @white;
  border-bottom: 0.5px solid #d9dcde;
  .top {
    font-family: PingFangSC-Medium;
    box-sizing: border-box;
    border-bottom: 0.5px solid #d9dcde;
    line-height: 20px;
    height: 50px;
    padding: 14px 16px;
    font-size: 14px;
    font-weight: 600;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .clean-cart {
      display: table;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      .clean-cart-icon {
        display: table-cell;
        vertical-align: middle;
        width: 13px;
        height: 15.4px;
        padding-left: 6px;
        background: url("../../assets/images/ic_clean_shopcart.svg") no-repeat
          center;
        background-size: 13px 15.4px;
      }
    }
  }
  .cart-content {
    box-sizing: border-box;
    padding-left: 14px;
    max-height: 178px;
    overflow: auto;
    .item-info {
      font-family: PingFangSC-Regular;
      padding: 20px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 14px;
      line-height: 20px;
      border-bottom: 0.5px solid #d9dcde;
      p:last-child {
        display: flex;
        align-items: center;
        margin-right: 16px;
        .price {
          margin-right: 16px;
        }
      }
    }
    .item-info:last-child {
      border-bottom: none;
    }
  }
}
</style>
