<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <ComButton @click="zero">默认按钮</ComButton>
    <ComButton @click="one" isblock>块按钮</ComButton>
    <ComButton :size="size" :type="'disagree'" @click="one">取消按钮</ComButton>
    <ComButton disable :size="'biggest'" @click="one">禁用按钮</ComButton>
    <br>
    <br>
    <br>
    <button @click="aaa">请求医院数据</button>
    <br>
    <button @click="bbb">请求用户数据</button>

    <br>
    <br>
    <br>
    <button @click="linkto('custom-package')">custom-package</button>
    <br>
    <router-link to="/custom-add-items">custom-add-items</router-link>
    <br>
    <router-link to="/custom-package-detail">custom-package-detail</router-link>
    <br>
    <router-link to="/medical-orders">medical-orders</router-link>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import ComButton from '@/components/common/button.vue'
export default {
  name: 'home',
  components: {
    HelloWorld,
    ComButton
  },
  data() {
    return {
      val: 'cancel',
      text: '取消按钮',
      size: 'large'
    }
  },
  methods: {
    linkto(path) {
      this.$router.push({ path: path, query: { city_id: 200 } })
    },
    zero() {
      this.val = 'cancel'
      this.size = 'large'
    },
    one() {
      this.text = '取消按钮啊'
      this.val = 'pink'
      this.size = 'biggest'
    },
    aaa() {
    },
    bbb() {
    }
  }
}
</script>
