<template>
  <section class="page">
    <h3>
      <span>订单信息</span>
    </h3>
    <ul class="item-form">
      <li ref="phone">
        <span :class="{'grey' : disabled === 1}">联系方式</span>
        <div>
          <input
            :class="{'red' : error.phone === false}"
            type="tel"
            maxlength="11"
            placeholder="请输入手机号码"
            v-model="data.phone"
            @focus="hideError('phone')"
            @blur="checkoutInfo('phone')"
            :disabled="disabled === 1"
          >
          <i class="clear"></i>
        </div>
      </li>
      <li ref="report">
        <span :class="{'grey' : disabled === 1}">领取方式</span>
        <div class="select" @click="selectReport">
          <span
            :class="{ 'gray' : !data.report.text, 'red' : error.report === false}"
          >{{ data.report.text ? data.report.text : '请选择报告领取方式'}}</span>
          <i class="arrow" v-if="disabled !== 1"></i>
        </div>
      </li>
      <li v-if="data.report && data.report.value == 2" ref="reportAddr">
        <span :class="{'grey' : disabled === 1}">邮寄地址</span>
        <div class="select" @click="selectReportAddr">
          <span
            :class="{ 'gray' : !data.reportAddr.text, 'red' : error.reportAddr === false}"
          >{{ data.reportAddr.text ? data.reportAddr.text : '请选择邮寄地址'}}</span>
          <i class="arrow" v-if="disabled !== 1"></i>
        </div>
      </li>
    </ul>
  </section>
</template>

<style lang="less" scoped>
@import "../../assets/css/var";
@imageUrl: "../../assets/images/apply/";
.page {
  background-color: #fff;
  .grey {
    color: @gray;
  }
  .red {
    color: @red;
  }
  h3 {
    font-size: 14px;
    color: #32cbe4;
    letter-spacing: 0;
    height: 34px;
    background-color: #e6fbfe;
    line-height: 34px;
    padding: 0 16px;
  }
  .item-form {
    font-size: 14px;
    color: #3d3d45;
    padding: 10px 16px;
    li {
      display: flex;
      justify-content: space-between;
      height: 30px;
      align-items: center;
      input {
        border: none;
        background-color: transparent;
        text-align: right;
      }
      .select {
        display: flex;
        align-items: center;
        .arrow {
          background-image: url("@{imageUrl}btn_arrow_next.svg");
          background-size: cover;
          width: 8px;
          height: 14px;
          margin-left: 10px;
        }
      }
    }
  }
}
</style>

<script>
export default {
  name: 'orderInfo',
  data() {
    return {}
  },
  props: {
    data: {
      default: function() {
        return {
          report: {}
        }
      }
    },
    error: {
      default: function() {
        return {}
      }
    },
    disabled: {
      default: 0
    }
  },
  methods: {
    selectReport() {
      this.$emit('selectReport')
    },
    selectReportAddr() {
      this.$emit('selectReportAddr')
    },
    checkoutInfo(type) {
      this.$emit('checkoutInfo', type)
      //   this.$emit('checkoutInfo')
    },
    showError(type) {
      if (this.$refs[type]) {
        this.$nextTick(() => {
          let top = Math.floor(this.$refs[type].getBoundingClientRect().y)
          let doc
          if (document.body) {
            doc = document.body
          }
          if (document.documentElement) {
            doc = document.documentElement
          }
          doc.scrollTop = top
        })
      }
    },
    hideError(type) {}
  }
}
</script>
