<template>
  <div class="studentlist">
    <!-- 学员列表 -->
    <el-table :data="studentlist" style="width: 100%" height="380">
      <el-table-column fixed prop="userName" label="用户" width="200">
      </el-table-column>
      <el-table-column prop="email" label="邮箱" width="280"> </el-table-column>
      <el-table-column prop="phone" label="手机" width="280"> </el-table-column>
      <el-table-column label="注册日期" width="280">
        <template slot-scope="scope"
          >{{ scope.row.createAt | gettime("Y年M月D日 h:m") }}
        </template>
      </el-table-column>
      <el-table-column label="状态" width="100">
        <template slot-scope="scope"
          >{{ scope.row.isstate ? "冻结" : "可用" }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="120">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="freeze(scope.row.tokenId)"
            >{{ scope.row.isstate ? "解冻" : "冻结" }}</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "studentlist",
  props: ["studentlist"],
  data() {
    return {};
  },
  methods: {
    // 点击冻结按钮
    freeze(id) {
      this.axios({
        method: "get",
        url: "/VueHandler/AdminHandler?action=lockuser",
        params: {
          tokenId: id
        }
      }).then(res => {
        this.$message.success(res.data.success);
        this.$emit("myfreeze");
      });
    }
  },
  mounted() {}
};
</script>

<style lang="less" scoped>
.studentlist {
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #ccc;
}
</style>
