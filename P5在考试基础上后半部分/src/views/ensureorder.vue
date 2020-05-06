<template>
  <div class="ensure">
    <van-nav-bar @click-left="onClickLeft" title="标题" right-text="按钮" left-arrow>
      <!-- v-slot:title 简写 #title -->
      <template #title>
        <span>确认订单</span>
      </template>
    </van-nav-bar>
    <div class="address" @click="toadd">
      <ul>
        <li>
          {{dizhi.name}}
          <span>{{dizhi.phone}}</span>
        </li>
        <li>
          <span>默认</span>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{dizhi.address}}
        </li>
        <li>减少接触，不能外出啊啊啊啊啊啊sdasd撒旦大苏打爱味到付如果土豪一体化更好吃的啊啊</li>
      </ul>
    </div>
    <div class="center">
      <div class="dingdan" v-for="(item, index) in shop_goods" :key="index">
        <div
          class="shangpin"
          v-for="(ite, ind) in item.shop"
          :key="ind"
          @click="toinfo(ite.goods_id)"
        >
          <img :src="ite.image" alt />
          <ul>
            <li>{{ite.goods_name}}</li>
            <li>{{ite.shop_name}}</li>
            <li>
              <span>￥{{ite.price}}</span>
              <span>✖{{ite.goods_num}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="bottom_top">
        <ul>
          <li>
            <span>商品金额:</span>
            <span>￥{{ Number(count_price) - Number(count_freight) }}.00</span>
          </li>
          <li>
            <span>运费:</span>
            <span>￥{{ count_freight }}.00</span>
          </li>
        </ul>
        <div class="price">
          <span>实付金额:</span>
          <span>￥{{ count_price }}</span>
        </div>
      </div>
      <div class="pay" style="padding:5px 10px;margin-top:20px;">
        <van-button type="primary" block>货到付款</van-button>
        <van-button @click="turnchoosePay" type="info" block style="margin-top:10px">在线支付</van-button>
      </div>
    </div>
  </div>
</template>

<script>
//项目构建  写页面  写效果  加数据（调接口）
export default {
  name: "ensure",
  data() {
    return {
      shop_goods: [],
      count_price: 0,
      count_freight: 0,
      dizhi: "",
      cartid: ""
    };
  },
  mounted() {
    this.getAdd();
    this.getorder();
  },
  methods: {
    toinfo(pid) {
      console.log(pid);
      this.$router.push({ name: "info", params: { pid: pid } });
    },
    turnchoosePay() {
      // 跳转支付页面  传 购物车id 和  地址id
      this.$router.push({
        name: "choosePay",
        params: { cartid: this.cartid, addressid: this.dizhi.id }
      });
    },
    toadd() {
      this.$router.push({ path: "/address" });
    },
    getAdd() {
      this.axios({
        url: "https://api.ymduo.com/Address/addresslists",
        method: "post",
        data: this.$qs.stringify({
          uid: 956519
        })
      }).then(res => {
        console.log(res);
        res.data.result.data.forEach(element => {
          if (element.def == "1") {
            this.dizhi = element;
          }
        });
      });
    },

    onClickLeft() {
      this.$router.go(-1);
    },
    //获取结算订单的商品信息
    getorder() {
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

        this.shop_goods = res.data.result.data.info; //订单结算列表
        console.log(this.shop_goods);
        this.count_price = res.data.result.data.count_price; //总价
        this.count_freight = res.data.result.data.count_freight; //邮费
      });
    }
  }
};
</script>

<style lang="less" scoped>
.address {
  width: 100%;
  height: 100px;
  border-bottom: 1px solid;
  padding: 10px;
  box-sizing: border-box;
  ul {
    width: 100%;
    li {
      margin-top: 10px;
    }
    li:first-child {
      font-weight: 600;
      color: black;
      font-size: 18px;
    }
    li:nth-child(2) {
      span {
        width: 30px;
        height: 16px;
        border: 1px solid red;
        color: red;
        text-align: center;
        line-height: 16px;
      }
    }
    li:last-child {
      color: red;
      font-size: 12px;
    }
  }
}
.center {
  .dingdan {
    width: 100%;
    height: 70px;

    .shangpin {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      img {
        width: 18%;
        height: 80%;
      }
      ul {
        width: 60%;
        li {
          line-height: 20px;
        }
        li:first-child {
          width: 80%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        li:nth-child(2) {
          color: yellowgreen;
        }
        li:last-child {
          display: flex;
          justify-content: space-between;
          align-items: center;
          span:first-child {
            color: red;
          }
          span:last-child {
            color: #ccc;
          }
        }
      }
    }
  }
}
.bottom {
  width: 100%;
  background-color: white;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  margin-bottom: 90px;
  .bottom_top {
    width: 100%;
    ul {
      width: 100%;
      padding: 20px;
      box-sizing: border-box;
      li {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 30px;
        line-height: 30px;
        span:first-child {
          font-size: 16px;
          font-weight: 600;
        }
        span:last-child {
          font-size: 14px;
          color: red;
        }
      }
    }
    .price {
      width: 100%;
      box-sizing: border-box;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      span:first-child {
        width: 80px;
        height: 30px;
        font-size: 16px;
        font-weight: 600;
        line-height: 30px;
        color: black;
      }
      span:last-child {
        width: 80px;
        height: 30px;
        font-size: 14px;
        color: red;
        line-height: 30px;
        font-weight: 600;
      }
    }
  }
}
</style>
