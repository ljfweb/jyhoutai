<template>
  <div class="nologin">
    <div class="tips">
      <img
        src="//img11.360buyimg.com/jdphoto/s180x180_jfs/t18163/292/540553659/74408/adeb7463/5a93c51cN3bb5e37b.png"
        alt
      />
      <div class="noCart-title">购物车中空空滴···</div>
    </div>
    <div class="to-login">
      <van-button @click="goLogin" round block type="danger">{{
        tipstext
      }}</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "nologin",
  props: ["tipstext"],
  data() {
    return {
      // tipsTxt: "去登录"
    };
  },
  methods: {
    goLogin() {
      if (this.tipstext == "去登录") {
        this.$toast.loading({
          message: "加载中...",
          forbidClick: true
        });
        setTimeout(() => {
          this.$toast.clear();
          this.$router.push("/login");
        }, 800);
      } else {
        this.$toast.loading({
          message: "正在赶集中...",
          forbidClick: true
        });
        setTimeout(() => {
          this.$toast.clear();
          this.$router.push("/home");
        }, 800);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.nologin {
  width: 100%;
  background-color: #fff;
  border-radius: 5px;
  padding-top: 60px;
  position: relative;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  .tips {
    img {
      width: 100px;
      margin: auto;
    }
    .noCart-title {
      font-size: 16px;
      text-align: center;
      color: #333;
      margin-top: 15px;
    }
  }
  .to-login {
    margin-top: 25px;
    padding-bottom: 30px;
    width: 200px;
  }
}
</style>
