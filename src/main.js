// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import Vuex from 'vuex'
import App from './App'
import router from './router'
import Mint from 'mint-ui'
import Axios from 'axios'
import'mint-ui/lib/style.css'
import global_ from './Base.vue'
import store from './store/store'
Vue.config.productionTip = false
Vue.use(Mint)
// Vue.use(Vuex)
Vue.prototype.$http = Axios
Vue.prototype.GLOBAL = global_
Axios.defaults.baseURL = global_.BASE_URL

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
