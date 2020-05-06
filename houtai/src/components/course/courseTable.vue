<template>
  <div class="tabList">
    <!-- 首页/用户管理/课程列表 -->
    <div class="center_top_nav">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>课程管理</el-breadcrumb-item>
        <el-breadcrumb-item>课程列表</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="cha">
        <div class="cha_left">
          <input class="search" v-model="val" type="text" placeholder="课程名称搜索" />
          <div class="cha_left_right">
            <span>专业选择</span>
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-button type="success" size="small">查询</el-button>
          </div>
        </div>
        <div class="cha_right">
          <el-button @click="add" type="primary" size="small">+添加</el-button>
        </div>
      </div>

      <!-- 表格 -->
      <div class="center">
        <div class="center_top">
          <i class="el-icon-s-grid"></i>
          <div class="dan">课程列表</div>
        </div>

        <el-table :data="tableData" border style="wiscopedth: 100%">
          <el-table-column fixed="left" prop="Cname" label="课程名称" width="120"></el-table-column>
          <el-table-column prop="Cnumber" label="课程代号" width="150"></el-table-column>
          <el-table-column prop="1" label="在学人数" width="120"></el-table-column>
          <el-table-column prop="Cdescribe" label="所属分类" width="300">
            <!-- <template slot-scope="scope">{{ scope.row.powerCode == 1 ? "课程管理员" : "系统管理员" }}</template> -->
          </el-table-column>
          <el-table-column label="编辑日期" width="300">
            <template slot-scope="scope">{{ scope.row.createAt }}</template>
          </el-table-column>
          <el-table-column label="状态" width="120">
            <template slot-scope="scope">
              {{
              scope.row.isState == 1
              ? "草稿"
              : scope.row.isState == 2
              ? "已上架"
              : "已下架"
              }}
            </template>
          </el-table-column>
          <el-table-column label="操作" width="280">
            <template slot-scope="scope">
              <el-button
                :type="scope.row.isState == 1 || scope.row.isState == 3?'primary':'success'"
                size="mini"
                @click="show(scope.$index, scope.row)"
              >
                {{
                scope.row.isState == 1 || scope.row.isState == 3 ? "上架" : "下架"
                }}
              </el-button>
              <el-button size="mini" type="primary">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button>

              <el-button
                size="mini"
                :type="scope.row.isTop == false?'success':'info'"
                @click="handleTop(scope.$index, scope.row.ID)"
              >{{scope.row.isTop == false?"置顶":"撤下"}}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 确认删除 -->
      <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
        <span>确认要删除本门课程吗?</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="querenDelete(querenDeleteId,querenDeleteID)">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 分页 -->
      <el-pagination
        :page-size="1"
        background
        layout="prev, pager, next"
        :total="total"
        @current-change="nowpage"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  name: "courseTable",
  data() {
    return {
      querenDeleteID:0,
      querenDeleteId:"",
      dialogVisible: false,
      currentpage: 1,
      total: 0,
      tableData: [],
      searchText: "",
      CategoryOne: 1,
      CategoryTwo: 2,
      CategoryThree: 3,
      pageStart: 1,
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
  },
  components: {},
  mounted() {
    this.getData(1);
  },
  methods: {
    add() {
      this.$router.push("/courseadd");
    },
    // 获取课程列表数据
    getData(pageStart, searchText, CategoryOne, CategoryTwo, CategoryThree) {
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
        this.total = Math.ceil(res.data.data.count / res.data.data.pageSize);
      });
    },
    nowpage(val) {
      this.currentpage = val;
      this.getData(val);
    },
    //上架下架
    show(index, row) {
      // console.log(index,row)
      this.axios({
        url: "/VueHandler/CourseHandler?action=state",
        method: "post",
        data: {
          ID: row.ID
        }
      }).then(res => {
        console.log(res);
        this.getData(this.pageStart);
      });
    },
    //删除课程
    handleDelete(index,row) {
      this.dialogVisible = true;
      console.log(index,row)
          this.querenDeleteId =row._id
          this.querenDeleteID =row.ID

        this.axios({
        url: "/VueHandler/CourseHandler?action=delete",
        method: "post",
        data: {
          _id: this.querenDeleteId,
          ID:this.querenDeleteID
        }
      }).then(res => {
        console.log(res);
        this.getData(this.pageStart);
      });
    },
    //确认删除
    querenDelete(id,ID) {
      // console.log(id)
      this.dialogVisible = false;
      this.axios({
        url: "/VueHandler/CourseHandler?action=delete",
        method: "post",
        data: {
          _id: id,
          ID:ID
        }
      }).then(res => {
        console.log(res);
        this.getData(this.pageStart);
      });
    },
    //置顶课程
    handleTop(index, id) {
      this.axios({
        url: "/VueHandler/CourseHandler?action=top",
        method: "post",
        data: {
          ID: id
        }
      }).then(res => {
        console.log(res);
        this.getData(this.pageStart);
      });
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
    height: 50px;
    border: 1px solid #ccc;
    background-color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .cha_left {
      width: 80%;
      height: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin-left: 10px;
      .search {
        width: 15%;
        height: 20px;
        margin-left: 10px;
      }
      .cha_left_right {
        width: 85%;
        height: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        //  border: 1px solid;
        margin-left: 10px;
        span {
          font-size: 14px;
        }
        .el-select {
          width: 20%;
          height: 30px;
          margin-left: 10px;
          margin-bottom: 10px;
        }
        .el-button {
          margin-left: 10px;
        }
      }
    }
    .cha-right {
      width: 10%;
      height: 100%;
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