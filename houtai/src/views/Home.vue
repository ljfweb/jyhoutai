<template>
  <div class="home">
    <jy-head></jy-head>
    <div class="tongji">
      <div id="quare" style=" width: 400px;
    height: 400px;
    border: 1px solid;"></div>
      <div
        id="tiao"
        style=" width: 400px;
    height: 400px;
    border: 1px solid;margin-left:100px"
      ></div>
    </div>
  </div>
</template>

<script>
import jyHead from "../components/jyhead";
export default {
  name: "home",
  data() {
    return {
      adminCount: 0,
      studentCount: 0,
      adminlist: [],
      studentlist: []
    };
  },
  components: {
    jyHead
  },
  created() {
    console.log(this.option.series[0].data);
  },
  mounted() {
    Promise.all([
      this.axios({
        url: "/VueHandler/AdminHandler?action=show",
        method: "get",
        params: {
          searchText: this.searchText,
          pageStart: 1
        }
      }),
      this.axios({
        url: "/VueHandler/AdminHandler?action=usershow",
        method: "post",
        data: {
          pageStart: 1,
          userName: "",
          phone: "",
          email: ""
        }
      })
    ]).then(res => {
      console.log(res);
      this.studentCount = res[1].data.data.count;
      this.studentlist = res[1].data.data.list;
      console.log(res);
      this.adminCount = res[0].data.data.count;
      this.adminlist = res[0].data.data.list;
      
      var tiaoCount = [this.adminCount,this.studentCount]
      

    var myChart2 = this.$echarts.init(document.getElementById("tiao"));
    myChart2.setOption({
        color: ["#3398DB"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: ["系统人员", "学员"],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "直接访问",
            type: "bar",
            barWidth: "60%",
            data: tiaoCount
          }
        ]
      });
    var myChart = this.$echarts.init(document.getElementById("quare"));
    // 绘制图表
    myChart.setOption({
        title: {
          text: "系统人员与学员占比",
          subtext: "全是真的",
          left: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: ["系统人员", "学员"]
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              { value: this.studentCount, name: "学员" },
              { value: this.adminCount, name: "系统人员" }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      });
    });

  },
  methods: {}
};
</script>
<style lang="less">
.tongji {
  width: 100%;
  height: 400px;
  border: 1px solid;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .quare {
    width: 400px;
    height: 400px;
    border: 1px solid;
  }
  .tiao {
    width: 400px;
    height: 400px;
    border: 1px solid;
    margin-left: 100px;
  }
}
</style>