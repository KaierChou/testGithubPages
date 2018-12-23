<template>
  <div class="item" :class="{active:index === checked}" @click="checkBoss(index)">
    <div class="name">{{info.rtx}}({{info.username}})</div>
    <div class="check">
      <span class="circle">
        <img src="../../assets/images/icon_choose_blue.svg" class="icon" v-if="index === checked">
      </span>
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
    index: Number
  },
  data() {
    return {
      checked: ''
    }
  },
  methods: {
    checkBoss(arg) {
      if (this.checked === arg) {
        this.checked = ''
      } else {
        this.checked = arg
      }
      this.$emit('check', this.checked)
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../assets/css/var";
.item {
  width: 100%;
  height: auto;
  padding: 20px 0;
  margin-bottom: 12px;
  border-radius: 8px;
  background: #ffffff;
  box-shadow: 0 4px 25px 0 rgba(159, 186, 192, 0.28);
  display: flex;
  justify-content: space-between;
  align-items: center;
  .name {
    font-size: 16px;
    line-height: 24px;
    color: @text-color;
    padding-left: 14px;
  }
  .check {
    width: 35px;
    height: auto;
    flex: 0 0 35px;
    .circle {
      width: 17px;
      height: 17px;
      display: block;
      border: @gray 1px solid;
      border-radius: 10px;
      .icon {
        width: 100%;
        height: auto;
        display: block;
      }
    }
  }
}
.active {
  padding: 19px 0;
  background: #e5fafd;
  border: 1px solid @blue;
  box-shadow: 0 4px 25px 0 rgba(159, 186, 192, 0.28);
  .name {
    color: @blue;
  }
  .check {
    width: 18px;
    height: 18px;
    .circle {
      border: none;
    }
  }
}
</style>
