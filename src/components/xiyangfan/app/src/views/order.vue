<template>
  <div>
    <div v-if="!addressFlag">
      <van-nav-bar
        title="订单确认"
        left-text="返回"
        right-text="按钮"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
      />
      <div class="address" @click="addressFlag = true">
        <div class="name_phone">
          <h2>{{ adress_list.name }}</h2>
          <span>{{ adress_list.phone }}</span>
        </div>
        <div class="address_info">{{ adress_list.address }}</div>
      </div>
      <!-- 订单商品列表 -->
      <div class="shop" v-for="(item, index) in orderlist" :key="index">
        <div class="shop_title">
          <h2>
            {{ item.shop[0].shop_name }}
          </h2>
        </div>
        <div class="order_list">
          <div
            class="order_one"
            v-for="(orderitem, index) in item.shop"
            :key="index"
          >
            <img :src="orderitem.image" />
            <div class="goods_info">
              <div class="pname van-multi-ellipsis--l2">
                {{ orderitem.goods_name }}
              </div>
              <div class="sku">i7 1060 16g</div>
              <div class="price">
                <span>{{ orderitem.price }}</span>
                <span>x{{ orderitem.goods_num }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 结算 -->
      <div class="countpirce">
        <div>
          <span> 商品金额 ：</span>
          <span> {{ Number(count_price) - Number(count_freight) }}</span>
        </div>
        <div>
          <span> 运费 ：</span> <span> {{ count_freight }}</span>
        </div>
        <div>实付金额：{{ count_price }}</div>
      </div>
      <div class="btn_wrap">
        <van-button round type="success">货到付款</van-button>
        <van-button @click="turnchoosePay" round type="primary"
          >在线支付</van-button
        >
      </div>
    </div>
    <address-com @getdata="getaddress" v-if="addressFlag"></address-com>
  </div>
</template>

<script>
import addressCom from "./address";
export default {
  name: "order",
  components: {
    addressCom
  },
  data() {
    return {
      cartid: "",
      orderlist: [],
      count_price: 0,
      count_freight: 0,
      adress_list: {},
      addressFlag: false
    };
  },
  created() {
    console.log(8888888888888);
    if (!this.$route.params.flag) {
      this.$store.commit("initAddress");
      this.adress_list = this.$store.state.address;
    }
    this.cartid = this.$route.params.cartid;
    this.axios({
      url: "https://api.ymduo.com/order/order_confirm",
      method: "post",
      data: this.$qs.stringify({
        userid: 956519,
        cart_id: this.cartid,
        use_balance: 0,
        use_integral: 0,
        use_auction_integral: 0,
        is_pei: 0,
        pf: 1,
        ymVoucher: "",
        address_id: ""
      })
    }).then(res => {
      console.log(res);
      if (res.data.code == "202") {
        this.$Toast.fail(res.data.msg);
        this.$router.push("/cart");
      }
      this.orderlist = res.data.result.data.info;
      this.count_price = res.data.result.data.count_price;
      this.count_freight = res.data.result.data.count_freight;
    });
  },
  methods: {
    getaddress(flag, obj) {
      this.addressFlag = flag;
      this.adress_list = obj;
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    turnchoosePay() {
      this.$router.push({
        name: "choosePay",
        params: { cartid: this.cartid, addressid: this.adress_list.id }
      });
    },
    onClickRight() {},
    turnaddress() {
      this.$router.push("/address");
    }
  }
};
</script>

<style lang="less" scoped>
.address {
  height: 73px;
  padding: 0 20px;
  border-bottom: 2px dashed green;
  box-sizing: border-box;
  .name_phone {
    display: flex;
    line-height: 20px;
    margin: 10px 0;
    h2 {
      font-size: 20px;
      font-weight: bold;
      margin-right: 15px;
    }
    span {
      font-size: 18px;
    }
  }
  .address_info {
    font-size: 20px;
  }
}
.shop {
  margin: 20px 0;
  background: white;
}
.order_one {
  display: flex;
  justify-content: flex-start;
  img {
    width: 75px;
    height: 75px;
    margin-top: 50px;
    margin-left: 50px;
  }
}
.goods_info {
  width: 195px;
  margin-left: 10px;
  .pname {
    margin-top: 10px;
    height: 50px;
    font-weight: bold;
    line-height: 25px;
    font-size: 14px;
  }
  .sku {
    font-size: 14px;
    color: #ccc;
    line-height: 20px;
  }
  .price {
    margin-top: 30px;
    width: 195px;
    display: flex;
    margin-left: 10px;
    justify-content: space-between;
    line-height: 60px;
    span {
      color: red;
      font-size: 20px;
    }
  }
}
.countpirce {
  margin: 15px 0;
  height: 90px;
  font-size: 18px;
  line-height: 20px;
  background: white;
  div {
    padding: 5px 20px;
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
.btn_wrap {
  height: 122px;
  text-align: center;
  padding-bottom: 60px;
  .van-button {
    height: 40px;
    width: 355px;
    margin: 5px auto;
  }
}
</style>
