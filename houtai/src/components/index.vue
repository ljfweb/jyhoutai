<template>
  <el-container class="index-container">
    <el-header>
      <jy-head></jy-head>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <!-- 左侧导航 -->
        <asideBar></asideBar>
      </el-aside>
      <!-- 面包屑导航 -->
      <el-main>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item v-for="item in levelList" :key="item.path">{{item.name}}</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 右侧显示区域 -->
        <appMain></appMain>
      </el-main>
    </el-container>
  </el-container>
</template>
 
<script>
import asideBar from "./pages/asideBar";
import appMain from "./pages/appMain";
import jyHead from "./jyhead";

export default {
  name: "index",
  components: {
    asideBar,
    appMain,
    jyHead
  },
  data() {
    return {
      levelList: null
    };
  },
  computed: {},
  watch: {
    $route() {
      this.getBreadcrumb();
    }
  },
  methods: {
    getBreadcrumb() {
      //$route.matched一个数组 包含当前路由的所有嵌套路径片段的路由记录
      let matched = this.$route.matched.filter(item => item.name);
      this.levelList = matched;
    }
  },
  created() {
    this.getBreadcrumb();
  },
  mounted() {}
};
</script>
 
<style lang="less" scoped>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}
.index-container {
  height: 100%;
}
.el-menu-item is-active {
  padding-left: 100px;
}
</style>