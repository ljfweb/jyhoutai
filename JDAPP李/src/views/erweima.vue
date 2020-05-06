<template>
  <div>
    <van-nav-bar
      title="支付页"
      left-arrow
      @click-left="$router.push({ name: 'cart' })"
    />
    <div class="pay_box">
      <div class="title">
        {{ payMode }}
      </div>
      <img :src="payInfo.code_url" alt="" />
      <div class="pay_msg">
        <span>订单编号：</span> <span>{{ payInfo.order_no }}</span>
      </div>
      <div class="pay_msg">
        <span>订单金额：</span> <span>{{ payInfo.total_fee }} 元</span>
      </div>
      <div class="pay_msg">
        <span>实付金额：</span><span>{{ payInfo.real_fee }} 元</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    console.log(this.$route.query.sn);
    this.sn = this.$route.query.sn;
    this.payMode = this.$route.query.mode;
    this.getErweima(); //调用
  },
  data() {
    return {
      payMode: "",
      sn: "",
      payInfo: ""
    };
  },
  methods: {
    getErweima() {
      this.axios({
        url: "https://api.ymduo.com/pay/wxPay",
        method: "post",
        data: this.$qs.stringify({
          uid: 956535,
          pay_sn: this.sn
        })
      }).then(res => {
        console.log(res);
        this.payInfo = res.data.result.data;
      });
    }
  }
};
</script>
<style lang="less" scoped>
.pay_box {
  height: 500px;
  text-align: center;
  font-family: "Times New Roman";
  font-weight: bold;
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
    line-height: 16px;
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
