<template>
  <div class="home">
    <header-com></header-com>
    <div class="myEcharts">
      <div id="myChart"
           :style="{ width: '500px', height: '500px' }"></div>
      <div id="myChartCircle"
           :style="{ width: '500px', height: '500px' }"></div>
    </div>
  </div>
</template>

<script>
import HeaderCom from "../components/header"
export default {
  name: "home",
  components: { HeaderCom },
  data () {
    return {
      studentCount: 0,
      adminCount: 0,
      studentDongCount: 0,
      studentHuoCount: 0,
    }
  },
  methods: {
    // 饼图
    drawLineCircle () {
      // 基于准备好的dom，初始化echarts实例
      let myChartCircle = this.$echarts.init(
        document.getElementById("myChartCircle")
      )
      // 绘制图表
      myChartCircle.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          left: 10,
          data: ["冻结学生人数", "活跃学生人数"],
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "30",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: this.studentDongCount, name: "冻结学生人数" },
              { value: this.studentHuoCount, name: "活跃学生人数" },
            ],
          },
        ],
      })
    },
    // 柱形图
    drawLine () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"))
      // 绘制图表
      myChart.setOption({
        xAxis: {
          type: "category",
          data: ["系统人员", "学员管理"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [this.adminCount, this.studentCount],
            type: "bar",
            color: "skyblue",
          },
        ],
      })
    },
  },
  mounted () {
    // 保证数据获取完成之后再渲染图标
    Promise.all([
      this.axios({
        url: "/VueHandler/AdminHandler?action=show",
        method: "GET",
        params: {
          pageStart: 1,
        },
      }),
      this.axios({
        url: "/VueHandler/AdminHandler?action=usershow",
        method: "POST",
        data: {
          pageStart: "all",
          // userName: "xhh",
          // isstate: "true",
        },
      }),
    ]).then((res) => {
      this.adminCount = res[0].data.data.count
      this.studentCount = res[1].data.data.count
      this.studentList = res[1].data.data.list //冻结的
      this.studentList.forEach((item) => {
        if (item.isstate) {
          this.studentDongCount++
        } else {
          this.studentHuoCount++
        }
      })

      // 绘制柱状图
      this.drawLine()
      // 绘制饼状图
      this.drawLineCircle()
    })
  },
}
</script>
<style lang="less" scoped>
.myEcharts {
  display: flex;
  justify-content: space-around;
}
</style>
