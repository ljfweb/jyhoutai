<template>
  <div class='courseEdit'>
    <h1>--------课程列表---------</h1>
    <div>
      <div class="courseHeader">
        <i class="el-icon-s-grid"></i>
        <span>课程信息</span>
      </div>
    </div>
    <div class="courseEditCla">
      <div class="editLeft">
        <el-form :model="dynamicValidateForm"
                 ref="dynamicValidateForm"
                 label-width="100px"
                 class="demo-dynamic">
          <el-form-item prop="Cname"
                        label="课程名称"
                        :rules=" { required: true, message: '请输入课程名称', trigger: 'blur' } 
                        ">
            <el-input v-model="dynamicValidateForm.Cname"
                      maxlength="60"
                      show-word-limit
                      style="width:300px"></el-input>
            <span style="margin-left:30px">60字以内</span>
          </el-form-item>
          <el-form-item prop="Cdescribe"
                        label="课程描述"
                        :rules="[ { required: true, message: '请输入课程描述', trigger: 'blur' }, ]">
            <el-input v-model="dynamicValidateForm.Cdescribe"
                      maxlength="100"
                      show-word-limit
                      style="width:300px"></el-input>
            <span style="margin-left:30px">100字以内</span>
          </el-form-item>
          <el-form-item prop="Cprice"
                        label="课程价格"
                        :rules="[ { required: true, message: '请输入课程价格', trigger: 'blur' }, ]">
            <el-input v-model="dynamicValidateForm.Cprice"
                      style="width:300px"></el-input>
            <span style="margin-left:30px"> 课程价格以元为单位，免费课程设置为0</span>
          </el-form-item>
          <el-form-item label="专业选择">
            <el-select v-model="dynamicValidateForm.CategoryOne">
              <el-option label="区域一"
                         value="shanghai"></el-option>
              <el-option label="区域二"
                         value="beijing"></el-option>
            </el-select>
            <el-select v-model="dynamicValidateForm.CategoryTwo">
              <el-option label="区域一"
                         value="shanghai"></el-option>
              <el-option label="区域二"
                         value="beijing"></el-option>
            </el-select>
            <el-select v-model="dynamicValidateForm.CategoryThree">
              <el-option label="区域一"
                         value="shanghai"></el-option>
              <el-option label="区域二"
                         value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
                       @click="submitForm">保存</el-button>
            <!-- <el-button @click="addDomain">新增域名</el-button>
            <el-button @click="resetForm('dynamicValidateForm')">重置</el-button> -->
          </el-form-item>
        </el-form>
      </div>
      <div class="editRight">
        <span>课程封面：</span>
        <el-upload class="avatar-uploader"
                   action="https://jsonplaceholder.typicode.com/posts/"
                   :show-file-list="false"
                   :on-success="handleAvatarSuccess"
                   :before-upload="beforeAvatarUpload">
          <img v-if="dynamicValidateForm.Cpic"
               :src="dynamicValidateForm.Cpic"
               class="avatar">
          <i v-else
             class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <p>
          <span @click="clearImg">清除</span>
          <span>上传</span>
        </p>

      </div>
    </div>
    <div>
      <div class="courseHeader">
        <i class="el-icon-s-grid"></i>
        <span>课程内容</span>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'courseEdit',
  components: {},
  data () {
    return {
      dynamicValidateForm: {
        Cname: '',
        Cdescribe: '',
        Cprice: '',
        CategoryOne: '',
        CategoryTwo: '',
        CategoryThree: '',
        Cpic: '',
        ID: ''
      },
      ID: ''
    };
  },
  methods: {
    // 清除上传图片
    clearImg () {
      this.dynamicValidateForm.Cpic = ""
    },
    // 保存课程
    submitForm () {
      console.log(this.dynamicValidateForm)
      if (this.dynamicValidateForm.ID) {
        // 修改
        // this.axios({
        //   url: "/VueHandler/CourseHandler?action=add",
        //   method: "POST",
        //   data: this.dynamicValidateForm,
        // }).then((res) => {
        //   if (res.status == 200) {
        //     this.$message.success(res.data.success)
        //     // this.$router.push("/course")
        //   } else {
        //     this.$message.error("添加失败")
        //   }
        // })
      } else {
        this.axios({
          url: "/VueHandler/CourseHandler?action=add",
          method: "POST",
          data: this.dynamicValidateForm,
        }).then((res) => {
          if (res.status == 200) {
            this.$message.success(res.data.success)
            // this.$router.push("/course")
          } else {
            this.$message.error("添加失败")
          }
        })
      }

    },
    resetForm (formName) {
      this.$refs[formName].resetFields();
    },
    removeDomain (item) {
      var index = this.dynamicValidateForm.domains.indexOf(item)
      if (index !== -1) {
        this.dynamicValidateForm.domains.splice(index, 1)
      }
    },
    addDomain () {
      this.dynamicValidateForm.domains.push({
        value: '',
        key: Date.now()
      });
    },
    handleAvatarSuccess (res, file) {
      this.dynamicValidateForm.Cpic = URL.createObjectURL(file.raw);
      // this.axios({
      //   url: "/VueHandler/UpLoadPicHandler",
      //   method: "POST",
      //   data: { data: this.imageUrl },
      // }).then((res) => {
      //   console.log(111111, res)
      //   // this.getList()
      // })
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    }
  },
  mounted () {
    // 判断导航是否包含参数
    var url = window.location.search
    if (url) {
      this.ID = url.split("&")[0].split("=")[1]
      // var _id = url.split("&")[1].split("=")[1]
      this.axios({
        url: "/VueHandler/CourseHandler?action=getcourse",
        method: "get",
        params: {
          ID: this.ID
        }
      }).then(res => {
        console.log(res.data.data.courselist)
        this.dynamicValidateForm = res.data.data.courselist
        this.dynamicValidateForm.Cpic = ""
      })

    }
  },
  created () {

  }
}
</script>
<style lang='less' >
.courseEdit {
  > h1 {
    line-height: 50px;
    background: #f5f5f5;
  }
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
      font-size: 18px;
      line-height: 40px;
    }
    span {
      font-size: 18px;
      padding-left: 10px;
    }
  }
  .el-select {
    width: 180px;
    margin-right: 5px;
  }
  .courseEditCla {
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
    .editLeft {
      width: 700px;
    }
    .editRight {
      width: 500px;
      span {
        line-height: 30px;
      }
      p {
        width: 178px;
        display: flex;
        justify-content: space-around;
        line-height: 30px;
        color: blue;
      }
      .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
      }
      .avatar-uploader .el-upload:hover {
        border-color: #409eff;
      }
      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
      }
      .avatar {
        width: 178px;
        height: 178px;
        display: block;
      }
    }
  }
}
</style>