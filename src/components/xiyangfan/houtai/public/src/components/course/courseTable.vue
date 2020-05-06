<template>
  <div class="course_wrap">
    <el-breadcrumb class="tnav" separator="/">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">课程管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>课程列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="search">
      <el-input v-model="val"></el-input>
      <div class="s_label">专业选择：</div>
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-button type="success" @click="search">查询</el-button>
      <el-button type="primary" @click="turnadd()">添加</el-button>
    </div>
    <div class="table_head">
      <i class="el-icon-platform-eleme"></i>
      课程列表页
    </div>
    <el-table :data="tableData">
      <el-table-column label="课程名称" width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.Cname }}</span>
        </template>
      </el-table-column>
      <el-table-column label="课程代号" width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.Cnumber }}</span>
        </template>
      </el-table-column>
      <el-table-column label="在学人数" width="180">
        <template slot-scope="scope">
          {{ scope.row.onlineUser }}
        </template>
      </el-table-column>
      <el-table-column label="所属分类" width="180">
        <template slot-scope="scope">{{ scope.row.phone }} </template>
      </el-table-column>
      <el-table-column label="编辑日期" width="180">
        <template slot-scope="scope">{{ scope.row.createAt }} </template>
      </el-table-column>
      <el-table-column label="状态" width="180">
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
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="show(scope.$index, scope.row)">{{
            scope.row.isState == 1
              ? "上架"
              : scope.row.isState == 2
              ? "下架"
              : "草稿"
          }}</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleTop(scope.$index, scope.row)"
            >{{ scope.row.isTop ? "已置顶" : "置顶" }}</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :page-size="3"
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
</template>

<script>
import CourseStore from "../../store/course";
export default {
  name: "courseTable",
  methods: {
    turnadd() {
      this.$router.push("/courseadd");
    },
    nowpage(val) {
      this.currentpage = val; //收集当前页
      this.getCourse(this.currentpage);
    },
    prev() {},
    next() {},
    search() {
      this.getCourse(1, this.val);
    },
    show(index, row) {
      console.log(index);
      //上架 下架
      this.axios({
        url: "/VueHandler/CourseHandler?action=state",
        method: "post",
        data: {
          ID: row.ID
        }
      }).then(res => {
        console.log(res);
        this.getCourse(1);
      });
    },
    handleEdit() {
      //修改
    },
    handleDelete(index, row) {
      //课程删除;
      console.log(row._id);
      this.axios({
        url: "/VueHandler/CourseHandler?action=delete",
        method: "post",
        data: {
          _id: row._id,
          ID: row.ID
        }
      }).then(res => {
        console.log(res);
        this.getCourse(1);
      });
    },
    handleTop(index, row) {
      console.log(index);
      //课程置顶
      this.axios({
        url: "/VueHandler/CourseHandler?action=top",
        method: "post",
        data: {
          ID: row.ID
        }
      }).then(res => {
        console.log(res);
        this.getCourse(1);
      });
    },
    getCourse(pageStart, searchText, CategoryOne, CategoryTwo, CategoryThree) {
      this.axios({
        url: "/VueHandler/CourseHandler?action=show",
        method: "post",
        data: {
          pageStart: pageStart,
          searchText: searchText,
          CategoryOne: CategoryOne,
          CategoryTwo: CategoryTwo,
          CategoryThree: CategoryThree
        }
      }).then(res => {
        console.log(res);
        this.tableData = res.data.data.list;
        this.total = res.data.data.count;
      });
    }
  },
  created() {
    CourseStore.commit("getlist");
    this.getcategory = CourseStore.getters.getcategory;
    console.log(this.getcategory);
    this.getCourse(1); //获取课程列表
  },
  data() {
    return {
      currentpage: 1,
      getcategory: "",
      tableData: [],
      total: 1,
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value: "",
      val: ""
    };
  }
};
</script>

<style lang="less" scoped>
.tnav {
  margin-top: 30px;
  line-height: 40px;
}
.table_head {
  width: 100%;
  margin: 20px auto;
  line-height: 40px;
  border: 1px solid #e5e5e5;
}
.course_wrap {
  width: 80%;
  margin: 0 auto;
}
.search {
  display: flex;
  justify-content: space-around;
  .el-input {
    width: 300px;
  }
}
.s_label {
  width: 120px;
  line-height: 40px;
}
</style>
