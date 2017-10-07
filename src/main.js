// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueLazyload from 'vue-lazyload'
import infiniteScroll from 'vue-infinite-scroll'
import Vuelidate from 'vuelidate'
import store from './store'

Vue.config.productionTip = false

Vue.use(Vuelidate)
Vue.use(infiniteScroll)
Vue.use(VueLazyload, {
  loading: '/static/loading-svg/loading-spin.svg'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
