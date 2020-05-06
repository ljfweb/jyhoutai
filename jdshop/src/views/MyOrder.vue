<template>
  <div class="myOrder">
    <van-nav-bar title="我的京东" left-arrow @click-left="onClickLeft">
      <template #right>
        <van-icon name="more-o" size="30" />
      </template>
    </van-nav-bar>
    <van-search v-model="value" placeholder="商品名称/商品编号/订单号" />
    <van-tabs v-model="active" @click="changeOrder">
      <van-tab title="全部">
        <van-card
          v-for="(item, index) in myOrderData"
          :key="index"
          :num="item.goods[0].goods_number"
          :price="item.goods[0].goods_price"
          :title="item.goods[0].goods_name"
          :thumb="item.goods[0].goods_img"
        />
      </van-tab>
      <van-tab title="代付款">
        <van-card
          v-for="(item, index) in myOrderData"
          :key="index"
          :num="item.goods[0].goods_number"
          :price="item.goods[0].goods_price"
          :title="item.goods[0].goods_name"
          :thumb="item.goods[0].goods_img"
        >
          <template #footer>
            <van-button
              size="mini"
              @click="
                $router.push({
                  name: 'delivery',
                  params: { orderItem: item.goods[0] }
                })
              "
              >查看物流</van-button
            >
          </template>
        </van-card>
      </van-tab>
      <van-tab title="待收货">
        <van-card
          v-for="(item, index) in myOrderData"
          :key="index"
          :num="item.goods[0].goods_number"
          :price="item.goods[0].goods_price"
          :title="item.goods[0].goods_name"
          :thumb="item.goods[0].goods_img"
        />
      </van-tab>
      <van-tab title="已完成">
        <van-card
          v-for="(item, index) in myOrderData"
          :key="index"
          :num="item.goods[0].goods_number"
          :price="item.goods[0].goods_price"
          :title="item.goods[0].goods_name"
          :thumb="item.goods[0].goods_img"
        />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: "myOrder",
  components: {},
  data() {
    return {
      value: "",
      active: 0,
      myOrderData: []
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    getOrder(type) {
      this.axios
        .post(
          "https://api.ymduo.com/ordershow/index",
          this.$qs.stringify({
            userid: 956638,
            page: 1,
            type: type
          })
        )
        .then(res => {
          console.log(res.data.result.data);
          this.myOrderData = res.data.result.data;
        });
    },
    // tab切换展示数据
    changeOrder() {
      this.getOrder(this.active);
    }
  },

  created() {
    this.type = this.$route.params.type;
    this.active = this.type;

    this.getOrder(this.type);
  },
  mounted() {}
};
</script>
<style lang="less" scoped>
.van-icon {
  color: black;
}
.van-search__content {
  border-radius: 30px;
}
</style>
