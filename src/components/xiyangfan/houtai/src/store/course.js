// 课程vuex
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)
var uuidfn = function() {
  var len = 8
  var radix = 0
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split(
    ''
  )
  var uuid = [],
    i
  radix = radix || chars.length

  if (len) {
    for (i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)]
  } else {
    var r
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
    uuid[14] = '4'

    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | (Math.random() * 16)
        uuid[i] = chars[i == 19 ? (r & 0x3) | 0x8 : r]
      }
    }
  }

  return uuid.join('')
}
const state = {
  getcategory: '',
  uuids: uuidfn(),
  PicList: {
    list: [
      {
        uuids: uuidfn(),
        imags: { value: '' },
        aTextU: '上传',
        aTextC: '清除',
        defaultStr: { value: '视频应小于1G' }
      },
      {}
    ]
  }
}
const mutations = {
  getlist(state) {
    axios({
      url: '/VueHandler/CourseHandler?action=getcategory',
      method: 'get'
    }).then(res => {
      console.log(res)
      state.getcategory = res.data
    })
  }
}
const getters = {
  getcategory(state) {
    return state.getcategory
  }
}
const actions = {}
export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions
})
