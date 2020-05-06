<template>
  <div class="coursemain">
    <!-- 课程内容编辑 -->
    <div class="table-main">
      <!-- 课程内容标题信息 -->
      <div class="main-title">
        <el-row>
          <el-col :span="1">
            <div class="grid-content bg-purple myicon">
              <i class="el-icon-s-grid" style=""></i>
            </div>
          </el-col>
          <el-col :span="23">
            <div class="grid-content bg-purple-light mytitle">课程内容</div>
          </el-col>
        </el-row>
      </div>
      <!-- 内容相关表格 -->
      <div class="main-content">
        <el-row :gutter="40" type="flex" justify="center">
          <el-col :span="11">
            <div class="grid-content bg-purple">
              <el-button type="success" @click="addDirectory"
                >添加目录</el-button
              >
              <el-table
                :data="directList"
                style="width: 100%"
                height="380"
                highlight-current-row
                @row-click="handleCurrentRow"
              >
                <el-table-column prop="CDName" label="目录"> </el-table-column>
                <el-table-column prop="CourseNumber" label="课件数">
                </el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button
                      style="margin: 0;"
                      size="mini"
                      type="primary"
                      @click.stop="editDirect(scope.row)"
                      >编辑</el-button
                    >
                    <el-button
                      style="margin: 0;float: right;"
                      size="mini"
                      type="danger"
                      @click.stop="directDelete(scope.row)"
                      >删除</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-col>
          <el-col :span="11">
            <div class="grid-content bg-purple">
              <el-button type="success" @click="addVideo">添加视频</el-button>
              <el-table
                :data="directVideoData"
                height="380"
                style="width: 100%"
              >
                <el-table-column prop="Vname" label="视频名称">
                </el-table-column>
                <el-table-column prop="Vtime" label="时长"> </el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button
                      style="margin: 0;float: right;"
                      size="mini"
                      type="danger"
                      @click.stop="videoDelete(scope.row)"
                      >删除</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-col>
        </el-row>
      </div>
      <!-- 添加目录的弹窗 -->
      <el-dialog :title="directText" :visible.sync="dialogFormVisible" center>
        <el-form>
          <el-form-item label="目录名称" :label-width="formLabelWidth">
            <el-input v-model="directoryName" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirmDirectory">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 添加视频的弹窗 -->
      <el-dialog
        title="添加视频"
        custom-class="myDialog"
        :visible.sync="dialogVideoVisible"
        width="80%"
      >
        <!-- 视频管理内容 -->
        <div class="videoContainer">
          <!-- 头部面包屑导航 -->
          <div class="tableBreadTitle">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item>首页</el-breadcrumb-item>
              <el-breadcrumb-item>课程管理</el-breadcrumb-item>
              <el-breadcrumb-item>视频管理</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <!-- 课程表格查找模块 -->
          <div class="table-searchutil">
            <el-row :gutter="10" style="margin: 0;">
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <el-input
                    placeholder="模糊查找视频: 名称"
                    prefix-icon="el-icon-user"
                    v-model="videoName"
                  >
                  </el-input>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  <el-button
                    type="success"
                    icon="el-icon-search"
                    @click="serchVideo"
                    >搜索</el-button
                  >
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
                  <div class="grid-content bg-purple-light mytitle">
                    视频列表
                  </div>
                </el-col>
              </el-row>
            </div>
            <!-- 视频列表内容信息 -->
            <el-table
              :data="myvideolist"
              style="width: 100%;box-sizing: border-box;border: 1px solid #ccc;"
              height="300"
            >
              <el-table-column fixed prop="Vname" label="视频名称">
              </el-table-column>
              <el-table-column prop="Vstate" label="绑定课程">
              </el-table-column>
              <el-table-column prop="Vtime" label="视频时长"> </el-table-column>
              <el-table-column label="上传日期" width="200px">
                <template slot-scope="scope"
                  >{{ scope.row.createAt | gettime("Y年M月D日 h:m") }}
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="primary"
                    icon="el-icon-plus"
                    @click="confirmAdd(scope.row)"
                    >添加</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
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
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
// import myVideo from "views/video/video";
export default {
  name: "coursemain",
  props: ["querydata"],
  components: {
    // myVideo
  },
  data() {
    return {
      myvideolist: [], //显示添加视频的列表信息
      videoName: "", //绑定搜索字段
      currentPage: 1, //当前页面
      pageTotal: 0, //总条数总记录数
      pagesize: 3, //一页显示的数量大小
      directList: [], //目录列表数据
      directVideoData: [], //添加完成获取到的数据
      dialogFormVisible: false, //显示目录名称的弹框
      directText: "", //弹框目录的标题名字
      directID: "", //目录id
      dialogVideoVisible: false, //显示添加视频列表的名称
      showFlag: false, //是否选中目录名称
      showID: "", //选中目录时的_id
      directoryName: "", //课程目录
      formLabelWidth: "80px"
    };
  },
  methods: {
    // 选中课程目录触发
    handleCurrentRow(val) {
      this.$notify({
        title: `${val.CDName}`,
        type: "success"
      });
      this.axios({
        method: "get",
        url: "/VueHandler/VideoHandler?action=showdir",
        params: {
          _id: val._id,
          CDid: val.CDid
        }
      }).then(res => {
        if (res.data.success == "成功") {
          this.showFlag = true;
          this.showID = val._id;
          this.directVideoData = res.data.data.list; //渲染视频相关数据列表
        }
      });
    },
    // 添加目录
    addDirectory() {
      this.dialogFormVisible = true;
      this.directText = "添加目录";
    },
    // 编辑目录
    editDirect(item) {
      this.dialogFormVisible = true;
      this.directText = "编辑目录";
      this.directID = item._id;
    },
    // 添加目录确定按钮
    confirmDirectory() {
      let id = this.querydata._id;
      let url = "";
      let dirID = "";
      let text = "";
      if (this.directText == "添加目录") {
        url = "/VueHandler/CourseHandler?action=AddDirectory";
        text = "添加成功";
        dirID = "";
      } else {
        url = "/VueHandler/CourseHandler?action=updateDirectory";
        text = "更新成功";
        dirID = this.directID;
      }
      this.axios
        .post(url, {
          CDName: this.directoryName,
          CDid: id,
          _id: dirID
        })
        .then(res => {
          // console.log(res);
          if (res.data.data.success) {
            this.$message.success(text);
            this.getDirectList(); //调取目录列表
            this.dialogFormVisible = false; //成功关闭弹窗
            this.directoryName = "";
          }
        });
    },
    // 添加视频
    addVideo() {
      if (this.showFlag) {
        this.dialogVideoVisible = true;
        this.getVideoList(this.currentPage, this.videoName);
      } else {
        this.$message.warning("请先选择目录名称！");
      }
    },
    // 点击添加视频添加按钮来选中此条信息
    confirmAdd(item) {
      let that = this;
      this.$alert("你是否要给该课程下绑定此视频？", "视频绑定", {
        confirmButtonText: "确定",
        callback: action => {
          if (action == "confirm") {
            this.$message({
              type: "success",
              message: "视频绑定成功"
            });
            this.axios({
              method: "get",
              url: "/VueHandler/CourseHandler?action=addvideo",
              params: {
                _id: that.showID,
                CDid: that.querydata._id,
                Vid: item._id
              }
            }).then(res => {
              console.log(res);
              that.directVideoData = res.data.data.list;
              that.dialogVideoVisible = false;
            });
          } else {
            this.$message({
              type: "error",
              message: "已经取消绑定！"
            });
          }
        }
      });
    },
    // 按照视频名称模糊查询
    serchVideo() {
      this.getVideoList(this.currentPage, this.videoName);
      this.videoName = "";
    },
    // 分页查询
    OnChangePage(val) {
      this.currentPage = val;
      this.getVideoList(this.currentPage, this.videoName);
    },
    // 获取目录列表
    getDirectList() {
      this.axios({
        method: "get",
        url: "/VueHandler/VideoHandler?action=finddir",
        params: {
          CDid: this.querydata._id
        }
      }).then(res => {
        console.log(res);
        this.directList = res.data.data.list;
      });
    },
    // 获取视频列表
    getVideoList(pages, text) {
      this.axios({
        method: "get",
        url: "/VueHandler/VideoHandler?action=show",
        params: {
          searchText: text,
          pageStart: pages,
          pageSize: 3
        }
      }).then(res => {
        if (!res.data.err) {
          this.myvideolist = res.data.data.list;
          this.pageTotal = res.data.data.count;
          this.pagesize = res.data.data.pageSize;
        } else {
          this.$message.warning("抱歉，系统中还未添该视频");
        }
      });
    },
    // 删除目录
    directDelete(item) {
      this.axios({
        method: "get",
        url: "/VueHandler/CourseHandler?action=deleteDirectory",
        params: {
          _id: item._id,
          CDid: item.CDid
        }
      }).then(res => {
        console.log(res);
        if (res.data.err) {
          this.$message.success("删除成功！");
          this.getDirectList();
        }
      });
    },
    // 删除课程内容中的绑定视频
    videoDelete(item) {
      // console.log(item);
      this.axios({
        method: "get",
        url: "/VueHandler/CourseHandler?action=delvideo",
        params: {
          _id: this.showID,
          CDid: this.querydata._id,
          Vid: item._id
        }
      }).then(res => {
        // console.log(res);
        this.$message.success(res.data.success);
        this.axios({
          method: "get",
          url: "/VueHandler/VideoHandler?action=showdir",
          params: {
            _id: this.showID,
            CDid: this.querydata._id
          }
        }).then(res => {
          this.directVideoData = res.data.data.list; //渲染视频相关数据列表
        });
      });
    }
  },
  created() {
    this.getDirectList();
  }
};
</script>

<style lang="less" scoped>
.coursemain {
  width: 100%;
  .table-main {
    padding: 10px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    .main-title {
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
    .main-content {
      margin-top: 10px;
      box-sizing: border-box;
      border: 1px solid #ccc;
      .el-button {
        margin: 20px 0;
      }
      .el-table {
        border: 1px solid #ccc;
        margin-bottom: 20px;
      }
    }
  }
  .videoContainer {
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
