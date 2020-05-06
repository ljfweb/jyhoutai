import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
//配置px转rem
import "lib-flexible/flexible";
//配置样式重置
import "assets/styles/reset.css";
import "assets/styles/border.css";
//引入图标样式---或index.html在线引入
// import './font/iconfont.css';
//移动端取消点击时300ms的延迟
import FastClick from "fastclick";
import "assets/styles/resetVui.less";
import axios from "axios";
import Vueaxios from "vue-axios";
// 第三方动画库
import animated from "animate.css";

Vue.use(animated);

import {
  Tabbar,
  TabbarItem,
  Search,
  Col,
  Row,
  Icon,
  NavBar,
  Sticky,
  Swipe,
  SwipeItem,
  Image,
  Lazyload,
  Grid,
  GridItem,
  CountDown,
  Field,
  Cell,
  CellGroup,
  Checkbox,
  CheckboxGroup,
  Divider,
  PullRefresh,
  List,
  Toast,
  Button,
  ImagePreview,
  Tag,
  GoodsAction,
  GoodsActionButton,
  GoodsActionIcon,
  Sku,
  Rate,
  Popup,
  DropdownMenu,
  DropdownItem,
  Card,
  Pagination,
  Dialog,
  Stepper,
  SubmitBar,
  Sidebar,
  SidebarItem,
  Switch,
  SwitchCell,
  AddressList,
  AddressEdit,
  Uploader,
  Tab,
  Tabs,
  Panel,
  ContactCard,
  ContactList,
  ContactEdit,
  Radio,
  RadioGroup,
  PasswordInput,
  NumberKeyboard,
  Step,
  Steps
} from "vant";
Vue.use(Step);
Vue.use(Steps);
Vue.use(PasswordInput);
Vue.use(NumberKeyboard);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(ContactCard);
Vue.use(ContactList);
Vue.use(ContactEdit);
Vue.use(Panel);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Uploader);
Vue.use(AddressEdit);
Vue.use(AddressList);
Vue.use(Switch);
Vue.use(SwitchCell);
Vue.use(Sidebar);
Vue.use(SidebarItem);
Vue.use(SubmitBar);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Search);
Vue.use(Col);
Vue.use(Row);
Vue.use(Icon);
Vue.use(NavBar);
Vue.use(Sticky);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Image);
Vue.use(Lazyload, {
  lazyComponent: true
});
Vue.use(Stepper);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(CountDown);
Vue.use(Field);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(Divider);
Vue.use(PullRefresh);
Vue.use(List);
Vue.use(Toast);
Vue.use(Button);
Vue.use(ImagePreview);
Vue.use(Tag);
Vue.use(GoodsAction);
Vue.use(GoodsActionButton);
Vue.use(GoodsActionIcon);
Vue.use(Sku);
Vue.use(Rate);
Vue.use(Popup);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Card);
Vue.use(Pagination);

Vue.use(Vueaxios, axios);
Vue.prototype.$Dialog = Dialog;
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;
FastClick.attach(document.body);

// 全局路由钩子  判断是否显示导航
router.beforeEach((to, from, next) => {
  // 判断当前的tabbar活动位置
  if (to.path == "/home") {
    next(store.dispatch("setNavbarActive", 0));
  } else if (to.path == "/category") {
    next(store.dispatch("setNavbarActive", 1));
  } else if (to.path == "/surprise") {
    next(store.dispatch("setNavbarActive", 2));
  } else if (to.path == "/cart") {
    next(store.dispatch("setNavbarActive", 3));
  } else if (to.path == "/mine") {
    next(store.dispatch("setNavbarActive", 4));
  }
  document.title = to.meta.title;
  /*
    cart和mine页面设置了meta信息----required:true，当进入其他页面的时候直接过去，当进入这两个页面的时候先进入路由守卫
  */
  if (to.meta.required) {
    // 进入路由守卫时判断有没有token，如果有直接过，如果没有则进入到login页面
    if (store.state.userToken) {
      next();
    } else {
      next({ name: "login", params: { to: to.path } });
    }
  }

  // 登录 注册 详情 等 隐藏导航   其他显示
  // console.log(to)
  if (
    to.path == "/logistics" ||
    to.path == "/myfootprint" ||
    to.path == "/orderpay" ||
    to.path == "/submitorder" ||
    to.path == "/orderlist" ||
    to.path == "/addressedit" ||
    to.path == "/addressadd" ||
    to.path == "/addresslist" ||
    to.path == "/account" ||
    to.path == "/search" ||
    to.path == "/searchlist" ||
    to.path == "/details" ||
    to.path == "/login" ||
    to.path == "/register"
  ) {
    store.dispatch("setNavbar", false);
  } else {
    store.dispatch("setNavbar", true);
  }
  next();
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
