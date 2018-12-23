// 目前就2种, 一个展示用 ; 另一个提示是否删除, type传 'delType'
<template>
  <div>
    <div class="com-dialog-box" v-show="showDialog">
      <!-- 内容区域 -->
      <div class="dialog-container">
        <p v-if="title" class="title">{{title}}</p>
        <p class="content" :class="type ? type : ''">
          {{content}}
        </p>
      </div>
      <!-- 底部按钮区域 -->
      <div v-if="type==='delType'" class="affirm affirm-delete">
        <p @click.stop="del">删除</p>
        <p @click.stop="close">在想想</p>
      </div>
      <div v-else class="affirm" @click.stop="close">{{ affirmStr ? affirmStr : "我知道了"}}</div>
    </div>
    <!-- 遮罩层 -->
    <transition name="fade" mode="out-in">
      <div class="overlay" @click.stop="close" v-show="showDialog"></div>
    </transition>
  </div>
</template>
<script>
export default {
  name: 'com-dialog',
  props: {
    title: String,
    content: String,
    showDialog: Boolean,
    affirmStr: String,
    type: String
  },
  data() {
    return {
      show: false
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    del() {
      this.$emit('del')
    }
  },
  watch: {
    showDialog: function() {
      if (this.showDialog) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = 'auto'
      }
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../assets/css/var.less';
.com-dialog-box {
  font-family: PingFangSC-Medium;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  z-index: 1100;
  overflow: hidden;
  background-color: #fff;
  box-shadow: 0 5px 31px 0 rgba(76,76,76,0.13);
  border-radius: 8px;
  .dialog-container {
    box-sizing: border-box;
  }
  .title {
    font-family: PingFangSC-Medium;
    font-size: 17px;
    line-height: 24px;
    color: #3D3D45;
    font-weight: 600;
    text-align: center;
    margin-top: 16px;
  }
  .content {
    box-sizing: border-box;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: @black;
    line-height: 24px;
    padding: 12px 20px 20px 20px;
    width: 304px;
  }
  .delType {
    box-sizing: border-box;
    font-family: PingFangSC-Medium;
    font-size: 17px;
    text-align: center;
    width: 275px !important;
    padding: 51px 0 40.5px 0;
  }
  .affirm {
    border-top: .5PX solid #D9DCDE;
    text-align: center;
    font-size: 15px;
    color: @blue;
    width: 100%;
    height: 43.5px;
    line-height: 43.5px;
  }
  .affirm-delete {
    display: flex;
    justify-content: space-between;
    & > p:first-child {
      flex: 1;
      color: @red;
      border-right: .5PX solid #D3D8D9;
    }
    & > p:last-child {
      flex: 1;
    }
  }
}
.overlay {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.62);
}
</style>
