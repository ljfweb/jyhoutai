<template>
  <div id="app">
    <router-view />
    <tabBar v-if="$store.state.isNavbar" :islogin="isLogin"></tabBar>
    <!-- 一键置顶 -->
    <backTop></backTop>
  </div>
</template>
<script>
import tabBar from "components/tabBar";
import backTop from "components/backTop"; //一键置顶
export default {
  name: "app",
  components: {
    tabBar,
    backTop
  },
  computed: {
    isLogin: {
      get() {
        return this.$store.state.isLogin;
      },
      set(val) {
        this.$store.state.isLogin = val;
      }
    }
  },
  watch: {
    isLogin(val) {
      this.isLogin = val;
    }
  },
  mounted() {
    //在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem("store")) {
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          JSON.parse(sessionStorage.getItem("store"))
        )
      );
    }
    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("store", JSON.stringify(this.$store.state));
    });
  }
};
</script>
<style lang="less"></style>
