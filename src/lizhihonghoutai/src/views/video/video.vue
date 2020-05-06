<template>
  <div class="myvideo">
    <!-- 视频管理 -->
    <!-- 头部栏 -->
    <comHeader></comHeader>
    <!-- 视频管理内容 -->
    <div class="videoContainer">
      <!-- 头部面包屑导航 -->
      <div class="tableBreadTitle">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item><a href="#">课程管理</a></el-breadcrumb-item>
          <el-breadcrumb-item>视频管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 课程表格查找模块 -->
      <div class="table-searchutil">
        <el-row :gutter="10">
          <el-col :span="6">
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
              <el-tooltip
                class="item"
                effect="dark"
                content="搜索课程"
                placement="top"
              >
                <el-button
                  type="success"
                  icon="el-icon-search"
                  @click="serchVideo"
                  >搜索</el-button
                >
              </el-tooltip>
            </div>
          </el-col>
          <el-col :span="9">
            <div class="grid-content bg-purple mybutton">
              <el-tooltip
                class="item"
                effect="dark"
                content="添加课程"
                placement="top"
              >
                <el-button
                  type="primary"
                  icon="el-icon-plus"
                  @click="setVideoAdd"
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
              <div class="grid-content bg-purple-light mytitle">视频列表</div>
            </el-col>
          </el-row>
        </div>
        <!-- 视频列表内容信息 -->
        <myVideoList
          :myvideolist="videoListInfo"
          @myedit="videoEdit"
          @mydelete="vedioDelete"
        ></myVideoList>
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
      <!-- 弹出添加和编辑窗口 -->
      <videoAlert
        ref="myvideoalert"
        :title="title"
        :dialogformvisible="showDialog"
        :status="dialogStatus"
        :videoid="videoId"
        :formdata="formdata"
        @refresh="refreshVideoList"
        @onclosedialog="closeDialog"
      ></videoAlert>
    </div>
  </div>
</template>

<script>
import comHeader from "components/comHeader";
import myVideoList from "./videoList"; //导入视频表格
import videoAlert from "./videoAlert";
export default {
  name: "myvideo",
  components: {
    comHeader,
    myVideoList,
    videoAlert
  },
  data() {
    return {
      videoName: "",
      currentPage: 1, //当前页面
      pageTotal: 0, //总条数总记录数
      pagesize: 3, //一页显示的数量大小
      title: "添加视频", //弹出的标题
      showDialog: false, //显示弹框
      dialogStatus: "add", //弹窗的功能状态
      videoId: "", //视频id
      formdata: {
        Vurl: "",
        Vname: "",
        Vtime: ""
      },
      videoListInfo: []
    };
  },
  methods: {
    // 模糊查询
    serchVideo() {
      this.getVideoList(this.currentPage, this.videoName);
      this.videoName = "";
    },
    // 视频的添加
    setVideoAdd() {
      if (this.$refs.myvideoalert) {
        this.showDialog = true;
        this.formdata = {
          Vurl: "",
          Vname: "",
          Vtime: ""
        };
        this.$refs.myvideoalert._data.fileList = [];
      }
    },
    // 异步视频编辑
    videoEdit(item) {
      // console.log(item);
      this.showDialog = true;
      this.dialogStatus = "edit";
      this.title = "编辑视频";
      this.videoId = item.ID;
      this.formdata.Vname = item.Vname;
      this.formdata.Vtime = item.Vtime;
      this.formdata.Vurl = item.Vurl;
      this.$refs.myvideoalert._data.videoUrl = item.Vurl;
      this.$refs.myvideoalert._data.disable = true;
      this.$refs.myvideoalert._data.uploadTip = "只能修改名称和时长！";
      this.$refs.myvideoalert._data.fileList = [{ name: item.Vurl }];
    },
    // 分页显示数据
    OnChangePage(val) {
      this.currentPage = val;
      this.getVideoList(this.currentPage);
    },
    // 删除当前数据
    vedioDelete() {
      this.getVideoList(this.currentPage, this.videoName);
    },
    // 获取视频列表数据
    getVideoList(page, msg) {
      this.axios
        .post("/VueHandler/VideoHandler?action=showlist", {
          searchText: msg,
          pageStart: page
        })
        .then(res => {
          console.log(res);
          if (!res.data.err) {
            this.videoListInfo = res.data.data.list;
            this.pageTotal = Number(res.data.data.count); //总条数
            this.pagesize = res.data.data.pageSize;
          } else {
            this.$message.warning(res.data.err);
          }
        });
    },
    // 异步关闭弹窗
    closeDialog(val) {
      this.showDialog = val;
      this.$refs.myvideoalert._data.disable = false;
      this.$refs.myvideoalert._data.uploadTip =
        "只能上传mp4/wmv/avi文件，且不超过1G";
      this.$refs.myvideoalert._data.fileList = [];
    },
    // 刷新视频列表
    refreshVideoList() {
      this.getVideoList(this.currentPage);
    }
  },
  created() {
    this.getVideoList(this.currentPage, this.videoName);
  }
};
</script>

<style lang="less" scoped>
.myvideo {
  width: 100%;
  .videoContainer {
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
