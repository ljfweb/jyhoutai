import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import axios from "axios"
import VueAxios from "vue-axios"
import qs from "qs"
import {
  Tabbar,
  TabbarItem,
  Icon,
  NavBar,
  Field,
  Button,
  Search,
  Swipe,
  SwipeItem,
  Sidebar,
  SidebarItem,
  NoticeBar,
  Sticky,
  CountDown,
  Col,
  Row,
  Dialog,
  DropdownMenu,
  DropdownItem,
  Popup,
  Cell,
  Card,
  Toast,
  Grid,
  GridItem,
  RadioGroup,
  Radio,
  AddressList,
  AddressEdit,
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton,
  Checkbox,
  CheckboxGroup,
  Sku,
  Stepper,
  SubmitBar,
  SwipeCell
} from 'vant'
import 'lib-flexible/flexible.js'
import "./assets/styles/reset.css"
import './assets/styles/border.css'

Vue.use(Tabbar)
Vue.use(SwipeCell)
Vue.use(SubmitBar)
Vue.use(Stepper)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(AddressEdit)
Vue.use(GridItem)
Vue.use(Sku)
Vue.use(GoodsAction)
Vue.use(GoodsActionIcon)
Vue.use(GoodsActionButton)
Vue.use(Grid)
Vue.use(Field)
Vue.use(AddressList)
Vue.use(RadioGroup)
Vue.use(Radio)
Vue.use(Button)
Vue.use(Col)
Vue.use(Card)
Vue.use(Popup)
Vue.use(Cell)
Vue.use(Row)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Sticky)
Vue.use(CountDown)
Vue.use(TabbarItem)
Vue.use(Icon)
Vue.use(NavBar)
Vue.use(Search)
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(Sidebar)
Vue.use(SidebarItem)
Vue.use(NoticeBar)

Vue.prototype.$Toast = Toast
Vue.prototype.$qs = qs
Vue.prototype.$Dialog = Dialog
Vue.use(VueAxios, axios)
Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  if (to.name == "sousuo" || to.name == "goods" || to.name == "my" || to.name == "surprise" || to.name == "insuo" || to.name == "shezhi" || to.name == "newzeng") {
    store.commit("footchange", false)
    next();
  } else {
    store.commit("footchange", true)
    next()
  }

  if (to.name == "home") {
    store.commit("jianbu", 0)
    next()
  } else if (to.name == "fenlei") {
    store.commit("jianbu", 1)
    next()
  } else if (to.name == "car") {
    store.commit("jianbu", 3)
    if (localStorage.token) {
      next()
    } else {
      Toast.fail("请先登录")
      next("/my")
    }
  } else if (to.name == "my" || to.name == "loding") {
    store.commit("jianbu", 4)
    next()
  } else {
    next()
  }
  if (to.name == "shezhi") {
    if (localStorage.token) {
      next()
    } else {
      next("/home")
    }
  }
  next()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");