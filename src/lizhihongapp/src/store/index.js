import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import Qs from "qs";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    uid: 956538, //用户登录id
    userToken: "", //用户信息
    active: 0,
    isLogin: "",
    // 是否显示底部导航
    isNavbar: true,
    goodsData: "",
    addressInfo: {}, //收货人信息
    footprintCount: 0, //足迹列表的总记录数
    cartNum: 0 //购物车数量
  },
  mutations: {
    // 同步改变底部导航的激活
    navbarActive(state, num) {
      state.active = num;
    },
    // 同步改变islogin状态
    setIslogin(state, flag) {
      state.isLogin = flag;
      // 保存到本地缓存中
      localStorage.isLogin = state.isLogin;
    },
    // 同步改变用户token信息
    getUserToken(state, token) {
      // 把外界传来的userToken保存到state中的userToken
      state.userToken = token;
      // 保存到本地缓存中
      localStorage.userToken = state.userToken;
    },
    // 同步改变底部导航的是否包含状态
    navbarStatus(state, flag) {
      state.isNavbar = flag;
    },
    // 存储详情页商品数据
    detailGoodsData(state, val) {
      state.goodsData = val;
    },
    // 同步编辑收货人信息
    getAddressInfo(state, item) {
      state.addressInfo = item;
    },
    // 同步编辑足迹总记录数
    getFootprintCount(state, num) {
      state.footprintCount = num;
    },
    // 同步编辑购物车数量
    getCartNum(state) {
      if (state.userToken) {
        axios
          .post(
            "https://api.ymduo.com/Home/Cart/cartnum",
            Qs.stringify({
              uid: state.uid
            })
          )
          .then(res => {
            // console.log(res);
            if (res.data.code == 200) {
              state.cartNum = res.data.result.data;
            }
          });
      } else {
        state.cartNum = 0;
      }
    },
    // 退出登录
    singOut(state) {
      state.userToken = "";
      state.isLogin = false;
      localStorage.removeItem("userToken");
      localStorage.removeItem("isLogin");
    }
  },
  actions: {
    // 异步改变底部导航的状态
    setNavbarActive(context, num) {
      context.commit("navbarActive", num);
    },
    // 异步改islogin状态
    setMyIsLogin(context, flag) {
      context.commit("setIslogin", flag);
    },
    // 异步改变用户token信息
    setUserToken(context, token) {
      context.commit("getUserToken", token);
    },
    // 异步改变底部导航的是否包含状态
    setNavbar(context, flag) {
      context.commit("navbarStatus", flag);
    },
    // 异步改变详情页商品数据
    setDetailGoodsData(context, val) {
      context.commit("detailGoodsData", val);
    },
    // 异步编辑收货人信息
    setAddressInfo(context, item) {
      context.commit("getAddressInfo", item);
    },
    // 异步编辑足迹总记录数
    setFootprintCount(context, num) {
      context.commit("getFootprintCount", num);
    },
    // 异步编辑购物车数量
    setCartNum(context) {
      context.commit("getCartNum");
    },
    // 2.如果本地存在Token 那么就自动登录
    autoLogin(context) {
      // 2.1 从本地获取
      let userToken = localStorage.userToken;
      let isLogin = localStorage.isLogin;
      if (userToken && isLogin) {
        context.commit("getUserToken", userToken);
        context.commit("setIslogin", isLogin);
      }
    }
  },
  getters: {
    cartnum(state) {
      return state.cartNum;
    }
    // getIslogin: state => {
    //   if (state.islogin == null) {
    //     return true;
    //   } else {
    //     return state.islogin;
    //   }
    // }
  },
  modules: {}
});
