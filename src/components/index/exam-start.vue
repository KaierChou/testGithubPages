<template>
  <div class="exam_start">
    <div class="back_img" :style="{height:height}">
      <img :src="info.img" class="pic">
    </div>

    <div class="bottom">
      <div class="agreement">
        <span class="check" :style="{borderColor:info.text_color}" @click="agreementCheck()">
          <img :src="info.checkbox_src" class="icon" v-show="agreementOn === true">
        </span>
        <span class="desc" :style="{color:info.text_color}" @click="agreementCheck()">我已阅读并同意</span>
        <span class="file" :style="{color:info.text_href_color}" @click="agreementLink()">《体检授权协议》</span>
      </div>
      <div
        class="btn"
        :class="{tap:agreementOn === true}"
        :style="{backgroundColor:agreementOn === true ? info.btn_click_color : info.btn_color,color:agreementOn === true ? info.btn_text_click_color : info.btn_text_color}"
        @click="agreementOn === true && appointStart()"
      >开始预约</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
      default: () => {}
    },
    height: String
  },
  data() {
    return {
      agreementOn: false
    }
  },
  methods: {
    agreementCheck() {
      if (this.agreementOn === true) {
        this.agreementOn = false
      } else {
        this.agreementOn = true
      }
    },
    agreementLink() {
      this.$router.push({ path: '/LicenseAgreement' })
    },
    appointStart() {
      this.$router.push({ path: 'custom-package?city_id=200' })
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../assets/css/var";
.exam_start {
  width: 100%;
  height: auto;
  .back_img {
    width: 100%;
    height: auto;
    .pic {
      width: 100%;
      height: 100%;
      display: block;
      object-fit: cover;
    }
  }
  .bottom {
    width: 100%;
    height: auto;
    position: absolute;
    bottom: 0;
    left: 0;
    padding-bottom: 18px;
    .agreement {
      width: 100%;
      height: auto;
      text-align: center;
      margin-bottom: 25px;
      display: flex;
      justify-content: center;
      align-items: center;
      span {
        display: block;
        line-height: 18px;
      }
      .check {
        width: 12px;
        height: 12px;
        border: rgba(250, 250, 250, 0.2) 1px solid;
        border-radius: 2px;
        margin-right: 10px;
        position: relative;
        .icon {
          width: 14px;
          height: auto;
          position: absolute;
          top: -1px;
          left: -1px;
        }
      }
      .check_on {
        background-color: @white;
      }
      .desc {
        color: @white;
      }
      .file {
        color: #3c8afa;
      }
    }
    .btn {
      width: 188px;
      height: auto;
      font-size: 18px;
      line-height: 24px;
      color: rgba(50, 203, 228, 0.18);
      text-align: center;
      padding: 10px 0;
      background-color: #fff;
      border-radius: 35px;
      display: block;
      margin: 25px auto 0 auto;
    }
    .tap:active {
      opacity: 0.7;
    }
  }
}
</style>
