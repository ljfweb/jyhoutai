import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/home.vue";
import Category from "../views/category.vue";
import Cart from "../views/cart.vue";
import My from "../views/my.vue";
import Surprise from "../views/surprise.vue";
import Login from "../views/login.vue";
import Reg from "../views/reg.vue";
import Info from "../views/info.vue";
import Search from "../views/search.vue";
import Myorder from "../views/myorder.vue";
import Ensureorder from "../views/ensureorder.vue";
Vue.use(VueRouter);

const routes = [
  {
    path:"/",
	   redirect:"/home"
  },
  {
    path: "/home",
    name: "home",
    component: Home
  },
  {
    path: "/myorder",
    name: "myorder",
    component: Myorder
  },
  {
    path: "/ensureorder",
    name: "ensureorder",
    component: Ensureorder
  },
  
  {
    path: "/search",
    name: "search",
    component: Search
  },
  {
    path: "/category",
    name: "category",
    component: Category
  },
  {
    path: "/surprise",
    name: "surprise",
    component: Surprise
  },
  {
    path: "/cart",
    name: "cart",
    component: Cart
  },
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
    path: "/info",
    name: "info",
    component: Info
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;