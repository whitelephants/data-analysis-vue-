import Vue from 'vue'
import App from './App.vue'

import store from './store'

import Vuex from 'vuex';
Vue.use(Vuex);

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

import router from './Router'

import VCharts from 'v-charts'
Vue.use(VCharts)

import echarts from 'echarts'
Vue.use(echarts)

import axios from 'axios'
Vue.prototype.$axios = axios

import elTableInfiniteScroll from 'el-table-infinite-scroll';
Vue.use(elTableInfiniteScroll);

Vue.config.productionTip = false

new Vue({
  router,
  store:store,
  render: h => h(App)
}).$mount('#app')

// new Vue({
//   router,
//   store:store,
//   el: '#app',
//   router,
//   template: '<App></App>',
//   components: { App }
// });
