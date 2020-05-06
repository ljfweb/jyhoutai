import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/plusaddress",
    name: "plusaddress",
    component: () => import("../views/plusaddress.vue")
  },
  {
    path: "/myorder",
    name: "myorder",

    component: () => import("../views/myorder.vue")
  },
  {
    path: "/order/:cartid",
    name: "order",
    component: () => import("../views/order.vue"),
    meta: {
      keepAlive: false
    }
  },
  {
    path: "/delivery",
    name: "delivery",
    component: () => import("../views/delivery.vue")
  },
  {
    path: "/address",
    name: "address",
    component: () => import("../views/address.vue")
  },
  {
    path: "/pay/:pay_sn",
    name: "pay",
    component: () => import("../views/pay.vue")
  },
  {
    path: "/choosePay",
    name: "choosePay",
    component: () => import("../views/choosePay.vue")
  },
  {
    path: "/home",
    name: "home",
    component: () => import("../views/Home.vue")
  },
  {
    path: "/categorylist",
    name: "categorylist",
    component: () => import("../views/categorylist.vue")
  },
  {
    path: "/category",
    name: "category",
    component: () => import("../views/category.vue")
  },
  {
    path: "/search",
    name: "search",
    component: () => import("../views/search.vue")
  },
  {
    path: "/info/:pid",
    name: "info",
    component: () => import("../views/info.vue")
  },
  {
    path: "/surpirse",
    name: "surpirse",
    component: () => import("../views/surpirse.vue")
  },
  {
    path: "/cart",
    name: "cart",
    component: () => import("../views/cart.vue")
  },
  {
    path: "/my",
    name: "my",
    component: () => import("../views/my.vue"),
    beforeEnter: (to, from, next) => {
      next();
    }
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login.vue")
  },
  {
    path: "/reg",
    name: "reg",
    component: () => import("../views/reg.vue")
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
  routes
});

export default router;
