<template>
  <div id="PersonCenter">
    <div class="page_top">
      <PersonOutline :type="'others'" :info="personInfo" @change="switchIdentity()"/>
    </div>
    <div class="page_ctn">
      <div class="list">
        <ListItem :info="item" v-for="(item,index) in personInfo.list" :key="index"/>
      </div>
    </div>
    <transition name="bosslist">
      <div class="selectboss" v-show="show">
        <van-picker
          :show-toolbar="true"
          :cancel-button-text="'请选择你要切换的身份'"
          :columns="bosslist"
          :visible-item-count="count"
          @confirm="onConfirm"
        />
      </div>
    </transition>
    <transition name="shade">
      <div class="shade" v-show="show" @click="show=false"></div>
    </transition>
  </div>
</template>

<script>
import { Toast, Picker } from 'vant'
import { personCenter, bossList, changeIdentity } from '@/assets/js/http/index'
import PersonOutline from '@/components/person-center/person-outline.vue'
import ListItem from '@/components/person-center/list-item.vue'
import Vue from 'vue'
Vue.use(Picker)
export default {
  components: { PersonOutline, ListItem },
  name: 'PersonCenter',
  data() {
    return {
      personInfo: {},
      bosslist: [],
      count: 5,
      show: false
    }
  },
  mounted: function() {
    document.addEventListener('touchstart', function() {}, false)
    this.ajaxStart()
    this.bossChoose()
    this.$nextTick(function() {
      let allCookies = document.cookie
      console.log(allCookies, 'cookies')
    })
  },
  methods: {
    onConfirm(value, index) {
      var rtx = value.split('(')[0]
      this.show = false
      this.switchRole(rtx)
    },
    switchIdentity() {
      if (this.bosslist.length !== 1) {
        if (this.show) {
          this.show = false
        } else {
          this.show = true
        }
      } else {
        var rtx = this.bosslist[0].split('(')[0]
        this.switchRole(rtx)
      }
    },
    ajaxStart() {
      personCenter().then(res => {
        if (res !== null) {
          if (res.code === 0) {
            console.log(res, 'start')
            this.personInfo = res.data
          } else {
            Toast.fail('请求异常')
          }
        } else {
          Toast.fail('请求出错')
        }
      }, err => {
        console.log(err)
        Toast.fail('系统异常')
      })
    },
    bossChoose() {
      bossList().then(res => {
        if (res !== null) {
          if (res.code === 0) {
            var array = []
            res.data.forEach(function(item) {
              array.push(item.rtx + '(' + item.username + ')')
            })
            this.bosslist = array
            this.count = array.length > 3 ? 5 : 3
          } else {
            Toast.fail('请求异常')
          }
        } else {
          Toast.fail('请求出错')
        }
      }, err => {
        console.log(err)
        Toast.fail('系统异常')
      })
    },
    switchRole(arg) {
      changeIdentity(arg).then(res => {
        if (res !== null) {
          if (res.code === 0) {
            this.$router.push({ path: '/' })
          } else {
            Toast.fail('请求异常')
          }
        } else {
          Toast.fail('请求出错')
        }
      }, err => {
        console.log(err)
        Toast.fail('系统异常')
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../assets/css/var";
#PersonCenter {
  width: 100%;
  height: auto;
  min-height: 100vh;
  background-color: @background-color;
  -webkit-tap-highlight-color: rgba(
    0,
    0,
    0,
    0
  ); //清掉safari默认点击按钮的灰色的外框
  .page_top {
    background-color: @white;
  }
  .page_ctn {
    margin-top: 8px;
    background-color: @white;
    .list {
      width: 100%;
      height: auto;
      .item {
        width: 100%;
        height: auto;
        display: flex;
        .left {
          width: 20px;
          height: auto;
          padding: 20px 16px;
          flex: 0 0 auto;
          .icon {
            width: 20px;
            height: auto;
            display: block;
          }
        }
        .right {
          padding: 20px 0;
          flex: 1 1 auto;
          display: flex;
          border-bottom: #d9dcde 0.5px solid;
          .desc {
            font-size: 14px;
            line-height: 20px;
            color: @text-color;
            flex: 1 1 auto;
            span {
              display: inline-block;
              vertical-align: middle;
            }
            .sec {
              width: 54px;
              height: 16px;
              font-size: 10px;
              line-height: 16px;
              color: @red;
              text-align: center;
              margin-left: 8px;
              border: @red 1px solid;
            }
          }
          .arrow {
            width: 8px;
            height: auto;
            padding: 0 16px;
            flex: 0 0 auto;
            align-self: center;
            .icon {
              width: 8px;
              height: auto;
              display: block;
            }
          }
        }
      }
      .item:last-child .right {
        border: none;
      }
      .item:active {
        background-color: @background-color;
      }
    }
  }
  .bosslist-enter-active,
  .shade-enter-active {
    transition: all 0.3s ease;
  }
  .bosslist-leave-active,
  .shade-leave-active {
    transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
  }
  .bosslist-enter,
    .bosslist-leave-to
      /* .slide-fade-leave-active for below version 2.1.8 */
 {
    transform: translateY(250px);
    opacity: 0;
  }
  .shade-enter,
    .shade-leave-to
      /* .slide-fade-leave-active for below version 2.1.8 */
 {
    opacity: 0;
  }
  .selectboss {
    width: 100%;
    height: auto;
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 999;
    /deep/ .van-picker {
      .van-picker__toolbar {
        align-items: center;
        .van-picker__cancel {
          font-size: 16px;
          line-height: 24px;
          color: @text-color;
        }
        .van-picker__cancel:active {
          background-color: #fff;
        }
        .van-picker__confirm {
          color: @blue;
        }
      }
      .van-picker-column {
        ul {
          font-size: 14px;
          .van-picker-column__item--selected {
            font-size: 16px;
          }
        }
      }
    }
  }
  .shade {
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.6);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
  }
}
</style>
