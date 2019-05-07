// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

// 引入router
import router from './router'
import VueRouter from 'vue-router'
// 引入axios
import axios from 'axios'
import VueAxios from 'vue-axios'
// 引入ElementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入vuex
import Vuex from 'vuex'
import store from './store'
// 引入vue-cookie
import VueCookie from 'vue-cookie'

Vue.use(VueRouter)
Vue.use(ElementUI)
axios.defaults.withCredentials = true
Vue.use(VueAxios, axios)
Vue.use(Vuex)
Vue.prototype.$store = store
Vue.use(VueCookie)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
