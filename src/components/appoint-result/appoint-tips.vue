<template>
  <div class="appoint_tips">
    <img :src="info.img" class="pic">
    <div class="desc">
      <div class="up" v-if="info.status_text !== '' || info.status_text !== undefined">
        <span class="font">{{info.status_text}}</span>
      </div>
      <div
        class="dw"
        v-if="info.status_desc !== '' || info.status_desc == undefined"
        v-html="info.status_desc"
      ></div>
      <div class="dw" v-if="info.diff_time_pay !== undefined">{{timeDown}}s后订单会自动取消</div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant'
import { cancelOrder } from '@/assets/js/http/index'
export default {
  props: {
    info: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      timeDown: ''
    }
  },
  mounted() {
    if (this.infoTips.diff_time !== undefined) {
      this.timeDown = Number(this.infoTips.diff_time_pay)
      this.countDown()
    }
  },
  computed: {
    infoTips() {
      var infoTips
      if (JSON.stringify(this.info) !== '{}') {
        infoTips = this.info.staff_order
      } else {
        infoTips = { img: '' }
      }
      return infoTips
    }
  },
  methods: {
    countDown() {
      var vm = this
      var t = setTimeout(function() { vm.countDown() }, 1000)
      if (this.timeDown <= 0) {
        clearTimeout(t)
        this.cancelAppoint(vm.info.id)
      } else {
        vm.timeDown -= 1
      }
    },
    cancelAppoint(id) {
      cancelOrder(id).then(res => {
        if (res !== null) {
          if (res.code === 0) {
            this.$router.push({ path: '/' })
          } else {
            Toast.fail(res.msg)
          }
        } else {
          Toast.fail('请求出错')
        }
      }, err => {
        Toast.fail(JSON.stringify(err))
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../assets/css/var";
.appoint_tips {
  padding: 30px 13px 15px 13px;
  background-color: #fff;
  .pic {
    width: 140px;
    height: auto;
    display: block;
    margin: 0 auto;
  }
  .desc {
    width: 100%;
    height: auto;
    font-size: 14px;
    line-height: 20px;
    color: @text-color;
    text-align: center;
    margin-top: 10px;
    .dw {
      margin-top: 4px;
    }
    .font {
      font-size: 22px;
      line-height: 30px;
    }
    .color {
      color: #ef4747;
    }
  }
}
</style>
