<template>
  <div>
    <el-card>
      <!-- 面包屑显示 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>课程管理</el-breadcrumb-item>
        <el-breadcrumb-item>课程编辑</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 表头 -->
      <el-divider></el-divider>
      <el-row :gutter="20" style="margin: 16px 0;">
        <el-col :span="24"> <i class="el-icon-menu"></i><span>课程信息</span> </el-col>
      </el-row>
      <!-- 表单提交 -->
      <el-row type="flex">
        <el-col :span="12"
          ><div class="grid-content">
            <el-form :model="addClassForm" :rules="addClassrules" status-icon ref="addClassForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="课程名称" prop="className">
                <el-input size="small" v-model="addClassForm.className" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="课程描述" prop="classDetail">
                <el-input size="small" v-model="addClassForm.classDetail" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="课程价格" prop="classPrice">
                <el-input size="small" type="number" v-model="addClassForm.classPrice" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="专业选择：">
                <!-- 级部选择 -->
                <el-select size="mini" v-model="classNameCheck" placeholder="请选择">
                  <el-option v-for="item in className" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                </el-select>
                <!-- 专业选择 -->
                <el-select size="mini" v-model="classClassifyChecked" placeholder="请选择">
                  <el-option v-for="item in classifyName" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                </el-select>
                <!-- 班级选择 -->
                <el-select size="mini" v-model="classNum" placeholder="请选择">
                  <el-option v-for="item in classNumItem" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="success" @click="saveClassDetail">保存</el-button>
              </el-form-item>
            </el-form>
          </div></el-col
        >
        <el-col :span="12">
          <div class="grid-content">
            <el-form>
              <el-form-item label="课程封面上传：">
                <!-- 图片上传 -->
                <div class="updateInput" @click="dialogVisible = true">
                  <i class="el-icon-plus"></i>
                  <img :src="imgdateUrl" v-if="imgdateUrl != '' ? true : false" />
                </div>
                <!-- 图片上传框逻辑 -->
                <el-dialog title="是否上传课程封面？" :visible.sync="dialogVisible" width="50%" :before-close="setUpdateDialog">
                  <input :id="uuids" @change="onFileChange($event, uuids)" accept="image/gif,image/jpeg,image/x-png" type="file" />
                  <span slot="footer" class="dialog-footer">
                    <el-button @click="handle_isOK('cancel')">取 消</el-button>
                    <el-button type="primary" @click="handle_isOK('yes')">确 定</el-button>
                  </span>
                </el-dialog>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <!-- 课程内容 -->
      <el-row>
        <el-col :span="12"
          ><div class="grid-content " style="margin-right: 5px;">
            <el-button type="success">增加目录</el-button>
            <!-- 添加目录 -->
            <el-table :data="addMuLv" style="width: 100%" border>
              <el-table-column label="目录" width="180"> </el-table-column>
              <el-table-column label="课件数" width="180"> </el-table-column>
              <el-table-column label="操作"> </el-table-column>
            </el-table></div
        ></el-col>
        <el-col :span="12"
          ><div class="grid-content ">
            <!-- 添加视频 -->
            <el-button type="success">增加视频</el-button>
            <!-- 添加目录 -->
            <el-table :data="addVideo" style="width: 100%" border>
              <el-table-column label="视频名称" width="180"> </el-table-column>
              <el-table-column label="时长" width="180"> </el-table-column>
              <el-table-column label="操作"> </el-table-column>
            </el-table></div
        ></el-col>
      </el-row>
      <!-- 富文本编辑器 -->
      <!-- 表头 -->
      <el-divider></el-divider>
      <el-row :gutter="20" style="margin: 16px 0;">
        <el-col :span="24"> <i class="el-icon-menu"></i><span>课程详情</span> </el-col>
      </el-row>
      <editor-com></editor-com>
    </el-card>
  </div>
</template>

<script>
import editorCom from '@/components/Editor';
//引入uid处理数据
import classStore from '../store/classDateHandle.js';
export default {
  components: { editorCom },
  computed: {
    uuids() {
      return classStore.state.uuids; //请求uuid名称
    },
  },
  data() {
    return {
      addMuLv: [], //添加目录
      addVideo: [], //增加视频
      imgdateUrl: '',
      addClassForm: {
        className: '',
        classDetail: '',
        classPrice: '',
      },
      addClassrules: {
        //是否是必填项目s
        className: [{ required: true, message: '60字以内', trigger: 'blur' }],
        classDetail: [{ required: true, message: '100字以内', trigger: 'blur' }],
        classPrice: [{ required: true, message: '课程价格以元为单位，免费课程设置为0', trigger: 'blur' }],
      },
      classNameCheck: '级部选择',
      className: [
        {
          value: 1,
          label: '大学部',
        },
        {
          value: 2,
          label: '高中部',
        },
        {
          value: 3,
          label: '初中部',
        },
      ],
      classClassifyChecked: '专业选择',
      classifyName: [
        {
          value: 1,
          label: '前端开发',
        },
        {
          value: 2,
          label: '后端开发',
        },
        {
          value: 3,
          label: '运维',
        },
        {
          value: 4,
          label: '测试',
        },
        {
          value: 5,
          label: '大数据',
        },
      ],
      classNum: '班级选择',
      classNumItem: [
        {
          value: 1,
          label: '1班',
        },
        {
          value: 2,
          label: '2班',
        },
        {
          value: 3,
          label: '3班',
        },
      ],
      //图片上传
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      cacheName: '', //图片名称
    };
  },
  methods: {
    //文件上传框隐藏和显示
    setUpdateDialog() {
      this.dialogVisible = true;
    },
    async saveClassDetail() {
      //数据提交保存函数
      const { data: res } = await this.axios({
        url: '/VueHandler/CourseHandler?action=add',
        method: 'post',
        data: {
          Cname: this.addClassForm.className,
          Cdescribe: this.addClassForm.classDetail,
          Cprice: this.addClassForm.classPrice,
          CategoryOne: '',
          CategoryTwo: '',
          CategoryThree: '',
          Cpic: this.cacheName,
        },
      });
      if (res.err) return this.$message.error(res.err);
      if (res.success) {
        this.$message.success(res.success);
        this.addClassForm = {}; //清空输入框
      }
    },
    handle_isOK(mode) {
      //确定取消事件
      if (mode == 'yes' || mode == 'cancel') {
        this.dialogVisible = false;
      }
    },
    async onFileChange(e, item) {
      console.log(e, item);
      var form = new FormData(); //格式化表单数据
      if (document.getElementById(item).files[0]) {
        //参数为上传控件的id和该控件的数据
        //           id            上传的图片
        form.append(item, document.getElementById(item).files[0]);
      }
      console.log(form);
      //处理图片上传
      this.axios
        .post('/VueHandler/UpLoadPicHandler', form, {
          method: 'post',
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then((res) => {
          console.log(res);
          this.cacheName = res.data.cacheName; //路径图片名称
          if (res.data.success) this.$message.success('图片上传成功');
          if (res.data.err) this.$message.success('图片上传失败');
          const Handledata = res.data.pictures.contents.data;
          this.imgdateUrl = 'data:image/png;base64,' + btoa(new Uint8Array(Handledata.Handledata).reduce((Handledata, byte) => Handledata + String.fromCharCode(byte), ''));
          console.log(this.imgdateUrl)
        });
    },
  },
};
</script>
<style lang="less" scoped>
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
  .el-input {
    width: 400px;
  }
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.el-select {
  width: 120px;
}
.el-form-item {
  .updateInput {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    line-height: 178px;
    text-align: center;
  }
}
</style>
