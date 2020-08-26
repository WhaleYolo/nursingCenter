import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/index.css'
import axios from 'axios'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'; //坑一
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.prototype.$axios = axios
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
