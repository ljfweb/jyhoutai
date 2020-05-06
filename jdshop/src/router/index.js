import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
//设置组件按需加载,解决app启动首屏加载时间长,两种方式
// 1.component:resolve => require(["../views/plusaddress.vue"], resolve)
// 2.component: () => import("../views/About.vue")
const routes = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/home",
    name: "home",
    component: () => import("../views/Home.vue")
  },
  // 我的订单
  {
    path: "/myorder",
    name: "myorder",
    component: () => import("../views/MyOrder.vue")
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../views/About.vue")
  },
  {
    path: "/cart",
    name: "cart",
    component: () => import("../views/Cart.vue")
  },
  {
    path: "/suprise",
    name: "suprise",
    component: () => import("../views/Suprise.vue")
  },
  {
    path: "/mine",
    name: "mine",
    component: resolve => require(["../views/Mine.vue"], resolve)
    // 无后台登录接口,直接展示我的页面
    // beforeEnter: (to, from, next) => {
    //   if (localStorage.token) {
    //     next()
    //   } else {
    //     next("/login")
    //   }
    // },
  },
  {
    path: "/login",
    name: "login",
    component: resolve => require(["../views/Login.vue"], resolve)
  },
  {
    path: "/reg",
    name: "reg",
    component: resolve => require(["../views/Reg.vue"], resolve)
  },
  {
    path: "/category",
    name: "category",
    component: resolve => require(["../views/Category.vue"], resolve)
  },
  {
    path: "/categoryList",
    name: "categoryList",
    component: resolve => require(["../views/CategoryList.vue"], resolve)
  },
  // 详情页
  {
    path: "/info/:pid",
    name: "info",
    component: resolve => require(["../views/Info.vue"], resolve)
  },

  //搜索页
  {
    path: "/myAddress",
    name: "myAddress",
    component: resolve => require(["../views/MyAddress.vue"], resolve)
  },
  //搜索页
  {
    path: "/search",
    name: "search",
    component: resolve => require(["../views/Search.vue"], resolve)
  },
  //添加地址
  {
    path: "/addressInsert",
    name: "addressInsert",
    component: resolve => require(["../views/AddressInsert.vue"], resolve)
  },
  {
    path: "/test",
    name: "test",
    component: resolve => require(["../views/test.vue"], resolve)
  },
  // 确认订单
  {
    path: "/orderConfirm",
    name: "orderConfirm",
    component: resolve => require(["../views/OrderConfirm.vue"], resolve)
  },
  // 支付接口
  {
    path: "/pay",
    name: "pay",
    component: resolve => require(["../views/Pay.vue"], resolve)
  },
  {
    path: "/delivery",
    name: "delivery",
    component: resolve => require(["../views/Delivery.vue"], resolve)
  }
];

const router = new VueRouter({
  routes
});

export default router;
