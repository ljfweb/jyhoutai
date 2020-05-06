import Vue from "vue";
import Vuex from "vuex";
import axios from "axios"
import qs from "qs"

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cuindex: true,
    ccc: 0,
    num: "",
  },
  mutations: {
    footchange(state, pp) {
      state.cuindex = pp;
    },
    jianbu(state, jj) {
      state.ccc = jj;
    },
    dibu(state) {
      axios({
        url: "https://api.ymduo.com/Home/Cart/cartnum",
        method: "post",
        data: qs.stringify({
          uid: 956551
        })
      }).then(res => {
        state.num = res.data.result.data;
      });
    }

  },
  actions: {},
  modules: {}
});