import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
router.onError(error => {
  const pattern = /Loading chunk (\d)+ failed/g;
  const isChunkLoadFailed = error.message.match(pattern);
  const targetPath = router.history.pending.fullPath;
  if (isChunkLoadFailed) {
    router.replace(targetPath);
  }
});

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
// 请求拦截器
// axios.interceptors.request.use(
//   config => {
//     // config  url 请求地址  token拦截  请求方式 data
//     console.log(config);
//     if (!localStorage.token) {
//       if (config.url == "https://api.ymduo.com/cart/add") {
//         location.href = "/login";
//       }
//     }
//     return config;
//   },
//   err => {
//     return Promise.reject(err);
//   }
// );

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

router.afterEach(() => {
  window.scrollTo(0, 0);
});

// 全局路由钩子
router.beforeEach((to, from, next) => {
  console.log(to);
  console.log(from);
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
  next();
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
