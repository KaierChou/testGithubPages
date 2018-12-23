<template>
  <div class="personOutline">
    <div class="left">
      <div class="photo">
        <img :src="info.avatar_url" class="pic">
      </div>
      <div class="name">
        <span class="eg">{{info.rtx}}</span>
        <span class="cn">{{info.username}}</span>
      </div>
    </div>
    <div class="right" v-if="info.show_change_identity === true" @click="change()">
      <span class="icon">
        <img src="../../assets/images/icon_person_change_role.svg">
      </span>
      <span class="desc">切换身份</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
      default: () => ({})
    },
    type: String
  },
  data() {
    return {

    }
  },
  methods: {
    change() {
      this.$emit('change')
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../assets/css/var";
.personOutline {
  padding: 0 16px 0 10px;
  height: 78px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left {
    flex-grow: 1;
    display: flex;
    align-items: flex-end;
    .photo {
      width: 46px;
      height: 46px;
      margin-right: 16px;
      border-radius: 25px;
      overflow: hidden;
      flex: 0 0 auto;
      .pic {
        width: 100%;
        height: 100%;
        display: block;
        object-fit: cover;
      }
    }
    .name {
      color: @text-color;
      flex-grow: 1;
      .eg {
        width: 100%;
        height: 24px;
        font-size: 18px;
        line-height: 24px;
        display: block;
        overflow: hidden;
      }
      .cn {
        width: 100%;
        height: 20px;
        font-size: 14px;
        line-height: 20px;
        display: block;
        overflow: hidden;
      }
    }
  }
  .right {
    width: 80px;
    height: auto;
    font-size: 12px;
    line-height: 20px;
    color: @blue;
    text-align: right;
    flex: 0 0 80px;
    .icon {
      width: 14px;
      height: auto;
      display: inline-block;
      vertical-align: middle;
      img {
        width: 100%;
        height: auto;
        display: block;
      }
    }
    .desc {
      display: inline-block;
      margin-left: 3px;
      vertical-align: middle;
    }
  }
}
</style>
