<template>
    <section class="page">
        <h3><span>预约信息</span></h3>
        <ul class="item-form disable">
            <li>
                <span>体检机构</span>
                <em>{{ data.org_name }}</em>
            </li>
            <li>
                <span>体检日期</span>
                <em>{{ data.medical_time }}</em>
            </li>
            <li v-if="data.address">
                <span>机构地址</span>
                <em>{{ data.address }}</em>
            </li>
        </ul>
    </section>
</template>

<style lang="less" scoped>
  @import '../../assets/css/var';
  .page{
    background-color: #fff;
    h3{
      font-size: 14px;
      color: #32CBE4;
      letter-spacing: 0;
      height: 34px;
      background-color: #E6FBFE;
      line-height: 34px;
      padding: 0 16px;
    }
    .item-form{
      font-size: 14px;
      color: #3D3D45;
      line-height: 30px;
      padding: 10px 16px;
      li{
        display: flex;
        justify-content: space-between;
      }
    }
    .disable{
        span{
            color: #9B9B9B;
        }
    }
  }
</style>

<script>
export default {
  name: 'reservationInfo',
  data() {
    return {
    }
  },

  props: {
    disabled: {
      default: 0
    },
    data: {
      default: {}
    }
  },

  methods: {

  }
}
</script>
