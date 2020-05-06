<template>
  <div>
    <van-nav-bar title="我的京东" left-text="返回" left-arrow>
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
      <van-grid-item @click="turnorder(1)" :badge="orderNum.dfk" icon="photo-o" text="待付款" />
      <van-grid-item :badge="orderNum.dsh" icon="photo-o" text="待收货" />
      <van-grid-item :badge="orderNum.wc" icon="photo-o" text="完成" />
      <van-grid-item :badge="orderNum.all" @click="turnorder(0)" icon="photo-o" text="全部订单" />
    </van-grid>
    <div style="margin-top:10px;"></div>
    <van-cell title="我的收货地址" is-link to="/address" />
    <van-cell title="我的订单" is-link to="myorder" />
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
        this.$qs.stringify({ uid: 956547 })
      )
      .then(res => {
        console.log(res);
        console.log(987654);
        this.userData = res.data.result.data;
      });
    // 获取订单类型个数接口
    this.axios
      .post(
        "https://api.ymduo.com/ordershow/typenum",
        this.$qs.stringify({ userid: 956547 })
      )
      .then(res => {
        console.log(res);
        this.orderNum = res.data.result.data;
      });
  },
  mounted() {}
};
</script>

<style></style>
