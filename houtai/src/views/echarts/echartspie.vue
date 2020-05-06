<template>
  <div class="chartspie">
    <!-- echarts饼状图 -->
    <div id="chartspie"></div>
  </div>
</template>

<script>
export default {
  name: "chartspie",
  props: ["studentlist"],
  data() {
    return {};
  },
  methods: {
    // 制作图表
    getEcharts() {
      /*ECharts图表*/
      // 统计出冻结学员和可用学员的人数
      let freeze = 0;
      let used = 0;
      this.studentlist.forEach(item => {
        if (item.isstate) {
          freeze++;
        } else {
          used++;
        }
      });
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("chartspie"));
      myChart.setOption({
        title: {
          text: "学员解冻状态",
          show: true,
          left: "left" //left center right
        }, //标题
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
        series: [
          {
            name: "解冻状态",
            type: "pie",
            radius: [0, "30%"],
            label: {
              position: "inner"
            },
            data: [
              { value: freeze, name: "已冻结" },
              { value: used, name: "已解冻" }
            ]
          },
          {
            name: "访问来源",
            type: "pie", //类型 pie 饼状图
            radius: ["40%", "55%"],
            label: {
              formatter: "{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ",
              backgroundColor: "#eee",
              borderColor: "#aaa",
              borderWidth: 1,
              borderRadius: 4,
              rich: {
                //样式
                a: {
                  color: "#999",
                  lineHeight: 22,
                  align: "center"
                },
                hr: {
                  borderColor: "#aaa",
                  width: "100%",
                  borderWidth: 0.5,
                  height: 0
                },
                b: {
                  fontSize: 12,
                  lineHeight: 30
                },
                per: {
                  color: "#eee",
                  backgroundColor: "#334455",
                  padding: [1, 2],
                  borderRadius: 2
                }
              }
            },
            data: [
              { value: 1048, name: "百度" },
              { value: 251, name: "谷歌" },
              { value: 147, name: "必应" },
              { value: 102, name: "其他" }
            ]
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
.chartspie {
  width: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  #chartspie {
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
