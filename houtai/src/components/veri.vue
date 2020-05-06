<template>
  <div class="canvas-box">
    <canvas id="myCanvas" @click="changeVeri">{{ veriData }}</canvas>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  data() {
    return {
      veriData: "",
    }
  },
  methods: {
    //生成随机验证码
    getVerification(codeStr) {
      var myCanvas = document.getElementById("myCanvas")
      var ctx = myCanvas.getContext("2d")
      ctx.fillStyle = "#0d1953"
      ctx.fillRect(0, 0, myCanvas.width, myCanvas.height)
      ctx.textAlign = "center"
      ctx.fillStyle = "white"
      ctx.font = "80px Roboto Slab"
      ctx.fillText(codeStr, myCanvas.width / 2, 100)
    },
    //获取验证码
    getveri() {
      this.axios({
        url: "/VueHandler/AdminLoginAndRegHandler?action=verification",
        method: "get",
      }).then((res) => {
        this.veri = res.data.data
        this.getVerification(res.data.data)
      })
    },
    changeVeri() {
      this.getveri()
    },
  },
  mounted() {
    this.getveri()
  },
}
</script>
<style lang="less" scoped>
#myCanvas {
  width: 100px;
  height: 38px;
  font-size: 20px;
}
</style>
