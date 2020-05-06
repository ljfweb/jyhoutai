import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    indexData:"",
    flag:true
  },  
  mutations: {
    changefoot(state,status){
      state.flag=status;
    }
  },
  actions: {
    changeAfoot(context,status){
      context.commit("changefoot",status)
    }
    
  },
  modules: {}
});
