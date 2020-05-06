<template>
  <div style="font-size: 32px;">
    <h1>用户：{{ loginUser }}，欢迎登陆！</h1>
    <el-row type="flex" style="margin-top: 32px;background-color: gainsboro;">
      <el-col> <div id="myChart" :style="{ width: '500px', height: '400px' }"></div></el-col>
      <el-col><div id="titleQualCharts" :style="{ width: '500px', height: '400px' }"></div></el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  created() {
    this.loginUser = sessionStorage.user;
    this.getUserStudentCount();
  },
  data() {
    return {
      loginUser: '',
      userCount: 0,
      studentCount: 0,
      handle_value: [{ name: '111', value: 1 }],
      handle_stu: [],
      stuPage: 1,
      stuList: [],
    };
  },
  mounted() {},
  methods: {
    async getUserStudentCount() {
      //获取系统用户数据
      const { data: res } = await this.axios({
        url: '/VueHandler/AdminHandler?action=show',
        method: 'get',
        params: {
          searchText: '',
          pageStart: 1,
        },
      });
      // console.log(res);
      const { data: resb } = await this.axios({
        url: '/VueHandler/AdminHandler?action=usershow',
        method: 'post',
        data: {
          pageStart: this.stuPage,
          userName: '',
          email: '',
          phone: '',
        },
      });
      console.log(resb);
      //获取用户总数
      this.userCount = Number(res.data.count);
      this.studentCount = Number(resb.data.count);
      console.log(this.userCount, this.studentCount);
      this.handle_value = [
        {
          name: '系统管理员',
          value: this.userCount,
        },
        {
          name: '学员',
          value: this.studentCount,
        },
      ];
      //调用echarts
      this.drawLine();
      //处理学生人数解锁和没有解锁数据
      const handle_countSize = Math.ceil(this.studentCount / Number(resb.data.pageSize)); //计算出数据页数
      console.log(handle_countSize);
      if (this.stuPage <= handle_countSize) {
        for (var i = 0; i < handle_countSize; i++) {
          this.stuPage++;
          console.log(this.stuPage);
          this.getUserStudentCount();
          this.stuList = this.stuList.concat(resb.data.list); //获取到所有学员数据
        }
      }
      console.log(this.stuList);
      var locked = 0;
      var unlocked = 0;
      this.stuList.forEach((element) => {
        if (element.isstate) {
          locked++;
        } else {
          unlocked++;
        }
      });
      console.log(locked, unlocked);
      this.handle_stu = [
        {
          name: '冻结',
          value: locked,
        },
        {
          name: '未冻结',
          value: unlocked,
        },
      ];
      this.pieStu();
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('myChart'));
      // 绘制图表
      myChart.setOption({
        title: [
          {
            subtext: '管理员学员饼态显示图',
            left: '16.67%',
            top: '75%',
            textAlign: 'center',
          },
        ],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)',
        },
        legend: {
          orient: 'vertical',
          left: 10,
          data: ['系统管理员', '学员'],
        },
        series: [
          {
            name: [],
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center',
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '30',
                fontWeight: 'bold',
              },
            },
            labelLine: {
              show: false,
            },
            data: this.handle_value,
          },
        ],
      });
    },
    pieStu() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('titleQualCharts'));
      // 绘制图表
      myChart.setOption({
        title: [
          {
            subtext: '学员显示图',
            left: '16.67%',
            top: '75%',
            textAlign: 'center',
          },
        ],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)',
        },
        legend: {
          orient: 'vertical',
          left: 10,
          data: ['冻结', '未冻结'],
        },
        series: [
          {
            name: [],
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center',
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '30',
                fontWeight: 'bold',
              },
            },
            labelLine: {
              show: false,
            },
            data: this.handle_stu,
          },
        ],
      });
    },
  },
};
</script>
<style scoped></style>
