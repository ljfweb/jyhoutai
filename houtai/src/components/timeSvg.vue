<template>
  <div class="timesvg">
    <svg>
      <text
        id="time"
        text-anchor="middle"
        x="50%"
        y="50%"
        class="words words-1"
      ></text>
      <text
        id="time"
        text-anchor="middle"
        x="50%"
        y="50%"
        class="words words-2"
      ></text>
      <text
        id="time"
        text-anchor="middle"
        x="50%"
        y="50%"
        class="words words-3"
      ></text>
      <text
        id="time"
        text-anchor="middle"
        x="50%"
        y="50%"
        class="words words-4"
      ></text>
    </svg>
  </div>
</template>

<script>
export default {
  name: "timesvg",
  data() {
    return {};
  },
  mounted() {
    // 定义时间的格式
    function showtime() {
      const nowtime = new Date();
      let h = nowtime.getHours();
      let m = nowtime.getMinutes();
      let s = nowtime.getSeconds();
      h = checktime(h);
      m = checktime(m);
      s = checktime(s);
      return `${h}:${m}:${s}`;
    }

    // 处理时间小于10补足0
    function checktime(x) {
      if (x < 10) {
        x = "0" + x;
      }
      return x;
    }

    // 获取dom元素
    const divlist = document.querySelectorAll("text");
    // 加一个定时器
    setInterval(() => {
      let timestr = showtime();
      divlist.forEach(item => {
        item.innerHTML = timestr;
      });
    }, 1000);
  }
};
</script>

<style lang="less" scoped>
.timesvg {
  width: 100%;
  height: 100vh;
  // background-color: black;
  svg {
    width: 100%;
    height: 100%;
    .words {
      font-size: 100px;
      font-weight: bold;
      fill: none;
      stroke-width: 5px;
      stroke-dasharray: 90, 310;
      animation: drawing 8s linear infinite;
    }
    .words-1 {
      stroke: PapayaWhip;
      text-shadow: 0 0 50px PapayaWhip;
      animation-delay: -2s;
    }
    .words-2 {
      stroke: RosyBrown;
      text-shadow: 0 0 50px RosyBrown;
      animation-delay: -4s;
    }
    .words-3 {
      stroke: orange;
      text-shadow: 0 0 50px orange;
      animation-delay: -6s;
    }
    .words-4 {
      stroke: LightPink;
      text-shadow: 0 0 50px LightPink;
      animation-delay: -8s;
    }
  }
  @keyframes drawing {
    to {
      stroke-dashoffset: -400;
    }
  }
}
</style>
