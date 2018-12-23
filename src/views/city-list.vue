<template>
  <transition name="slider">
    <div class="city-list-wrapper">
      <div class="city-list">
        <div class="location-city" ref="locationCity">
          <h4>当前城市</h4>
          <div class="active">
            <span @click="chooseCity(localCity)">{{currentCity.city_name}}</span>
          </div>
        </div>
        <div class="hot-city" ref="hotCity">
          <h4>热门城市</h4>
          <div class="hot-city-list">
            <span
              :class="{'active':item.city_id===currentCity.city_id}"
              @click="chooseCity(item)"
              v-for="(item, index) in hotCity"
              :key="index"
            >{{item.name}}</span>
          </div>
        </div>
        <ul class="all-city">
          <li class="all-city-item" v-for="(val, key) in cityList" :key="key" ref="listGroup">
            <h4 class="city-title">{{key}}</h4>
            <ul>
              <li
                @click="chooseCity(item)"
                class="city-item"
                v-for="(item, index) in val"
                :key="index"
                :data-id="item.city_id"
              >{{item.name}}</li>
            </ul>
          </li>
        </ul>
      </div>
      <div
        class="list-shortcut"
        @touchstart="onShortcutTouchStart($event)"
        @touchmove.stop.prevent="onShortcutTouchMove($event)"
      >
        <ul>
          <li
            ref="shortcut"
            :data-index="index"
            class="item"
            v-for="(item, index) in shortcutList"
            :key="index"
          >{{item}}</li>
        </ul>
      </div>
      <!-- <div class="list-fixed" v-show="fixedTitle">
        <h4 class="fixed-title">{{fixedTitle}}</h4>
      </div>-->
    </div>
  </transition>
</template>

<script>
import { cityList } from '@/assets/js/http/index'
import { mapMutations, mapGetters } from 'vuex'
export default {
  name: 'city-list',
  data() {
    return {
      hasChooseCity: false,
      cityList: {},
      currentIndex: '',
      diff: '',
      scrollY: '',
      localCity: (localStorage.getItem('myLocationInfo') && JSON.parse(localStorage.getItem('myLocationInfo')).city_name && JSON.parse(localStorage.getItem('myLocationInfo')).city_id)
        ? JSON.parse(localStorage.getItem('myLocationInfo'))
        : { city_name: '未定位', city_id: null }
    }
  },
  created() {
    this.hasChooseCity = false
    this.touch = {}
    this.listHeight = []
    // if( localStorage.getItem("myLocationInfo") && JSON.parse( localStorage.getItem("myLocationInfo") ).city_name && JSON.parse( localStorage.getItem("myLocationInfo")). city_id )

    // $(window).on("scroll", this.scroll); **
  },
  mounted() {
    this.$nextTick(() => {
      this._getCityList()
    })
  },

  methods: {
    _getCityList() {
      cityList()
        .then(res => {
          if (res.code === 0) {
            this.cityList = res.data
          }
        })
    },
    back() {
      this.hasChooseCity = false
      if (history.length < 2) {
        this.$router.push('/')
      } else {
        this.$router.back(-1)
      }
      setTimeout(() => {
        // 如果以上代码未执行就执行这里
        if (this.$route.name === 'city-list') {
          this.$router.push('/')
        }
      }, 500)
    },

    chooseCity(item) {
      if (!item.city_id) return
      if (!item.name && !item.city_name) return
      // 只能点一次
      if (this.hasChooseCity) {
        return
      }
      this.hasChooseCity = true
      this.setCurrentCity({
        city_id: item.city_id,
        city_name: item.name || item.city_name
      })
      console.log(item.name)

      // var selectedCity = { timeStamp: new Date().getTime() };
      // saveLocalStorage('selectedCity', selectedCity)
      this.back()
    },
    // 触摸右侧栏时
    onShortcutTouchStart(e) {
      // 获取目标元素data-index
      let i = e.target.getAttribute('data-index')
      let firstT = e.touches[0]
      this.touch.y1 = firstT.clientY
      this.touch.anchorIndex = i
      this.scrollTo(this.touch.anchorIndex)
    },
    onShortcutTouchMove(e) {
      // 获取右侧入口单个索引高度
      let indexHeight = this.$refs.shortcut[0].clientHeight
      let firstT = e.touches[0]
      this.touch.y2 = firstT.clientY
      let delta = (this.touch.y2 - this.touch.y1) / indexHeight
      let index = parseInt(this.touch.anchorIndex) + Math.round(delta)
      this.scrollTo(index)
    },
    // 滚动到相应元素
    scrollTo(i) {
      if (!i && i !== 0) {
        return
      }
      // touchmove到Li区域外时
      if (i < 0) {
        i = 0
      } else if (i > this.listHeight.length - 3) {
        i = this.listHeight.length - 2
      }
      this.currentIndex = i
      console.log(this.listHeight[i])
      window.scrollTo(0, this.listHeight[i])
    },
    // 计算左侧城市列表高度
    calculateHeight() {
      this.listHeight = []
      const list = this.$refs.listGroup
      let height1 = this.$refs.locationCity.clientHeight
      let height = height1 + this.$refs.hotCity.clientHeight
      this.listHeight.push(height1, height)
      for (let i = 0; i < list.length; i++) {
        let item = list[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    },
    scroll() {
      this.scrollY = window.scrollY
    },
    ...mapMutations({
      setCurrentCity: 'SET_CURRENT_CITY'
    })
    // ...mapActions(["saveCity"])
  },
  computed: {
    hotCity() {
      var hotCity = []
      // 获取热门城市
      for (let key in this.cityList) {
        hotCity = hotCity.concat(
          this.cityList[key].filter(val => {
            return val.is_hot === '1'
          })
        )
      }
      return hotCity
    },
    shortcutList() {
      var shortcutList = []
      for (let key in this.cityList) {
        shortcutList.push(key)
      }
      if (shortcutList.length) {
        shortcutList.unshift('热')
      }
      return shortcutList
    },
    fixedTitle() {
      return this.shortcutList[this.currentIndex]
    },
    ...mapGetters(['currentCity'])
  },
  watch: {
    cityList() {
      setTimeout(() => {
        this.calculateHeight()
      }, 20)
    }
  }
}
</script>

<style lang="less" scoped>
@import "../assets/css/var";
@image: "../assets/images/";
.city-list-wrapper {
  background: #fff;
  position: relative;
  .city-list {
    .location-city,
    .hot-city {
      padding: 0 30/2px;
      h4 {
        padding: 26/2px 0;
        color: #909090;
        font-size: 30/2px;
      }
      div {
        span {
          color: #4c4c4c;
          font-size: 28/2px;
          // line-height: 52/2px;
          padding: 6/2px 0;
          width: 116/2px;
          text-align: center;
          margin: 0 19/2px 20/2px 0;
          display: inline-block;
          border: 1px solid #e0e0e0;
          border-radius: 1/2px;
          &.active {
            border-color: @blue;
            color: @blue;
          }
        }
        &.active {
          span {
            border-color: @blue;
            color: @blue;
          }
        }
      }
    }
    .location-city {
      .active {
        span {
          width: auto;
          padding: 6/2px 28/2px;
        }
      }
    }
    .hot-city {
      h4 {
        padding-top: 10/2px;
      }
    }
    .all-city {
      .all-city-item {
        .city-title {
          font-size: 30/2px;
          color: #909090;
          height: 84/2px;
          line-height: 84/2px;
          padding: 0 30/2px;
          border-bottom: 1px solid #eee;
          margin-bottom: -1/2px;
        }
        ul {
          padding-left: 30/2px;
          border-bottom: 1px solid #eee;
          .city-item {
            height: 86/2px;
            line-height: 86/2px;
            border-top: 1px solid #eee;
            color: gray;
            font-size: 28/2px;
            &:first-child {
              border-top: none;
            }
          }
        }
      }
    }
  }
  .list-shortcut {
    position: fixed;
    z-index: 30;
    right: 0;
    top: 50%;
    color: @blue;
    font-size: 24/2px;
    transform: translateY(-50%);
    text-align: center;
    ul {
      .item {
        width: 42/2px;
        height: 34/2px;
        line-height: 34/2px;
        padding: 0 6/2px;
      }
    }
  }
  .list-fixed {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 30;
    .fixed-title {
      font-size: 30/2px;
      color: #909090;
      height: 84/2px;
      line-height: 84/2px;
      padding: 0 30/2px;
      margin-bottom: -1/2px;
    }
  }
}
.slider-enter-active,
.slider-leave-active {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 30;
  transition: all 0.3s;
}
.slider-enter,
.slider-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>
