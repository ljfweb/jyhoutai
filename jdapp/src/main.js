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
  Tab,
  Tabs,
  Sidebar,
  SidebarItem,
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
  SubmitBar,
  Checkbox,
  CheckboxGroup,
  ContactCard,
  ContactList,
  ContactEdit,
  Stepper,
  SwipeCell,
  Overlay,
  Popup,
  Picker
} from "vant";
Vue.use(Overlay);
Vue.use(Popup);
Vue.use(Picker);
Vue.use(SwipeCell);
Vue.use(Stepper);
Vue.use(ContactCard);
Vue.use(ContactList);
Vue.use(ContactEdit);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(SubmitBar);
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
Vue.prototype.$ImagePreview = ImagePreview;
Vue.config.productionTip = false;

// 全局路由钩子  判断是否显示导航
router.beforeEach((to, from, next) => {
  // 登录 注册 详情隐藏导航   其他显示
  console.log(to);
  if (
    to.name == "search" ||
    to.name == "info" ||
    to.path == "/login" ||
    to.path == "/reg"
    // to.path == "/submitorder"

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