<template>
  <div style="background-color: white;">
    <van-nav-bar title="在线支付" left-arrow @click-left="$router.go(-1)" />
    <van-row type="flex" justify="center">
      <van-col class="price">￥1450.00</van-col>
    </van-row>
    <van-radio-group v-model="radio" class="payFunction">
      <van-row type="flex" justify="center">
        <van-col :span="20">银联支付</van-col>
        <van-col :span="2"><van-radio name="1"></van-radio></van-col>
      </van-row>
      <van-row type="flex" justify="center" style="margin-top: 15px;">
        <van-col :span="20">微信支付</van-col>
        <van-col :span="2"><van-radio name="2"></van-radio></van-col>
      </van-row>
      <van-row type="flex" justify="center" style="margin-top: 15px;">
        <van-col :span="20">支付宝支付</van-col>
        <van-col :span="2"><van-radio name="3"></van-radio></van-col>
      </van-row>
    </van-radio-group>
    <!-- 支付确定 -->
    <van-row>
      <van-col :span="24" class="btnis"
        ><van-button type="primary" round @click="handle_pay"
          >确定</van-button
        ></van-col
      >
    </van-row>
  </div>
</template>

<script>
export default {
  created() {
    console.log(this.$route.query.date);
    this.recivedAddressid = this.$route.query.date.addressinfo.id;
    this.recivedShopid = this.$route.query.date.shopidveri;
  },
  data() {
    return { radio: "1", recivedAddressid: "", recivedShopid: "", pay_sn: "" };
  },
  methods: {
    async handle_pay() {
      if (this.radio == "1") {
        console.log(1);
      }
      if (this.radio == "2") {
        const { data: res } = await this.axios({
          url: "https://api.ymduo.com/order/generate_orders",
          method: "post",
          data: this.$qs.stringify({
            userid: 956535,
            cart_id: this.recivedShopid,
            addr_id: this.recivedAddressid,
            use_balance: 0,
            use_integral: 0,
            is_pei: 0,
            pf: 1
          })
        });
        console.log(res);
        this.pay_sn = res.result.data.pay_sn;
        this.$router.push({
          name: "erweima",
          query: { sn: this.pay_sn, mode: "微信支付" }
        });
      }
      if (this.radio == "3") {
        console.log(3);
      }
    }
  }
};
</script>
<style lang="less" scoped>
.price {
  font-size: 32px;
  color: red;
  margin: 20px 0;
}
.payFunction {
  font-size: 16px;
  padding: 0 20px;
}
.btnis {
  padding: 25px 40px;
  .van-button {
    width: 100%;
  }
}
</style>
