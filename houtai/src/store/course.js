import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);

var tableList = () => {
  axios({
    method: "post",
    url: "/VueHandler/CourseHandler?action=show",
    data: {
      searchText: state.searchText,
      pageStart: state.pageStart,
      _id: state._id,
      CategoryOne: state.CategoryOne,
      CategoryTwo: state.CategoryTwo,
      CategoryThree: state.CategoryThree
    }
  }).then(res => {
    state.listDate.list = res.data.data.list;
    state.pageCount = res.data.data.count;
    state.pageSize = res.data.data.pageSize;
  });
};

const state = {
  _id: "",
  searchText: "",
  pageStart: 1, //当前页面
  pageCount: 0, //总条数
  pageSize: 3, //一页显示的条数
  CategoryOne: "",
  CategoryTwo: "",
  CategoryThree: "",
  listDate: {
    getListData: tableList,
    list: [],
    btnList: {
      btn_click() {
        tableList();
      }
    }
  }
};

export default new Vuex.Store({
  state
});
