import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";

// 引入rem适配
import "lib-flexible/flexible.js";
// 样式重置
import "./assets/styles/reset.css";
import "./assets/styles/border.css";
//qs  qs.stringfy()   qs.parse()
import qs from "qs";
Vue.prototype.$qs = qs;

// 引入axios
import axios from "axios";
import Vueaxios from "vue-axios";
Vue.use(Vueaxios, axios);
import store from "./store";

// 引入vant插件
import {
  Step,
  Steps,
  SwipeCell,
  Checkbox,
  CheckboxGroup,
  Tab,
  Tabs,
  Sidebar,
  SidebarItem,
  Popup,
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton,
  ImagePreview,
  Toast,
  Field,
  Button,
  Form,
  Search,
  Icon,
  Tabbar,
  TabbarItem,
  NavBar,
  Swipe,
  SwipeItem,
  Sku,
  Tag,
  DropdownMenu,
  DropdownItem,
  Card,
  Grid,
  GridItem,
  Cell,
  CellGroup,
  List,
  AddressList,
  AddressEdit,
  Stepper,
  SubmitBar,
  Dialog
} from "vant";
Vue.use(Step);
Vue.use(Steps);
Vue.use(SwipeCell);
Vue.use(SubmitBar);
Vue.use(Stepper);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(AddressEdit);
Vue.use(AddressList);
Vue.use(List);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Tabs);
Vue.use(Tab);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(Sidebar);
Vue.use(Card);
Vue.use(SidebarItem);
Vue.use(Popup);
Vue.use(Sku);
Vue.use(Tabbar);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(TabbarItem);
Vue.use(NavBar);
Vue.use(Search);
Vue.use(Icon);
Vue.use(Swipe);
Vue.use(Field);
Vue.use(Button);
Vue.use(Form);
Vue.use(Tag);
Vue.use(SwipeItem);
Vue.use(GoodsAction);
Vue.use(GoodsActionIcon);
Vue.use(GoodsActionButton);

Vue.prototype.$Toast = Toast;
Vue.prototype.$Dialog = Dialog;
Vue.prototype.$ImagePreview = ImagePreview;
Vue.config.productionTip = false;
//
// 路由   全局 mainjs  beforeEach afterEach
//        组件内   beforeRouterEnter
//                 beforeRouteLeave
//                 beforeRouteUpdate
//        路由独享 路由index.js  beforeEnter

//
router.afterEach(() => {
  //路由变化滚动页面顶部
  window.scrollTo(0, 0);
});

// 全局路由钩子  判断是否显示导航 beforeEach afterEach
router.beforeEach((to, from, next) => {
  console.log(to);

  // 登录 注册 详情隐藏导航   其他显示

  if (from.name == "order" && to.name == "address") {
    console.log(from);
    from.meta.keepAlive = true;
  }
  if (
    to.name == "search" ||
    to.name == "info" ||
    to.path == "/login" ||
    to.path == "/reg"
  ) {
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
  router,
  store,
  render: h => h(App)
}).$mount("#app");
