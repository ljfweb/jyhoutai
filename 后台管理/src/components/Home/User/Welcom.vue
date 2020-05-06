<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item to="/fromInput">首页</el-breadcrumb-item>
      <el-breadcrumb-item to="/echarts">图表显示</el-breadcrumb-item>
    </el-breadcrumb>
    <router-view></router-view>
  </div>
</template>
<style lang="less" scoped>
.el-breadcrumb {
    padding: 20px 20px;
}
</style>