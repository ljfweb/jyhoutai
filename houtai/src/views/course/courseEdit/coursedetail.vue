<template>
  <div class="coursedetail">
    <!-- 课程详情 -->
    <div class="table-detail">
      <!-- 课程详情标题信息 -->
      <div class="detail-title">
        <el-row>
          <el-col :span="1">
            <div class="grid-content bg-purple myicon">
              <i class="el-icon-s-grid" style=""></i>
            </div>
          </el-col>
          <el-col :span="23">
            <div class="grid-content bg-purple-light mytitle">课程详情</div>
          </el-col>
        </el-row>
      </div>
      <!-- 富文本编辑器内容 -->
      <div class="detail-content"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "coursedetail",
  components: {},
  data() {
    return {
      //课程详情信息
    };
  }
};
</script>

<style lang="less" scoped>
.coursedetail {
  width: 100%;
  .table-detail {
    padding: 10px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    .detail-title {
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
    .detail-content {
      margin-top: 10px;
      box-sizing: border-box;
      border: 1px solid #ccc;
    }
  }
}
</style>
