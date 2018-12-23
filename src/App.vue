<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<style lang="less">
@import "./assets/css/var";
#app {
  font-family: @PingFangSC-Regular;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: @text-color;
  height: 100%;
}

.mb20 {
  margin-bottom: 20px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
// vant
.van-dialog__confirm, .van-dialog__confirm:active {
  color: @blue !important;
}
</style>
