import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios';
import qs from 'qs';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    indexData: "",
    flag: true,
    num: 1 //购物车总数
  },
  mutations: {
    changefoot(state, status) {
      state.flag = status;
    },
    getNum(state) {
      // 购物车数量
      axios({
        url: "https://api.ymduo.com/Home/Cart/cartnum",
        method: "post",
        data: qs.stringify({
          uid: 956547
        })
      }).then(res => {
        console.log("购物车数量88888：" + res.data.result.data);
        state.num = res.data.result.data;
      })
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