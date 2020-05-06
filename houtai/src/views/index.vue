<template>
  <div class="index">
    <!-- 头部组件 -->
    <comHeader></comHeader>
    <!-- 引入echarts图表 -->
    <div class="charts-wrap">
      <div class="chartsbar">
        <EchartsBar v-if="showEchart" :personnum="personCount"></EchartsBar>
      </div>
      <div class="chartspie">
        <EchartsPie v-if="showEchart" :studentlist="studentList"></EchartsPie>
      </div>
    </div>
  </div>
</template>

<script>
import comHeader from "components/comHeader";
import EchartsBar from "views/echarts/echartsbar"; //引入柱状图形的echarts
import EchartsPie from "views/echarts/echartspie"; //引入饼状图形的echarts
export default {
  name: "index",
  components: {
    comHeader,
    EchartsBar,
    EchartsPie
  },
  computed: {
    personCount() {
      return {
        adminCount: this.adminCount,
        studentCount: this.studentCount
      };
    }
  },
  data() {
    return {
      showEchart: false,
      adminCount: 0, //系统人员人数
      studentList: [], // 学员列表
      studentCount: 0 //学员人数
    };
  },
  methods: {
    // 获取系统人员和学员
    getPersonInfo() {
      Promise.all([
        this.axios({
          method: "get",
          url: "/VueHandler/AdminHandler?action=show",
          params: {
            searchText: "",
            pageStart: 1
          }
        }),
        this.axios({
          method: "post",
          url: "/VueHandler/AdminHandler?action=usershow",
          data: {
            pageStart: 1
          }
        })
      ]).then(res => {
        console.log(res);
        this.adminCount = res[0].data.data.count;
        this.studentCount = res[1].data.data.count;
        this.studentList = res[1].data.data.list;
        this.showEchart = true;
      });
    }
  },
  mounted() {
    this.getPersonInfo();
  }
};
</script>

<style lang="less" scoped>
.index {
  width: 100%;
  background-image: url("../assets/images/body_bg.jpg");
  height: 100vh;
  .charts-wrap {
    margin: 50px 4%;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0RjRCQkRFQzcyQjNFNTExQkNCOERFMkU1QThCMjBCMyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo0RkRGNEUwNkRDNkIxMUU1OTM2MkEwRTM3MjAyRThGQiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo0RkRGNEUwNURDNkIxMUU1OTM2MkEwRTM3MjAyRThGQiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjBERTkzNzk5NUVEQ0U1MTFBMkU4QUNCQUJGNzkwQkI4IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjRGNEJCREVDNzJCM0U1MTFCQ0I4REUyRTVBOEIyMEIzIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+ERx6qQAAABtJREFUeNpi/P//vxQDEYCJgUgwqpA6CgECDAD+TgMrZW1RwgAAAABJRU5ErkJggg==);
    padding: 50px 0;
    overflow: hidden;
    display: flex;
    justify-content: space-around;
    .chartsbar {
      width: 480px;
      height: 300px;
    }
    .chartspie {
      width: 480px;
      height: 300px;
    }
  }
}
</style>
