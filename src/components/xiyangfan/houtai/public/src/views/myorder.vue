<template>
  <div>
    <van-nav-bar title="我的订单" left-text="返回" left-arrow>
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
        />
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
        />
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
    getlist() {
      this.getorder(this.active);
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
    // 地址 https://api.ymduo.com/ordershow/index
    // 方式 post
    //data  userid 用户id
    //      type  0 全部  1 待付款
    //       page  1
    this.type = this.$route.params.type;
    this.active = this.type;
    this.getorder(this.type);
  }
};
</script>

<style></style>
