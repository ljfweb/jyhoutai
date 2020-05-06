<template>
  <div>
    <div class="orderConfirm" v-if="!addressFlag">
      <van-nav-bar title="确认订单" left-arrow @click-left="$router.go(-1)" />

      <div class="confirmcontent">
        <!-- <router-link > -->
        <div class="defaultaddress" @click="changeAddress">
          <h1>{{ defaultAddress.name }} {{ defaultAddress.phone }}</h1>
          <p><span v-if="prompt">默认</span>{{ defaultAddress.address }}</p>
          <hr />
        </div>
        <!-- </router-link> -->
        <div class="allOrder">
          <div class="storeCla" v-for="(item, index) in shopList" :key="index">
            <div class="shopCla">
              <h1>{{ item.shop[0].shop_name }}</h1>
            </div>
            <div class="goodsCla" v-for="(ele, i) in item.shop" :key="i">
              <van-card
                :price="ele.price"
                :title="ele.goods_name"
                :thumb="ele.image"
                :num="ele.goods_num"
              >
              </van-card>
            </div>
          </div>
        </div>
        <div class="payPrice">
          <div>
            <span>商品金额</span>
            <span style="color:red">￥{{ truePrice - countFreight }}</span>
          </div>
          <div>
            <span>运费</span>
            <span style="color:red">+￥{{ countFreight }}</span>
          </div>

          <p>
            实付金额:<span style="color:red">￥{{ truePrice }}</span>
          </p>
        </div>
        <van-button type="info" @click="topay">在线支付</van-button>
      </div>
    </div>
    <div>
      <address-com v-if="addressFlag" @getMyaddress="changeAdd"></address-com>
    </div>
  </div>
</template>

<script>
import addressCom from "./MyAddress";
export default {
  name: "orderConfirm",
  components: { addressCom },
  data() {
    return {
      allAddress: [],
      defaultAddress: "",
      shopList: [],
      truePrice: "",
      addressFlag: false,
      prompt: true,
      countFreight: 0,
      paySn: ""
    };
  },
  methods: {
    getAllAddress() {
      this.axios
        .post(
          "https://api.ymduo.com/Address/addresslists",
          this.$qs.stringify({
            uid: 956638
          })
        )
        .then(res => {
          console.log(res.data.result.data);
          this.allAddress = res.data.result.data;
          var obj = {};
          this.allAddress.forEach(item => {
            if (item.def == "1") {
              obj = item;
              this.prompt = true;
            }
          });
          this.defaultAddress = obj;
        });
    },
    changeAddress() {
      this.addressFlag = true;
    },
    changeAdd(item) {
      this.addressFlag = false;
      this.defaultAddress = item;
      if (item.def != "1") {
        this.prompt = false;
      }
    },
    topay() {
      console.log("确认支付");
      this.axios
        .post(
          "https://api.ymduo.com/order/generate_orders",
          this.$qs.stringify({
            userid: 956638,
            cart_id: this.$route.params.confirmData,
            addr_id: this.defaultAddress.id,
            remark: "",
            use_balance: 0,
            use_integral: 0,
            is_pei: 0,
            agent_id: "",
            pf: 1,
            ymVoucher: ""
          })
        )
        .then(res => {
          if (res.data.code == "500") {
            this.$Toast.fail(res.data.msg);
          } else {
            this.paySn = res.data.result.data.pay_sn;
            this.$router.push({
              name: "pay",
              params: { truePrice: this.truePrice, paySn: this.paySn }
            });
          }
        });
    }
  },
  mounted() {
    console.log("111", this.$route.params.allGoods);
    this.shopList = this.$route.params.allGoods.info;
    this.truePrice = this.$route.params.allGoods.count_price; // 实付金额
    this.countFreight = this.$route.params.allGoods.count_freight; //运费

    console.log(this.$route.params.allGoods);
  },

  created() {
    this.getAllAddress();
    if (this.$route.params.item) {
      console.log(this.$route.params.item);
      this.defaultAddress = this.$route.params.item;
    }
  }
};
</script>
<style lang="less" scoped>
.confirmcontent {
  width: 100%;
  .van-button {
    clear: both;
    width: 80%;
    border-radius: 60px;
    margin-left: 30px;
  }
  .defaultaddress {
    padding: 0 10px;
    box-sizing: border-box;
    position: sticky;
    background: white;
    top: 0;
    // z-index: 20;
    h1 {
      font-size: 16px;
      font-weight: bold;
      line-height: 30px;
    }
    span {
      display: inline-block;
      border: 1px solid red;
      width: 30px;
      height: 20px;
      line-height: 20px;
      text-align: center;
      color: red;
      margin-right: 5px;
    }
    hr {
      font-weight: bold;
      border-style: dashed;
      margin-top: 10px;
      font-size: 20px;
      color: red;
    }
  }
}
.content .storeCla {
  margin-bottom: 13px;
}
.storeCla {
  padding-top: 13px;
  background-color: #ddd;
}
.goodsCla {
  display: flex;
  background-color: white;
  // padding: 0 10px;
  width: 100%;
  .van-card {
    width: 330px;
    background-color: white;
    box-sizing: content-box;
  }
}
.shopCla {
  padding: 0 20px;
  width: 100%;
  height: 46px;
  display: flex;
  background-color: white;

  .van-checkbox {
    width: 42px;
    height: 46px;
    .van-checkbox__icon {
      margin: auto;
    }
  }
  h1 {
    width: 330px;
    height: 46px;
    line-height: 46px;
    font-size: 16px;
    // padding-left: 10px;
  }
}
.payPrice {
  padding-top: 13px;
  background: #ddd;
  div {
    background: white;
    display: flex;
    justify-content: space-between;
    height: 30px;
    font-size: 16px;
    line-height: 30px;

    padding: 0 10px;
    box-sizing: border-box;
  }
  p {
    padding: 0 10px;
    box-sizing: border-box;
    background: white;
    height: 40px;
    line-height: 40px;
    font-size: 18px;
    float: right;
  }
}
</style>
