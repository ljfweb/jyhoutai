<template>
  <div class="courseedit">
    <!-- 课程编辑 -->
    <!-- 头部栏 -->
    <comHeader></comHeader>
    <!-- 课程列表内容 -->
    <el-divider content-position="left">课程列表</el-divider>
    <div class="courseContainer">
      <!-- 课程信息添加 -->
      <courseInfo
        :querydata="queryInfoData"
        @courseinfodata="courseInfoData"
      ></courseInfo>
      <div class="mask" :style="maskFlag ? 'height:60%' : ''"></div>
      <!-- 课程内容添加 -->
      <courseMain :querydata="queryInfoData"></courseMain>
      <!-- 课程详情添加 -->
      <courseDetail></courseDetail>
      <!-- 确定按钮 -->
      <el-button type="success" icon="el-icon-check" @click="saveAll"
        >确定</el-button
      >
    </div>
  </div>
</template>

<script>
import comHeader from "components/comHeader";
import courseInfo from "./courseinfo"; //课程信息
import courseMain from "./coursemain"; //课程内容
import courseDetail from "./coursedetail"; //课程内容
export default {
  name: "courseedit",
  components: {
    comHeader,
    courseInfo,
    courseMain,
    courseDetail
  },
  data() {
    return {
      maskFlag: false, //遮罩层是否显示
      queryInfoData: {
        ID: "",
        _id: ""
      },
      Cname: "", //课程名称
      Cdescribe: "", //课程描述
      Cprice: "", //课程价格
      CategoryOne: "", //一级分类
      CategoryTwo: "", //二级分类
      CategoryThree: "", //三级分类
      imgURL: "" //封面url地址
    };
  },
  methods: {
    // 课程信息的数据处理
    courseInfoData(item) {
      this.Cname = item.courseInfo.name;
      this.Cdescribe = item.courseInfo.describe;
      this.Cprice = item.courseInfo.price;
      this.CategoryOne = item.CategoryOne;
      this.CategoryTwo = item.CategoryTwo;
      this.CategoryThree = item.CategoryThree;
      this.imgURL = item.Cpic;
    },
    // 保存所有更改的数据
    saveAll() {
      this.axios({
        method: "post",
        url: "/VueHandler/CourseHandler?action=update",
        data: {
          _id: this.queryInfoData._id,
          Cname: this.Cname,
          Cdescribe: this.Cdescribe,
          Cprice: this.Cprice,
          CategoryOne: this.CategoryOne,
          CategoryTwo: this.CategoryTwo,
          CategoryThree: this.CategoryThree,
          Cpic: this.imgURL,
          Cdetails: ""
        }
      }).then(res => {
        this.$message.success(res.data.success);
        this.$router.push("/course");
      });
    }
  },
  created() {
    this.queryInfoData.ID = this.$route.query.ID;
    this.queryInfoData._id = this.$route.query._id;
    if (this.$route.query.ID) {
      this.maskFlag = false;
    } else {
      this.maskFlag = true;
    }
  }
};
</script>

<style lang="less" scoped>
.courseedit {
  width: 100%;
  .el-divider__text {
    font-size: 18px;
    color: #f700f7;
  }
  .courseContainer {
    padding: 0 10px 10px;
    background-color: #f5f5f5;
    height: 100%;
    position: relative;
    .el-button {
      margin: 20px 40px;
    }
    .mask {
      width: 100%;
      // height: 60%;
      background-color: rgba(201, 196, 196, 0.3);
      position: absolute;
      left: 0;
      bottom: -5px;
      z-index: 100;
    }
  }
}
</style>
