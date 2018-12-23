<template>
  <div id="selectBoss">
    <div class="page_ctn">
      <div class="ti">选择代预约的老板</div>
      <div class="list">
        <BossTab
          :info="item"
          :index="index"
          v-for="(item,index) in info"
          :key="index"
          @check="getIndex"
        />
      </div>
    </div>
    <div class="btn">
      <Button :size="'biggest'" @click="startAppoint()">确定并开始预约</Button>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant'
import { bossList, changeIdentity } from '@/assets/js/http/index'
import BossTab from '@/components/person-center/list-boss.vue'
import Button from '@/components/common/button.vue'
export default {
  components: { BossTab, Button },
  name: 'TakeAppoint',
  data() {
    return {
      info: {},
      identity: ''
    }
  },
  mounted: function() {
    document.addEventListener('touchstart', function() {}, false)
    bossList().then(res => {
      if (res !== null) {
        if (res.code === 0) {
          console.log(res)
          this.info = res.data
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
  methods: {
    startAppoint() {
      if (this.identity === '') {
        return false
      }
      var index = this.identity
      var id = this.info[index].rtx
      changeIdentity(id).then(res => {
        if (res !== null) {
          if (res.code === 0) {
            console.log(res)
            this.$router.push({ path: '/PersonCenter' })
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
    getIndex(arg) {
      this.identity = arg
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../assets/css/var";
#selectBoss {
  width: 100%;
  height: auto;
  min-height: 100vh;
  background-color: @background-color;
  .page_ctn {
    padding: 0 16px 18px 16px;
    background-color: @white;
    .ti {
      padding: 20px 16px;
      font-size: 22px;
      line-height: 30px;
      color: @text-color;
    }
  }
  .btn {
    padding: 0 16px;
    margin-top: 16px;
  }
}
</style>
