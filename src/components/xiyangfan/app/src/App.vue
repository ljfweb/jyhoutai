<template>
  <div id="app">
    <router-view />

    <nav-com></nav-com>
  </div>
</template>
<script>
import navCom from "./components/navs.vue";
export default {
  name: "app",
  components: {
    navCom
  }
};
</script>

<style lang="less"></style>
