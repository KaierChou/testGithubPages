<template>
  <div
    @click="handleChange"
    class="round" :class="select ? 'delete' : 'add'"
  ></div>
</template>
<script>
export default {
  name: 'add-or-del',
  props: {
    id: {
      type: [String, Number, Boolean, Object, Array],
      default: ''
    },
    select: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleChange() {
      this.$emit('change', this.id)
    }
  }
}
</script>
<style lang="less">
@import "../../assets/css/var";
.round {
  position: relative;
  overflow: hidden;
  width: 18px;
  height: 18px;
  border-radius: 100%;
}
.add {
  background: @blue;
  &::after {
    content: "";
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    width: 10px;
    height: 2px;
    border-radius: 1px;
  }
  &::before {
    content: "";
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    width: 2px;
    height: 10px;
    border-radius: 1px;
  }
}
.delete {
  background-color: @red;
  &::after {
    content: "";
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    width: 10px;
    height: 2px;
    border-radius: 1px;
  }
}
</style>
