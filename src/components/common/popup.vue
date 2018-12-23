// 父组件 <ComPopup :showPopup.sync='flag'> </ComPopup>  注意父组件传值要加个 .sync
<template>
  <div>
    <div class="com-popup" v-show="showPopup">
      <div class="com-popup-content" :class="[showPopup ? 'slideInUp' : '']">
        <slot></slot>
      </div>
    </div>
    <transition name="fade" mode="out-in">
      <div class="overlay" @click.stop="close" v-show="showPopup"></div>
    </transition>
  </div>
</template>
<script>
export default {
  props: {
    showPopup: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    close() {
      this.$emit('update:showPopup', false)
    }
  },
  watch: {
    showPopup: function() {
      if (this.showPopup) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = 'auto'
      }
    }
  }
}
</script>
<style lang="less" scoped>
.com-popup {
  position: fixed;
  top: auto;
  right: auto;
  bottom: 60px;
  width: 100%;
  z-index: 900;
  .slideInUp {
    animation-name: slideInUp;
    animation-duration: 0.4s;
    animation-fill-mode: both;
  }
  @keyframes slideInUp {
    0% {
      transform: translate3d(0, 100%, 0);
    }
    to {
      transform: translateZ(0);
    }
  }
}
.overlay {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.62);
}
</style>
