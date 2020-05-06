<template>
  <div>
    <van-nav-bar
      title="支付"
      left-text="返回"
      right-text="按钮"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <div class="pay_box">
      <div class="title">
        微信支付
      </div>
      <img :src="payInfo.code_url" alt="" />
      <div class="pay_msg">
        <span>订单编号：</span> <span>{{ payInfo.order_no }}</span>
      </div>
      <div class="pay_msg">
        <span>订单金额：</span> <span>{{ payInfo.total_fee }}</span>
      </div>
      <div class="pay_msg">
        <span>实付金额：</span><span>{{ payInfo.real_fee }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "pay",
  data() {
    return {
      pay_sn: "",
      payInfo: ""
    };
  },
  created() {
    // 获取pay_sn  发起支付请求
    this.pay_sn = this.$route.params.pay_sn;
    console.log();
    this.axios({
      url: "https://api.ymduo.com/pay/wxPay",
      method: "post",
      data: this.$qs.stringify({
        uid: 956519,
        pay_sn: this.pay_sn
      })
    }).then(res => {
      console.log(res);
      this.payInfo = res.data.result.data;
    });
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    onClickRight() {}
  }
};
</script>

<style lang="less">
.pay_box {
  height: 500px;
  text-align: center;
  .title {
    font-size: 25px;
    color: green;
    text-align: center;
    margin-top: 15px;
  }
  img {
    width: 150px;
    height: 150px;
    margin: 15px 0;
  }
  .pay_msg {
    display: flex;
    font-size: 14px;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 10px 0;
    padding: 0 40px;
    box-sizing: border-box;
  }
}
</style>
