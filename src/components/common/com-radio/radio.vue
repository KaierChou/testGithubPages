<template>
  <div class="com-radio" @click.stop="$emit('click')">
    <span class="com-radio__input">
      <input
        type="radio"
        class="com-radio__control"
        :disabled="isDisabled"
        :value="name"
        v-model="currentValue"
      >
      <i class="radio-icon" :class="checked ? (type === 'white' ? 'checked-white' : 'checked') : 'check'"></i>
    </span>
    <!-- <span class="slotdefault" @click="onClickLabel">
      <slot></slot>
    </span> -->
  </div>
</template>
<script>
import findParent from '../mixins/find-parent'
export default {
  name: 'com-radio',
  props: {
    type: null,
    name: null,
    value: null,
    isDisabled: Boolean
  },
  mixins: [ findParent ],
  computed: {
    currentValue: {
      get() {
        return this.parent ? this.parent.value : this.value
      },
      set(val) {
        (this.parent || this).$emit('input', val)
      }
    },
    checked() {
      return this.currentValue === this.name ? this.name : ''
    }
  },
  methods: {
    onClickLabel() {
      if (!this.isDisabled) {
        this.currentValue = this.name
      }
    }
  },
  created() {
    this.findParent('com-radio-group')
  }
}
</script>

<style scoped lang='less'>
@import "../../../assets/css/var";
.com-radio {
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  margin-top: 6px;
  margin-bottom: 10px;
  .com-radio__input {
    display: inline-block;
    box-sizing: border-box;
    height: 18px;
    width: 18px;
    position: relative;
    font-size: 20px;
    .com-radio__control {
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;
      margin: 0;
      width: 100%;
      height: 100%;
    }
    .radio-icon {
      display: inline-block;
      box-sizing: border-box;
      width: 18px;
      height: 18px;
      border-radius: 100%;
      pointer-events: none;
    }
    .check {
      border-radius: 100%;
      border: 1PX solid#9B9B9B;
    }
    .checked {
      background: url("../../../assets/images/ic_choose_blue.svg") no-repeat center;
      background-size: 20px 20px;
    }
    .checked-white {
      background: url("../../../assets/images/ic_choose_white.svg") no-repeat
        center;
      background-size: 20px 20px;
    }
  }
  .slotdefault {
    margin-left: 5px;
    font-size: 14px;
  }
}
</style>
