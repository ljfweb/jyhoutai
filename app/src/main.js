import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";



import 'lib-flexible/flexible.js'

// 样式重置
import "./assets/styles/reset.css"
import './assets/styles/border.css'

// 引入axios 
import axios from 'axios'
import Vueaxios from 'vue-axios'
Vue.use(Vueaxios, axios)

import qs from "qs";
Vue.prototype.$qs = qs;

// 引入vant插件
import {
  Tag,
  Sku,
  ImagePreview,
  Button,
  Field,
  Toast,
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
  DropdownMenu,
  DropdownItem,
  Popup,
  Card,
  Sidebar,
  SidebarItem,
  Tab,
  Tabs,
  Grid,
  GridItem,
  Cell,
  CellGroup,
  AddressList,
  AddressEdit,
  Checkbox,
  CheckboxGroup,
  Rate

} from 'vant'



Vue.use(Rate);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(AddressEdit);
Vue.use(AddressList);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Sidebar);
Vue.use(SidebarItem);
Vue.use(Card)
Vue.use(Popup)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Tag)
Vue.use(Sku)
Vue.use(GoodsAction)
Vue.use(GoodsActionButton)
Vue.use(GoodsActionIcon)
Vue.use(Button)
Vue.use(Field)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(NavBar)
Vue.use(Search)
Vue.use(Icon)
Vue.use(Swipe)
Vue.use(SwipeItem)

Vue.prototype.$Toast = Toast;
Vue.prototype.$ImagePreview = ImagePreview;
Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  if (to.name == "searchlist" || to.name == "search" || to.name == "info" || to.path == "/login" || to.path == "/reg") {
    store.dispatch("changeAfoot", false);
  } else {
    store.dispatch("changeAfoot", true);
  }

  if (to.path == "/cart") {
    if (localStorage.token) {
      next();
    } else {
      Toast("请登录");
      next("/login");
    }
  } else {
    next();
  }


  next();
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");