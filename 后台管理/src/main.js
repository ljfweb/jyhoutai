import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './plugins/element.js'
// 导入全局样式
import "./assets/global.css"
// 导入axios
import axios from "axios";
import Vueaxios from "vue-axios";
import './plugins/wyz-echarts/wyz-echarts.js'
// axios.defaults.baseURL="http://localhost:3000"
// Vue.prototype.$http =axios
Vue.use(Vueaxios, axios);
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
