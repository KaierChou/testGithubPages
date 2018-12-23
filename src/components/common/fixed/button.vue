<template>
  <div
    class="com-button"
    :class="[
    type ? type : '',
    size ? size : '',
    {
      'disable': disable,
      'isblock': isblock,
    }]"
    @click="onClick"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'com-button',
  props: {
    size: String,
    type: String,
    isblock: Boolean,
    disable: Boolean
  },
  methods: {
    onClick(event) {
      this.$emit('click', !this.disable)
    }
  }
}
</script>

<style scoped lang='less'>
@import "../../../assets/css/var";
.com-button {
  display: inline-block;
  width: 160px;
  height: 44px;
  line-height: 44px;
  border-radius: 22px;
  font-size: 18px;
  color: @white;
  letter-spacing: 0;
  text-align: center;
  background-color: @blue;
  &.isblock {
    display: block;
  }
  // size
  &.biggest {
    width: 100%;
  }
  &.large {
    width: 189px;
  }
  // type
  &.cancel {
    background-color: @white;
    color: @red;
  }
  &.disagree {
    background-color: @white;
    color: rgba(50, 203, 228, 0.18);
  }
  &.disable {
    background-color: @btn-disable;
  }
  &.unclick {
    background-color: @white;
    color: rgba(50, 203, 228, 0.18);
  }
}
</style>
