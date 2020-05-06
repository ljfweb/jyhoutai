<template>
  <div>
    <div class="title">课程列表</div>
    <div class="course_info">
      <div class="table_head">
        <i class="el-icon-platform-eleme"></i>
        课程信息
      </div>
      <div class="content">
        <el-form label-width="100px" class="demo-ruleForm">
          <el-form-item label="课程名称：" prop="name">
            <el-input v-model="cname"></el-input>
          </el-form-item>
          <el-form-item label="课程描述：" prop="name">
            <el-input v-model="cdes"></el-input>
          </el-form-item>
          <el-form-item label="课程价格：" prop="name">
            <el-input v-model="cprice"></el-input>
          </el-form-item>
          <el-form-item label="课程分类:" prop="region">
            <el-select v-model="fenlei" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="sure()">保存</el-button>
          </el-form-item>
        </el-form>
        <div class="pic">
          <div>课程封面</div>
          <div class="pic1"></div>
          <div class="btn">
            <a href="#">清除</a>
            <a href="#" @click="open">上传</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Course from "../../store/course";
export default {
  name: "courseadd",
  data() {
    return {
      cname: "",
      cdes: "",
      cprice: "",
      fenlei: "",
      imgsrc: "",
      pathname: "",
      CategoryOne: "",
      CategoryTwo: "",
      CategoryThree: ""
    };
  },
  computed: {
    uuids() {
      return Course.state.uuids;
    }
  },
  methods: {
    sure() {
      
      this.axios({
        url: "/VueHandler/CourseHandler?action=add",
        method: "post",
        data: {
          Cname: this.cname,
          Cdescribe: this.cdes,
          Cprice: this.cprice,
          CategoryOne: this.CategoryOne,
          Cpic: {
            value: this.pathname 
          }
        }
      }).then(res => {
        console.log(res);
      });
    },
    onFileChange(e, item) {
      var form = new FormData(); 
      if (document.getElementById(item).files[0]) {
        form.append(item, document.getElementById(item).files[0]);
      }
      console.log(form);
      this.axios
        .post("/VueHandler/UpLoadPicHandler", form, {
          method: "post",
          headers: { "Content-Type": "multipart/form-data" }
        }).then(res => {
          console.log(res);
          console.log(this.imgsrc);
          this.pathname = res.data.cacheName; 
        });
    },
    open() {
      this.$alert(
        "<strong>上传封面： <input id='" +
          this.uuids +
          "' @change='onFileChange($event,uuids)' accept='image/gif,image/jpeg,image/x-png' type='file' /> </strong>",
        {
          dangerouslyUseHTMLString: true,
          callback: () => {
            //确定按钮
            this.onFileChange(document.getElementById(this.uuids), this.uuids);
          }
        }
      );
    }
  }
};
</script>

<style lang="less">
.title {
  line-height: 40px;
  padding-left: 20px;
  box-sizing: border-box;
  font-size: 20px;
}
.course_info {
  width: 90%;
  margin: 0 auto;
}
.table_head {
  width: 100%;
  margin: 20px auto;
  line-height: 40px;
  border: 1px solid #e5e5e5;
}
.content {
  display: flex;

  border: 1px solid #e5e5e5;
  .el-form {
    width: 750px;
    margin-right: 20px;
    .el-form-item {
      margin-top: 15px;
      .el-input {
        width: 184px;
      }
    }
  }
  .pic {
    width: 200px;
    margin-top: 30px;
    .pic1{
      width: 190px;
      height: 130px;
      background: skyblue;
      margin: 10px;
    }
    .btn {
      display: flex;
      justify-content: space-around;
    }
  }
}
</style>
