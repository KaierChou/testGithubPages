<template>
  <div class="appoint_info">
    <div class="list">
      <div class="name" v-if="info.nickname !== undefined">
        <span>体检人</span>
      </div>
      <div class="desc" v-if="info.nickname !== undefined">{{info.nickname}}</div>
      <div class="name" v-if="info.package_name !== undefined">
        <span>方</span>
        <span class="right">案</span>
      </div>
      <div class="desc" v-if="info.package_name !== undefined">{{info.package_name}}</div>
      <div class="name" v-if="info.medical_time !== undefined">
        <span>时</span>
        <span class="right">间</span>
      </div>
      <div class="desc" v-if="info.medical_time !== undefined">{{info.medical_time}}</div>
      <div class="name" v-if="info.org_name !== undefined">
        <span>地</span>
        <span class="right">点</span>
      </div>
      <div class="desc" v-if="info.org_name !== undefined">{{info.org_name}}</div>
      <div class="name" v-if="info.address !== undefined">
        <span>地</span>
        <span class="right">址</span>
      </div>
      <div class="desc" v-if="info.address !== undefined">{{info.address}}</div>
      <div class="name" v-if="info.price !== undefined">
        <span>价</span>
        <span class="right">格</span>
      </div>
      <div class="desc red" v-if="info.price !== undefined">{{info.price}}</div>
    </div>
    <div class="link" @click="orderDetail(info.id)">查看订单详情></div>
  </div>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
    }
  },
  computed: {
    setInfo() {
      var setInfo
      if (JSON.stringify(this.info) !== '{}') {
        setInfo = this.info
      } else {
        setInfo = { staff_order: {} }
      }
      return setInfo
    },
    appointTime() {
      var appointTime; console.log(this.info, 'info')
      if (this.info.staff_order.medical_time !== undefined && this.info.staff_order.medical_time !== '') {
        var order = this.info.staff_order
        var date = order.medical_time
        var start = order.medical_time_start !== null ? order.medical_time_start : ''
        var end = order.medical_time_end !== null ? order.medical_time_end : ''
        appointTime = date + start + end
      } else {
        appointTime = ''
      }
      return appointTime
    }
  },
  methods: {
    orderDetail(arg) {
      // console.log(arg)
      this.$router.push({ path: `order-detail?order_id=${arg}` })
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../assets/css/var";
.appoint_info {
  padding: 0 13px;
  background-color: #fff;
  .list {
    width: 100%;
    height: auto;
    font-size: 12px;
    line-height: 20px;
    padding-top: 16px;
    display: flex;
    flex-wrap: wrap;
    border-top: @gray 0.5px dashed;
    .name {
      width: 107px;
      height: auto;
      color: @gray;
      text-align: right;
      margin-right: 15px;
      flex: 0 0 107px;
      span {
        display: inline-block;
      }
      .right {
        margin-left: 12px;
      }
    }
    .desc {
      width: 225px;
      height: auto;
      color: @text-color;
      flex: 0 0 225px;
    }
    .red {
      color: #ef4747;
    }
  }
  .link {
    width: 100%;
    height: auto;
    font-size: 14px;
    line-height: 20px;
    color: @blue;
    text-align: center;
    margin-top: 16px;
    padding-bottom: 16px;
  }
}
</style>
