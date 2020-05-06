<template>
  <div class="mine">
    <van-nav-bar title="我的京东" left-arrow @click-left="onClickLeft">
      <template #right>
        <van-icon name="more-o" size="30" />
      </template>
    </van-nav-bar>
    <van-card
      :desc="myslef.name"
      :title="'用户名:' + myslef.name"
      :thumb="myslef.head"
    />
    <van-grid>
      <van-grid-item
        icon="photo-o"
        text="代付款"
        @click="toMyOrder(1)"
        :badge="orderNum.dfk"
      />
      <van-grid-item icon="photo-o" text="待收货" :badge="orderNum.dsh" />
      <van-grid-item icon="photo-o" text="退换/售后" :badge="orderNum.wd" />
      <van-grid-item
        icon="photo-o"
        text="全部订单"
        :badge="orderNum.all"
        @click="toMyOrder(0)"
      />
    </van-grid>
    <div class=""></div>
    <van-cell title="我的收获地址" is-link to="/myAddress" />
    <van-cell title="我的资产" is-link to="index" />

    <!-- <for-you-com></for-you-com> -->
  </div>
</template>
<script>
// import ForYouCom from '../components/foryou'
export default {
  name: "mine",
  components: {
    // ForYouCom
  },
  data() {
    return {
      myslef: {},
      orderNum: {}
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    toMyOrder(type) {
      this.$router.push({ name: "myorder", params: { type: type } });
    }
  },
  mounted() {
    // 获取我的个人中心
    this.axios
      .post(
        "https://api.ymduo.com/Member/information",
        this.$qs.stringify({
          uid: 956532
        })
      )
      .then(res => {
        this.myslef = res.data.result.data;
        // 获取每个type对应的数量
        this.axios
          .post(
            "https://api.ymduo.com/ordershow/typenum",
            this.$qs.stringify({
              userid: 956532
            })
          )
          .then(res => {
            this.orderNum = res.data.result.data;
          });
      });
  }
};
</script>

<style lang="less" scoped>
.van-icon {
  color: black;
}
.van-card {
  background-color: #f60;
  color: #ffd;
}
</style>
