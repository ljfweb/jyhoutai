<template>
  <div class="videolist">
    <!-- 视频列表 -->
    <el-table :data="myvideolist" style="width: 100%" height="380">
      <el-table-column fixed prop="Vname" label="名称" width="200">
      </el-table-column>
      <el-table-column prop="Vstate" label="绑定课程" width="400">
      </el-table-column>
      <el-table-column prop="Vtime" label="时长" width="240"> </el-table-column>
      <el-table-column label="上传日期" width="280">
        <template slot-scope="scope"
          >{{ scope.row.createAt | gettime("Y年M月D日 h:m") }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-edit"
            @click="videoedit(scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="videodelete(scope.row.ID)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "videolist",
  props: ["myvideolist"],
  data() {
    return {
      // myvideolist: [
      //   {
      //     Vname: "",
      //     Vstate: "",
      //     Vtime: "",
      //     createAt: ""
      //   }
      // ]
    };
  },
  methods: {
    // 视频编辑
    videoedit(item) {
      this.$emit("myedit", item);
    },
    // 删除视频
    videodelete(id) {
      this.$confirm("此操作将永久删除该系统人员, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.axios({
            method: "get",
            url: "/VueHandler/VideoHandler?action=delete",
            params: {
              ID: id
            }
          }).then(() => {
            // console.log(res);
            this.$emit("mydelete");
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>

<style lang="less" scoped>
.videolist {
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #ccc;
}
</style>
