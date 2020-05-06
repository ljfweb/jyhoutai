<template>
  <div class="adminlist">
    <!-- 系统人员列表 -->
    <el-table :data="myadminlist" style="width: 100%" height="380">
      <el-table-column fixed prop="userName" label="用户名" width="200">
      </el-table-column>
      <el-table-column prop="turename" label="姓名" width="200">
      </el-table-column>
      <el-table-column label="后台权限" width="240">
        <template slot-scope="scope">
          {{ scope.row.power == 1 ? "系统管理员" : "课程管理员" }}
        </template>
      </el-table-column>
      <el-table-column prop="phone" label="手机" width="240"> </el-table-column>
      <el-table-column label="注册日期" width="240">
        <template slot-scope="scope"
          >{{ scope.row.upDateAt | gettime("Y年M月D日 h:m") }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="240">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-edit"
            @click="editlist(scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="deletelist(scope.row.tokenId)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "adminlist",
  props: ["myadminlist"],
  data() {
    return {};
  },
  methods: {
    // 编辑当前数据
    editlist(item) {
      this.$emit("myedit", item);
    },
    // 删除当前数据
    deletelist(id) {
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
            url: "/VueHandler/AdminHandler?action=delete",
            params: {
              tokenId: id
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
.adminlist {
  width: 100%;
}
</style>
