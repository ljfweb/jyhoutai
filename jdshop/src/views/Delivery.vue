<template>
  <div class="delivery">
    <van-nav-bar left-arrow @click-left="$router.go(-1)" />
    <div class="goodCla">
      <img :src="orderItem.goods_img" alt="" />
      <h1>{{ orderItem.goods_name }}</h1>
    </div>
    <div class="mailCla">
      <h2>评价快递员 xx</h2>
      <div>
        <img src="../../public/img/mail.jpg" alt="" />
        <van-rate
          v-model="value"
          :size="25"
          color="#ee0a24"
          void-icon="star"
          void-color="#eee"
        />
      </div>
      <p>{{ expTextName }}{{ mailNo }}</p>
    </div>
    <div class="deliCla">
      <van-steps direction="vertical" :active="0" active-color="red">
        <van-step v-for="(item, index) in deliveryData" :key="index">
          <h3>{{ item.context }}</h3>
          <p>{{ item.time }}</p>
        </van-step>
      </van-steps>
    </div>
  </div>
</template>

<script>
export default {
  name: "delivery",
  components: {},
  data() {
    return {
      deliveryData: [],
      orderItem: {},
      value: 3,
      expTextName: "",
      mailNo: ""
    };
  },
  methods: {},
  mounted() {
    console.log(this.$route.params.orderItem);
    this.orderItem = this.$route.params.orderItem;
    this.axios({
      url: "https://route.showapi.com/64-19",
      method: "get",
      params: {
        com: "auto",
        nu: "772006943409072",
        showapi_appid: "120384",
        showapi_sign: "409aa391626b49e18084753149b46abf"
      }
    }).then(res => {
      console.log(res);
      this.deliveryData = res.data.showapi_res_body.data;
      this.expTextName = res.data.showapi_res_body.expTextName;
      this.mailNo = res.data.showapi_res_body.mailNo;
    });
  }
};
</script>
<style lang="less" scoped>
.goodCla {
  text-align: center;
  img {
    width: 130px;
    height: 130px;
    border: 1px solid red;
    border-radius: 10px;
  }
  h1 {
    font-size: 16px;
    line-height: 32px;
  }
}
.mailCla {
  padding: 0 15px;
  h2 {
    line-height: 24px;
  }
  img {
    width: 50px;
    height: 50px;
    margin-right: 15px;
  }

  p {
    line-height: 30px;
  }
}
</style>
