<template>
  <div>
    <van-picker
        class="van-picker-hide"
        :class="{ 'van-picker-show' : pickerShow }"
        :show-toolbar="toolbar"
        :title="title"
        :columns="columns"
        @change="onChange"
        @cancel="onCancel"
        @confirm="onConfirm"
        :loading="loading"
    />
    <div class="overload" :class="{ 'overload-show' : pickerShow }"></div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Picker } from 'vant'
Vue.use(Picker)
export default {
  data() {
    return {}
  },
  props: {
    toolbar: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: '请选择'
    },
    columns: {
      type: Array
    },
    loading: {
      type: Boolean,
      default: false
    },
    pickerShow: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onChange(picker, value, index) {
      this.$emit('onPickerChange', picker, value, index)
    },
    onCancel() {
      this.$emit('onPickerCancel')
    },
    onConfirm(value, index) {
      this.$emit('onPickerConfirm', value, index)
    }
  }
}
</script>

<style lang="less" scoped>
.van-picker-hide {
  visibility: hidden;
  transition: all 0.3s;
  position: fixed;
  transform: translate3d(0, 500px, 0);
  bottom: 0;
  width: 100%;
  left: 0;
  right: 0;
  z-index: 10;
}
.van-picker-show {
  visibility: visible;
  transform: translate3d(0, 0, 0);
}
.overload{
    position: fixed;
    z-index: 9;
    background-color: rgba(0, 0, 0, .6);
    width: 100%;
    height: 100%;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: none;
}
.overload-show{
    display: block;
}
</style>
