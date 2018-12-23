<template>
  <div class="wrapper">
    <div class="switch">
      <div class="city" @click="selectCity()">
        <span class="city_name">深圳</span>
        <span class="arrow">
          <img src="../../assets/images/icon_arrow_white_down.svg">
        </span>
      </div>
      <div class="role">
        <span
          class="staff"
          :class="{staff_on:!set_slider && flag !== '',start_color:flag == ''}"
          @click="slider('staff')"
        >员工</span>
        <span class="kinsfolk" :class="{ksfk_on:set_slider}" @click="slider('kinsfolk')">家属</span>
        <span
          class="slider"
          :class="{slider_right:set_slider,slider_left:!set_slider && flag !== ''}"
        ></span>
      </div>
      <div class="link" @click="link()">
        <img src="../../assets/images/icon_person_index.svg">
      </div>
    </div>
    <div class="name" :style="{color:usernameColor}" v-if="showName === true">hi,{{username}}</div>
  </div>
</template>

<script>
export default {
  props: {
    showName: {
      type: Boolean,
      default: false
    },
    username: String,
    usernameColor: {
      type: String,
      default: '#3D3D45'
    }
  },
  data() {
    return {
      set_slider: false,
      flag: ''
    }
  },
  methods: {
    selectCity() {
      this.$emit('choose')
    },
    slider(type) {
      if (type === 'staff') {
        if (this.flag !== '') {
          this.set_slider = false
          this.flag = 'loadover'
        }
      } else {
        this.set_slider = true
        this.flag = 'loadover'
      }
    },
    link() {
      this.$emit('link')
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../assets/css/var";
.keyframes(@name; @arguments) {
  @-moz-keyframes @name {
    @arguments();
  }
  @-webkit-keyframes @name {
    @arguments();
  }
  @-ms-keyframes @name {
    @arguments();
  }
  @-o-keyframes @name {
    @arguments();
  }
  @keyframes @name {
    @arguments();
  }
}
.animation(@arguments) {
  -webkit-animation: @arguments;
  -moz-animation: @arguments;
  -ms-animation: @arguments;
  -o-animation: @arguments;
  animation: @arguments;
}
.wrapper {
  width: 100%;
  height: 80px;
  position: relative;
  .switch {
    padding: 0 16px 0 13px;
    height: 54px;
    font-size: 14px;
    line-height: 20px;
    color: @text-color;
    background: #ffffff;
    box-shadow: 0 4px 25px 0 rgba(159, 186, 192, 0.28);
    display: flex;
    justify-content: space-between;
    align-items: center;
    .city {
      width: 86px;
      height: auto;
      max-height: 40px;
      overflow: hidden;
      flex-grow: 1;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .city_name {
        margin-right: 9px;
        align-self: flex-start;
      }
      .arrow {
        width: 10px;
        height: auto;
        flex-shrink: 0;
        img {
          width: 7px;
          height: auto;
          display: block;
        }
      }
    }
    .role {
      width: 180px;
      height: 36px;
      background: #f8fdff;
      border-radius: 18.5px;
      position: relative;
      .staff {
        width: 88px;
        height: 20px;
        text-align: center;
        padding: 8px 0;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 99;
      }
      .kinsfolk {
        width: 88px;
        height: 20px;
        text-align: center;
        padding: 8px 0;
        position: absolute;
        top: 0;
        right: 0;
        z-index: 99;
      }
      .start_color {
        color: @blue;
      }
      .staff_on {
        .keyframes(changeColor;{0% {color: @blue} 100% {color: @text-color}});
        .animation(changeColor 0.4s);
        color: @blue;
      }
      .ksfk_on {
        .keyframes(changeColor;{0% {color: @text-color} 100% {color: @blue}});
        .animation(changeColor 0.4s);
        color: @blue;
      }
      .slider {
        width: 90px;
        height: 32px;
        background: #ffffff;
        box-shadow: 0 5px 8px 0 rgba(179, 212, 223, 0.33);
        border-radius: 18.5px;
        display: block;
        position: absolute;
        top: 1px;
        left: 0;
        z-index: 9;
      }
      .slider_right {
        .keyframes(slider_right;{0% {left: 0;} 100% {left: 90px;}});
        .animation(slider_right 0.2s ease-out);
        left: 90px;
      }
      .slider_left {
        .keyframes(slider_left;{0% {left: 90px;} 100% {left: 0;}});
        .animation(slider_left 0.2s ease-out);
        left: 0px;
      }
    }
    .link {
      width: 81px;
      height: auto;
      text-align: right;
      flex-grow: 1;
      .icon {
        width: 22px;
        height: auto;
      }
    }
  }
  .name {
    font-size: 12px;
    line-height: 20px;
    padding: 0 14px;
    color: @text-color;
    position: absolute;
    left: 0;
    top: 71px;
  }
}
</style>
