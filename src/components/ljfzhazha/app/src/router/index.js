import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/home.vue";
import Car from "../views/car.vue";
import My from "../views/my.vue";
import Fenlei from "../views/fenlei.vue";
import Surprise from "../views/surprise.vue";
import Sousuo from "../views/sou.vue";
import Insuo from "../views/insuo.vue";
import Loding from "../views/loding.vue";
import Shezhi from "../views/shezhi.vue";
import Address from "../views/address.vue";
import Newzeng from "../views/newzeng.vue";
import Goods from "../views/goods.vue";

Vue.use(VueRouter);

const routes = [{
    path: "/",
    redirect: "/home"
  },
  {
    path: "/home",
    name: "home",
    component: Home
  },
  {
    path: "/car",
    name: "car",
    component: Car
  },
  {
    path: "/goods",
    name: "goods",
    component: Goods
  },
  {
    path: "/my",
    name: "my",
    component: My
  },
  {
    path: "/fenlei",
    name: "fenlei",
    component: Fenlei
  },
  {
    path: "/surprise",
    name: "surprise",
    component: Surprise
  },
  {
    path: "/sousuo",
    name: "sousuo",
    component: Sousuo
  },
  {
    path: "/insuo",
    name: "insuo",
    component: Insuo
  },
  {
    path: "/shezhi",
    name: "shezhi",
    component: Shezhi
  },
  {
    path: "/address",
    name: "address",
    component: Address
  },
  {
    path: "/newzeng",
    name: "newzeng",
    component: Newzeng
  },
  {
    path: "/loding",
    name: "loding",
    component: Loding
  }

];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;