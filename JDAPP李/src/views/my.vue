<template>
  <div>
    <van-nav-bar title="我的京东" left-arrow @click-left="$router.go(-1)">
      <template #right>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar>
    <van-card
      :desc="'昵称：' + userData.nickname"
      :title="'手机 ：' + userData.tel"
      :thumb="userData.head"
    />
    <van-grid>
      <van-grid-item
        @click="turnorder(1)"
        :badge="orderNum.dfk"
        icon="photo-o"
        text="待付款"
      />
      <van-grid-item :badge="orderNum.dsh" icon="photo-o" text="待收货" />
      <van-grid-item :badge="orderNum.wc" icon="photo-o" text="完成" />
      <van-grid-item
        :badge="orderNum.all"
        @click="turnorder(0)"
        icon="photo-o"
        text="全部订单"
      />
    </van-grid>
    <div style="margin-top:10px;"></div>
    <van-cell title="我的收货地址" is-link to="/address" />
    <van-cell title="物流查询" is-link to="/wuliuchaxun" />
  </div>
</template>

<script>
export default {
  name: "my",
  data() {
    return {
      active1: 0,
      userData: "",
      orderNum: ""
    };
  },
  methods: {
    turnorder(type) {
      this.$router.push({ name: "myorder", params: { type: type } });
    }
  },
  created() {
    this.axios
      .post(
        "https://api.ymduo.com/Member/information",
        this.$qs.stringify({ uid: 956535 })
      )
      .then(res => {
        console.log(res);
        this.userData = res.data.result.data;
      });
    // 获取订单类型个数接口
    this.axios
      .post(
        "https://api.ymduo.com/ordershow/typenum",
        this.$qs.stringify({ userid: 956535 })
      )
      .then(res => {
        console.log(res);
        this.orderNum = res.data.result.data;
      });
  },
  mounted() {
    // this.axios
    //   .post(
    //     "https://api.ymduo.com/pay/wxPay",
    //     this.$qs.stringify({
    //       user_id: 956519,
    //       pay_sn: "HSET2020040816385292369565197702"
    //     })
    //   )
    //   .then(res => {
    //     console.log(res);
    //   });
    // this.axios
    //   .post(
    //     "https://api.ymduo.com/Cart/lists",
    //     this.$qs.stringify({
    //       user_id: 956519
    //     })
    //   )
    //   .then(res => {
    //     console.log(res);
    //   });
    // this.axios
    //   .post(
    //     "https://api.ymduo.com/cart/add",
    //     this.$qs.stringify({
    //       user_id: 956519,
    //       shop_id: 526,
    //       goods_id: 17712,
    //       sku_id: "",
    //       goods_num: 1,
    //       active_type: 0
    //     })
    //   )
    //   .then(res => {
    //     console.log(res);
    //   });
  }
};
</script>

<style></style>
