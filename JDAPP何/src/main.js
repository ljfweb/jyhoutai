import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
//导入适配文件flexible.js
import "lib-flexible/flexible.js";
//移动端样式格式化
import "./assets/styles/reset.css";
import "./assets/styles/border.css";
//引入qs
import qs from "qs";
Vue.prototype.$qs = qs;
//引入axios
import axios from "axios";
import Vueaxios from "vue-axios";
axios.defaults.baseURL = "http://vueshop.glbuys.com/api";
Vue.prototype.$axios = axios;
Vue.use(Vueaxios, axios);
//请求头
// axios.interceptors.request.use(config => {
//   //配置axios请求头，axios每次发起请求携带token，在Network中的headers看的到
//   // console.log(config)
//   config.headers.token = window.sessionStorage.getItem('token'); //Authorization  是请求头要求加上的字段
//   return config;
// });
// main.js文件
// http request 拦截器
// axios.interceptors.request.use(
//   config => {
//     var token = sessionStorage.getItem('token');
//     if (token) {
//       // 判断是否存在token，如果存在的话，则每个http header都加上token
//       token = sessionStorage.getItem('token') + ':';
//       config.headers.Authorization = `Basic ${new Buffer(token).toString('base64')}`;
//     }
//     return config;
//   },
//   err => {
//     return Promise.reject(err);
//   }
// );
Vue.use(axios);
//引入第三方iconfont图标
import "./assets/JDfont/iconfont.css";

//引入vant框架
import {
  Tabbar,
  TabbarItem,
  Icon,
  Search,
  AddressEdit,
  Col,
  Row,
  Swipe,
  SwipeItem,
  NavBar,
  Form,
  Field,
  Button,
  Grid,
  GridItem,
  ImagePreview,
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton,
  Sidebar,
  SidebarItem,
  Sku,
  Toast,
  Divider,
  Tag,
  Overlay,
  Area,
  List,
  Cell,
  CellGroup,
  Card,
  Stepper,
  Checkbox,
  CheckboxGroup,
  SubmitBar,
  Tab,
  Tabs,
  DropdownMenu,
  DropdownItem,
  Notify,
  Image,
  Pagination,
  Dialog,
  CountDown,
  ActionSheet,
  SwipeCell,
  AddressList,
  RadioGroup,
  Radio,
  Uploader
} from "vant";
//使用框架局部组件
Vue.prototype.$dialog = Dialog;
Vue.use(Tabbar)
  .use(Radio)
  .use(RadioGroup)
  .use(Uploader)
  .use(AddressEdit)
  .use(AddressList)
  .use(SwipeCell)
  .use(CountDown)
  .use(TabbarItem)
  .use(Icon)
  .use(Search)
  .use(Col)
  .use(Row)
  .use(Swipe)
  .use(Area)
  .use(SwipeItem)
  .use(NavBar)
  .use(Form)
  .use(Field)
  .use(Button)
  .use(Grid)
  .use(GridItem)
  .use(ImagePreview)
  .use(GoodsAction)
  .use(GoodsActionIcon)
  .use(GoodsActionButton)
  .use(Toast)
  .use(Sidebar)
  .use(SidebarItem)
  .use(Sku)
  .use(Divider)
  .use(Tag)
  .use(Overlay)
  .use(List)
  .use(Cell)
  .use(CellGroup)
  .use(Card)
  .use(Stepper)
  .use(Checkbox)
  .use(CheckboxGroup)
  .use(Tab)
  .use(Tabs)
  .use(DropdownItem)
  .use(DropdownMenu)
  .use(Image)
  .use(Notify)
  .use(SubmitBar)
  .use(ActionSheet)
  .use(Pagination);

Vue.config.productionTip = false;
//路由拦截导航狗子
router.beforeEach((to, from, next) => {
  if (
    to.name == "login" ||
    to.name == "register" ||
    to.name == "detail" ||
    to.name == "search" ||
    to.name == "searchinfo" ||
    to.name == "account" ||
    to.name == "my_address" ||
    to.name == "personal" ||
    to.name == "change_address"
  ) {
    //底部导航栏显示隐藏函数vuex
    store.commit("Handle_Bottom", false);
  } else {
    store.commit("Handle_Bottom", true);
  }
  if (!to.meta.isGuest) {
    //判断路由是否登录，如果没有登录就去登录页
    const tokened = window.sessionStorage.token; //没有登录就没有token信息
    if (tokened) {
      //如果token存在，就直接导航去
      next();
    } else {
      next("/login"); //不存在就跳到登录页
    }
  }
  if (to.name == "classify") {
    //搜索框头部为空进入分类的时候
    store.commit("handle_Search", "");
  }
  next();
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
