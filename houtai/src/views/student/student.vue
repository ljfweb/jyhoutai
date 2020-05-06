<template>
  <div class="student">
    <!-- 头部栏 -->
    <comHeader></comHeader>
    <!-- 学员列表内容 -->
    <div class="studentContainer">
      <!-- 头部面包屑导航 -->
      <div class="tableBreadTitle">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item><a href="#">用户管理</a></el-breadcrumb-item>
          <el-breadcrumb-item>学员列表</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 用户表格查找模块 -->
      <div class="table-searchutil">
        <el-row :gutter="20">
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-input
                placeholder="用户名"
                prefix-icon="el-icon-user"
                v-model="searchStudent.userName"
              >
              </el-input>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-input
                placeholder="邮箱"
                prefix-icon="el-icon-message"
                v-model="searchStudent.email"
              >
              </el-input>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-input
                placeholder="手机号"
                prefix-icon="el-icon-phone"
                v-model="searchStudent.phone"
              >
              </el-input>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-tooltip
                class="item"
                effect="dark"
                content="搜索用户"
                placement="top"
              >
                <el-button
                  type="success"
                  icon="el-icon-search"
                  @click="searchUserInfo"
                  >搜索</el-button
                >
              </el-tooltip>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-input
                placeholder="用户名"
                prefix-icon="el-icon-user"
                v-model="addStudent.userName"
              >
              </el-input>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-input
                placeholder="邮箱"
                prefix-icon="el-icon-message"
                v-model="addStudent.email"
              >
              </el-input>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-input
                placeholder="手机号"
                prefix-icon="el-icon-phone"
                v-model="addStudent.phone"
              >
              </el-input>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-tooltip
                class="item"
                effect="dark"
                content="添加用户"
                placement="bottom"
              >
                <el-button
                  type="primary"
                  icon="el-icon-plus"
                  @click="addUserInfo"
                  >添加</el-button
                >
              </el-tooltip>
            </div>
          </el-col>
        </el-row>
      </div>
      <!-- 学员列表信息 -->
      <div class="table-list">
        <!-- 列表标题信息 -->
        <div class="list-title">
          <el-row>
            <el-col :span="1">
              <div class="grid-content bg-purple myicon">
                <i class="el-icon-s-grid" style=""></i>
              </div>
            </el-col>
            <el-col :span="23">
              <div class="grid-content bg-purple-light mytitle">学员列表</div>
            </el-col>
          </el-row>
        </div>
        <!-- 列表内容信息 -->
        <studentList
          :studentlist="studentList"
          @myfreeze="onFreeze"
        ></studentList>
        <!-- 列表分页 -->
        <el-pagination
          background
          layout="prev, pager, next"
          :page-size="6"
          :current-page="currentPage"
          :total="pageTotal"
          @current-change="OnChangePage"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import comHeader from "components/comHeader";
import studentList from "./studentList";
export default {
  name: "student",
  components: {
    comHeader,
    studentList
  },
  data() {
    return {
      //搜索用户
      searchStudent: {
        userName: "",
        email: "",
        phone: ""
      },
      //添加用户
      addStudent: {
        userName: "",
        email: "",
        phone: ""
      },
      studentList: [], //用户列表
      currentPage: 1, //当前页面
      pageTotal: 0 //总条目数
    };
  },
  methods: {
    // 获取学员数据列表
    getStudentList(pageStart, userName, phone, email) {
      this.axios
        .post("/VueHandler/AdminHandler?action=usershow", {
          pageStart,
          userName,
          phone,
          email
        })
        .then(res => {
          // console.log(res);
          this.studentList = res.data.data.list;
          this.pageTotal = res.data.data.count;
        });
    },
    // 搜索用户信息
    searchUserInfo() {
      this.getStudentList(
        this.currentPage,
        this.searchStudent.userName,
        this.searchStudent.phone,
        this.searchStudent.email
      );
      this.searchStudent = {};
    },
    // 添加用户信息
    addUserInfo() {
      this.axios
        .post("/VueHandler/AdminHandler?action=adduser", {
          adduserName: this.addStudent.userName,
          addemail: this.addStudent.email,
          addphone: this.addStudent.phone
        })
        .then(res => {
          // console.log(res);
          this.$message.success(res.data.success);
          this.addStudent = {};
        });
    },
    // 点击分页切换显示
    OnChangePage(page) {
      this.currentPage = page;
      this.getStudentList(this.currentPage);
    },
    // 控制解冻按钮
    onFreeze() {
      this.getStudentList(this.currentPage);
    }
  },
  created() {
    this.getStudentList(this.currentPage);
  }
};
</script>

<style lang="less" scoped>
.student {
  width: 100%;
  .studentContainer {
    padding: 10px;
    background-color: #f5f5f5;
    height: 100%;
    .tableBreadTitle {
      height: 30px;
      .el-breadcrumb {
        font-size: 16px;
        line-height: 30px;
      }
    }
    .table-searchutil {
      width: 100%;
      box-sizing: border-box;
      padding: 10px;
      border: 1px solid #ccc;
      .el-row {
        margin: 10px 0;
      }
    }
    .table-list {
      margin-top: 20px;
      padding: 10px;
      box-sizing: border-box;
      border: 1px solid #ccc;
      .list-title {
        box-sizing: border-box;
        height: 40px;
        line-height: 40px;
        border: 1px solid #ccc;
        .myicon {
          text-align: center;
          border-right: 1px solid #ccc;
        }
        .mytitle {
          margin-left: 20px;
        }
      }
      .el-pagination {
        padding: 0;
        border: 1px solid #ccc;
        margin-top: 10px;
      }
    }
  }
}
</style>
