<template>
  <div class="pay">
    <van-nav-bar title="京东收银台" left-arrow @click-left="$router.go(-1)">
      <template #right>
        <van-icon name="more-o" size="30" />
      </template>
    </van-nav-bar>
    <div class="priceCla">￥{{ $route.params.truePrice }}</div>
    <van-cell title="支付宝" is-link />
    <van-cell title="微信" is-link @click="truePayWX" />
    <van-cell title="银联" is-link />
    <div v-if="wxFlag" class="wxCla">
      <h1>微信支付</h1>
      <div><img :src="payInfo.code_url" alt="" /></div>
      <p>订单编号:{{ payInfo.order_no }}</p>
      <p>订单金额:{{ payInfo.total_fee }}</p>
      <p>实付金额:{{ payInfo.real_fee }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "pay",
  components: {},
  data() {
    return { wxFlag: false, paySn: "", payInfo: {} };
  },
  methods: {
    truePayWX() {
      this.wxFlag = true;
      this.axios
        .post(
          "https://api.ymduo.com/pay/wxPay",
          this.$qs.stringify({
            uid: 956638,
            pay_sn: this.paySn
          })
        )
        .then(res => {
          this.payInfo = res.data.result.data;
          console.log(res.data.result.data);
        });
    }
  },
  mounted() {
    this.paySn = this.$route.params.paySn;
  }
};
</script>
<style lang="less" scoped>
.pay {
  .priceCla {
    height: 60px;
    width: 100%;
    font-size: 30px;
    line-height: 50px;
    color: red;
    text-align: center;
  }
}
.wxCla {
  padding: 0 40px;
  box-sizing: border-box;
  h1 {
    text-align: center;
    font-size: 30px;
  }
  div {
    text-align: center;
    img {
      width: 200px;
      height: 200px;
    }
  }
  p {
    line-height: 26px;
  }
}
</style>
