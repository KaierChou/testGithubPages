<template>
  <div id="appointDetail" v-show="!isLoading">
    <AppointTips :info="info"/>
    <AppointOutline :info="info"/>
    <PageBottom :info="info"/>
  </div>
</template>

<script>
import { Toast } from 'vant'
import { appointDetail } from '@/assets/js/http/index'
import AppointTips from '@/components/appoint-result/appoint-tips.vue'
import AppointOutline from '@/components/appoint-result/appoint-outline.vue'
import PageBottom from '@/components/appoint-result/page-bottom.vue'
export default {
  components: { AppointTips, AppointOutline, PageBottom },
  name: 'appointSuccess',
  data() {
    return {
      info: {},
      isLoading: true
    }
  },

  mounted() {
    const order_id = this.$route.query.order_id
    this.load(order_id)
  },
  methods: {
    load(arg) {
      appointDetail(arg).then(res => {
        if (res !== null) {
          if (res.code === 0) {
            this.info = res.data
          } else {
            Toast.fail('请求异常')
          }
        } else {
          Toast.fail('请求出错')
        }
        this.isLoading = false
        this.$comLoading.isLoading(false)
      }, err => {
        Toast.fail(JSON.stringify(err))
        this.isLoading = false
        this.$comLoading.isLoading(false)
      })
    },
    chooseCity() {
      console.log('choosecity')
    },
    linkPersonCenter() {
      this.$router.push({ path: '/PersonCenter' })
    }
  }
}
</script>

<style lang="less" scoped>
@import "../assets/css/var";
#appointDetail {
  width: 100%;
  height: auto;
  min-height: 100vh;
  background-color: @background-color;
}
</style>
