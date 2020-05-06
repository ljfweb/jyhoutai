<template>
  <div id="app">
    <router-view></router-view>
    <bottom-component v-if="botMode ? true : false"></bottom-component>
  </div>
</template>

<script>
// 引入底部组件
import bottomComponent from "./components/bottomNav.vue";
//引入函数处理===公共vuex
import { mapState } from "vuex";
export default {
  components: {
    //注册底部
    bottomComponent
  },
  computed: {
    //vuex的状态式用法
    ...mapState(["botMode"])
  }
};
</script>
