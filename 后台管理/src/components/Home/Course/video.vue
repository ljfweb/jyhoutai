<template>
  <div>
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
      <el-table style="width: 100%" :data="Video_data">
        <el-table-column prop="Vname" label="视频名称" width="180"></el-table-column>
        <el-table-column prop="Vstate" label="视频状态" width="180"></el-table-column>
        <el-table-column prop="Vtime" label="	视频时长" width="180"></el-table-column>
        <el-table-column prop="createAt" label="	发布日期" width="180"></el-table-column>
        <el-table-column prop="Vurl" label="	视频地址" width="180"></el-table-column>
        <el-table-column label="	操作" width="180"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      video: { searchText: "" , pageStart: 1},
      Video_data: []
    };
  },
  created() {
    this.get_Mis();
  },
  methods: {
    get_Mis() {
      this.axios
        .post("/VueHandler/VideoHandler?action=showlist", this.video)
        .then(res => {
          console.log(res);
          this.Video_data = res.data.data.list;
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