// 课程vuex
import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);
// axios.defaults.baseURL = "http://localhost:3000";
// var $axios = axios.create({
//   baseURL: "http://localhost:3000/VueHandler"
// });
// const getlist = () => {
//   axios.post({});
// };
var uuidfn = function() {
  //生成uuid码

  var len = 8;
  var radix = 0;
  var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(
    ""
  );
  var uuid = [],
    i;
  radix = radix || chars.length;

  if (len) {
    // Compact form
    for (i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)];
  } else {
    // rfc4122, version 4 form
    var r;

    // rfc4122 requires these characters
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = "-";
    uuid[14] = "4";

    // Fill in random data.  At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | (Math.random() * 16);
        uuid[i] = chars[i == 19 ? (r & 0x3) | 0x8 : r];
      }
    }
  }

  return uuid.join("");
};
const state = {
  getcategory: "", //分类数据
  uuids: uuidfn(),
  PicList: {
    list: [
      {
        uuids: uuidfn(),
        imags: { value: "" }, //图片数据
        aTextU: "上传", //上传按钮名称
        aTextC: "清除", //清除按钮名称
        defaultStr: { value: "视频应小于1G" }
      },
      {}
    ]
  }
};
const mutations = {
  getlist(state) {
    axios({
      url: "/VueHandler/CourseHandler?action=getcategory",
      method: "get"
    }).then(res => {
      console.log(res);
      state.getcategory = res.data;
    });
  }
};
const getters = {
  getcategory(state) {
    return state.getcategory;
  }
};
const actions = {};
export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions
});
