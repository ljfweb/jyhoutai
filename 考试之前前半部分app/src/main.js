import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import 'lib-flexible'
import axios from 'axios'
import eventBus from './eventBus.js'

import Vueaxios from 'vue-axios'
Vue.use(Vueaxios, axios);

// 引入vant插件
import {
  Sidebar,
  SidebarItem,
  Dialog,
  Toast,
  Button,
  Field,
  Form,
  Grid,
  GridItem,
  Lazyload,
  Search,
  Icon,
  Tabbar,
  TabbarItem,
  NavBar,
  Swipe,
  SwipeItem,
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton,
  Sku,
  ImagePreview,
  DropdownMenu,
  DropdownItem,
  Popup,Tab, Tabs
} from 'vant'
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(Popup)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(NavBar)
Vue.use(Search)
Vue.use(Icon)
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(Lazyload)
Vue.use(Grid)
Vue.use(GridItem)
Vue.use(Form)
Vue.use(Field)
Vue.use(Button)
Vue.use(Dialog)
Vue.use(Sidebar);
Vue.use(SidebarItem);
Vue.use(GoodsAction);
Vue.use(GoodsActionIcon);
Vue.use(GoodsActionButton);
Vue.use(Sku);
Vue.use(ImagePreview);

// axios.defaults.baseURL="http://127.0.0.1:9527"
Vue.config.productionTip = false;
Vue.prototype.$Toast = Toast;
Vue.prototype.$Dialog = Dialog;
Vue.prototype.$bus = eventBus;

// 全局路由钩子  判断是否显示导航
router.beforeEach((to, from, next) => {
  // 登录 注册 详情隐藏导航   其他显示
  console.log(to);
  if (to.name == "search" ||to.name == "info" || to.path == "/login" || to.path == "/reg") {
    store.dispatch("changeAfoot", false);
  } else {
    console.log(22222222);
    store.dispatch("changeAfoot", true);
  }
  if (to.path == "/cart") {
    //判断localstorage 中的是否有token
    if (localStorage.token) {
      next();
    } else {
      Toast("请先进行登录。。。");
      next("/login");
    }
  } else {
    next();
  }
});



new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
})