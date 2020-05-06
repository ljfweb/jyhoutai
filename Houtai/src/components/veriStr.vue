<template>
  <div>
    <!--画布-->
    <canvas id="my_canvas" width="100" height="40" @click="getVeri"></canvas>
  </div>
</template>

<script>
export default {
  created() {
    this.getVeri();
  },
  data() {
    return {};
  },
  methods: {
    getVeri() {
      //获取验证码
      this.axios.get('/VueHandler/AdminLoginAndRegHandler?action=verification').then(res => {
        console.log(res);
        this.DrawLetter(res.data.data); //重新请求绘制
      });
    },
    //画英文验证码
    DrawLetter(Strings) {
      var canvas = document.getElementById('my_canvas');
      var draw = canvas.getContext('2d'); //语境上下文为2d方式 (没有3d)
      canvas.height = canvas.height;
      var font = ['宋体', '黑体', '微软雅黑', '草书'];
      var color = ['red', 'skyblue', 'black', 'gray', 'yellow', 'green', 'blue'];
      draw.font = 30 + parseInt(Math.random() * 1) + 'px ' + font[parseInt(Math.random() * 4)];
      draw.fillStyle = color[parseInt(Math.random() * 7)];
      draw.fillText(Strings, 5, 30); //显示验证码
      this.drawLine(draw);
    },
    // //干扰线
    drawLine(draw) {
      //干扰线固定5条
      for (var i = 0; i < 5; i++) {
        draw.moveTo(0, parseInt(Math.random() * 42));
        draw.lineTo(70 + parseInt(Math.random() * 30), parseInt(Math.random() * 30));
        draw.stroke();
      }
    }
  }
};
</script>
<style lang="less" scoped>
#my_canvas {
  position: absolute;
  right: -120px;
  bottom: 0px;
}
canvas {
  border: 1px solid;
  background-color: greenyellow;
}
a {
  text-decoration: none;
}
</style>
