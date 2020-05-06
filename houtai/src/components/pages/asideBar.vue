<template>
  <div class="aside-container">
    <el-row class="tac">
      <el-col :span="24">
        <!-- 整体左侧导航 -->
        <el-menu
          router
          :default-active="$route.path"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <!-- 左侧导航栏抽取循环部分 将路由列表传给子组件-->
          <asideBarItem v-for="router in routers" :router="router" :key="router.path"></asideBarItem>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>
 
<script>
import asideBarItem from "./asideBarItem";
export default {
  name: "asideBar",
  components: {
    asideBarItem
  },
  data() {
    return {};
  },
  computed: {
    routers() {
      console.log(this.$router.options);
      this.$router.options;
      //   获取路由列表;
      return this.$router.options.routes[0].children;
    }
  },
  watch: {},
  methods: {
    handleOpen(key, keyPath) {
      //点击打开时当前的路径
      console.log(key, keyPath, "handleOpen");
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath, "handleClose");
    }
  },
  created() {
    console.log(this.$router.options.routes[1]);
  },
  mounted() {
    console.log(this.$router.options.routes[1]);
  }
};
</script>
 
<style lang="less" scoped>
// .aside-container {
//   height: 100%;
// }

.el-menu-item .is-active {
  padding-left: 100px;
}
</style>