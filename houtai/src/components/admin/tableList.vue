<template>
  <div class="tabList">
    <!-- 首页/用户管理/系统人员 -->
    <div class="center_top_nav">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>系统人员</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="cha">
        <div class="cha_left">
          <input v-model="searchText" type="text" placeholder="姓名查询" />
          <el-button @click="getData(1,searchText)" type="success" size="small">查询</el-button>
        </div>
        <div class="cha_right">
          <el-button type="primary" size="small" @click="add">+添加</el-button>
        </div>
      </div>

      <!-- 表格 -->
      <div class="center">
        <div class="center_top">
          <i class="el-icon-s-grid"></i>
          <div class="dan">系统人员名单</div>
        </div>

        <el-table :data="tableData" border style="wiscopedth: 100%">
          <el-table-column fixed="left" prop="userName" label="用户名" width="120"></el-table-column>
          <el-table-column prop="turename" label="姓名" width="120"></el-table-column>
          <el-table-column prop="phone" label="电话" width="120"></el-table-column>
          <el-table-column prop="scope" label="权限" width="120">
            <template slot-scope="scope">{{ scope.row.powerCode == 1 ? "课程管理员" : "系统管理员" }}</template>
          </el-table-column>
          <el-table-column label="创建时间" width="300">
            <template slot-scope="scope">{{ scope.row.createAt }}</template>
          </el-table-column>
    
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <el-button
                @click="deleteUser(scope.$index, scope.row.tokenId)"
                type="text"
                size="small"
              >删除</el-button>
              <el-button @click="handleEdit(scope.$index, scope.row)" type="text" size="small">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 分页 -->
      <el-pagination
        :page-size="1"
        background
        layout="prev, pager, next"
        :total="total"
        @current-change="nowpage"
      ></el-pagination>
      <!-- 弹出 -->
      <admin-alert
        :formLabelAlign="formLabelAlign"
        :dialogFormVisible="dialogFormVisible"
        :title="title"
        :status="status"
        :tokenid="tokenId"
      ></admin-alert>
    </div>
  </div>
</template>
<script>
import adminAlert from "./adminAlert";
export default {
  name: "tableList",
  data() {
    return {
      activeName: "first",
      tableData: [],
      total: 0,
      currentpage: 1,
      searchText: "",
      status: "add",
      tokenId: "",
      dialogFormVisible: false,
      title: "添加管理员",

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
  },
  components: {
    adminAlert
  },
  mounted() {
    this.getData(1);
     
    
  },
  methods: {
    add() {
      // console.log('打开弹窗')
      //显示弹出框
      this.status = "add";
      this.title = "添加管理员";
      this.dialogFormVisible = true;
    },
    deleteUser(index, id) {
      console.log(index, id);

      this.$confirm("此操作将永久删除该人员, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.axios({
            url: "/VueHandler/AdminHandler?action=delete",
            method: "get",
            params: {
              key: index,
              tokenId: id
            }
          }).then(res => {
            console.log(res);
            this.$router.go();
          });
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    
    nowpage(val) {
      this.currentpage = val;
      this.getData(val);
    },

    getData(pageStart, searchText) {
      this.axios({
        url: "/VueHandler/AdminHandler?action=show",
        method: "get",
        params: {
          searchText: searchText,
          pageStart: pageStart
        }
      }).then(res => {
        console.log(res);
        console.log(res.data.data.list);
        this.tableData = res.data.data.list;

        this.total = Math.ceil(res.data.data.count / res.data.data.pageSize);
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
    handleUser(row) {
      console.log(row);
    },
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>

<style lang="less" scoped>
.center_top_nav {
  width: 100%;
  height: 46px;

  .el-breadcrumb {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .cha {
    width: 100%;
    height: 42px;
    border: 1px solid #ccc;
    background-color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    box-sizing: border-box;
    .cha_left {
      width: 20%;
      height: 100%;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      input {
        width: 70%;
        height: 60%;
      }
      // .el-button {
      //   width: 20%;
      //   height: 60%;
      //   font-size: 14px;
      // }
    }
    .cha_right {
      width: 10%;
      height: 100%;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      // .el-button {
      //   width: 40%;
      //   height: 60%;
      //   font-size: 14px;
      // }
    }
  }

  //中央人员名单
  .center {
    width: 100%;
    margin-top: 20px;
    background-color: white;

    .center_top {
      width: 100%;
      height: 30px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      border: 1px solid;
      box-sizing: border-box;
      .el-icon-s-grid {
        width: 30px;
        height: 100%;
        text-align: center;
        line-height: 30px;
        border-right: 1px solid;
        background-color: #ccc;
      }
      .dan {
        width: 90%;
        height: 100%;
        line-height: 30px;
        padding-left: 30px;
        box-sizing: border-box;
        
      }
    }
  }
}

</style>