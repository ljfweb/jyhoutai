<template>
  <div class="submitOrder">
    <!-- 头部导航 -->
    <headerBar
      :ishead="showHead"
      :title="myTitle"
      :hascontainer="showMore"
    ></headerBar>
    <!-- 确认订单详情 -->
    <!-- 收货地址编辑 -->
    <van-sticky>
      <div class="myaddress">
        <van-contact-card type="add" @click="showList" v-if="!hasAddress" />
        <van-address-list
          v-else
          v-model="addressId"
          :list="mylist"
          :switchable="false"
          default-tag-text="默认"
          @click-item="showList"
        />
        <p class="border b1"></p>
        <p class="border b2"></p>
        <p class="border b3"></p>
        <p class="border b4"></p>
        <p class="border b5"></p>
      </div>
    </van-sticky>
    <!-- 商品信息 -->
    <div
      class="shopGoods"
      v-for="(goods, goodsIndex) in goodsList"
      :key="goodsIndex"
    >
      <!-- 购物车店铺信息 -->
      <div class="shopstore">
        <van-icon name="shop" size="20px" color="#9e9e9e" />
        <span class="title one-txt-cut">{{ goods.shop[0].shop_name }}</span>
      </div>
      <!-- 购物车商品信息 -->
      <div
        class="goodsitem"
        v-for="(goodsItem, goodsItemIndex) in goods.shop"
        :key="goodsItemIndex"
      >
        <van-card
          :num="goodsItem.goods_num"
          :price="goodsItem.price"
          :title="goodsItem.goods_name"
          :thumb="goodsItem.image"
        >
          <!-- 商品规格重选 -->
          <template #tags>
            <div
              class="sku-line"
              style="color:#999;margin-top:5px;line-height:1.5;"
            >
              <div class="sku one-txt-cut">
                {{
                  goodsItem.attr_value
                    ? "规格:&nbsp;&nbsp;" + goodsItem.attr_value
                    : goodsItem.attr_value
                }}
              </div>
            </div>
          </template>
          <!-- 商品说明 -->
          <template #footer>
            <span style="color:#999;"
              ><van-icon
                name="//img11.360buyimg.com/jdphoto/s30x30_jfs/t24454/180/2585111474/1236/c5718bb0/5b863011Ncc8682f5.png"
                size="15"
                style="position: relative;top: 4px;margin-right: 2px;"
              />支持7天无理由退货</span
            >
            <span style="color:#999;"
              ><van-icon
                name="warning-o"
                color="#529ffc"
                size="16"
                style="position: relative;top: 4px;margin-right: 2px;"
              />价格说明</span
            >
          </template>
        </van-card>
      </div>
      <!-- 订单服务信息 -->
      <div class="goodsinfo">
        <ul>
          <li>
            <div>
              <strong>配送服务</strong>
              <span>快递运输</span>
            </div>
            <div>
              <span>中小件送货时间</span>
              <span>工作日、双休日与节假日均可送货</span>
            </div>
          </li>
        </ul>
        <div class="info-list1">
          <div class="left">
            <span>退换无忧</span>
            <span>退换货可获得一次运费赔付</span>
            <van-icon name="info-o" style="margin-left: 5px;" />
          </div>
          <div class="right">
            <span style="margin-right: 5px;">￥4.50</span>
            <van-checkbox v-model="value" checked-color="#ea3b3d" />
          </div>
        </div>
        <div class="info-list2">
          <p>店铺备注</p>
          <input type="text" placeholder="选填，给商家留言" maxlength="45" />
        </div>
      </div>
    </div>
    <!-- 发票信息的信息 -->
    <div class="buy-checkout">
      <ul>
        <li>
          <h3>发票信息</h3>
          <p>个人&nbsp;不开发票</p>
        </li>
        <li>
          <h3>优惠券</h3>
          <p>无可用</p>
        </li>
        <li>
          <h3>礼品卡</h3>
          <p>无可用</p>
        </li>
        <li>
          <h3>礼包<van-icon name="info-o" style="margin-left: 5px;" /></h3>
          <p>无可用</p>
        </li>
        <div>
          <p>
            <span>商品金额</span
            ><span
              >¥&nbsp;{{
                ((countPrice - countFreight * 100) / 100).toFixed(2)
              }}</span
            >
          </p>
          <p>
            <span>运费</span><span>+ ¥&nbsp;{{ countFreight.toFixed(2) }}</span>
          </p>
        </div>
      </ul>
    </div>
    <!-- 底部logo -->
    <van-divider
      dashed
      :style="{ color: '#e51d1a', borderColor: '#1989fa', padding: '0 16px' }"
    >
      <i class="my-iconfont iconzhifu-jingdong"></i>
      <i class="my-iconfont iconjingdong"></i>
    </van-divider>
    <!-- 底部提交订单支付按钮 -->
    <van-submit-bar
      :price="countPrice"
      button-text="提交订单"
      @submit="onSubmitPay(countPrice)"
    />
  </div>
</template>

<script>
import Qs from "qs";
import headerBar from "components/headerBar";
import { mapState } from "vuex";
export default {
  name: "submitOrder",
  computed: {
    ...mapState(["addressInfo"]),
    // 判断是否有地址
    hasAddress() {
      return Object.keys(this.addressInfo).length ? true : false;
    },
    addressId() {
      const address = this.addressInfo;
      return address !== {} ? this.addressInfo.id : null;
    }
  },
  components: {
    headerBar
  },
  data() {
    return {
      uid: 956538,
      value: false,
      showHead: true,
      myTitle: "确认订单",
      showMore: true, //是否显示三个点的按钮
      goodsList: [], //商品种类
      cartId: 0, //商品购物车编号id
      countPrice: 0, //结算总金额
      countFreight: 0, //运费金额
      chosenAddress: {},
      mylist: [
        {
          name: "张三",
          tel: "13000000000",
          address: "浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室",
          id: 0
        }
      ]
    };
  },
  methods: {
    // 跳转地址列表
    showList() {
      let cartId = this.$route.query.id;
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true
      });
      setTimeout(() => {
        this.$toast.clear();
        this.$router.push({ name: "addresslist", query: { id: cartId } });
      }, 500);
    },
    // 提交订单
    onSubmitPay(total) {
      let cartId = this.$route.query.id;
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true
      });
      setTimeout(() => {
        this.$toast.clear();
        this.$router.push({ name: "orderpay", query: { total, id: cartId } });
      }, 500);
    },
    // 获取从购物车要购买的商品数据
    getCartBuyGoods(id) {
      let cartid = id;
      if (cartid instanceof Array) {
        cartid = id.join(",");
      } else {
        cartid = id;
      }
      this.axios
        .post(
          "https://api.ymduo.com/order/order_confirm",
          Qs.stringify({
            userid: this.uid,
            cart_id: cartid,
            use_balance: 0,
            use_integral: 0,
            use_auction_integral: 0,
            is_pei: 0,
            pf: 1
          })
        )
        .then(res => {
          // console.log(res);
          if (res.data.code == 200) {
            this.goodsList = res.data.result.data.info;
            this.countPrice = Number(res.data.result.data.count_price * 100);
            this.countFreight = Number(res.data.result.data.count_freight);
          }
        });
    }
  },
  mounted() {
    // 获取商品编号id
    let cartId = this.$route.query.id;
    // 获取商品跳转的数据
    this.getCartBuyGoods(cartId);
    if (this.addressInfo !== {}) {
      let arr = [];
      arr[0] = this.addressInfo;
      this.mylist = arr;
    }
    // 从立即购买传来的参数
    let data = this.$route.params.data;
    if (data !== undefined) {
      if (data.sku_id == null) {
        delete data.sku_id;
      }
      // console.log(data);
      this.axios
        .post("https://api.ymduo.com/order/order_confirm", Qs.stringify(data))
        .then(res => {
          // console.log(res);
          if (res.data.code == 200) {
            this.goodsList = res.data.result.data.info;
            this.countPrice = Number(res.data.result.data.count_price * 100);
            this.countFreight = res.data.result.data.count_freight;
          }
        });
    }
  }
};
</script>

<style lang="less" scoped>
.submitOrder {
  width: 100%;
  margin-bottom: 60px;
  // 底部提交订单按钮样式
  .van-submit-bar__text {
    text-align: left;
  }
  .myaddress {
    background-color: #fff;
    padding: 12px 10px 20px 10px;
    position: relative;
    z-index: 1000;
    .van-address-list {
      padding: 0;
    }
    .van-address-item__name {
      font-weight: bold;
    }
    .van-address-list__bottom {
      display: none;
    }
    .van-contact-card::before {
      background: transparent;
    }
    .border {
      position: absolute;
      bottom: 0;
      width: 20%;
      height: 6px;
      background: linear-gradient(
        135deg,
        rgb(255, 255, 255) 10%,
        rgb(236, 109, 109) 0,
        rgb(236, 109, 109) 43%,
        rgb(255, 255, 255) 0%,
        rgb(255, 255, 255) 55%,
        rgb(139, 181, 232) 0%,
        rgb(139, 181, 232) 90%,
        rgb(255, 255, 255) 10%
      );
    }
    .b1 {
      left: 0;
    }
    .b2 {
      left: 20%;
    }
    .b3 {
      left: 40%;
    }
    .b4 {
      left: 60%;
    }
    .b5 {
      left: 80%;
    }
  }
  .shopGoods {
    margin: 15px 0;
    padding: 0 10px;
    background: #fff;
    position: relative;
    border-radius: 10px;
    .shopstore {
      height: 40px;
      line-height: 40px;
      font-size: 16px;
      font-weight: 700;
      .van-icon-shop {
        vertical-align: middle;
        margin-right: 5px;
      }
    }
    .goodsitem {
      min-height: 75px;
      font-size: 12px;
      padding-top: 15px;
      position: relative;
      &::before {
        content: "";
        position: absolute;
        z-index: 1;
        pointer-events: none;
        background-color: #e5e5e5;
        height: 1px;
        top: 0;
        left: -10px;
        right: -10px;
      }
      .van-card {
        padding: 0;
        background-color: #fff;
        .van-card__price {
          color: #f2270c;
        }
        .van-card__title {
          font-size: 14px;
          line-height: 1.5;
          font-weight: bold;
          max-height: 40px;
        }
        .van-card__footer {
          line-height: 1.5;
          text-align: center;
          padding: 8px 0;
          overflow: hidden;
          border-bottom: 1px solid #e5e5e5;
          span {
            font-size: 12px;
            margin-right: 8px;
          }
        }
      }
    }
    .goodsinfo {
      ul {
        li {
          padding: 10px 20px 10px 0;
          div:first-child {
            margin: 5px 0;
            line-height: 1.5;
            display: flex;
            justify-content: space-between;
            strong {
              font-weight: 400;
              font-size: 16px;
            }
            span {
              font-size: 14px;
            }
          }
          div:last-child {
            color: #999;
            line-height: 1.5;
            display: flex;
            font-size: 12px;
            justify-content: space-between;
          }
        }
      }
      .info-list1 {
        display: flex;
        padding: 12px 0;
        line-height: 1.5;
        align-items: center;
        justify-content: space-between;
        border-top: 1px solid #e5e5e5;
        border-bottom: 1px solid #e5e5e5;
        .left {
          flex-shrink: 1;
          display: flex;
          align-items: center;
          span:first-child {
            font-size: 16px;
            color: #333;
            margin-right: 5px;
          }
          span:last-of-type {
            color: #999;
          }
        }
        .right {
          flex-shrink: 0;
          color: #f2270c;
          display: flex;
          align-items: center;
        }
      }
      .info-list2 {
        width: 100%;
        height: 45px;
        box-sizing: border-box;
        line-height: 1.5;
        position: relative;
        p {
          position: absolute;
          top: 0;
          z-index: 1;
          height: 45px;
          line-height: 45px;
          color: #333;
          font-size: 16px;
        }
        input {
          display: block;
          text-align: right;
          padding-left: 75px;
          width: 100%;
          font-size: 12px;
          height: 45px;
          line-height: 45px;
          box-sizing: border-box;
        }
      }
    }
  }
  .buy-checkout {
    overflow: hidden;
    position: relative;
    background: #fff;
    margin-bottom: 15px;
    border-radius: 10px;
    line-height: 1.5;
    ul {
      li {
        position: relative;
        h3 {
          font-weight: 400;
          position: absolute;
          left: 10px;
          top: 11px;
          font-size: 16px;
          color: #333;
          display: flex;
          align-items: center;
        }
        p {
          text-align: right;
          font-size: 12px;
          color: #666;
          padding: 13px 30px 13px 75px;
        }
        &:not(:first-of-type) {
          border-top: 1px solid #e5e5e5;
          p {
            color: #999;
          }
        }
      }
      div {
        position: relative;
        background-color: #fff;
        padding: 10px;
        font-size: 14px;
        border-top: 1px solid #e5e5e5;
        p {
          display: flex;
          justify-content: space-between;
          align-items: center;
          span:last-of-type {
            color: #f2270c;
          }
        }
      }
    }
  }
  .van-divider {
    margin-bottom: 20px;
    i {
      font-size: 40px;
    }
  }
}
</style>
