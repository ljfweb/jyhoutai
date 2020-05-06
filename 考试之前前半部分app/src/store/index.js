import Vue from "vue";
import Vuex from "vuex";
// import axios from 'axios'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    indexData: "",
    flag: true,
    arr:[]
  },
  mutations: {
    changefoot(state, status) {
      state.flag = status;
    },
    addLoopSwiper(state,payLoad){
      state.arr=state.arr.concat(payLoad)
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
