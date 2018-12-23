import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import './assets/css/reset.less'
import { Toast, Lazyload } from 'vant'
import { VueTouch } from './assets/js/vue-touch'
import ComLoading from './components/common/plugins/com-loading.js'
Vue.use(ComLoading)
Vue.use(Toast)
Vue.use(Lazyload)
Vue.config.productionTip = false
// 加入左滑右滑事件
Vue.directive('swipeleft', { // 左滑事件
  bind: function (el, binding) {
    /* eslint-disable no-new */
    new VueTouch(el, binding, 'swipeleft')
  }
})
Vue.directive('swiperight', { // 右滑事件
  bind: function (el, binding) {
    /* eslint-disable no-new */
    new VueTouch(el, binding, 'swiperight')
  }
})
// console.log(process.env.NODE_ENV);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
