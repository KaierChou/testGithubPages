<template>
  <section class="page">
    <h3>
      <span>体检方案定制</span>
    </h3>
    <ul class="item-form">
      <li v-for="(item,index) in result" :key="index">
        <span>{{ item.package_name }}</span>
        <em>&yen; {{item.price}}</em>
      </li>
    </ul>
  </section>
</template>

<style lang="less" scoped>
@import "../../assets/css/var";
.page {
  background-color: #fff;
  h3 {
    font-size: 14px;
    color: #32cbe4;
    letter-spacing: 0;
    height: 34px;
    background-color: #e6fbfe;
    line-height: 34px;
    padding: 0 16px;
  }
  .item-form {
    font-size: 14px;
    color: #3d3d45;
    line-height: 30px;
    padding: 10px 16px;
    li {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>

<script>
export default {
  name: 'package',
  data() {
    return {}
  },

  props: {
    result: {
      default: []
    }
  },

  methods: {}
}
</script>
