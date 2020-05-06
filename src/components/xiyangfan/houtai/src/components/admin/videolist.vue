<template>
  <div>
    <el-breadcrumb class="tnav" separator="/">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">用户管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>课程列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="serach">
      <div>
        <el-input v-model="searchText" placeholder="请输入内容"></el-input>
        <el-button type="success" @click="search">查询</el-button>
      </div>
      <el-button type="primary" @click="add">添加视频</el-button>
    </div>
    <div class="table_head">
      <i class="el-icon-platform-eleme"></i>
      系统人员管理
    </div>
    <div class="table_wrap">
      <el-table :data="tableData">
        <el-table-column label="用户名" width="180">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.userName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="姓名" width="180">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.turename }}</span>
          </template>
        </el-table-column>
        <el-table-column label="权限" width="180">
          <template slot-scope="scope">
            {{ scope.row.powerCode == 1 ? "课程管理员" : "系统管理员" }}
          </template>
        </el-table-column>
        <el-table-column label="手机" width="180">
          <template slot-scope="scope">{{ scope.row.phone }} </template>
        </el-table-column>
        <el-table-column label="创建时间" width="180">
          <template slot-scope="scope">{{ scope.row.createAt }} </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :page-size="1"
        background
        layout="prev, pager, next"
        :total="total"
        @prev-click="prev"
        @next-click="next"
        :current-page="currentpage"
        @current-change="nowpage"
      >
      </el-pagination>
    </div>
    <admin-alert
      :formLabelAlign="formLabelAlign"
      :dialogFormVisible="dialogFormVisible"
      :title="title"
      :status="status"
      :tokenid="tokenId"
    ></admin-alert>
  </div>
</template>

<script>
import adminAlert from "./adminAlert";
export default {
  name: "tablelist",
  components: {
    adminAlert
  },
  created() {
    this.getlist(1);
  },
  methods: {
    nowpage(val) {
      console.log(val);
      this.currentpage = val;
      this.getlist(this.currentpage);
    },
    prev() {
      // console.log(this.currentpage);
      this.getlist(this.currentpage);
    },
    next() {
      // console.log(this.currentpage);
      this.getlist(this.currentpage);
    },
    search() {
      //搜索
      this.getlist(1, this.searchText);
    },
    getlist(pageStart, searchText) {
      this.axios({
        url: "/VueHandler/AdminHandler?action=show",
        method: "get",
        params: {
          searchText: searchText,
          pageStart: pageStart
        }
      }).then(res => {
        console.log(res);
        this.tableData = res.data.data.list;
        this.total = Math.ceil(res.data.data.count / res.data.data.pageSize);
        // console.log(this.total);
      });
    },
    handleEdit(index, row) {
      //编辑方法
      this.status = "edit";
      console.log(index, row);
      this.dialogFormVisible = true;
      this.title = "编辑管理员";
      this.tokenId = row.tokenId;
      this.formLabelAlign.username = row.userName;
      this.formLabelAlign.turename = row.turename;
      this.formLabelAlign.power = row.power;
      this.formLabelAlign.phone = row.phone;
    },
    handleDelete(index, row) {
      //删除方法
      console.log(index, row);
      this.axios({
        url: "/VueHandler/AdminHandler?action=delete",
        method: "get",
        params: {
          tokenId: row.tokenId
        }
      }).then(res => {
        console.log(res);
        if (res.data.success) {
          this.getlist(1);
        } else {
          this.$message.error("删除失败");
        }
      });
    },
    add() {
      //显示弹出框
      this.status = "add";
      this.title = "添加管理员";
      this.dialogFormVisible = true;
    }
  },
  data() {
    return {
      currentpage: 1,
      total: 0,
      status: "add",
      tokenId: "",
      dialogFormVisible: false,
      title: "添加管理员",
      searchText: "",
      tableData: [],
      formLabelAlign: {
        username: "",
        phone: "",
        turename: "",
        power: "",
        options: [
          {
            value: "1",
            label: "系统管理员"
          },
          {
            value: "2",
            label: "课程管理员"
          }
        ]
      }
    };
  }
};
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
}
.table_head {
  width: 80%;
  margin: 0 auto;
  line-height: 40px;
  border: 1px solid #e5e5e5;
}
.tnav {
  width: 80%;
  margin: 0 auto;
  line-height: 50px;
  font-size: 20px;
  margin-left: 20px;
}
.serach {
  width: 80%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  padding: 0 40px;
  div {
    display: flex;
  }
}
.table_wrap {
  width: 80%;
  margin: 0 auto;
}
</style>
