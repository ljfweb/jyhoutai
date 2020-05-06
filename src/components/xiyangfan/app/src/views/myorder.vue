<template>
  <div>
    <van-nav-bar
      title="我的订单"
      left-text="返回"
      left-arrow
      @click-left="leftclick"
    >
      <template #right>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar>
    <van-search
      v-model="value"
      shape="round"
      background="#4fc08d"
      placeholder="请输入搜索关键词"
    />
    <van-tabs v-model="active" @change="getlist">
      <van-tab title="全部订单">
        <van-card
          v-for="(item, index) in alldata"
          :key="index"
          :num="item.goods[0].goods_num"
          :price="item.goods[0].goods_price"
          :desc="item.goods[0].store_name"
          :title="item.goods[0].goods_name"
          :thumb="item.goods[0].goods_img"
        >
        </van-card>
      </van-tab>
      <van-tab title="待付款">
        <van-card
          v-for="(item, index) in alldata"
          :key="index"
          :num="item.goods[0].goods_num"
          :price="item.goods[0].goods_price"
          :desc="item.goods[0].store_name"
          :title="item.goods[0].goods_name"
          :thumb="item.goods[0].goods_img"
        >
          <template #footer>
            <van-button type="primary" size="mini">取消订单</van-button>
            <van-button @click="turndelivery(item)" type="danger" size="mini"
              >查看物流</van-button
            >
          </template>
        </van-card>
      </van-tab>
      <van-tab title="完成">内容 3</van-tab>
      <van-tab title="待收货">内容 4</van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: "myorder",
  methods: {
    turndelivery(item) {
      //跳转物流
      this.$router.push({ name: "delivery", params: { item: item } });
    },
    getlist() {
      this.getorder(this.active);
    },
    leftclick() {
      this.$router.push("/my");
    },
    getorder(type) {
      this.axios
        .post(
          "https://api.ymduo.com/ordershow/index",
          this.$qs.stringify({
            userid: 956519,
            type: type,
            page: 1
          })
        )
        .then(res => {
          console.log(res);
          this.alldata = res.data.result.data;
        });
    }
  },
  data() {
    return {
      value: "",
      active: 0,
      alldata: "",
      type: ""
    };
  },
  created() {
    this.type = this.$route.params.type;
    this.active = this.type;
    this.getorder(this.type);
  }
};
</script>

<style></style>
