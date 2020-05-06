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
          <input v-model="searchText" type="text" placeholder="模糊查找视频:名称" />
          <el-button @click="getData(1,searchText)" type="success" size="small">查询</el-button>
        </div>
        <div class="cha_right">
          <el-button type="primary" size="small" @click="add">+视频添加</el-button>
        </div>
      </div>

      <!-- 表格 -->
      <div class="center">
        <div class="center_top">
          <i class="el-icon-s-grid"></i>
          <div class="dan">视频列表</div>
        </div>

        <el-table :data="tableData" border style="wiscopedth: 100%">
          <el-table-column prop="Vname" label="名称" width="200"></el-table-column>
          <el-table-column prop="turename" label="绑定课程" width="400"></el-table-column>
          <el-table-column prop="Vtime" label="时长" width="220"></el-table-column>

          <el-table-column label="上传日期" width="200">
            <template slot-scope="scope">{{ scope.row.createAt }}</template>
          </el-table-column>

          <el-table-column label="操作" width="220">
            <template slot-scope="scope">
              <el-button @click="deleteUser(scope.$index, scope.row.ID)" type="text" size="small">删除</el-button>
              <el-button @click="cha(scope.$index, scope.row)" type="text" size="small">查看</el-button>
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

      <el-dialog :title="title" :visible="dialogFormVisible">
        <div class="img-file">
          <label for="imgFile" class="addbutton button-green">选择视频</label>
           <input
            @change="changeVideo"
            id="imgFile"
            class="upload_input"
            type="file"
            accept="video/*"
          />
          时长:<input type="text" v-model="videoTime" />
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="quxiao">取 消</el-button>
          <el-button type="primary" @click="sure">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <div v-if="tan" class="win">
      <span @click="close">×</span>

      <video ref="aa" controls="controls" autoplay="autoplay" src id="aa" />
    </div>
  </div>
</template>
<script>
export default {
  name: "vedioList",
  data() {
    return {
      tan: false,
      tableData: [],
      videoName: "",
      videoUrl: "",
      videoTime: 0,
      title: "视频上传",
      searchText: "",
      pageStart: 1,
      dialogFormVisible: false,
      total: 1
    };
  },
  components: {},
  mounted() {
    this.getData(1);
  },
  methods: {
    quxiao() {
      this.dialogFormVisible = false;
      console.log(this.dialogFormVisible);
    },
    add() {
      this.dialogFormVisible = true;
      console.log(this.dialogFormVisible);
    },

    changeVideo() {
      var file = document.getElementById("imgFile").files[0];
      console.log(file);
      console.log(file.name);

      var url = URL.createObjectURL(file);
      this.videoUrl = url;
      var name = file.name.split(".");
      this.videoName = name[0];

      // this.axios({
      //   url: "/VueHandler/UpLoadVideoHandler",
      //   method: "post",
      //   data: {
      //     data: file
      //   }
      // }).then(res => {
      //   console.log(res);
      // });
      console.log(url);
      console.log(this.$refs.aa);
    },
    sure() {
      this.dialogFormVisible = false;
      console.log(this.videoName);
      console.log(this.videoTime);
      console.log(this.videoUrl);
      this.axios({
        url: "/VueHandler/VideoHandler?action=add",
        method: "post",
        data: {
          ID: "",
          Vname: this.videoName,
          Vtime: this.videoTime,
          Vurl: this.videoUrl
        }
      }).then(res => {
        console.log(res);
        this.getData(1);
      });
    },
    deleteUser(index, id) {
      console.log(index, id);

      this.$confirm("此操作将永久删除该视频, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.axios({
            url: "/VueHandler/VideoHandler?action=delete",
            method: "get",
            params: {
              key: index,
              ID: id
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
    cha(index, row) {
      console.log(index, row);
      console.log("----------", row.Vurl);
      //
      this.tan = true;
      // console.log(this.$refs.aa)
      this.$nextTick(() => {
        this.$refs.aa.src = row.Vurl;
        console.log(this.$refs.aa);
      });
    },
    close() {
      this.tan = false;
    },
    nowpage(val) {
      this.currentpage = val;
      this.getData(val);
    },

    getData(pageStart, searchText) {
      this.axios({
        url: "/VueHandler/VideoHandler?action=showlist",
        method: "post",
        data: {
          searchText: searchText,
          pageStart: pageStart
        }
      }).then(res => {
        console.log(res);
        console.log(res.data.data.list);
        this.tableData = res.data.data.list;

        this.total = Math.ceil(res.data.data.count / res.data.data.pageSize);
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
.tabList {
  position: relative;
  .win {
    width: 600px;
    height: 400px;
    position: absolute;
    border: 1px solid;
    top: 0;
    left: 40%;
    transform: translateX(-50%);

    span {
      display: block;
      width: 50px;
      height: 50px;
      text-align: center;
      line-height: 50px;
      font-size: 30px;
      color: red;
      font-weight: 600;
      position: absolute;
      top: 0;
      right: 0;
      z-index: 1000;
      cursor: pointer;
      &:hover {
        background-color: yellowgreen;
      }
    }
    #aa {
      display: block;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }
  }
}
</style>