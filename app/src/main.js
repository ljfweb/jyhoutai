import Vue from "vue"
import App from "./App.vue"
import "./registerServiceWorker"
import router from "./router"
import store from "./store"

// 引入rem适配
import "lib-flexible/flexible.js"
// 引入样式重置和1px边框问题
import "./assets/styles/border.css"
import "./assets/styles/reset.css"

//引入和使用axios
import Vueaxios from "vue-axios"
import axios from "axios"
Vue.use(Vueaxios, axios)

// 使用qs
import qs from "qs"
Vue.prototype.$qs = qs
// 使用vant
import {
  AddressList,
  Card,
  Tag,
  Sku,
  ImagePreview,
  Tabbar,
  TabbarItem,
  NavBar,
  Search,
  Icon,
  Swipe,
  SwipeItem,
  Form,
  Field,
  Button,
  Toast,
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton,
  DropdownMenu,
  DropdownItem,
  Popup,
  Sidebar,
  SidebarItem,
  Grid,
  GridItem,
  Tab,
  Tabs,
  Cell,
  Checkbox,
  CheckboxGroup,
  AddressEdit,
  SubmitBar,
  Stepper,
  Dialog,
  Step,
  Steps,
  Rate,
  SwipeCell,
  Lazyload,
} from "vant"
Vue.use(Lazyload)
Vue.use(SwipeCell)
Vue.use(Rate)
Vue.use(Grid)
Vue.use(Step)
Vue.use(Steps)
Vue.use(SubmitBar)
Vue.use(Stepper)
Vue.use(AddressEdit)
Vue.use(AddressList)
Vue.use(Cell)
Vue.use(GridItem)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(Sidebar)
Vue.use(SidebarItem)
Vue.use(Tabbar)
Vue.use(Card)
Vue.use(Popup)
Vue.use(Tag)
Vue.use(TabbarItem)
Vue.use(NavBar)
Vue.use(Search)
Vue.use(Icon)
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(Form)
Vue.use(Field)
Vue.use(Button)
Vue.use(GoodsAction)
Vue.use(GoodsActionButton)
Vue.use(GoodsActionIcon)
Vue.use(Sku)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)

Vue.prototype.$Toast = Toast
Vue.prototype.$ImagePreview = ImagePreview
Vue.prototype.$Dialog = Dialog
Vue.config.productionTip = false
// 页面跳转时滚动到顶部
router.afterEach(() => {
  window.scrollTo(0, 0)
})
router.beforeEach((to, from, next) => {
  // 登录注册详情隐藏导航 其他显示
  if (
    to.name == "info" ||
    to.path == "/login" ||
    to.path == "/reg" ||
    to.name == "search" ||
    to.name == "categroyList" ||
    to.name == "orderConfirm" ||
    to.name == "pay" ||
    to.name == "delivery"
  ) {
    store.dispatch("changeActFoot", false)
  } else {
    store.dispatch("changeActFoot", true)
  }
  switch (to.name) {
    case "home":
      store.commit("changeNavsIndex", 0)
      break
    case "category":
      store.commit("changeNavsIndex", 1)
      break
    case "suprise":
      store.commit("changeNavsIndex", 2)
      break
    case "cart":
      store.commit("changeNavsIndex", 3)
      break
    case "mine":
      store.commit("changeNavsIndex", 4)
      break
  }
  // if (to.path == "/cart") {
  //   if (!localStorage.token) {
  //     next("/login")
  //   }
  // }
  next()
})
// 请求拦截器
// axios.interceptors.request.use(
//   (config) => {
//     // 判断是否登录,未登录的话在访问加入购物车页面就跳转到登录页面
//     if (!localStorage.token) {
//       if (config.url == "https://api.ymduo.com/cart/add") {
//         location.href = "/login"
//         Toast.fail("您还未登录,请先登录")
//       }
//     }
//     return config
//   },
//   (err) => {
//     return Promise.reject(err)
//   }
// )

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app")
