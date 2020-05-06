import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    botMode: true,
    searchVal: ""
  },
  mutations: {
    //处理底部显示隐藏函数
    Handle_Bottom(state, modes) {
      state.botMode = modes;
    },
    //搜索字段全局共享函数
    handle_Search(state, payLoad) {
      state.searchVal = payLoad;
    }
  },
  actions: {},
  modules: {}
});
