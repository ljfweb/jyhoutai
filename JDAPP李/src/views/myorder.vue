<template>
  <div>
    <van-nav-bar title="我的订单" left-arrow @click-left="$router.go(-1)">
      <template #right>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar>
    <van-search v-model="value" shape="round" placeholder="请输入搜索关键词" />
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
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: "myorder",
  created() {
    this.type = this.$route.params.type;
    this.active = this.type;
    this.getorder(this.type);
  },
  data() {
    return {
      value: "",
      active: 0,
      alldata: "",
      type: ""
    };
  },
  methods: {
    getlist() {
      this.getorder(this.active);
    },
    getorder(type) {
      this.axios
        .post(
          "https://api.ymduo.com/ordershow/index",
          this.$qs.stringify({
            userid: 956535,
            type: type,
            page: 1
          })
        )
        .then(res => {
          console.log(res);
          this.alldata = res.data.result.data;
        });
    }
  }
};
</script>

<style lang="less" scoped>
.van-search {
  background: white;
}
</style>
