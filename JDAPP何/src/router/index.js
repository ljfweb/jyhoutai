import Vue from "vue";
import VueRouter from "vue-router";
//页面导入
import Home from "../views/Home.vue";
import Classify from "../views/Classify.vue";
import Surprise from "../views/Surprise.vue";
import Shoppingcart from "../views/Shoppingcart.vue";
import My from "../views/My.vue";
//登录页
import LoginWeb from "../views/Login.vue";
//注册页引入
import Register from "../views/Register.vue";
//详情页
import DetailShopping from "../views/Detail_Shopping.vue";
//引入搜索页
import Search from "../views/SearchGood.vue";
//引入特有的搜索页
import SearchInfo from "../views/SearchInfo.vue";
//账户设置
import AccountSetting from "../views/Account_settings.vue";
import AddressShow from "../views/AddressShow.vue";
//增加修改地址
import AddEditAddress from "../views/AddAddressDate.vue";
//个人中心
import Personal from "../views/Personal_center.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/home",
    meta: {
      //是否为宾客模式
      //为路由拦截做判断知识
      isGuest: true
    }
  },
  {
    path: "/change_address",
    name: "change_address",
    component: AddEditAddress
  },
  {
    path: "/my_address",
    name: "my_address",
    component: AddressShow
  },
  {
    path: "/home",
    name: "home",
    component: Home,
    meta: {
      isGuest: true
    }
  },
  {
    path: "/classify",
    name: "classify",
    component: Classify,
    meta: {
      isGuest: true
    }
  },
  {
    path: "/surprise",
    name: "surprise",
    component: Surprise,
    meta: {
      isGuest: true
    }
  },
  {
    path: "/shoppingcart",
    name: "shoppingcart",
    component: Shoppingcart,
    meta: {
      isGuest: false
    }
  },
  {
    path: "/my",
    name: "my",
    component: My,
    meta: {
      isGuest: false
    }
  },
  {
    path: "/personal",
    name: "personal",
    component: Personal,
    meta: {
      isGuest: false
    }
  },
  {
    path: "/account",
    name: "account",
    component: AccountSetting,
    meta: {
      isGuest: false
    }
  },
  {
    path: "/login",
    name: "login",
    component: LoginWeb,
    meta: {
      isGuest: true
    }
  },
  {
    path: "/register",
    name: "register",
    component: Register,
    meta: {
      isGuest: true
    }
  },
  {
    path: "/detail",
    name: "detail",
    component: DetailShopping,
    meta: {
      isGuest: true
    }
  },
  {
    path: "/search",
    name: "search",
    component: Search,
    meta: {
      isGuest: true
    }
  },
  {
    path: "/searchinfo",
    name: "searchinfo",
    component: SearchInfo,
    meta: {
      isGuest: true
    }
  }
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes
});

export default router;
