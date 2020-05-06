<template>
  <div class>
    <div class="Contents">
      <div class="heads">
        <el-input v-model="val"></el-input>
        <div>专业选择</div>
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
        <el-button type="success" @click="search">查询</el-button>
        <el-button type="primary" @click="addCour()">添加</el-button>
      </div>

      <div class="tableHeader">
        <div class="lef">
          <i class="el-icon-menu" style="margin:8px"></i>
          课程列表页
        </div>
        <div>
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="name" label="课程名称" width="180">
              <template slot-scope="scope">
                <!-- <i class="el-icon-time"></i> -->
                <span style="margin-left: 10px">{{ scope.row.Cname }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="number" label="课程代号" width="180">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.Cnumber }}</span>
              </template>
            </el-table-column>

            <el-table-column prop="number" label="在学人数">
              <template slot-scope="scope">{{ scope.row.onlineUser }}</template>
            </el-table-column>
            <el-table-column prop="name" label="所属分类">
              <template slot-scope="scope">{{ scope.row.phone }}</template>
            </el-table-column>
            <el-table-column prop="data" label="编辑日期">
              <template slot-scope="scope">{{ scope.row.createAt }}</template>
            </el-table-column>
            <el-table-column prop="name" label="状态">
              <template slot-scope="scope">
                {{
                scope.row.isState == 1
                ? "草稿"
                : scope.row.isState == 2
                ? "上架"
                : "下架"
                }}
              </template>
            </el-table-column>
            <el-table-column prop="name" label="操作" width="290">
              <template slot-scope="scope">
                <el-button size="mini" @click="show(scope.$index, scope.row)">
                  {{
                  scope.row.isState == 1 || scope.row.isState == 3 ? "上架" : "下架"
                  }}
                </el-button>
                <el-button size="mini" type="danger" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  v-if="scope.row.isTop==true"
                  @click="handleTop(scope.$index, scope.row)"
                >已置顶</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  v-else
                  @click="handleTop(scope.$index, scope.row)"
                >置顶</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CourseStore from "../../store/course";
export default {
  name: "courseTable",
  methods: {
    search() {
      this.getCourse(1, this.val);
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
    show(res, da) {
      console.log(res);
      console.log(da);

      //上架 下架
      this.axios({
        url: "/VueHandler/CourseHandler?action=state",
        method: "post",
        data: {
          ID: da.ID
        }
      }).then(res => {
        console.log(res);
        this.getCourse(1); //获取课程列表
      });
    },
    handleTop(res, da) {
      console.log(da);
      //课程置顶
      this.axios({
        url: "/VueHandler/CourseHandler?action=top",
        method: "post",
        data: {
          key: "置顶",
          ID: da.ID
        }
      }).then(res => {
        console.log(res);
        this.getCourse(1); //获取课程列表
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
      });
    },
    addCour() {
      this.$router.push("/courseadd");
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
      input: "",
      options: [],
      tableData: [],
      value: "",
      val: ""
    };
  }
};
</script>

<style lang="less" scoped>
.Contents {
  padding: 10px;
  background: #f5f5f5;
  min-width: 1100px;
  height: 100%;
  font-size: 16px;
}
.heads {
  width: 96%;
  height: 88px;
  border: 1px solid #cccccc;
  margin: 10px;
  display: flex;
  justify-content: space-around;
  line-height: 88px;
  text-align: center;
  .el-input {
    width: 25%;
  }
  .el-button {
    height: 36px;
    // line-height: /30px;
    text-align: center;
    margin-top: 25px;
  }
}
.tableHeader {
  width: 96%;
  height: 30px;
  margin: 10px;
  justify-content: space-around;
  border: 1px solid #cccccc;
  .lef {
    width: 120px;
    display: flex;
    line-height: 30px;
    text-align: center;
    margin-left: 0xp;
  }
}
</style>
