<template>
  <div>
    <jy-head></jy-head>
    <div class="echarts">
    <div id="main"
         style="width: 700px;height:400px;float: left;margin-right: 50px;"></div>

    <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
    <div id="main1"
         style="width: 400px;height:400px;float: left;"></div>
  </div>
  </div>
</template>
<script>
import JyHead from './header';
import echarts from "echarts";
export default {
  name: "index",
  data(){
    return{
      searchText: "",
      adminlist:[],
      adminCount:"",
      studentCount:"",
      studentlist:[]
    }
  },
  components: {
    JyHead
  },
  methods:{
    getlist() {
      this.axios({
        url: "/VueHandler/AdminHandler?action=show",
        method: "get",
        params: {
          searchText:this.searchText,
          pageStart: 1
        }
      }).then(res => {
        console.log(res);
         this.adminlist = res.data.data.list;
         this.adminCount = res.data.data.count; //系统人员人数
       
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


    //冻结与正常学员
    freezeCount(){
      var freeze = 0;
      var used = 0;
      this.studentlist.forEach(item => {
        if (item.isstate) {
          freeze++;
        } else {
          used++;
        }
      });


      var myChart = echarts.init(document.getElementById('main'));
  //   // 基于准备好的dom，初始化echarts实例


    // 指定图表的配置项和数据
   var option = {
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
        orient: 'vertical',
        left: 10,
        data: ['直达', '营销广告', '其他']
    },
    series: [
        {
            name: '访问来源',
            type: 'pie',
            selectedMode: 'single',
            radius: [0, '30%'],

            label: {
                position: 'inner'
            },
            labelLine: {
                show: false
            },
            data: [
                { value: freeze, name: "冻结学员", selected: true },
              { value: used, name: "正常学员" }
            ]
        },
        {
            name: '访问来源',
            type: 'pie',
            radius: ['40%', '55%'],
            label: {
                formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
                backgroundColor: '#eee',
                borderColor: '#aaa',
                borderWidth: 1,
                borderRadius: 4,
                // shadowBlur:3,
                // shadowOffsetX: 2,
                // shadowOffsetY: 2,
                // shadowColor: '#999',
                // padding: [0, 7],
                rich: {
                    a: {
                        color: '#999',
                        lineHeight: 22,
                        align: 'center'
                    },
                    // abg: {
                    //     backgroundColor: '#333',
                    //     width: '100%',
                    //     align: 'right',
                    //     height: 22,
                    //     borderRadius: [4, 4, 0, 0]
                    // },
                    hr: {
                        borderColor: '#aaa',
                        width: '100%',
                        borderWidth: 0.5,
                        height: 0
                    },
                    b: {
                        fontSize: 16,
                        lineHeight: 33
                    },
                    per: {
                        color: '#eee',
                        backgroundColor: '#334455',
                        padding: [2, 4],
                        borderRadius: 2
                    }
                }
            },
            data: [
                {value: 335, name: '直达'},
                {value: 310, name: '邮件营销'},
                {value: 102, name: '其他'}
            ]
        }
    ]
};

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);

    }
  },
  created(){
        this.getlist(),
        this.getstudentlist()
        },
  mounted () {
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
    ]).then(res=>{
      console.log(res);
      this.studentCount = res[1].data.data.count;//学员人数
      this.adminCount = res[0].data.data.count;//系统员人数

      var tableData = [this.adminCount, this.studentCount];

      this.studentlist = res[1].data.data.list;
      this.freezeCount();

    var myChart1 = echarts.init(document.getElementById('main1'));
       // 指定图表的配置项和数据
    var option1 = {
      title: {
        text: ''
      },
      tooltip: {},
      legend: {
        data: ['人数']
      },
      xAxis: {
        data: ["系统管理员人数", "学员人数"]
      },
      yAxis: {},
      series: [{
        name: '人数',
        type: 'bar',
        data: tableData,
         showBackground: true,
            backgroundStyle: {
              color: "rgba(220, 220, 220, 0.8)"
            }
      }]
    };


    // 使用刚指定的配置项和数据显示图表。
    myChart1.setOption(option1);
    })
       


  


   
  }
}

</script>
<style lang-="less" scoped>
.echarts{
  margin-top: 100px;
  margin-left: 15%;
}
</style>