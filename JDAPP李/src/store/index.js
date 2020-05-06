import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import qs from "qs";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    indexData: "",
    flag: true,
    cartNum: 1
  },
  mutations: {
    changefoot(state, status) {
      state.flag = status;
    },
    async getshoppingCartNum(state) {
      const { data: res } = await axios({
        url: "https://api.ymduo.com/Home/Cart/cartnum",
        method: "post",
        data: qs.stringify({
          uid: 956535
        })
      });
      console.log(res);
      state.cartNum = res.result.data;
    }
  },
  getters: {
    cartnum(state) {
      return state.cartNum;
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
