<template>
  <div class="echartsbar">
    <div id="chartsbar"></div>
  </div>
</template>

<script>
export default {
  name: "echartsbar",
  props: ["personnum"],
  data() {
    return {};
  },
  methods: {
    // 制作图表
    getEcharts() {
      /*ECharts图表*/
      let that = this;
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("chartsbar"));
      // 指定图表的配置项和数据
      myChart.setOption({
        title: {
          text: "人数统计"
        },
        tooltip: {},
        toolbox: {
          show: true,
          feature: {
            //工具箱
            saveAsImage: { show: true }, //保存图片
            dataView: { show: true }, //数据视图
            restore: { show: true } //恢复
          }
        },
        legend: {
          data: ["人数"]
        },
        xAxis: {
          data: ["系统人数", "学员人数"]
        },
        yAxis: {},
        series: [
          {
            name: "人数",
            type: "bar",
            data: [that.personnum.adminCount, that.personnum.studentCount]
          }
        ]
      });
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.getEcharts();
    });
  }
};
</script>

<style lang="less" scoped>
.echartsbar {
  width: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  #chartsbar {
    text-align: center;
    width: 100%;
    height: 300px;
    div {
      width: 100%;
      height: 100%;
      canvas {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
