<template>
  <div id="appointSuccess" v-show="!isLoading">
    <div class="page_top">
      <SwitchRole
        :showName="true"
        :username="nickname"
        @choose="chooseCity"
        @link="linkPersonCenter"
      />
    </div>
    <div class="page_ctn">
      <AppointTips :info="userInfo.staff_order"/>
      <AppointOutline :info="userInfo.staff_order"/>
      <PageBottom :info="userInfo.staff_order"/>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant'
import { examIndex } from '@/assets/js/http/index'
import SwitchRole from '@/components/common/switch-role.vue'
import AppointTips from '@/components/appoint-result/appoint-tips.vue'
import AppointOutline from '@/components/appoint-result/appoint-outline.vue'
import PageBottom from '@/components/appoint-result/page-bottom.vue'
export default {
  components: { SwitchRole, AppointTips, AppointOutline, PageBottom },
  name: 'appointSuccess',
  data() {
    return {
      userInfo: { staff_order: {} },
      nickname: '',
      isLoading: true
    }
  },
  created() {
    this.$comLoading.isLoading(true)
  },
  mounted() {
    document.getElementById('appointSuccess').style.minHeight = window.innerHeight - 54 + 'px'
    examIndex().then(res => {
      if (res !== null) {
        if (res.code === 0) {
          this.userInfo = res.data
          this.nickname = this.userInfo.index.nickname
        } else {
          Toast.fail('请求异常')
        }
      } else {
        Toast.fail('请求出错')
      }
      this.isLoading = false
      this.$comLoading.isLoading(false)
    }, _ => {
      Toast.fail('系统异常')
      this.isLoading = false
      this.$comLoading.isLoading(false)
    })
  },
  methods: {
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
#appointSuccess {
  width: 100%;
  height: auto;
  background-color: @background-color;
  .page_top {
    width: 100%;
    height: auto;
    position: absolute;
    top: 0;
    left: 0;
  }
  .page_ctn {
    width: 100%;
    height: auto;
    padding-top: 54px;
  }
}
</style>
