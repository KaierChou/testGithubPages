<template>
  <div>
    <van-datetime-picker
        class="van-picker-hide"
        :class="{ 'van-picker-show' : pickerShow }"
        v-model="currentDate"
        type="date"
        :min-date="minDate"
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
import { DatetimePicker } from 'vant'
Vue.use(DatetimePicker)
export default {
  data() {
    return {
      currentDate: new Date('1990-01-01'),
      minDate: new Date('1910-01-01')
    }
  },
  props: {
    type: {
      default: 'date'
    },
    pickerShow: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onChange(picker, value, index) {
      this.$emit('onDatetimePickerChange')
    },
    onCancel() {
      this.$emit('onDatetimePickerCancel')
    },
    onConfirm(value, index) {
      this.$emit('onDatetimePickerConfirm', value)
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
