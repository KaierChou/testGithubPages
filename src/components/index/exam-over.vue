<template>
  <div class="exam_over">
    <div class="tips">
      <img :src="info.img" class="pic">
      <div class="desc">{{info.text}}</div>
    </div>
    <div class="btn">
      <Button :size="'biggest'">查看报告解读</Button>
    </div>
  </div>
</template>

<script>
import Button from '../common/button.vue'
export default {
  components: { Button },
  props: {
    info: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {

    }
  }
}
</script>

<style lang="less" scoped>
@import "../../assets/css/var";
.exam_over {
  width: 100%;
  height: auto;
  .tips {
    width: 100%;
    height: auto;
    padding: 30px 0 40px 0;
    background-color: @white;
    .pic {
      width: 140px;
      height: auto;
      display: block;
      margin: 0 auto;
    }
    .desc {
      width: 100%;
      height: auto;
      color: @text-color;
      text-align: center;
      margin-top: 30px;
    }
  }
  .btn {
    padding: 0 16px;
    margin-top: 16px;
  }
}
</style>
