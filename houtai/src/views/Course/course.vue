<template>
  <div class="course">
    <header-com></header-com>
    <div class="courseContent">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>课程管理</el-breadcrumb-item>
        <el-breadcrumb-item>课程列表</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="courseFindCla">
        <el-input v-model="searchText"
                  placeholder="课程名称搜索"></el-input>
        <el-select v-model="select"
                   slot="prepend"
                   placeholder="请选择">
          <el-option label="餐厅名"
                     value="1"></el-option>
          <el-option label="订单号"
                     value="2"></el-option>
          <el-option label="用户电话"
                     value="3"></el-option>
        </el-select>
        <el-select v-model="select"
                   slot="prepend"
                   placeholder="请选择">
          <el-option label="餐厅名"
                     value="1"></el-option>
          <el-option label="订单号"
                     value="2"></el-option>
          <el-option label="用户电话"
                     value="3"></el-option>
        </el-select>
        <el-select v-model="select"
                   slot="prepend"
                   placeholder="请选择">
          <el-option label="餐厅名"
                     value="1"></el-option>
          <el-option label="订单号"
                     value="2"></el-option>
          <el-option label="用户电话"
                     value="3"></el-option>
        </el-select>
        <el-button type="success"
                   @click="searchFun">查询</el-button>
        <el-button type="primary"
                   style="float:right"
                   @click="$router.push('/courseEdit')">+添加</el-button>
      </div>

      <div class="courseContent">
        <div class="courseHeader">
          <i class="el-icon-s-grid"></i>
          <span>课程列表</span>
        </div>
        <el-table :data="courseList"
                  style="width: 100%">
          <el-table-column prop="Cdescribe"
                           label="课程名称"
                           width="150">
          </el-table-column>
          <el-table-column prop="Cnumber"
                           label="课程代号"
                           width="150">
          </el-table-column>

          <el-table-column prop="onlineUser"
                           label="在学人数"
                           width="130">
          </el-table-column>
          <el-table-column prop="CategoryOne"
                           label="所属分类"
                           width="130">
          </el-table-column>
          <el-table-column prop="upDateAt"
                           label="编辑日期"
                           width="250">
          </el-table-column>
          <el-table-column prop="isstate"
                           label="状态"
                           width="100">
            <template slot-scope="scope">
              {{ scope.row.isState == 1 ?"草稿" : scope.row.isState ==2?"上架":"下架" }}
            </template>
          </el-table-column>
          <el-table-column label="操作"
                           width="220">
            <template slot-scope="scope">
              <el-button type="text"
                         size="small"
                         @click="changeState(scope.row.ID)">{{ scope.row.isState == 1?"上架":scope.row.isState ==2?"下架":"草稿" }}
              </el-button>
              <!-- $router.push({name:
                         'courseEdit',params:{ID:scope.row.ID,_id:scope.row._id}}) -->
              <el-button type="text"
                         size="small"
                         @click="turnEdit(scope.row.ID,scope.row._id)">编辑</el-button>

              <el-button type="text"
                         size="small"
                         @click="delCourse(scope.row.ID,scope.row._id )">删除</el-button>

              <el-button type="text"
                         size="small">已置顶</el-button>
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
  name: "course",
  components: { HeaderCom },
  data () {
    return {
      searchText: "",
      select: '',
      courseList: [], //课程列表
      stu: {},

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
    // 搜索
    searchFun () {
      // console.log("this.searchText", this.searchText)
      this.getList()

    },
    // 获取所有数据
    getList () {
      this.axios({
        url: "/VueHandler/CourseHandler?action=show",
        method: "POST",
        data: {
          pageStart: this.nowPage,
          searchText: this.searchText
        },
      }).then((res) => {
        console.log("aaa", res.data.data)
        this.total = res.data.data.count //总条数
        this.pageSize = res.data.data.pageSize // 每页条数
        this.courseList = res.data.data.list //数据

      })
    },
    // 删除
    delCourse (id, _id) {
      console.log(id, _id)
      this.$confirm("确定删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.axios({
            url: "/VueHandler/CourseHandler?action=delete",
            method: "POST",
            data: {
              ID: id,
              _id: _id
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
    // 上架下架
    changeState (id) {
      this.axios({
        url: "/VueHandler/CourseHandler?action=state",
        method: "POST",
        data: {
          ID: id,
        },
      }).then((res) => {
        console.log("aaa", res)
        this.getList()
      })

    },
    // 跳转修改也
    turnEdit (ID, _id) {
      location.href = '/courseEdit/?ID=' + ID + '&_id=' + _id + ''
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
.course {
  .courseContent {
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
  .courseFindCla,
  .studentAddCla {
    width: 100%;
    height: 57px;
    padding-top: 10px;
    .el-input {
      width: 260px;
      margin-right: 20px;
    }
  }

  .courseContent {
    // border: 1px solid #fff;
    .courseHeader {
      width: 100%;
      height: 40px;
      background: white;
      line-height: 40px;
      border-bottom: 1px solid #ddd;
      .el-icon-s-grid {
        width: 50px;
        border-right: 1px solid #ddd;
        text-align: center;
        font-size: 20px;
        line-height: 40px;
      }
      span {
        font-size: 20px;
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
  .el-select {
    margin-right: 10px;
  }
}
</style>
