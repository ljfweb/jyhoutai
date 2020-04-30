<template>
  <div>
    <jy-head></jy-head>
    <div class="tongji">
      <div id="zhu"></div>
      <div id="bing" style="width:800px;"></div>
    </div>
  </div>
</template>

<script>
import jyHead from "./jyhead";
export default {
  name: "myindex",
  data() {
    return {
      searchText: "",
      adminCount: 0,
      studentCount: 0,
      adminlist: [],
      studentlist: []
    };
  },
  components: {
    jyHead
  },
  methods: {
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

        // console.log(this.total);
      });
    },
    getstudentlist() {
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
        this.studentCount = res.data.data.count;
        console.log(this.studentCount);
        this.studentlist = res.data.data.list;
      });
    },
    freezeCount() {
      //
      // 统计出冻结学员和可用学员的人数
      var freeze = 0;
      var used = 0;
      this.studentlist.forEach(item => {
        if (item.isstate) {
          freeze++;
        } else {
          used++;
        }
      });

      var echartsBing = this.$echarts.init(document.getElementById("bing"));
      var option = {
        tooltip: {
          //悬浮提示
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: 10,
          data: [
            "直达",
            "营销广告",
            "搜索引擎",
            "邮件营销",
            "联盟广告",
            "视频广告",
            "百度",
            "谷歌",
            "必应",
            "其他"
          ]
        },
        series: [
          {
            name: "访问来源", //name  a
            type: "pie", //类型 pie 饼状图
            selectedMode: "single",
            radius: [0, "30%"],
            label: {
              position: "inner"
            },
            labelLine: {
              show: false
            },
            data: [
              //       data  name  {b}  value   {c}  {d}--value占的比例
              { value: freeze, name: "冻结学员", selected: true },
              { value: used, name: "可用学员" }
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
              // shadowBlur:3,
              // shadowOffsetX: 2,
              // shadowOffsetY: 2,
              // shadowColor: '#999',
              // padding: [0, 7],
              rich: {
                //样式
                a: {
                  color: "#999",
                  lineHeight: 22,
                  align: "center"
                },
                // abg: {
                //     backgroundColor: '#333',
                //     width: '100%',
                //     align: 'right',
                //     height: 22,
                //     borderRadius: [4, 4, 0, 0]
                // },
                hr: {
                  borderColor: "#aaa",
                  width: "100%",
                  borderWidth: 0.5,
                  height: 0
                },
                b: {
                  fontSize: 16,
                  lineHeight: 33
                },
                per: {
                  color: "#eee",
                  backgroundColor: "#334455",
                  padding: [2, 4],
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
      };

      echartsBing.setOption(option);
    }
  },
  created() {},
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
          pageStart: "all",
          userName: "",
          phone: "",
          email: ""
        }
      })
    ]).then(res => {
      // res[0],
      // res[1]
      this.studentCount = res[1].data.data.count;
      this.studentlist = res[1].data.data.list;
      this.freezeCount(); //学生冻结人数统计
      console.log(res);
      this.adminCount = res[0].data.data.count;
      this.adminlist = res[0].data.data.list;
      // 渲染图标
      var zhuInit = this.$echarts.init(document.getElementById("zhu"));
      var tableData = [this.adminCount, this.studentCount];
      console.log(tableData);
      var option1 = {
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
              color: "rgba(220, 220, 220, 0.8)"
            }
          }
        ]
      };
      zhuInit.setOption(option1);
    });
  }
};
</script>

<style lang="less">
.tongji {
  height: 500px;
  display: flex;
  justify-content: space-around;
  margin-top: 40px;
  > div {
    width: 600px;
    background: skyblue;
    height: 500px;
  }
}
</style>
