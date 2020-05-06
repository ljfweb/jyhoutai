<template>
  <div id="Tx">
    <div style="width:600px;height:500px;float:right;display-inline:block;">
      <div id="zhu" style="width:600px;height:500px;"></div>
    </div>
    <div style="width:600px;float:left;display-inline:block;height:600px">
      <div class="pie">
        <div id="pie1">
          <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
          <div id="main1" style="float:left;width:100%;height: 300px"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
let echarts = require("echarts/lib/echarts");
// 引入饼状图组件
require("echarts/lib/chart/pie");
// 引入提示框和title组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");

export default {
  name: "Tx",
  data() {
    return {
      studentCount: 0,
      studentlist: [],
      adminCount: 0,
      adminlist: [],
      searchText: ""
    };
  },

  mounted() {
    // 调用柱状图的方法
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
          pageStart: "all",
          userName: "",
          phone: "",
          email: ""
        }
      })
    ]).then(res => {
      this.studentCount = res[1].data.data.count;
      this.studentlist = res[1].data.data.list;
      this.adminCount = res[0].data.data.count;
      this.adminlist = res[0].data.data.list;
      console.log(this.adminCount);
      console.log(this.studentCount);
      console.log(987654);
      // 渲染图标
      var zhuInit = this.$echarts.init(document.getElementById("zhu"));
      var tableData = [this.adminCount, this.studentCount];
      console.log(tableData);
      console.log(zhuInit);
      console.log(9876543);

      var option3 = {
        xAxis: {
          type: "category",
          data: ["系统人员", "在读学员"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: tableData,
            type: "bar", //bar  柱状图
            showBackground: true,
            backgroundStyle: {
              color: "rgba(0, 0, 0, 0.5)"
            }
          }
        ]
      };
      zhuInit.setOption(option3);
      console.log(98765);
    });
    // 调用饼状图的方法
    this.initData();
  },
  methods: {
    // 柱状
    // 获取
    getadminlist() {
      // 获取系统人员人数
      this.axios({
        url: "/VueHandler/AdminHandler?action=show",
        method: "get",
        params: {
          searchText: this.searchText,
          pageStart: 1
        }
      }).then(res => {
        console.log(res);
        this.adminlist = res.data.data.list;
        this.adminCount = res.data.data.count; //系统人员
      });
    },

    //饼状
    //初始化数据
    initData() {
      var freeStu = 0;
      var noStu = 0;
      // 获取学员的人数
      this.axios({
        url: "/VueHandler/AdminHandler?action=usershow",
        method: "post",
        data: {
          pageStart: 1,
          userName: "",
          phone: "",
          email: ""
        }
      }).then(res => {
        console.log(res);
        this.studentCount = res.data.data.count; //学员数量
        this.studentlist = res.data.data.list; //学员列表

        this.studentlist.forEach(item => {
          if (item.isstate) {
            freeStu++;
          } else {
            noStu++;
          }
        });
        console.log(freeStu);
        console.log(noStu);
        console.log(21321412);
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById("main1"));
        // 绘制图表
        myChart.setOption({
          title: {
            text: "后台管理人员统计", //主标题
            subtext: "系统统计", //副标题
            x: "center" //x轴方向对齐方式
          },
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient: "vertical",
            bottom: "bottom",
            data: ["学员", "可用学员", "冻结成员"]
          },
          series: [
            {
              name: "访问来源",
              type: "pie",
              radius: "55%",
              center: ["60%", "40%"],
              data: [
                { value: this.studentCount, name: "学员" },
                { value: freeStu, name: "可用学员" },
                { value: noStu, name: "冻结成员" }
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)"
                }
              }
            }
          ]
        });
        // this.initData();
      });
    }
  }
};
</script>

<style scoped lang="less">
.Tx {
  width: 100%;
  // display: flex;
  margin: 0;
  padding: 0;
  height: auto;
}
.el-col {
  border-radius: 4px;
}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple {
  background: #d3dce6;
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.Tx-div {
  width: 98%;
}
// @media screen and (max-width: 1000px) {
//     .Tx-div{
//       overflow: hidden;
//     }
//     .table-size{
//       font-size: 12px;
//     }
// }
#myChart {
  width: 70%;
  min-height: 300px;
  clear: both;
  box-sizing: border-box;
  margin: 30px auto;
}
</style>
