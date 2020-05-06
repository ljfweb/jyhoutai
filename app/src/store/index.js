import Vue from "vue"
import Vuex from "vuex"
import Vueaxios from "vue-axios"
import axios from "axios"
Vue.use(Vueaxios, axios)
import qs from "qs"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    flag: true,
    allCartNum: 0,
    navsIndex: 0,
  },
  mutations: {
    // 底部导航改变
    changeNavsIndex(state, index) {
      state.navsIndex = index
    },
    changeFoot(state, status) {
      state.flag = status
    },
    getCartNum(state) {
      axios
        .post(
          "https://api.ymduo.com/Home/Cart/cartnum",
          qs.stringify({
            uid: 956532,
          })
        )
        .then((res) => {
          state.allCartNum = res.data.result.data
        })
    },
  },
  actions: {
    changeActFoot({ commit }, status) {
      commit("changeFoot", status)
    },
  },
  modules: {},
})
