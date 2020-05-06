<template>
  <div class="courseadd">
    <!-- 上面保存部分 -->
    <div class="table-add">
      <!-- 列表标题信息 -->
      <div class="add-title">
        <el-row>
          <el-col :span="1">
            <div class="grid-content bg-purple myicon">
              <i class="el-icon-s-grid" style=""></i>
            </div>
          </el-col>
          <el-col :span="23">
            <div class="grid-content bg-purple-light mytitle">课程信息</div>
          </el-col>
        </el-row>
      </div>
      <!-- 添加内容编辑 -->
      <div class="add-input">
        <el-row :gutter="20">
          <el-col :span="14">
            <div class="grid-content bg-purple">
              <el-form label-width="80px" :model="myCourse">
                <el-form-item
                  label="课程名称"
                  prop="name"
                  :rules="[
                    {
                      required: true,
                      message: '请输入课程名称',
                      trigger: 'blur'
                    }
                  ]"
                >
                  <el-input v-model="myCourse.name" size="small"></el-input>
                  <p>60字以内</p>
                </el-form-item>
                <el-form-item
                  label="课程描述"
                  prop="describe"
                  :rules="[
                    {
                      required: true,
                      message: '请输入课程描述',
                      trigger: 'blur'
                    }
                  ]"
                >
                  <el-input v-model="myCourse.describe" size="small"></el-input>
                  <p>100字以内</p>
                </el-form-item>
                <el-form-item
                  label="课程价格"
                  prop="price"
                  :rules="[
                    {
                      required: true,
                      message: '请输入课程价格',
                      trigger: 'blur'
                    }
                  ]"
                >
                  <el-input v-model="myCourse.price" size="small"></el-input>
                  <p>课程价格以元为单位，免费课程设置为0</p>
                </el-form-item>
                <el-form-item label="专业选择">
                  <el-select
                    v-model="categoryOne"
                    placeholder="请选择活动区域"
                    size="small"
                  >
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                  <el-select
                    v-model="categoryTwo"
                    placeholder="请选择活动区域"
                    size="small"
                  >
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                  <el-select
                    v-model="categoryThree"
                    placeholder="请选择活动区域"
                    size="small"
                  >
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-button
                    type="success"
                    :disabled="btnDisable"
                    @click="submitForm"
                    >保存</el-button
                  >
                </el-form-item>
              </el-form>
            </div>
          </el-col>
          <el-col :span="10">
            <div class="grid-content bg-purple">
              <div class="Cover"><i style="color:red">*</i> 课程封面：</div>
              <el-upload
                action="/VueHandler/UpLoadPicHandler"
                list-type="picture-card"
                :limit="1"
                auto-upload
                :on-success="handleSuccess"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="" />
              </el-dialog>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "courseadd",
  props: ["querydata"],
  data() {
    return {
      //课程添加的表单
      myCourse: {
        name: "",
        describe: "",
        price: ""
      },
      // 专业选择分类
      categoryOne: "",
      categoryTwo: "",
      categoryThree: "",
      // 上传图片
      imageUrl: "", //后台需要的图片地址
      dialogImageUrl: "", //弹出窗显示放大的图片地址
      dialogVisible: false, //显示上传封面的缩略图
      btnDisable: false //按钮是否禁用
    };
  },
  methods: {
    // 保存按钮
    submitForm() {
      if (
        this.myCourse.name &&
        this.myCourse.describe &&
        this.myCourse.price &&
        this.imageUrl
      ) {
        this.axios
          .post("/VueHandler/CourseHandler?action=add", {
            Cname: this.myCourse.name,
            Cdescribe: this.myCourse.describe,
            Cprice: this.myCourse.price,
            CategoryOne: this.categoryOne,
            CategoryTwo: this.categoryTwo,
            CategoryThree: this.categoryThree,
            Cpic: {
              value: this.imageUrl
            }
          })
          .then(res => {
            console.log(res);
            this.$message.success("课程信息添加成功");
          });
      } else {
        this.$message.error("抱歉，添加失败,基本信息不能为空!");
      }
    },
    // 删除上传图片
    handleRemove() {
      this.axios({
        url: "/VueHandler/UpLoadPicHandler?action=delete",
        method: "get",
        params: {
          pathName: this.imageUrl
        }
      });
    },
    // 上传成功后
    handleSuccess(response) {
      this.imageUrl = response.cacheName;
    },
    // 点击列表图片的加号触发
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 获取课程信息
    getCourseInfo() {
      if (this.querydata.ID !== undefined) {
        this.btnDisable = true;
        let ID = this.querydata.ID;
        this.axios({
          method: "get",
          url: "/VueHandler/CourseHandler?action=getcourse",
          params: {
            ID
          }
        }).then(res => {
          console.log(res);
          this.myCourse.name = res.data.data.courselist.Cname;
          this.myCourse.describe = res.data.data.courselist.Cdescribe;
          this.myCourse.price = res.data.data.courselist.Cprice;
          // this.$emit("courseinfodata", this.courseIofoData);
        });
      }
    }
  },
  updated() {
    this.$emit("courseinfodata", {
      courseInfo: this.myCourse,
      CategoryOne: this.categoryOne,
      CategoryTwo: this.categoryTwo,
      CategoryThree: this.categoryThree,
      Cpic: this.imageUrl
    });
  },
  created() {
    this.getCourseInfo();
  },
  mounted() {}
};
</script>

<style lang="less" scoped>
.courseadd {
  width: 100%;
  .table-add {
    padding: 10px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    .add-title {
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
    .add-input {
      margin-top: 10px;
      box-sizing: border-box;
      border: 1px solid #ccc;
      .el-form-item__content {
        .el-input {
          float: left;
          width: 50%;
        }
        p {
          float: left;
          font-size: 12px;
          color: #666;
          font-style: italic;
          margin-left: 10px;
        }
        .el-select {
          width: 30%;
          margin: 0 5px;
        }
      }
      .Cover {
        line-height: 40px;
      }
    }
  }
}
</style>
