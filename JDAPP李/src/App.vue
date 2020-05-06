<template>
  <div id="app">
    <router-view />
    <nav-com></nav-com>
    <is-top-com></is-top-com>
  </div>
</template>
<script>
import navCom from "./components/navs.vue";
//引入一键置顶
import isTopCom from "./components/isTop.vue";
export default {
  name: "app",
  components: {
    navCom,
    isTopCom
  },
  created() {
    this.$store.commit("getshoppingCartNum");
  }
};
</script>

<style lang="less" scoped></style>
