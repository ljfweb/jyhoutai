<template>
  <div class="student">
    <header-com> </header-com>
    <div class="studentContent">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>学员管理</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="studentFindCla">
        <el-input v-model="search.userName"
                  placeholder="用户名"></el-input>
        <el-input v-model="search.email"
                  placeholder="邮箱"></el-input>
        <el-input v-model="search.phone"
                  placeholder="手机号"></el-input>
        <el-button type="success"
                   @click="searchStudent">查询</el-button>
      </div>
      <div class="studentAddCla">
        <el-input v-model="stu.adduserName"
                  placeholder="用户名"></el-input>
        <el-input v-model="stu.addemail"
                  placeholder="邮箱"></el-input>
        <el-input v-model="stu.addphone"
                  placeholder="手机号"></el-input>
        <el-button type="success"
                   @click="addStudent">添加</el-button>
      </div>
      <div class="studentContent">
        <div class="studentHeader">
          <i class="el-icon-s-grid"></i>
          <span>学员列表</span>
        </div>
        <el-table :data="studentList"
                  style="width: 100%">
          <el-table-column prop="userName"
                           label="用户"
                           width="180">
          </el-table-column>
          <el-table-column prop="email"
                           label="邮箱"
                           width="200">
          </el-table-column>

          <el-table-column prop="phone"
                           label="手机"
                           width="180">
          </el-table-column>
          <el-table-column prop="createAt"
                           label="注册日期"
                           width="250">
          </el-table-column>
          <el-table-column prop="isstate"
                           label="状态"
                           width="160">
            <template slot-scope="scope">
              {{ scope.row.isstate == false ? "活跃" : "冻结" }}
            </template>
          </el-table-column>
          <el-table-column label="操作"
                           width="200">
            <template slot-scope="scope">
              <el-button type="text"
                         size="small"
                         @click="thaw(scope.row.tokenId, scope.row.isstate)">{{ scope.row.isstate == false ? "冻结" : "解冻" }}</el-button>
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
  </div>
</template>

<script>
import HeaderCom from "../../components/header"
export default {
  name: "student",
  components: { HeaderCom },
  data () {
    return {
      studentList: [], //学员列表
      stu: {},
      search: {},
      nowPage: 1, //当前页数
      total: 0, //总数量
      pageSize: 0, //每页条数
      status: "", //添加或修改标识
      tokenId: "", //唯一id,修改使用
    }
  },
  methods: {
    // 添加学员
    addStudent () {
      // console.log(this.stu)
      this.axios({
        url: "/VueHandler/AdminHandler?action=adduser",
        method: "POST",
        data: this.stu,
      }).then((res) => {
        console.log(res)
        this.getList()
      })
    },
    // 获取所有数据
    getList () {
      this.axios({
        url: "/VueHandler/AdminHandler?action=usershow",
        method: "POST",
        data: {
          pageStart: this.nowPage,
          userName: this.search.userName,
          email: this.search.email,
          phone: this.search.phone,
        },
      }).then((res) => {
        console.log("aaa", res.data.data)
        this.total = res.data.data.count //总条数
        this.pageSize = res.data.data.pageSize // 每页条数
        this.studentList = res.data.data.list //数据
        console.log(this.studentList)
      })
    },
    // 查询学员
    searchStudent () {
      console.log(this.search)
      this.getList()
    },
    // 解冻
    thaw (id, state) {
      let s = state == false ? "冻结" : "冻结"
      this.$confirm("确定" + s + "吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.axios({
            url: "/VueHandler/AdminHandler?action=lockuser",
            method: "GET",
            params: {
              tokenId: id,
            },
          }).then((res) => {
            console.log(res)
            this.getList()
          })
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消" + s + "",
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
  },
}
</script>
<style lang="less" scoped>
.student {
  .studentContent {
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
  .studentFindCla,
  .studentAddCla {
    width: 100%;
    height: 57px;
    padding-top: 10px;
    .el-input {
      width: 260px;
      margin-right: 20px;
    }
  }

  .studentContent {
    // border: 1px solid #fff;
    .studentHeader {
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
