<template>
  <div class="admin">
    <header-com></header-com>
    <div class="adminContent">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>系统人员</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="adminUserCla">
        <el-input v-model="searchIpt"
                  placeholder="姓名查询"></el-input>
        <el-button type="success"
                   @click="searchUser">查询</el-button>
        <el-button type="primary"
                   @click="addUser">+添加</el-button>
      </div>
      <div class="tableContent">
        <div class="tableHeader">
          <i class="el-icon-s-grid"></i>
          <span>系统人员列表</span>
        </div>
        <el-table :data="adminList"
                  style="width: 100%">
          <el-table-column prop="userName"
                           label="用户名"
                           width="180">
          </el-table-column>
          <el-table-column prop="turename"
                           label="姓名"
                           width="180">
          </el-table-column>
          <el-table-column prop="powerCode"
                           label="后台权限"
                           width="180">
            <template slot-scope="scope">
              {{ scope.row.powerCode == 1 ? "课程管理员" : "系统管理员" }}
            </template>
          </el-table-column>
          <el-table-column prop="phone"
                           label="手机"
                           width="180">
          </el-table-column>
          <el-table-column prop="upDateAt"
                           label="编辑日期"
                           width="250">
          </el-table-column>
          <el-table-column label="操作"
                           width="200">
            <template slot-scope="scope">
              <el-button type="text"
                         size="small"
                         @click="editUser(scope.row)">编辑</el-button>
              <el-button type="text"
                         size="small"
                         @click="deleteUser(scope.row.tokenId)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="block">
          <el-pagination layout="prev, pager, next"
                         :total="total"
                         @current-change="currentChange"
                         @prev-click="prevClick"
                         @next-click="nextClick"
                         :page-size="pageSize">
          </el-pagination>
        </div>
      </div>
    </div>

    <el-dialog :title="title"
               :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="用户名:"
                      :label-width="formLabelWidth">
          <el-input v-model="form.userName"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名:"
                      :label-width="formLabelWidth">
          <el-input v-model="form.turename"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号:"
                      :label-width="formLabelWidth">
          <el-input v-model="form.phone"
                    autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="权限选择:"
                      :label-width="formLabelWidth">
          <el-select v-model="form.power"
                     placeholder="请选择身份">
            <el-option label="系统管理员"
                       value="0"></el-option>
            <el-option label="课程管理员"
                       value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="addAndEditTrue">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import HeaderCom from "../../components/header"
export default {
  name: "admin",
  components: { HeaderCom },
  data () {
    return {
      searchIpt: "",
      adminList: [],
      dialogFormVisible: false,
      form: {},
      formLabelWidth: "120px",
      title: "",
      nowPage: 1,
      total: 0, //总数量
      pageSize: 0, //每页条数
      status: "", //添加或修改标识
      tokenId: "", //唯一id,修改使用
    }
  },
  methods: {
    getList () {
      this.axios({
        url: "/VueHandler/AdminHandler?action=show",
        method: "GET",
        params: {
          searchText: this.searchIpt,
          pageStart: this.nowPage,
        },
      }).then((res) => {
        this.total = res.data.data.count //总条数
        this.pageSize = res.data.data.pageSize // 每页条数
        this.adminList = res.data.data.list //数据
        console.log(this.adminList)
      })
    },
    // 搜索
    searchUser () {
      this.getList()
    },
    //添加按钮
    addUser () {
      this.dialogFormVisible = true
      this.title = "添加管理员"
      this.status = "add"
    },
    // 编辑按钮
    editUser (item) {
      console.log(item)
      this.dialogFormVisible = true
      this.title = "编辑管理员"
      this.status = "edit"
      //回显
      this.form = {
        userName: item.userName,
        turename: item.turename,
        phone: item.phone,
        power: item.power,
      }
      this.tokenId = item.tokenId
    },
    // 确认添加
    addAndEditTrue () {
      this.dialogFormVisible = false
      let url = ""
      if (this.status == "add") {
        this.form.password = "123456"
        url = "/VueHandler/AdminLoginAndRegHandler?action=add"
      } else {
        this.form.tokenId = this.tokenId
        url = "/VueHandler/AdminHandler?action=update"
      }
      this.axios({
        url: url,
        method: "POST",
        data: this.form,
      }).then((res) => {
        console.log(res)
        this.getList()
      })
    },
    // 删除
    deleteUser (tokenId) {
      // console.log(tokenId)
      this.$confirm("确定删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.axios({
            url: "/VueHandler/AdminHandler?action=delete",
            method: "GET",
            params: {
              tokenId: tokenId,
            },
          }).then((res) => {
            console.log(res)
            this.getList()
          })
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          })
        })
    },
    // 选择页数
    currentChange (page) {
      this.nowPage = page
      this.getList()
    },
    // 上一页
    prevClick () {
      this.nowPage = this.nowPage - 1
      this.getList()
    },
    // 下一页
    nextClick () {
      this.nowPage = this.nowPage + 1
      this.getList()
    },
  },
  mounted () {
    this.getList()

    // this.axios({
    //   url: "/VueHandler/CourseHandler?action=getpower",
    //   method: "GET",
    // }).then((res) => {
    //   console.log("getpower", res)
    // })
  },
}
</script>
<style lang="less" scoped>
.admin {
  .adminContent {
    height: 600px;
    width: 1200px;
    margin: 0 auto;
    // background: #ddd;
    padding: 0 10px;
    .el-breadcrumb {
      height: 50px;
      line-height: 50px;
    }
  }
  .adminUserCla {
    width: 100%;
    height: 57px;
    padding-top: 10px;
    .el-input {
      width: 260px;
      float: left;
    }
    .el-button:nth-of-type(1) {
      float: left;
      margin-left: 10px;
    }
    .el-button:nth-of-type(2) {
      float: right;
    }
  }
  .tableContent {
    // border: 1px solid #fff;
    .tableHeader {
      width: 100%;
      height: 40px;
      background: white;
      line-height: 40px;
      border-bottom: 1px solid #ddd;
      .el-icon-s-grid {
        width: 50px;
        border-right: 1px solid #ddd;
        text-align: center;
        font-size: 18px;
        line-height: 40px;
      }
      span {
        font-size: 18px;
        padding-left: 10px;
      }
    }
    .el-table {
      height: 300px;
    }
    .block {
      width: 100%;
      height: 40px;
      background: white;
      padding: auto 0;
    }
  }
}
</style>
