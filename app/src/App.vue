<template>
  <div id="app">
    <router-view />
    <nav-com></nav-com>
    <top-com></top-com>
  </div>
</template>
<script>
import NavCom from "./components/navs.vue";
import TopCom from './components/top.vue'
export default {
  components: {
    NavCom, TopCom
  }
};
</script>

<style lang="less"></style>
