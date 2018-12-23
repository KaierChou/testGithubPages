<template>
  <div class="btn" style="text-align:center;">
    <Button
      :type="'cancel'"
      style="display:inline-block"
      v-if="infoBtn.show_cancel_btn === 1"
      @click="cancelAppoint(info.id)"
    >取消预约</Button>
    <Button
      class="payfor"
      style="display:inline-block"
      v-if="infoBtn.show_pay_btn === 1"
      @click="payfor()"
    >去支付</Button>
    <Button :size="'biggest'" v-if="infoBtn.show_again_btn === 1" @click="againAppoint()">重新预约</Button>
    <Button
      :type="'cancel'"
      :size="'biggest'"
      v-if="infoBtn.show_big_cancel_btn === 1"
      @click="cancelAppoint(info.id)"
    >取消预约</Button>
    <div
      class="tips"
      :v-if="infoBtn.show_bottom_text !== '' && infoBtn.show_bottom_text !== undefined"
    >{{infoBtn.show_bottom_text}}</div>
  </div>
</template>

<script>
import { Toast } from 'vant'
import { cancelOrder } from '@/assets/js/http/index'
import Button from '../common/button.vue'
export default {
  components: { Button },
  props: {
    info: Object
  },
  data() {
    return {
    }
  },
  computed: {
    infoBtn() {
      var infoBtn
      if (JSON.stringify(this.info) !== '{}') {
        infoBtn = this.info
      } else {
        infoBtn = {}
      }
      return infoBtn
    }
  },
  methods: {
    payfor() {

    },
    againAppoint() {
      this.$router.push({ path: 'custom-package?city_id=200' })
    },
    cancelAppoint(id) {
      cancelOrder(id).then(res => {
        if (res !== null) {
          if (res.code === 0) {
            Toast.success(res.msg)
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
.btn {
  margin: 16px 16px 0 16px;
  text-align: center;
  .payfor {
    margin-left: 22px;
  }
  .tips {
    padding: 6px 13px;
    font-size: 12px;
    line-height: 20px;
    color: @gray;
    text-align: center;
  }
}
</style>
