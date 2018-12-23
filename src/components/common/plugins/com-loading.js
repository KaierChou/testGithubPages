import Loading from '../../common/loading.vue'
const ComLoadling = {}
ComLoadling.install = function(Vue, bool) {
  const ComLoadlingInstance = Vue.extend(Loading)
  let currentLoading
  const initInstance = () => {
    currentLoading = new ComLoadlingInstance()
    let loadingEL = currentLoading.$mount().$el
    document.body.appendChild(loadingEL)
  }
  Vue.prototype.$comLoading = {
    isLoading(bool) {
      if (!currentLoading) {
        initInstance()
      }
      currentLoading.isLoading(bool)
    }
  }
}

export default ComLoadling
