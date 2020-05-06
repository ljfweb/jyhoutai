<template>
  <div class="vericanvas">
    <canvas width="100" height="38" id="check" @click="changeveri"
      >您的浏览器不支持canvas标签！</canvas
    >
  </div>
</template>

<script>
export default {
  name: "vericanvas",
  data() {
    return {
      veri: ""
    };
  },
  methods: {
    getVeri() {
      this.axios
        .get("/VueHandler/AdminLoginAndRegHandler?action=verification")
        .then(res => {
          // console.log(res);
          this.setVeriCanvas(res.data.data); //绘制验证码
        });
    },
    // 点击改变验证码
    changeveri() {
      this.getVeri();
    },
    // 后台返回验证码用canvas画出来
    setVeriCanvas(val) {
      var ctx = document.getElementById("check").getContext("2d");
      var ctxW = document.getElementById("check").clientWidth;
      var ctxH = document.getElementById("check").clientHeight;
      // 产生一个随机数  可设置随机数区间
      function ranNum(min, max) {
        return Math.random() * (max - min) + min;
      }
      // 返回一个随机颜色 可设置颜色区间
      function ranColor(min, max) {
        var r = ranNum(min, max);
        var g = ranNum(min, max);
        var b = ranNum(min, max);
        return `rgb(${r},${g},${b})`;
      }
      /*** 随机字符串数*/
      function ranStr(val) {
        return val.split("");
        // var str =
        //   "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm0123456789";
        // return str.split("").sort(function() {
        //   return Math.random() - 0.5;
        // });
      }
      // 绘制文本字符串
      function drawText(
        canvasId,
        canvasW,
        canvasH,
        num,
        fsMin,
        fsMax,
        frMin,
        frMax,
        min,
        max
      ) {
        var str = "";
        var index = 0;
        for (let i = 0; i < num; i++) {
          var char = ranStr(val)[index++];
          var fs = ranNum(fsMin, fsMax);
          canvasId.font = fs + "px Verdana";
          canvasId.fillStyle = ranColor(min, max);
          // 保存绘制的状态
          canvasId.save();
          // context.translate(x,y);
          // x    添加到水平坐标（x）上的值
          // y    添加到垂直坐标（y）上的值
          // 偏移
          canvasId.translate((canvasW / num) * i + canvasW / 20, 0);
          // 变换角度
          canvasId.rotate((ranNum(frMin, frMax) * Math.PI) / 180);
          // context.fillText(text,x,y,maxWidth);
          // text    规定在画布上输出的文本。
          // x    开始绘制文本的 x 坐标位置（相对于画布）。
          // y    开始绘制文本的 y 坐标位置（相对于画布）。
          // maxWidth    可选。允许的最大文本宽度，以像素计。
          canvasId.fillText(char, 0, (canvasH + fs) / 2.5, canvasW / num);
          // 返回之前保存过的路径状态和属性
          ctx.restore();
          str = char + str;
          // console.log(str);
          // return str;
        }
      }
      //  绘制背景
      function drawBg(canvasId, canvasW, canvasH, min, max) {
        // 绘制canvas背景
        canvasId.fillStyle = ranColor(min, max);
        // 填充颜
        canvasId.fillRect(0, 0, canvasW, canvasH);
      }
      // 绘制干扰 圆点
      function drawCircle(canvasId, canvasW, canvasH, num, r, min, max) {
        for (var i = 0; i < num; i++) {
          // 开始绘制 （拿起笔）
          canvasId.beginPath();
          // context.arc(x,y,r,sAngle,eAngle,counterclockwise); （绘制）
          // x    圆的中心的 x 坐标。
          // y    圆的中心的 y 坐标。
          // r    圆的半径。
          // sAngle    起始角，以弧度计。（弧的圆形的三点钟位置是 0 度）。
          // eAngle    结束角，以弧度计。
          // counterclockwise    可选。规定应该逆时针还是顺时针绘图。False = 顺时针，true = 逆时针。
          canvasId.arc(
            ranNum(0, canvasW),
            ranNum(0, canvasH),
            r,
            0,
            2 * Math.PI
          );
          // 填充颜色
          canvasId.fillStyle = ranColor(min, max);
          // 填充
          canvasId.fill();
          // 闭合绘制 （放开笔）
          canvasId.closePath();
        }
      }
      // 绘制干扰 线段
      function drawLine(canvasId, canvasW, canvasH, num, min, max) {
        for (var i = 0; i < num; i++) {
          // 开始绘制 （拿起笔）
          canvasId.beginPath();
          // 绘制开始点
          canvasId.moveTo(ranNum(0, canvasW), ranNum(0, canvasH));
          // 绘制结束点
          canvasId.lineTo(ranNum(0, canvasW), ranNum(0, canvasH));
          canvasId.strokeStyle = ranColor(min, max);
          canvasId.stroke();
          canvasId.closePath();
        }
      }

      // // 绘制验证码
      function drawCanvas() {
        // 清空canvas
        ctx.clearRect(0, 0, 100, 38);
        // 绘制背景
        drawBg(ctx, ctxW, ctxH, 200, 255);
        // 绘制干扰圆点
        drawCircle(ctx, ctxW, ctxH, 20, 5, 200, 255);
        // 绘制干扰线段
        drawLine(ctx, ctxW, ctxH, 20, 0, 255);
      }
      drawCanvas();
      // 绘制验证码
      drawText(ctx, ctxW, ctxH, 4, 10, 50, -30, 30, 0, 100);
    }
  },
  created() {
    // 获取验证码
    this.getVeri();
  },
  mounted() {}
};
</script>

<style lang="less" scoped>
.vericanvas {
  width: 100%;
}
</style>
