<template>
  <div id="index" v-show="!isLoading">
    <div class="page_top">
      <SwitchRole
        :showName="true"
        :username="username"
        :usernameColor="username_color"
        @link="linkPersonCenter"
        @choose="chooseCity"
      />
    </div>
    <div class="page_ctn">
      <!--体检季首页 -->
      <ExamStart :info="indexInfo.index" :height="style_height_img" v-if="examStatus === 'start'"/>
      <!-- 体检结束 -->
      <ExamOver :info="indexInfo.end" v-if="examStatus === 'over'"/>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant'
import { examIndex } from '@/assets/js/http/index'
import SwitchRole from '@/components/common/switch-role.vue'
import ExamStart from '@/components/index/exam-start.vue'
import ExamOver from '@/components/index/exam-over.vue'
export default {
  components: { SwitchRole, ExamStart, ExamOver },
  name: 'Index',
  data() {
    return {
      isLoading: true,
      indexInfo: {},
      examStatus: '',
      username: '',
      username_color: '',
      style_height_img: ''
    }
  },
  mounted: function() {
    this.$nextTick(function() {
      var height = window.innerHeight
      this.style_height_img = height - 54 + 'px'
    })
    examIndex().then(res => {
      if (res !== null) {
        if (res.code === 0) {
          this.indexInfo = res.data
          this.username = res.data.index.nickname
          this.username_color = res.data.index.username_color
          if (res.data.status === 2) {
            this.$router.push({ path: 'appointResult' })
          } else {
            this.examStatus = res.data.status === '3' ? 'over' : 'start'
          }
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
  created() {
    this.isLoading = false
    this.$comLoading.isLoading(true)
  },
  methods: {
    chooseCity() {
      this.$route.push({
        path: '/city-list'
      })
    },
    linkPersonCenter() {
      this.$router.push({ path: '/PersonCenter' })
    }
  },
  beforeCreate() {
    // 联调用
    if (window.location.hash.indexOf('rtx') !== -1) {
      let user = {}
      user.rtx = window.location.hash.split('?')[1].split('=')[1]
      window.localStorage.setItem('rtx', user.rtx)
    }
  }
}
</script>

<style lang="less" scoped>
#index {
  font-size: 14px;
  line-height: 20px;
  .page_top {
    width: 100%;
    height: auto;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 9;
  }
  .page_ctn {
    width: 100%;
    height: auto;
    padding-top: 54px;
  }
}
</style>
