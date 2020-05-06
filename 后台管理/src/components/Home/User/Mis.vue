<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>学员列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- card卡片 -->
    <el-card class="box-card">
      <!-- from查询 -->
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item>
          <el-input placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="邮箱"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="手机号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">查询</el-button>
        </el-form-item>
      </el-form>
      <!-- from添加 -->
         <el-form :inline="true" class="demo-form-inline">
        <el-form-item>
          <el-input placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="邮箱"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="手机号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">+添加</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 表格 -->
    <el-card class="box-card">
      <el-table style="width: 100%" :data="Mis_data">
        <el-table-column prop="userName" label="用户" width="180"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
        <el-table-column prop="phone" label="	手机" width="180"></el-table-column>
        <el-table-column prop="createAt" label="	注册日期" width="180"></el-table-column>
        <el-table-column prop="isstate" label="	状态" width="180"></el-table-column>
        <el-table-column label="	操作" width="180"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      page: { pageStart: 1 },
      Mis_data: []
    };
  },
  created() {
    this.get_Mis();
  },
  methods: {
    get_Mis() {
      this.axios
        .post("/VueHandler/AdminHandler?action=usershow", this.page)
        .then(res => {
          console.log(res);
          this.Mis_data = res.data.data.list;
        })
        .catch(err => {
          console.error(err);
        });
    }
  }
};
</script>

<style  scoped>
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 90%;
  margin: 10px 20px;
}
</style>