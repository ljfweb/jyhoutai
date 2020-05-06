<template>
  <div class="courselist">
    <!-- 课程列表 -->
    <el-table :data="listData" style="width: 100%" height="380">
      <el-table-column fixed prop="Cname" label="课程名称" width="150">
      </el-table-column>
      <el-table-column prop="Cnumber" label="课程代号" width="200">
      </el-table-column>
      <el-table-column prop="onlineUser" label="在线人数" width="200">
      </el-table-column>
      <el-table-column label="所属分类" width="200">
        <template slot-scope="scope"
          >{{ scope.row.CategoryOne }}/{{ scope.row.CategoryTwo }}/{{
            scope.row.CategoryThree
          }}
        </template>
      </el-table-column>
      <el-table-column label="编辑日期" width="200">
        <template slot-scope="scope"
          >{{ scope.row.createAt | gettime("Y年M月D日 h:m") }}
        </template>
      </el-table-column>
      <el-table-column label="状态" width="100">
        <template slot-scope="scope"
          >{{
            scope.row.isState == 1
              ? "草稿"
              : scope.row.isState == 2
              ? "上架"
              : "下架"
          }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="320">
        <template slot-scope="scope">
          <el-button size="mini" type="info" @click="shelves(scope.row)">{{
            scope.row.isState == 1 || scope.row.isState == 3 ? "上架" : "下架"
          }}</el-button>
          <el-button size="mini" type="primary" @click="onEdit(scope.row)"
            >编辑</el-button
          >
          <el-button size="mini" type="danger" @click="onDelete(scope.row)"
            >删除</el-button
          >
          <el-button size="mini" type="success" @click="onTop(scope.row.ID)">{{
            scope.row.isTop ? "未置顶" : "已置顶"
          }}</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import mycourse from "@/store/course";
export default {
  name: "courselist",
  props: ["coursedata"],
  data() {
    return {
      list: []
    };
  },
  computed: {
    listData() {
      return this.coursedata.list;
    }
  },
  methods: {
    // 上架按钮
    shelves(data) {
      this.axios
        .post("/VueHandler/CourseHandler?action=state", {
          ID: data.ID
        })
        .then(res => {
          console.log(res);
          if (res.data.success) {
            this.$message.success(res.data.success);
            //重新请求数据
            if (data.isState == 1) {
              data.isState = 2;
            } else if (data.isState == 2) {
              data.isState = 3;
            } else {
              data.isState = 1;
            }
          }
        });
    },
    // 编辑按钮
    onEdit(data) {
      this.$router.push({
        name: "courseedit",
        query: { ID: data.ID, _id: data._id }
      });
    },
    // 删除按钮
    onDelete(data) {
      this.axios
        .post("/VueHandler/CourseHandler?action=delete", {
          _id: data._id,
          ID: data.ID
        })
        .then(res => {
          if (res.data.err) {
            this.$message.success("更新成功");
            //重新请求数据
            mycourse.state.listDate.getListData();
          }
        });
    },
    // 置顶按钮
    onTop(id) {
      this.axios
        .post("/VueHandler/CourseHandler?action=top", {
          ID: id
        })
        .then(res => {
          if (res.data.success) {
            this.$message.success(res.data.success);
            //重新请求数据
            mycourse.state.listDate.getListData();
          }
        });
    }
  }
};
</script>

<style lang="less" scoped>
.courselist {
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #ccc;
}
</style>
