<template>
  <div class="course">
    <!-- 我的课程 -->
    <!-- 头部栏 -->
    <comHeader></comHeader>
    <!-- 课程列表内容 -->
    <div class="courseContainer">
      <!-- 头部面包屑导航 -->
      <div class="tableBreadTitle">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item><a href="#">课程管理</a></el-breadcrumb-item>
          <el-breadcrumb-item>课程列表</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 课程表格查找模块 -->
      <div class="table-searchutil">
        <el-row :gutter="10">
          <el-col :span="4">
            <div class="grid-content bg-purple">
              <el-input
                placeholder="课程名称搜索"
                prefix-icon="el-icon-user"
                v-model="courseVal"
              >
              </el-input>
            </div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content bg-purple mytext">
              专业选择:
            </div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple">
              <el-select v-model="categoryOne" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple">
              <el-select v-model="categoryTwo" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple">
              <el-select v-model="categoryThree" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-tooltip
                class="item"
                effect="dark"
                content="搜索课程"
                placement="top"
              >
                <el-button
                  type="success"
                  icon="el-icon-search"
                  @click="searchCourse"
                  >搜索</el-button
                >
              </el-tooltip>
            </div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple mybutton">
              <el-tooltip
                class="item"
                effect="dark"
                content="添加课程"
                placement="top"
              >
                <el-button type="primary" icon="el-icon-plus" @click="courseAdd"
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
              <div class="grid-content bg-purple-light mytitle">课程列表</div>
            </el-col>
          </el-row>
        </div>
        <!-- 课程列表内容信息 -->
        <courseList :coursedata="courseData"></courseList>
        <!-- 列表分页 -->
        <el-pagination
          background
          layout="prev, pager, next"
          :page-size="pageSize"
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
import courseList from "./courseList";
import mycourse from "@/store/course";
export default {
  name: "course",
  components: {
    comHeader,
    courseList
  },
  computed: {
    courseData() {
      return mycourse.state.listDate;
    },
    //当前页面
    currentPage() {
      return mycourse.state.pageStart;
    },
    //总条数总记录数
    pageTotal() {
      return mycourse.state.pageCount;
    },
    //总条数总记录数
    pageSize() {
      return mycourse.state.pageSize;
    }
  },
  data() {
    return {
      courseVal: "",
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        }
      ],
      categoryOne: "",
      categoryTwo: "",
      categoryThree: ""
    };
  },
  methods: {
    // 点击搜索
    searchCourse() {
      mycourse.state.searchText = this.courseVal;
      mycourse.state.CategoryOne = this.categoryOne;
      mycourse.state.CategoryTwo = this.categoryTwo;
      mycourse.state.CategoryThree = this.categoryThree;
      mycourse.state.listDate.btnList.btn_click();
    },
    // 点击添加按钮
    courseAdd() {
      this.$router.push("/courseedit");
    },
    // 分页显示
    OnChangePage(page) {
      mycourse.state.pageStart = page;
      mycourse.state.listDate.getListData();
    }
  },
  created() {
    mycourse.state.listDate.btnList.btn_click();
  }
};
</script>

<style lang="less" scoped>
.course {
  width: 100%;
  .courseContainer {
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
      .mytext {
        text-align: right;
        margin-top: 10px;
      }
      .mybutton {
        text-align: right;
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
