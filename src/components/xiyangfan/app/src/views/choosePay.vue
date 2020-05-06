<template>
  <div>
    <van-nav-bar
      title="京东收银台"
      left-text="返回"
      right-text="按钮"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <van-cell title="支付宝" is-link url="/vant/mobile.html" />
    <van-cell @click="turnPay" title="微信" />
    <van-cell title="银联" is-link to="index" />
  </div>
</template>

<script>
export default {
  name: "choosePay",
  data() {
    return {
      cartid: "",
      addr_id: ""
    };
  },
  created() {
    this.cartid = this.$route.params.cartid;
    this.addr_id = this.$route.params.addressid;
    console.log(this.cartid, this.addr_id);
  },
  methods: {
    onClickLeft() {},
    onClickRight() {},

    turnPay() {
      this.axios
        .post(
          "https://api.ymduo.com/order/generate_orders",
          this.$qs.stringify({
            userid: 956519,
            cart_id: this.cartid,
            addr_id: 2961,
            use_balance: 0,
            use_integral: 0,
            is_pei: 0,
            pf: 1
          })
        )
        .then(res => {
          console.log("实验", res);
          this.$router.push({
            name: "pay",
            params: { pay_sn: res.data.result.data.pay_sn }
          });
        })
        .catch(err => {
          console.error(err);
        });
    }
  }
};
</script>

<style></style>
