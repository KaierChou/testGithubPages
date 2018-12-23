<template>
  <div class="com-chekckbox" @click.stop="handleClick()">
    <div :class="[
      square ? 'checkbox_square' : 'checkbox',
      checked ? (square ? 'checked_square' : 'checked') : 'check'
    ]"></div>
  </div>
</template>
<script>
export default {
  name: 'com-checkbox',
  props: {
    square: Boolean,
    index: null,
    value: null,
    isDisabled: Boolean,
    checked: Boolean
  },
  methods: {
    handleClick() {
      this.$emit('click', this.value, this.index)
    }
  }
}
</script>
<style lang="less" scoped>
@import "../../../assets/css/var.less";
.com-chekckbox {
  .checkbox {
    box-sizing: border-box;
    width: 14px;
    height: 14px;
    border-radius: 2px;
  }
  .checkbox_square {
    box-sizing: border-box;
    width: 18px;
    height: 18px;
    border-radius: 100%;
  }
  .check {
    border: 1PX solid #9b9b9b;
  }
  .checked {
    background-color: @blue;
    background: url("../../../assets/images/checkbox_ic_choose.svg") no-repeat
      center;
    background-size: 18px 18px;
  }
  .checked_square {
    background-color: @blue;
    background: url("../../../assets/images/checkbox_ic_choose.svg") no-repeat center;
    background-size: 18px 18px;
  }
}
</style>
