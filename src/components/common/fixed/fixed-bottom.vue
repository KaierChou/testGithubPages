<template>
  <div class="page">
    <div class="price">
      <span>合计：</span>
      <em>&yen; {{price}}</em>
    </div>
    <Buttom :disable="disable" @click="submit">
      <span>提交订单</span>
    </Buttom>
  </div>
</template>

<style lang="less" scoped>
@import "../../../assets/css/var";
.page {
  position: fixed;
  background: #ffffff;
  box-shadow: 0 -3px 25px 0 rgba(100, 160, 171, 0.2);
  width: 100%;
  bottom: 0;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px 0 16px;
  .price {
    font-size: 17px;
    span {
      color: @black;
    }
    em {
      color: @red;
    }
  }
}
</style>

<script>
import Buttom from '@/components/common/fixed/button'
export default {
  components: {
    Buttom
  },
  data() {
    return {
    }
  },
  props: {
    price: {
      default: 0
    },
    disable: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    submit(disable) {
      this.$emit('click', disable)
    }
  }
}
</script>
