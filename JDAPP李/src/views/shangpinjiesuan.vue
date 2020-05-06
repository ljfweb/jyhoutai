<template>
  <div style="background-color: white;padding-bottom: 60px;">
    <van-nav-bar
      title="确认订单"
      left-arrow
      @click-left="$router.go(-1)"
      fixed
    />
    <van-panel
      style="padding-top: 44px;"
      :title="'姓名：' + handleDate.name"
      :desc="'电话：' + handleDate.phone + '---地址:' + handleDate.address"
      status="默认"
      @click="changeAddress"
    >
    </van-panel>
    <!-- 商品显示区域 -->
    <van-nav-bar title="商品信息"></van-nav-bar>
    <van-row>
      <van-col :span="24" v-for="(item, index) in jiesuanDate" :key="index">
        <van-nav-bar
          :left-text="'商店：' + item.shop[0].shop_name"
          style="margin-bottom: -10px;margin-top: 4px;"
        ></van-nav-bar>
        <van-card
          v-for="(itemson, indexson) in item.shop"
          :key="indexson"
          :num="itemson.goods_num"
          :price="itemson.price"
          :desc="itemson.shop_name"
          :title="itemson.goods_name"
          :thumb="itemson.image"
        />
      </van-col>
    </van-row>
    <!-- 结算金额 运费 -->
    <div class="countpirce">
      <div>
        <span> 商品金额 ：</span>
        <!-- 保留小数点后两位 -->
        <span>{{ count_price }} 元</span>
      </div>
      <div>
        <span> 运费 ：</span> <span>+ {{ count_freight }} 元</span>
      </div>
      <div>
        实付金额：{{ (Number(count_price) + Number(count_freight)).toFixed(2) }}
        元
      </div>
    </div>
    <van-row style="padding: 12px;margin-top: 10px;">
      <van-col :span="24" style="margin-bottom: 12px;">
        <van-button round type="success">货到付款</van-button>
      </van-col>
      <van-col :span="24">
        <!-- 跳转到支付页 -->
        <van-button round type="primary" @click="handle_payMode"
          >在线付款</van-button
        >
      </van-col>
    </van-row>
  </div>
</template>

<script>
export default {
  created() {
    console.log(this.$route.query.info);
    this.shopID = this.$route.query.jiesuan;
    this.getAddress(); //获得地址
    this.payShopDetail(); //得到商品详细的数据用于结算数据
  },
  data() {
    return {
      handleDate: "", //用于处理地址信息数据
      shopID: "", //页面传来的结算数据
      jiesuanDate: [], //结算数据
      count_price: 0, //现在价格
      count_freight: 0, //结算价格
      adress_list: {}
    };
  },
  methods: {
    handle_payMode() {
      //付款方式调用
      //在线付款方式
      this.$router.push({
        name: "zhifuye",
        query: {
          date: {
            addressinfo: this.handleDate, //传入地址信息
            shopidveri: this.shopID,
            realprice: this.count_price
          }
        }
      });
    },
    // 获取商品结算页的数据
    async payShopDetail() {
      const { data: res } = await this.axios({
        url: "https://api.ymduo.com/order/order_confirm",
        method: "post",
        data: this.$qs.stringify({
          userid: 956535,
          cart_id: this.shopID,
          use_balance: 0,
          use_integral: 0,
          use_auction_integral: 0,
          is_pei: 0,
          pf: 1,
          ymVoucher: "",
          address_id: ""
        })
      });
      console.log(res);
      if (res.code == "202") {
        //如果有参数就返回页面
        this.$toast(res.msg);
        this.$router.push("/cart");
      }
      this.jiesuanDate = res.result.data.info;
      this.count_price = res.result.data.count_price;
      this.count_freight = res.result.data.count_freight;
      console.log(this.jiesuanDate);
    },
    async getAddress() {
      const { data: res } = await this.axios({
        url: "https://api.ymduo.com/Address/addresslists",
        method: "post",
        data: this.$qs.stringify({
          uid: 956535
        })
      });
      console.log(res);
      var handleAddress = [];
      res.result.data.forEach(item => {
        if (item.def == "1") {
          handleAddress = item;
        }
      });
      console.log(handleAddress);
      this.handleDate = handleAddress;
    },
    changeAddress() {
      //跳转到地址修改
      this.$router.push({
        name: "address"
      });
    }
  }
};
</script>
<style lang="less" scoped>
.van-cell__label {
  width: 300px;
}
.countpirce {
  margin: 20px 0;
  height: 90px;
  font-size: 16px;
  font-weight: bold;
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
  line-height: 20px;
  background: white;
  div {
    padding: 10px 20px;
    border-bottom: 1px solid gainsboro;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    &:last-child {
      justify-content: flex-end;
      color: red;
    }
    span:nth-child(2) {
      color: red;
      font-size: 18px;
    }
  }
}
.van-button {
  width: 100%;
}
</style>
