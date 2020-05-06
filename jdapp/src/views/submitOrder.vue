<template>
  <div>
    <div>
      <div>
        <van-nav-bar
          title="提交订单"
          left-text="返回"
          left-arrow
          @click-left="onClickLeft"
          @click-right="onClickRight"
        />
      </div>
    </div>
    <div @click.stop="turnAdd">
      <van-contact-card type="edit" :name="defArr.name" :tel="defArr.phone" :editable="false" />
    </div>
    <div>
      <div
        class="goodsCard"
        v-for="(item,index) in goodslist"
        :key="index"
        @click="infoTurn(item.shop[0].goods_id)"
      >
        <div class="shop">
          <van-icon name="shop-o" size="25" />
          <span>{{item.shop[0].shop_name}}}</span>
        </div>
        <div class="goods_list" v-for="(ite,inde) in item.shop" :key="inde">
          <div class="lefts">
            <img :src="ite.image" />
          </div>
          <div class="rights">
            <div class="title">{{ite.goods_name}}</div>
            <div class="unit">{{ite.sku_attr}}</div>
            <div class="price" style=" color:red;font-size:16px">{{ite.price}}</div>
            <div class="btn">×{{ite.goods_num}}</div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <van-cell :border="false" style="font-size:18px" title="商品金额" :value="count_price" />
      <van-cell :border="false" style="font-size:18px" title="运费" :value="count_freight" />
      <div style="width:166px;float:right;display:flex;margin-top:9px">
        <span style="font-size: 19px;font-weight: bold;">实付金额:</span>
        <span style="font-size: 19px;color:red">￥{{count_price}}</span>
      </div>
      <!-- <van-overlay
        type="primary"
        z-index="100"
        :show="show"
        text="在线支付"
        class-name="boo"
        @click="turnPay"
      >
        <div class="wrapper" @click.stop>
          <div class="block"></div>
        </div>
      </van-overlay>-->
      <van-button type="primary" @click="turnPay" block class="boo">在线支付</van-button>
      <!-- <vue-pickers
        :show="shows"
        :columns="columns"
        :defaultData="defaultData"
        :selectData="pickData"
        @change="onChange"
      ></vue-pickers>-->
    </div>
    <van-picker v-if="shows" :columns="columns" @change="onChange" />

    <div style="height:100px"></div>
  </div>
</template>
<script>
import { Toast } from "vant";
export default {
  name: "submitorder",
  data() {
    return {
      defArr: [],
      goodslist: [],
      carId: "",
      s: "",
      count_price: 0, //总价
      count_freight: 0,
      addressid: 0,
      shows: false,
      message: "在线支付",
      columns: ["微信支付", "支付宝", "在线支付"]
    };
  },
  methods: {
    turnPay() {
      this.shows = true;
      console.log(this.shows);
      // this.$router.push({
      //   name: "choosepay",
      //   params: {
      //     cartid: this.$route.params.cart_id,
      //     addressid: this.addressid
      //   }
      // });
    },
    onChange(picker, value, index) {
      // this.message = value;
      console.log(1234);
      console.log(value);
      console.log(index);
    },
    // onCancel() {
    //   this.show = false;
    // },
    // onConfirm(picker, value, index) {
    //   this.show = false;
    // },
    shouPup() {
      this.shows = true;
    },
    turnAdd() {
      this.$router.push({
        name: "address"
      });
    },
    onClickLeft() {
      Toast("返回");
      this.$router.go(-1); //返回上一层
    },
    onClickRight() {},
    getList() {
      this.axios
        .post(
          "https://api.ymduo.com/Address/addresslists",
          this.$qs.stringify({
            uid: 956547
          })
        )
        .then(res => {
          console.log(res);
          var defArray = [];
          var dataArr = res.data.result.data;
          dataArr.forEach(element => {
            if (element["def"] == 1) {
              defArray = element;
            }
          });
          this.defArr = defArray;
          console.log(defArray);
          this.addressid = defArray.id;
          console.log(21413);
        });
    },
    getGoodsList() {
      this.carId = this.$route.params.cart_id;
      console.log(this.carId);
      this.s = this.carId.join(",");

      this.axios
        .post(
          "https://api.ymduo.com/order/order_confirm",
          this.$qs.stringify({
            userid: 956547,
            cart_id: this.s,
            use_balance: 0,
            use_integral: 0,
            use_auction_integral: 0,
            is_pei: 0,
            pf: 0
          })
        )
        .then(res => {
          console.log(res.data.result.data.info);
          console.log(134123);
          this.goodslist = res.data.result.data.info;
          console.log(this.goodslist);

          //   var defArray = [];
          //   var dataArr = res.data.result.data;
          //   dataArr.forEach(element => {
          //     if (element["def"] == 1) {
          //       defArray = element;
          //     }
          //   });
          //   this.defArr = defArray;
          //   console.log(defArray);
          //   console.log(21413);
        });
    }
  },
  created() {
    this.shows = false;
    this.carId = this.$route.params.cart_id;
    console.log(this.carId);
    this.s = this.carId.join(",");

    this.axios
      .post(
        "https://api.ymduo.com/Address/addresslists",
        this.$qs.stringify({
          uid: 956547
        })
      )
      .then(res => {
        console.log(res);
        var defArray = [];
        var dataArr = res.data.result.data;
        dataArr.forEach(element => {
          if (element["def"] == 1) {
            defArray = element;
          }
        });
        this.defArr = defArray;
        console.log(defArray);
        console.log(21413);
      });
    // this.getGoodsList();
    this.carId = this.$route.params.cart_id;
    console.log(this.carId);
    this.s = this.carId.join(",");

    this.axios
      .post(
        "https://api.ymduo.com/order/order_confirm",
        this.$qs.stringify({
          userid: 956547,
          cart_id: this.s,
          use_balance: 0,
          use_integral: 0,
          use_auction_integral: 0,
          is_pei: 0,
          pf: 0
        })
      )
      .then(res => {
        console.log(res.data.result.data.info);
        console.log(134123);
        this.goodslist = res.data.result.data.info;
        this.count_price = res.data.result.data.count_price; //总价
        this.count_freight = res.data.result.data.count_freight; //邮费
        console.log(this.goodslist);
      });
  },
  beforeCreate() {
    this.carId = this.$route.params.cart_id;
    console.log(this.carId);
    this.s = this.carId.join(",");
    // this.getList();
    // this.getGoodsList();
  },
  mounted() {
    this.carId = this.$route.params.cart_id;
    console.log(this.carId);
    this.s = this.carId.join(",");
    // this.getList();
    // this.getGoodsList();
  }
};
</script>
<style lang="less" scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  width: 120px;
  height: 120px;
  background-color: #fff;
}
.shop {
  display: flex;
  height: 30px;
}
.shop span {
  line-height: 30px;
  margin-left: 10px;
  font-size: 15px;
}
.lefts {
  display: flex;
  width: 30%;
  img {
    width: 70px;
    height: 70px;
  }
}
.goods_list {
  display: flex;
  margin-top: 15px;
  padding: 5px;
}
.rights {
  float: left;
  line-height: 24px;
  padding-left: 8px;
  position: relative;
  width: 70%;
  .unit {
    color: #cccccc;
    background-color: #eeeeee;
    display: inline-block;
    padding: 0px 5px;
  }
  .btn {
    position: absolute;
    right: 10px;
    bottom: 0px;
    font-size: 15px;
    color: #cccccc;
  }
  .btns {
    position: absolute;
    right: 55px;
    bottom: 0px;
  }
}
.boo {
  // background-color: red;
  background: #3884ff;
  width: 90%;
  border-radius: 30px;
  display: block;
  clear: both;
  margin: auto;
  margin-top: 40px;
}
</style>