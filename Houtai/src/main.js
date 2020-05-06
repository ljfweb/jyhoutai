import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import './assets/style/base.css';
//引入ele组件
import './config/eleConfig.js';
Vue.config.productionTip = false;
//引入iconfont
import './assets/iconFont/iconfont.css';
//引入axios
import axios from 'axios';
import Vueaxios from 'vue-axios';
Vue.use(Vueaxios, axios);
//引入富文本编辑器
import VueQuillEditor from 'vue-quill-editor';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
Vue.use(VueQuillEditor);
//引入echarts
import echarts from 'echarts';
Vue.prototype.$echarts = echarts;
//引入qs
import qs from 'qs';
Vue.prototype.$qs = qs;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
