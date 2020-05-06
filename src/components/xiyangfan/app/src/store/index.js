import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import qs from "qs";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    indexData: "",
    flag: true,
    num: 1,
    address: {},
    categoryId: ""
  },
  mutations: {
    changefoot(state, status) {
      state.flag = status;
    },
    getcategoryId(state, id) {
      state.categoryId = id;
    },
    getAddress(state, address) {
      state.address = address;
    },
    initAddress(state) {
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
            state.address = element;
            console.log(state.address);
          }
        });
      });
    },
    getNum(state) {
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
  },
  modules: {}
});
