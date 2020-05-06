import Vue from "vue";
import VueRouter from "vue-router";
/**
 * 重写路由的push方法
 */
const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error);
};
// 路由懒加载
// 首页组件
const Home = () => import("views/Home.vue");
// 购物车组件
const Cart = () => import("views/cart.vue");
// 我的组件
const Mine = () => import("views/mine.vue");
// 惊喜组件
const Surprise = () => import("views/surprise.vue");
// 分类组件
const Category = () => import("views/category.vue");
// 登录页面
const Login = () => import("views/login.vue");
// 搜索相关页面
const Search = () => import("views/Search/search.vue");
const SearchList = () => import("views/Search/search-list.vue");
// 商品详情页
const Details = () => import("views/Details/details.vue");
// 账户设置
const Account = () => import("views/Other/account.vue");
// 我的足迹
const MyFootprint = () => import("views/Other/myFootprint.vue");
// 购物相关的订单列表
const OrderList = () => import("views/Other/orderlist.vue");
// 物流信息
const Logistics = () => import("views/Other/logistics.vue");
// 地址的添加和编辑
const AddressList = () => import("views/Address/addressList.vue");
const AddressAdd = () => import("views/Address/addressAdd.vue");
const AddressEdit = () => import("views/Address/addressEdit.vue");
// 提交订单
const SubmitOrder = () => import("views/cartcommon/submitOrder.vue");
// 订单支付
const OrderPay = () => import("views/cartcommon/orderPay.vue");

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/home",
    name: "home",
    component: Home,
    meta: {
      title: "JD首页"
    }
  },
  {
    path: "/cart",
    name: "cart",
    component: Cart,
    meta: {
      title: "购物车页面"
      // required: true
    }
  },
  {
    path: "/mine",
    name: "mine",
    component: Mine,
    meta: {
      title: "我的页面"
    }
  },
  {
    path: "/surprise",
    name: "surprise",
    component: Surprise,
    meta: {
      title: "惊喜页面"
    }
  },
  {
    path: "/category",
    name: "category",
    component: Category,
    meta: {
      title: "分类页面"
    }
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      title: "登录页面"
    }
  },
  {
    path: "/search",
    name: "search",
    component: Search,
    meta: {
      title: "Search"
    }
  },
  {
    path: "/searchlist",
    name: "searchlist",
    component: SearchList,
    meta: {
      title: "SearchList"
    }
  },
  {
    path: "/details/:goods_id*",
    name: "details",
    component: Details,
    meta: {
      title: "商品详情"
    }
  },
  // other页面相关组件
  {
    path: "/account",
    name: "account",
    component: Account,
    meta: {
      title: "Account",
      required: true
    }
  },
  {
    path: "/myfootprint",
    name: "myfootprint",
    component: MyFootprint,
    meta: {
      title: "我的足迹",
      required: true
    }
  },
  {
    path: "/orderlist",
    name: "orderlist",
    component: OrderList,
    meta: {
      title: "我的订单",
      required: true
    }
  },
  // other下物流信息
  {
    path: "/logistics",
    name: "logistics",
    component: Logistics,
    meta: {
      title: "物流信息"
    }
  },
  // 地址列表相关组件
  {
    path: "/addresslist",
    name: "addresslist",
    component: AddressList,
    meta: {
      title: "AddressList",
      required: true
    }
  },
  {
    path: "/addressadd",
    name: "addressadd",
    component: AddressAdd,
    meta: {
      title: "AddressAdd"
    }
  },
  {
    path: "/addressedit",
    name: "addressedit",
    component: AddressEdit,
    meta: {
      title: "AddressEdit"
    }
  },
  // 提交订单支付组件
  {
    path: "/submitorder",
    name: "submitorder",
    component: SubmitOrder,
    meta: {
      title: "提交订单"
    }
  },
  {
    path: "/orderpay",
    name: "orderpay",
    component: OrderPay,
    meta: {
      title: "支付页面"
    }
  },
  {
    path: "*",
    name: "404",
    component: () => import(/* webpackChunkName: "about" */ "views/404.vue")
  }

  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue")
  // }
];

const router = new VueRouter({
  // mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  }
});

export default router;
