import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/home.vue";
import Cart from "../views/cart.vue";
import My from "../views/my.vue";
import Category from "../views/category.vue";
import Surpirse from "../views/surpirse.vue";
import Login from "../views/login.vue";
import Reg from "../views/reg.vue";
import Info from "../views/info.vue";
import Search from "../views/search.vue";
import Searchlist from "../views/searchlist.vue";
import Categorylist from "../views/categorylist.vue";
import Myorder from "../views/myorder.vue";
import Address from "../views/address.vue";
import Plusaddress from "../views/plusaddress.vue"
import Order_confirm from "../views/order_confirm.vue";
import Choosepay from "../views/choosepay.vue";
import Pay from "../views/pay.vue";
import Delivery from "../views/delivery.vue";
Vue.use(VueRouter);

const routes = [{
    path: "/",
    redirect: "/home"
    //重定向
  },
  {
    path: "/home",
    name: "home",
    component: Home
  },
  {
    path: "/category",
    name: "category",
    component: Category
  },
  
  {
    path: "/myorder/:cartid",
    name: "myorder",
    component: Myorder
  },
  {
    path: "/delivery/:cartid",
    name: "delivery",
    component: Delivery
  },
  {
    path: "/address",
    name: "address",
    component: Address
  },
  {
    path: "/choosepay",
    name: "choosepay",
    component: Choosepay
  },
  {
    path: "/pay/:pay_sn",
    name: "pay",
    component: Pay
  },
  {
    path: "/plusaddress",
    name: "plusaddress",
    component: Plusaddress
  },
  {
    path: "/categorylist",
    name: "categorylist",
    component: Categorylist
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
  {
    path: "/my",
    name: "my",
    component: My
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
    path: "/info/:pid", //详情页设置商品id（必传）
    name: "info",
    component: Info
  },
  {
    path: "/order_confirm/:cartid",
    name: "order_confirm",
    component: Order_confirm
  },
  {
    path: "/search",
    name: "search",
    component: Search
  },
  {
    path: "/searchlist",
    name: "searchlist",
    component: Searchlist
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import( /* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;