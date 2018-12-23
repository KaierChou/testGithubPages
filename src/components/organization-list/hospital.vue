<template>
  <div class="hospital">
    <div class="logo">
      <img :src="info.pic_url" class="pic">
    </div>
    <div class="main">
      <div class="name">{{info.name}}</div>
      <div class="prop">
        <span class="item" v-for="(item,index) in supportTab" :key="item+index">{{item}}</span>
        <span class="item red" v-for="(item,index) in unsupportTab" :key="item+index">{{item}}</span>
      </div>
      <div class="addr">{{info.address}}</div>
      <div class="price">￥{{info.total_price}}</div>
    </div>
    <div class="select" v-if="type === 'support'">
      <span class="btn" @click="selectTime(info)" v-if="info.is_appoint === true">选时间</span>
      <span class="btn full" v-else>约满</span>
    </div>
    <div class="select" v-else>
      <span class="btn unsp" @click="revisePackage(info)">修改检查</span>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  props: {
    type: String,
    info: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
    }
  },
  computed: {
    supportTab() {
      var list = []; var array = []
      list = this.info.hospital_tag
      list.forEach(item => {
        if (item !== '') {
          array.push(item)
        }
      })
      return array
    },
    unsupportTab() {
      var list = []; var array = []
      list = this.info.no_item_tag
      list.forEach(item => {
        if (item !== '') {
          array.push(item)
        }
      })
      return array
    }
  },
  methods: {
    ...mapMutations(['SET_ISREMODIFYPACKAGES']),
    selectTime(arg) {
      this.$emit('chooseTips', arg)
    },
    revisePackage(arg) {
      this.SET_ISREMODIFYPACKAGES(true)
      this.$router.back()
    }
  }
}
</script>

<style lang='less' scoped>
@import "../../assets/css/var";
.hospital {
  width: 100%;
  height: auto;
  padding-bottom: 28px;
  display: flex;
  .logo {
    width: 76px;
    height: auto;
    text-align: left;
    flex: 0 0 76px;
    .pic {
      width: 60px;
      height: 60px;
      object-fit: cover;
    }
  }
  .main {
    flex-grow: 1;
    .name {
      width: 100%;
      height: auto;
      font-size: 18px;
      line-height: 24px;
      color: @text-color;
    }
    .prop {
      width: 100%;
      max-height: 20px;
      color: @gray;
      text-align: center;
      margin: 3px 0 5px 0;
      overflow: hidden;
      display: flex;
      flex-wrap: wrap;
      .item {
        font-size: 10px;
        line-height: 18px;
        padding: 0 5px;
        -webkit-text-size-adjust: none;
        margin: 0 2px 4px 0;
        border: rgba(155, 155, 155, 0.38) 1px solid;
      }
      .red {
        color: @red;
        border: rgba(255, 69, 69, 0.38) 1px solid;
      }
    }
    .addr {
      width: 100%;
      height: auto;
      font-size: 10px;
      line-height: 14px;
      color: @gray;
    }
    .price {
      width: 100%;
      height: auto;
      font-size: 18px;
      line-height: 22px;
      color: @red;
      margin-top: 7px;
    }
  }
  .select {
    width: 80px;
    height: auto;
    align-self: center;
    flex: 0 0 80px;
    display: flex;
    justify-content: flex-end;
    .btn {
      width: 52px;
      height: auto;
      font-size: 12px;
      line-height: 16px;
      color: #32cbe4;
      text-align: center;
      letter-spacing: 0;
      padding: 3px 0;
      border: #32cbe4 1px solid;
      border-radius: 12px;
      display: inline-block;
    }
    .full {
      color: @gray;
      border: none;
    }
    .unsp {
      width: 64px;
      height: auto;
      color: @text-color;
      border: @gray 1px solid;
    }
  }
}
</style>
