import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";

// 引入rem适配
import "lib-flexible/flexible.js";
// 样式重置
import "./assets/styles/reset.css";
import "./assets/styles/border.css";
//引入iconfont
import "./assets/JDfont/iconfont.css";
//qs  qs.stringfy()   qs.parse()
import qs from "qs";
Vue.prototype.$qs = qs;

// 引入axios
import axios from "axios";
import Vueaxios from "vue-axios";
Vue.use(Vueaxios, axios);
axios.defaults.baseURL = "http://vueshop.glbuys.com/api";
Vue.prototype.$axios = axios;
import store from "./store";

//引入vant框架
import {
  Tabbar,
  TabbarItem,
  Panel,
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
  Uploader,
  Step,
  NoticeBar,
  Steps
} from "vant";
//使用框架局部组件
Vue.prototype.$dialog = Dialog;
Vue.use(Tabbar)
  .use(NoticeBar)
  .use(Step)
  .use(Steps)
  .use(Radio)
  .use(RadioGroup)
  .use(Uploader)
  .use(AddressEdit)
  .use(AddressList)
  .use(Panel)
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

// 全局路由钩子  判断是否显示导航
router.beforeEach((to, from, next) => {
  // 登录 注册 详情隐藏导航   其他显示
  console.log(to);
  if (
    to.name == "search" ||
    to.name == "info" ||
    to.name == "wuliuchaxun" ||
    to.name == "erweima" ||
    to.name == "myorder" ||
    to.path == "/login" ||
    to.path == "/reg" ||
    to.path == "/plusaddress" ||
    to.path == "/zhifuye" ||
    to.path == "/jiesuan"
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
