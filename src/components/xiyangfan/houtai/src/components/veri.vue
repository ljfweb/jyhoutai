<template>
  <div>
    <canvas id="myCanvas" @click="changeveri">8797</canvas>
  </div>
</template>

<script>
export default {
  name: "veri",
  methods: {
    changeveri() {
      this.getveri();
    },
    getveri() {
      this.axios
        .get("/VueHandler/AdminLoginAndRegHandler?action=verification")
        .then(res => {
          console.log(res);
          this.getVerification(res.data.data);
        });
    },
    getVerification(code) {
      var codeStr = code;
      var myCanvas = document.getElementById("myCanvas");
      var ctx = myCanvas.getContext("2d");
      ctx.fillStyle = "skyblue";
      ctx.fillRect(0, 0, myCanvas.width, myCanvas.height);
      ctx.textAlign = "center";
      ctx.fillStyle = "#f00";
      ctx.font = "50px Roboto Slab";
      ctx.fillText(codeStr, myCanvas.width / 2, 80);
    }
  },
  mounted() {
    this.getveri();
  },
  data() {
    return {
      veri: ""
    };
  }
};
</script>

<style>
#myCanvas {
  width: 160px;
  height: 40px;
  background: skyblue;
}
</style>
