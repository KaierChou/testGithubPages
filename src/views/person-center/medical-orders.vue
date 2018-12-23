<template>
  <div>
    <nav @click="navToggle($event)">
      <ul class="navlist" ref="navlist">
        <li>员工</li>
        <li>家属</li>
      </ul>
      <div class="nav-slider" ref="navslider"></div>
    </nav>

    <div class="container">
      <div class="item" v-for="(item, index) in staffOrders" :key="index" @click="handleEnterDetail(item.order_id)">
        <div class="item-info">
          <p>{{item.package_name}}</p>
          <p>姓名: <span>{{item.user_name}}</span></p>
          <p>地点: <span>{{item.org_name}}</span></p>
          <p>时间: <span>{{item.medical_time}}</span></p>
        </div>
        <div class="item-status" :class="filterOrderStatus(item.status)">{{item.status_str}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { getHistoryOrders } from '../../assets/js/http/index.js'
import { ordersStatusClass } from '../../assets/js/enum.js'
export default {
  name: 'medical-orders',
  data() {
    return {
      isLoading: true,
      selectNav: false,
      staffOrders: [],
      relationOrders: []
    }
  },
  methods: {
    navToggle(e) {
      if (this.isLoading) return
      if (e.target.tagName === 'LI') {
        let _width = e.target.offsetWidth
        let _left = e.target.offsetLeft
        let _sliderLeft = Number(_left + (_width / 2) - this.$refs.navslider.offsetWidth / 2)
        this.$refs.navslider.style.left = _sliderLeft + 'px'
        Array.from(this.$refs.navlist.children).forEach((element, index) => {
          element.classList.remove('active')
        })
        e.target.classList.add('active')
      }
    },
    getData() {
      getHistoryOrders(200).then(
        res => {
          if (res.code === 0) {
            this.staffOrders = res.data
          } else {
            this.$toast.fail('请求响应异常')
          }
          this.isLoading = false
          this.$toast.clear()
        },
        err => {
          this.$toast.fail(err.toString())
          this.$toast.clear()
        }
      )
    },
    filterOrderStatus(status) {
      let classname = ''
      for (let key in ordersStatusClass) {
        if (key === status) {
          classname = ordersStatusClass[key]
        }
      }
      return classname
    },
    handleEnterDetail(id) {
      this.$router.push({ path: '/appoint-detail', query: { order_id: id } })
    }
  },
  mounted() {
    this.$nextTick(() => {
      let li = this.$refs.navlist.children
      let slider = this.$refs.navslider
      let width = li[0].offsetWidth
      let left = li[0].offsetLeft
      let sliderWidth = slider.offsetWidth
      let sliderLeft = Number(left + (width / 2) - sliderWidth / 2)
      slider.style.left = sliderLeft + 'px'
    })
    this.getData()
  },
  created() {
    this.$toast.loading({ duration: 0, loadingType: 'spinner' })
  }
}
</script>
<style lang="less" scoped>
@import "../../assets/css/var.less";
nav {
  position: fixed;
  top: 0;
  z-index: 1000;
  width: 100%;
  height: 46px;
  box-sizing: border-box;
  box-shadow: 0 4px 25px 0 rgba(159, 186, 192, 0.28);
  padding: 0 51px;
  background-color: @white;
  color: @black;
  font-size: 17px;
  line-height: 24px;
  font-family: PingFangSC-Medium;
  & > ul {
    width: 100%;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    li {
      box-sizing: border-box;
      height: 100%;
      width: 109px;
      text-align: center;
      line-height: 46px;
    }
  }
  .active {
    color: @blue;
  }
  .nav-slider {
    background-color: @blue;
    width: 109px;
    height: 4px;
    transition: 0.4s;
    position: absolute;
    bottom: 0;
  }
}
.container {
  position: relative;
  box-sizing: border-box;
  margin-top: 46px;
  padding: 0 16px;
  width: 100%;
  overflow: auto;
  background-color: @white;
  .item {
    font-family: PingFangSC-Regular;
    box-sizing: border-box;
    padding: 18.5px 0 17.5px 0;
    background-color: @white;
    font-size: 12px;
    line-height: 17px;
    color: @gray;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 0.5PX solid #D9DCDE;
    .item-info {
      flex: 1;
      & > p {
        margin-bottom: 2px;
      }
      & > p:first-child {
        font-size: 17px;
        line-height: 24px;
        color: #3D3D45;
        margin-bottom: 4px;
      }
      & > p:last-child {
        margin-bottom: 0px;
      }
    }
    .item-status {
      margin-right: 4px;
      text-align: center;
      &.wait {
        color: @blue;
      }
      &.timeover {
        color: @red;
      }
      &.done {
        color: @gray;
      }
    }
  }
  .item:last-child {
    border-bottom: 0px;
  }
}
</style>
