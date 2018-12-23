<template>
  <div class="item">
    <div class="left">
      <img :src="info.icon" class="icon">
    </div>
    <div class="right" @click="link(info.router)">
      <div class="desc">
        <span>{{info.title}}</span>
        <span class="sec" v-if="info.ext !== '' && info.ext !== undefined">{{info.ext}}</span>
      </div>
      <div class="arrow">
        <img src="../../assets/images/icon_arrow_grey_right.svg" class="icon">
      </div>
    </div>
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
  methods: {
    link(arg) {
      console.log(arg)
      this.$router.push({ path: arg })
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../assets/css/var";
.item {
  width: 100%;
  height: auto;
  display: flex;
  .left {
    width: 52px;
    height: auto;
    padding: 20px 0px 20px 16px;
    flex: 0 0 auto;
    .icon {
      width: 20px;
      height: auto;
      display: block;
    }
  }
  .right {
    padding: 20px 0;
    flex: 1 1 auto;
    display: flex;
    border-bottom: #d9dcde 0.5px solid;
    .desc {
      font-size: 14px;
      line-height: 20px;
      color: @text-color;
      flex: 1 1 auto;
      span {
        display: inline-block;
        vertical-align: middle;
      }
      .sec {
        padding: 0 6px;
        font-size: 10px;
        line-height: 16px;
        color: @red;
        text-align: center;
        margin-left: 8px;
        border: @red 1px solid;
      }
    }
    .arrow {
      width: 40px;
      height: auto;
      padding-left: 16px;
      flex: 0 0 auto;
      align-self: center;
      .icon {
        width: 8px;
        height: auto;
        display: block;
      }
    }
  }
}
.item:last-child .right {
  border: none;
}
.item:active {
  background-color: @background-color;
}
</style>
