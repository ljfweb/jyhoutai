<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
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
