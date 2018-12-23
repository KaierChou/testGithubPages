<template>
  <!--大loading，通常用于页面加载-->
  <transition name="fade">
    <div class="loading-v1" v-show="loading">
      <div class="miniLoading">
        <img src="../../assets/images/loading.gif" class="loading-img" alt="">
      </div>
      <transition name="toast">
      </transition>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'loading',
  data() {
    return {
      loading: false
    }
  },
  methods: {
    isLoading(bool) {
      this.loading = bool
    }
  }
}
</script>

<style lang="less" scoped>
  @image: "../../assets/images/";
  .fade-enter-active,
  .fade-leave-active { transition: opacity .2s; }
  .fade-enter,
  .fade-leave-to { opacity: 0; }

  .loading-v1 {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 9999;
  }

  .miniLoading {
    width: 1rem;
    height: 1rem;
    text-align: center;
    // background-color: #f8f8f8;
    position: fixed;
    top: 40%;
    left: 50%;
    margin: 0;
    margin-left: -0.5rem;
    border-radius: 0.1rem;
    z-index: 40;
    // box-shadow: 0 0 60/2px rgba(0, 0, 0, .075);
    h1 {
      font-size: 28/2px;
      line-height: 28/2px;
      color: #999;
      text-align: center;
      font-weight: normal;
    }
    .loading-img{
      width: 70px;
    }
  }
</style>
