<template>
  <div class="Contents">
    <div class="AddConten">
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
          <el-button type="primary" @click="submitForm()">保存</el-button>
        </el-form-item>
      </el-form>
      <div class="courImg">
        <div>课程封面</div>
        <div>
          <img src alt />
        </div>
        <div class="btn">
          <a href="#">清除</a>
          <a href="#" @click="open">上传</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CourseStore from "../../store/course";
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
      return CourseStore.state.uuids;
    }
  },
  methods: {
    submitForm() {
      //课程添加
      this.axios({
        url: "/VueHandler/CourseHandler?action=add",
        method: "post",
        data: {
          Cname: this.cname,
          Cdescribe: this.cdes,
          Cprice: this.cprice,
          CategoryOne: this.CategoryOne,
          Cpic: {
            value: this.pathname //图片地址
          }
        }
      }).then(res => {
        console.log(res);
      });
    },
    onFileChange(e, item) {
      console.log(88888888888);
      //item--uuids
      console.log(item);
      //上传
      var form = new FormData(); //格式化表单数据

      if (document.getElementById(item).files[0]) {
        //参数为上传控件的id和该控件的数据
        //           id            上传的图片
        form.append(item, document.getElementById(item).files[0]);
      }
      console.log(form);
      this.axios
        .post("/VueHandler/UpLoadPicHandler", form, {
          method: "post",
          headers: { "Content-Type": "multipart/form-data" }
        })
        .then(res => {
          console.log(res);
          // this.flagUp = false;
          // this.uploadFlag_imgurl.value = res.data.cacheName;
          // this.imgsrc = URL.createObjectURL(res.data.pictures.contents.data);
          console.log(this.imgsrc);
          this.pathname = res.data.cacheName; //图片请求路径
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

<style lang="less" scoped>
.Contents {
  padding: 10px;
  background: #f5f5f5;
  min-width: 1100px;
  height: 100%;
  font-size: 16px;
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
.AddConten {
  width: 96%;
  border: 1px solid #cccccc;
  margin: 10px;
  justify-content: space-around;
  display: flex;
  .el-form {
    width: 750px;
    margin-right: 20px;
    .el-form-item {
      margin-top: 15px;
      .el-input {
        width: 188px;
      }
    }
  }
}
.courImg {
  width: 200px;
  margin-top: 30px;
  img {
    width: 100px;
    height: 100px;
  }
}
.btn {
  padding: 10px;
  :first-child {
    margin-left: 0px;
  }
  a {
    margin-left: 6px;
  }
}
</style>
