<template>
  <div>
    <jy-head></jy-head>
    <div id="main">
        <div id="main_left" ref="main_left">左</div>
        <div id="main_right" ref="main_right">右</div>
    </div>
  </div>
</template>

<script>
import jyHead from "./jyhead";
export default {
  name: "myindex",
  components: {
    jyHead
  },
  data(){
      return{
          guanliyuanNum:0,
          xueyuanNum:0,
          num1:5,
          num2:5
      }
  },
  methods:{
      getlist(pageStart, searchText) {
        this.axios({
          url: "/VueHandler/AdminHandler?action=show",
          method: "get",
          params: {
            searchText: searchText,
            pageStart: pageStart
          }
        }).then(res => {
          console.log(res);
          // console.log(this.total);
          this.guanliyuanNum = res.data.data.count;
          // console.log(this.guanliyuanNum);
          this.getStudentList(1);
        })
       },
       getStudentList(pageStart, userName, phone, email) {
         this.axios({
           url: "/VueHandler/AdminHandler?action=usershow",
           method: "post",
           data: {
             pageStart: pageStart,
             userName: userName,
             phone: phone,
             email: email
           }
         }).then(res => {
           console.log(res);
           this.xueyuanNum = res.data.data.count;
           // console.log(this.xueyuanNum);
           this.zhuzhuang();
           this.bingzhuang();
         });
       },
      zhuzhuang(){
          console.log(this.guanliyuanNum,this.xueyuanNum);
          //基于准备好的dom，初始化echarts实例
          var main_left = this.$refs.main_left;
          var myChart = this.$echarts.init(main_left); 
          // 绘制图表
          myChart.setOption({
              title: {
                  text: '人员组成'
              },
              tooltip: {},
              xAxis: {
                  data: ['管理员', '学员']
              },
              yAxis: {},
              series: [{
                  name: '人数',
                  type: 'bar',
                  data: [this.guanliyuanNum,this.xueyuanNum]
                  // data: [num1,num2]
              }]
          });
      },
      bingzhuang(){
          //基于准备好的dom，初始化echarts实例
          var main_right = this.$refs.main_right;
          var myChart = this.$echarts.init(main_right); 
          // 绘制图表
           myChart.setOption({
                    title : {
                        text: '人员组成',//主标题
                        x:'center',//x轴方向对齐方式
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        bottom: 'bottom',
                        data: ['管理员','学员']
                    },
                    series : [
                        {
                            name: '人员',
                            type: 'pie',
                            radius : '55%',
                            center: ['50%', '60%'],
                            data:[
                                {value:this.guanliyuanNum, name:'管理员'},
                                {value:this.xueyuanNum, name:'学员'}
                            ],
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                });
      }
  },
  created() {
      this.getlist(1);
  },
  mounted() {
      // this.getlist(1);
  }
};
</script>

<style lang="less" scoped>
    #main{
        margin-top: 200px;
        width: 1200px;
        height: 600px;
        background-color: darkcyan;
        display: flex;
        justify-content: center;
        align-items: center;
        #main_left{
            width: 600px;
            height: 600px;
            background-color: white;
        }
        #main_right{
            width: 600px;
            height: 600px;
            background-color: white;
        }
    }
</style>
