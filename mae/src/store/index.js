import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import qs from "qs";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    indexData: "",
    flag: true,
    num: 1, //购物车总数,
    address: {}
  },
  mutations: {
    changefoot(state, status) {
      state.flag = status;
    },
    getAddress(state, address) {
      //切换地址
      //给地址赋值
      state.address = address;
    },
    initAddress(state) {
      //初始化地址
      axios({
        url: "https://api.ymduo.com/Address/addresslists",
        method: "post",
        data: qs.stringify({
          uid: 956519
        })
      }).then(res => {
        console.log(res);
        res.data.result.data.forEach(element => {
          if (element.def == "1") {
            state.address = element; //赋值为默认地址
            console.log(state.address);
          }
        });
      });
    },
    getNum(state) {
      //购物车数量
      axios({
        url: "https://api.ymduo.com/Home/Cart/cartnum",
        method: "post",
        data: qs.stringify({
          uid: 956519
        })
      }).then(res => {
        console.log("购物车数量88888：" + res.data.result.data);
        state.num = res.data.result.data;
      });
    }
  },
  getters: {
    cartnum(state) {
      return state.num;
    }
  },
  actions: {
    changeAfoot(context, status) {
      context.commit("changefoot", status);
    }
    // changeBfoot({commit}){
    //  commit("changefoot")
    // }
  },
  modules: {}
});
