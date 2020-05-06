<template>
  <div class="admin">
    <!-- 用户管理相关页面 -->
    <!-- 头部组件 -->
    <comHeader></comHeader>
    <!-- 用户列表内容 -->
    <div class="adminContainer">
      <!-- 面包屑导航 -->
      <div class="tableBreadTitle">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item><a href="#">用户管理</a></el-breadcrumb-item>
          <el-breadcrumb-item>系统人员</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 用户表格查找模块 -->
      <div class="table-searchutil">
        <el-row :gutter="20">
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-input
                placeholder="姓名查询"
                prefix-icon="el-icon-user"
                v-model="AdminUserName"
              >
              </el-input>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-tooltip
                class="item"
                effect="dark"
                content="查询用户"
                placement="top"
              >
                <el-button
                  type="success"
                  icon="el-icon-search"
                  @click="searchAdminUser"
                  >查询</el-button
                >
              </el-tooltip>
            </div>
          </el-col>
          <el-col :span="11">
            <div class="grid-content bg-purple mybutton">
              <el-tooltip
                class="item"
                effect="dark"
                content="添加用户"
                placement="top"
              >
                <el-button
                  type="primary"
                  icon="el-icon-plus"
                  @click="addAdminUser"
                  >添加</el-button
                >
              </el-tooltip>
            </div>
          </el-col>
        </el-row>
      </div>
      <!-- 系统人员列表信息 -->
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
              <div class="grid-content bg-purple-light mytitle">
                系统人员列表
              </div>
            </el-col>
          </el-row>
        </div>
        <!-- 列表内容信息 -->
        <adminList
          @mydelete="mydelete"
          @myedit="myedit"
          :myadminlist="adminList"
        ></adminList>
        <!-- 列表分页 -->
        <el-pagination
          background
          layout="prev, pager, next"
          :page-size="pagesize"
          :current-page="currentPage"
          :total="pageTotal"
          @current-change="OnChangePage"
        >
        </el-pagination>
      </div>
      <!-- 添加和编辑的弹框 -->
      <adminAlert
        :title="title"
        :status="status"
        :tokenid="tokenId"
        :dialogformvisible="dialogFormVisible"
        :adminLabelAlign="adminLabelAlign"
        @onclosedialog="closeDialog"
        @refresh="refresh"
      ></adminAlert>
    </div>
  </div>
</template>

<script>
import comHeader from "components/comHeader";
import adminList from "./adminList"; //注册列表子组件
import adminAlert from "./adminAlert";
export default {
  name: "admin",
  components: {
    comHeader,
    adminList,
    adminAlert
  },
  data() {
    return {
      AdminUserName: "", //绑定用户姓名
      currentPage: 1, //当前页码
      pageTotal: 0, //总记录数
      pagesize: 3, //每页显示的条数
      adminList: [], //系统人员列表
      tokenId: "", //修改需要的id
      status: "add", //弹框的状态add or edit
      dialogFormVisible: false, //弹框的显示隐藏
      title: "添加管理员", //弹框的标题
      // 添加信息的配置项
      adminLabelAlign: {
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
  methods: {
    // 通过子组件来关闭弹窗
    closeDialog(val) {
      this.dialogFormVisible = val;
    },
    // 查询用户
    searchAdminUser() {
      this.getAdminList(this.currentPage, this.AdminUserName);
      this.AdminUserName = "";
    },
    // 添加系统管理员
    addAdminUser() {
      this.status = "add";
      this.title = "添加管理员";
      this.dialogFormVisible = true;
      this.adminLabelAlign = {
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
      };
    },
    // 改变当前页面触发
    OnChangePage(val) {
      this.currentPage = val;
      this.getAdminList(this.currentPage, this.AdminUserName);
    },
    // 获取系统人员信息
    getAdminList(pages, searchtxt) {
      this.axios({
        method: "get",
        url: "/VueHandler/AdminHandler?action=show",
        params: {
          searchText: searchtxt,
          pageStart: pages
        }
      }).then(res => {
        // console.log(res);
        if (!res.data.err) {
          this.adminList = res.data.data.list;
          this.pageTotal = Number(res.data.data.count);
          this.pagesize = Number(res.data.data.pageSize);
        } else {
          this.$message.warning(res.data.err);
        }
      });
    },
    // 编辑信息
    myedit(item) {
      this.status = "edit";
      this.title = "编辑管理员";
      this.dialogFormVisible = true;
      this.tokenId = item.tokenId;
      this.adminLabelAlign.username = item.userName;
      this.adminLabelAlign.turename = item.turename;
      this.adminLabelAlign.power = item.power;
      this.adminLabelAlign.phone = item.phone;
    },
    // 删除信息
    mydelete() {
      this.getAdminList(this.currentPage);
    },
    // 添加和编辑完成刷新列表
    refresh() {
      this.getAdminList(this.currentPage);
    }
  },
  created() {
    this.getAdminList(this.currentPage);
  }
};
</script>

<style lang="less" scoped>
.admin {
  width: 100%;
  .adminContainer {
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
        .mybutton {
          text-align: right;
        }
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
