<template>
  <div class="videoalert">
    <!-- 弹出视频添加和编辑 -->
    <el-dialog :title="title" :visible.sync="dialogFormVisible" center>
      <el-form :model="formdata">
        <el-form-item label="视频上传" :label-width="labelWidth">
          <el-upload
            class="upload-demo"
            auto-upload
            :disabled="disable"
            action="/VueHandler/UpLoadVideoHandler"
            :limit="1"
            :on-exceed="handleExceed"
            :on-success="handleChange"
            :file-list="fileList"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">
              {{ uploadTip }}
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item label="视频名称" :label-width="labelWidth">
          <el-input v-model="formdata.Vname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="视频时长" :label-width="labelWidth">
          <el-input v-model="formdata.Vtime" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmVideo">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "videoalert",
  props: ["title", "formdata", "dialogformvisible", "status", "videoid"], //videoid: "" 编辑时视频的id
  data() {
    return {
      // dialogFormVisible: true,
      labelWidth: "80px", //前面label名字宽度
      // form: {
      //   Vurl: "",
      //   Vname: "",
      //   Vtime: ""
      // },
      disable: false,
      uploadTip: "只能上传mp4/wmv/avi文件，且不超过1G",
      fileList: [],
      videoUrl: "" //上传成功返回的视频地址
    };
  },
  computed: {
    dialogFormVisible: {
      get() {
        return this.dialogformvisible;
      },
      set(val) {
        this.$emit("onclosedialog", val);
      }
    }
  },
  methods: {
    // 点击确定操作添加或编辑
    confirmVideo() {
      let mydata = {
        Vname: this.formdata.Vname,
        Vtime: this.formdata.Vtime,
        Vurl: this.videoUrl
      };
      let url = "";
      let text = "";
      if (this.status == "add") {
        url = "/VueHandler/VideoHandler?action=add";
        text = "添加成功";
      } else {
        url = "/VueHandler/VideoHandler?action=update";
        mydata.ID = this.videoid;
        text = "编辑成功";
      }
      if (this.formdata.Vname && this.formdata.Vtime && this.videoUrl) {
        this.axios({
          method: "post",
          url: url,
          data: mydata
        }).then(res => {
          console.log(res);
          this.$message.success(text);
          // 请求成功以后使数据恢复
          this.dialogFormVisible = false;
          this.fileList = [];
          this.disable = false;
          this.uploadTip = "只能上传mp4/wmv/avi文件，且不超过1G";
          // 添加或刷新成功时刷新数据
          this.$emit("refresh");
        });
      } else {
        this.$message.warning("内容不能为空！");
      }
    },
    // 图片上传成功的回调
    handleChange(file) {
      // console.log(file);
      this.videoUrl = file.cacheName;
    },
    // 超出上传文件时的提示
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${fileList.length} 个文件`
      );
    }
  }
};
</script>

<style lang="less" scoped>
.videoalert {
  width: 100%;
}
</style>
