<template>
  <div class="courseadd">
    <jy-head></jy-head>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>课程管理</el-breadcrumb-item>
      <el-breadcrumb-item>课程列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 表格 -->
    <div class="center">
      <div class="center_top">
        <i class="el-icon-s-grid"></i>
        <div class="dan">课程信息</div>
      </div>
      <div class="center_middle">
        <ul class="center_middle_left">
          <li>
            <span>课程名称:</span>
            <input type="text" v-model="c_name" />
            <span>
              <i>60字以内</i>
            </span>
          </li>
          <li>
            <span>课程描述:</span>
            <input type="text"  v-model="c_description"/>
            <span>
              <i>100字以内</i>
            </span>
          </li>
          <li>
            <span>课程价格:</span>
            <input type="text"  v-model="c_price"/>
            <span>
              <i>课程价格以元为单位,免费课程设置为0</i>
            </span>
          </li>
          <li>
            <span>专业选择:</span>
            <el-select placeholder="请选择">
              <el-option></el-option>
            </el-select>
            <el-select placeholder="请选择">
              <el-option></el-option>
            </el-select>
            <el-select placeholder="请选择">
              <el-option></el-option>
            </el-select>
          </li>
          <li>
            <el-button  @click="submitForm()" type="success" size="small">保存</el-button>
          </li>
        </ul>
        <div class="center_middle_right">
          <ul>
            <li>课程封面:</li>
            <li>
              <img :src="imgsrc" alt />
            </li>
            <li>
              <span>清除</span>
              <span @click="open">上传</span>
            </li>
          </ul>
        </div>
        <el-dialog :title="title" :visible="dialogFormVisible">
        <div class="img-file">
          <label for="imgFile" class="addbutton button-green">选择图片</label>
           <input
            @change="changeImage($event,item)"
            id="imgFile"
            class="upload_input"
            accept='image/*' 
            type='file'
          />
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="quxiao">取 消</el-button>
          <el-button type="primary" @click="sure">确 定</el-button>
        </div>
      </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import CourseStore from "../../store/course.js";
import jyHead from "../jyhead";
export default {
  name: "courseadd",
  data() {
    return {
      title:"上传图片",
      dialogFormVisible:false,
      c_name:"",
      c_description:"",
      c_price:"",
      imgsrc: "",
      pathname: "",
      CategoryOne: "",
      CategoryTwo: "",
      CategoryThree: ""
    };
  },
  components: {
    jyHead
  },
  computed: {
    uuids() {
      console.log(CourseStore.state.uuids);
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
          Cname: this.c_name,
          Cdescribe: this.c_description,
          Cprice: this.c_price,
          CategoryOne: this.CategoryOne,
          
        }
      }).then(res => {
        console.log(res);
        
      });
    },
    //打开上传图片的弹框
    open() {
      this.dialogFormVisible = true
    },
    quxiao(){
      this.dialogFormVisible = false
    },
changeImage(e,item) {
  console.log(e)
  console.log(item)
      var file = document.getElementById("imgFile").files[0];
      console.log(file);
      var url = URL.createObjectURL(file);
      console.log(url)
      this.imgsrc = url
       var form = new FormData();
				if(file){
					//参数为上传控件的id和该控件的数据
					form.append(file);
        };
        this.$axios.post('/VueHandler/UpLoadPicHandler',form,{
					method:'post',
					headers:{'Content-Type':'multipart/form-data'}
				}).then(function(res){
				console.log(res)
				})
    },
    sure(){
      this.dialogFormVisible = false;
      
    }
    // onFileChange(e, item) {
    //   console.log(e, item);
    //   let form = new FormData(); //格式化表单数据
    //   console.log(document.getElementById(item).files[0]);
     
    //   if (document.getElementById(item).files[0]) {
    //     //参数为上传控件的id和该控件的数据
    //     //           id            上传的图片
    //     form.append(item, document.getElementById(item).files[0]);
    //     console.log(form);
    //   }
    //   this.axios
    //     .post("/VueHandler/UpLoadPicHandler", form, {
    //       method: "post",
    //       headers: { "Content-Type": "multipart/form-data" }
    //     })
    //     .then(res => {
    //       console.log(res);
    //       // this.flagUp = false;
    //       // this.uploadFlag_imgurl.value = res.data.cacheName;
    //       // this.imgsrc = URL.createObjectURL(res.data.pictures.contents.data);
    //       this.imgsrc = res.data.cacheName; //图片请求路径
    //       console.log(this.imgsrc);
    //     });
    // }
  }
};
</script>

<style lang="less" scoped>
.courseadd {
  .el-breadcrumb {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-top: 16px;
  }

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
    }
    .center_middle {
      width: 100%;
      border: 1px solid;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .center_middle_left {
        width: 40%;
        height: 100%;
        list-style: none;
        font-size: 12px;
        margin-left: -20px;
        li {
          width: 100%;
          height: 18%;
          margin-top: 10px;
          input {
            margin: 0 10px;
          }
          span:last-child {
            color: #ccc;
          }
        }

        li:nth-child(4) {
          .el-select {
            width: 120px;
            height: 10px;
            margin-left: 10px;
          }
        }
        li:last-child {
          margin-top: 20px;
        }
      }

      .center_middle_right {
        width: 20%;
        height: 100%;
        margin-left: 80px;
        ul {
          list-style: none;
          height: 100%;
          font-size: 12px;
          li:nth-child(2) {
            width: 100%;
            height: 100px;
            border: 1px solid;
            margin-top: 3px;
            img {
              width: 100%;
              height: 100%;
            }
          }
          li:last-child {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 10px;
            span {
              color: blue;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
}
</style>
