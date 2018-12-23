<template>
  <div class="other">
    <!-- 头部 -->
    <header class="other-title mb20">
      <span></span>
      <h3>{{resData.pay_package.title}}</h3>
      <p>{{resData.pay_package.desc}}</p>
    </header>
    <!-- 加项list -->
    <section class="other-item-list">
      <div
        class="other-item"
        v-for="(item, index) in resData.pay_package.list"
        :key="index"
      >
        <img v-lazy="item.img_small" @click.stop="handleClick(item)">
        <div class="item-info" @click.stop="handleClick(item)">
          <p>{{item.package_name}}</p>
          <p>{{item.brief}}</p>
          <p>
            ¥ {{item.price}}
            <span>起</span>
          </p>
          <p>{{ item.org_another_name && item.org_another_name }}</p>
        </div>
        <div class="item-select">
          <AddorDel class="select" :id="item.id" :select="item.select" @change="selectItem"/>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import { Dialog } from 'vant'
import AddorDel from '@/components/common/add-or-del.vue'
export default {
  name: 'other-add-item',
  props: ['resData'],
  components: {
    AddorDel,
    /*eslint-disable */
    [Dialog.name]: Dialog
  },
  methods: {
    selectItem(payload) {
      this.$emit('change', payload)
    },
    handleClick(val) {
      Dialog.alert({
        title: val.package_name,
        message: val.brief
      })
    }
  },
  beforeMount() {
    this.$Lazyload.config({ lazyComponent: true, loading: 'https://image.ibb.co/eMidhq/images-3.jpg', error: 'https://image.ibb.co/eMidhq/images-3.jpg' })
  }
}
</script>
<style scoped lang="less">
.other {
  font-family: PingFangSC-Regular;
  overflow: auto;
  box-sizing: border-box;
  padding: 20px 16px;
  .other-title {
    text-align: left;
    span {
      display: inline-block;
      width: 4px;
      height: 16px;
      line-height: 24px;
      vertical-align: middle;
      background-color: #32cbe4;
      margin-right: 5px;
    }
    h3 {
      font-family: PingFangSC-Medium;
      display: inline-block;
      font-size: 17px;
      font-weight: 600;
      line-height: 24px;
      margin-bottom: 4px;
    }
    p {
      font-size: 12px;
      color: #9b9b9b;
      line-height: 17px;
    }
  }
  .other-item-list {
    .other-item {
      display: flex;
      flex-wrap: nowrap;
      justify-content: flex-start;
      align-items: flex-start;
      line-height: 17px;
      margin-bottom: 40px;
      img {
        width: 84px;
        height: 84px;
        margin-right: 12px;
      }
      .item-info {
        p:nth-child(1) {
          font-family: PingFangSC-Medium;
          font-size: 17px;
          line-height: 24px;
          margin-bottom: 2px;
        }
        p:nth-child(2) {
          display: -webkit-box;
          /* autoprefixer: ignore next */
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          width: 181px;
          font-size: 12px;
          color: #9b9b9b;
          margin-bottom: 5px;
        }
        p:nth-child(3) {
          font-family: DIN-Medium;
          font-size: 17px;
          color: #ff4545;
          line-height: 21px;
          margin-bottom: 4px;
          span {
            font-size: 12px;
          }
        }
        p:nth-child(4) {
          width: 204px;
          font-size: 12px;
          color: #32cbe4;
        }
      }
      .item-select {
        flex: 1;
        display: flex;
        justify-content: flex-end;
        .select {
          margin-top: 33px;
        }
      }
    }
    .other-item:last-child {
      margin-bottom: 0 !important;
    }
  }
}
</style>
