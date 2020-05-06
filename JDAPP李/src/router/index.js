import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Category from "../views/category.vue";
import Cart from "../views/cart.vue";
import My from "../views/my.vue";
import Surpirse from "../views/surpirse.vue";
import Login from "../views/login.vue";
import Reg from "../views/reg.vue";
import Info from "../views/info.vue";
import Search from "../views/search.vue";
import categoryList from "../views/categorylist.vue";
import Myorder from "../views/myorder.vue";
import Address from "../views/address.vue";
import plusAddress from "../views/plusaddress.vue";
import Jiesuan from "../views/shangpinjiesuan.vue";
import ZhiFuYe from "../views/zhifuyemian.vue";
import ErWeiMa from "../views/erweima.vue";
import WuLiuChaXun from "../views/wulichaxun.vue";
import WuliuXiangQing from "../views/delivery.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/plusaddress",
    name: "plusaddress",
    component: plusAddress
  },
  {
    path: "/wuliuxiangqing",
    name: "wuliuxiangqing",
    component: WuliuXiangQing
  },
  {
    path: "/jiesuan",
    name: "jiesuan",
    component: Jiesuan
  },
  {
    path: "/wuliuchaxun",
    name: "wuliuchaxun",
    component: WuLiuChaXun
  },
  {
    path: "/erweima",
    name: "erweima",
    component: ErWeiMa
  },
  {
    path: "/myorder",
    name: "myorder",
    component: Myorder
  },
  {
    path: "/myorder",
    name: "myorder",
    component: Myorder
  },
  {
    path: "/address",
    name: "address",
    component: Address
  },
  {
    path: "/home",
    name: "home",
    component: Home
  },
  {
    path: "/categorylist",
    name: "categorylist",
    component: categoryList
  },
  {
    path: "/category",
    name: "category",
    component: Category
  },
  {
    path: "/search",
    name: "search",
    component: Search
  },
  {
    path: "/info/:pid", //详情页设置商品id
    name: "info",
    component: Info
  },
  {
    path: "/surpirse",
    name: "surpirse",
    component: Surpirse
  },
  {
    path: "/cart",
    name: "cart",
    component: Cart
  },
  { path: "/zhifuye", name: "zhifuye", component: ZhiFuYe },
  {
    path: "/my",
    name: "my",
    component: My,
    beforeEnter: (to, from, next) => {
      //判断是否登录
      const token = localStorage.token;
      if (token) {
        next();
      } else {
        next("/login");
      }
    }
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/reg",
    name: "reg",
    component: Reg
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes
});

export default router;
