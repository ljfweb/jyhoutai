<template>
  <div class="orderpay">
    <!-- 头部导航 -->
    <van-sticky>
      <headerBar :ishead="showHead" :title="myTitle"></headerBar>
    </van-sticky>
    <!-- 支付页面详情 -->
    <div class="price">
      <p>
        ￥<span>{{ (totalPrice / 100).toFixed(2) }}</span>
      </p>
    </div>
    <!-- 选择支付方式 -->
    <div class="pay-way">
      <van-radio-group v-model="radio">
        <van-cell-group>
          <van-cell title="微信支付" clickable @click="radio = '1'">
            <!-- 微信支付 -->
            <div slot="icon" class="m-r-5">
              <van-icon name="wechat" size=".56rem" color="rgb(54, 203, 89)" />
            </div>
            <van-radio slot="right-icon" checked-color="#f2270c" name="1" />
          </van-cell>
          <van-cell title="支付宝支付" clickable @click="radio = '2'">
            <!-- 支付宝支付 -->
            <div slot="icon" class="m-r-5">
              <van-icon name="alipay" size=".56rem" color="rgb(1, 170, 239)" />
            </div>
            <van-radio slot="right-icon" checked-color="#f2270c" name="2" />
          </van-cell>
          <van-cell title="余额支付" clickable @click="radio = '3'">
            <!-- 余额支付 -->
            <div slot="icon" class="m-r-5">
              <van-icon
                name="gold-coin"
                size=".56rem"
                color="rgb(254, 142, 46)"
              />
            </div>
            <van-radio slot="right-icon" checked-color="#f2270c" name="3" />
          </van-cell>
        </van-cell-group>
      </van-radio-group>
      <!-- 确认支付按钮 -->
      <div class="pay-btn">
        <van-button type="primary" color="#f2270c" round block @click="onPay"
          >确认支付&nbsp;￥{{ (totalPrice / 100).toFixed(2) }}</van-button
        >
      </div>
    </div>
    <!-- 弹出微信支付的二维码 -->
    <van-dialog
      v-model="show"
      show-cancel-button
      confirm-button-color="#d81e06"
      @cancel="onCancel"
      @confirm="confirmDialog"
    >
      <img src="https://img.yzcdn.cn/vant/apple-3.jpg" />
      <template #title>
        <div class="mydialogtitle">
          <i class="my-iconfont iconweixin"></i>
          <p>微信支付</p>
        </div>
      </template>
      <template #default>
        <div class="mydialogcontent">
          <div class="erwm">
            <img :src="payList.code_url" />
          </div>
          <ul>
            <li>
              <p>订单编号:</p>
              <p>{{ payList.order_no }}</p>
            </li>
            <li>
              <span>订单金额:</span><span>￥{{ payList.total_fee }}</span>
            </li>
            <li>
              <span>实际金额:</span><span>￥{{ payList.real_fee }}</span>
            </li>
          </ul>
        </div>
      </template>
    </van-dialog>
    <!-- 弹出支付输入密码框 -->
    <van-popup
      v-model="showPassWord"
      position="bottom"
      :style="{ height: '50%' }"
    >
      <!-- 密码输入框 -->
      <van-password-input
        :value="value"
        info="默认支付密码:123456"
        :focused="showKeyboard"
        @focus="showKeyboard = true"
      />
      <!-- 数字键盘 -->
      <van-number-keyboard
        :show="showKeyboard"
        theme="custom"
        close-button-text="确定"
        transition
        @input="onInput"
        @delete="onDelete"
        @blur="showKeyboard = true"
        @close="onConfirm"
        safe-area-inset-bottom
      />
    </van-popup>
  </div>
</template>

<script>
import Qs from "qs";
import { Dialog } from "vant";
import headerBar from "components/headerBar";
export default {
  name: "orderpay",
  components: {
    headerBar,
    [Dialog.Component.name]: Dialog.Component
  },
  data() {
    return {
      uid: 956538, //用户登录携带的id
      showHead: true, //显示哪种头部导航
      myTitle: "京东收银台", //导航栏标题
      totalPrice: 0, //需要支付的总价
      radio: "1", //默认支付方式
      showPassWord: false, // 密码输入框
      value: "", //密码值
      showKeyboard: true, //输入键盘
      show: false, //弹出微信的二维码
      paysn: "", //支付需要的
      cart_id: "", //需要购买的商品id
      payList: {} //支付的相关信息
    };
  },
  methods: {
    // 确定支付
    onPay() {
      this.axios
        .post(
          "https://api.ymduo.com/order/generate_orders",
          Qs.stringify({
            userid: this.uid,
            cart_id: this.cart_id.join(),
            addr_id: 2957,
            use_balance: 0,
            use_integral: 0,
            is_pei: 0,
            pf: 1
          })
        )
        .then(res => {
          // console.log("实验", res);
          this.show = true;
          this.paysn = res.data.result.data.pay_sn;
          if (res.data.result.data.pay_sn) {
            this.axios
              .post(
                "https://api.ymduo.com/pay/wxPay",
                Qs.stringify({
                  uid: this.uid,
                  pay_sn: res.data.result.data.pay_sn
                })
              )
              .then(res => {
                this.payList = res.data.result.data;
              });
          }
        });
    },
    // 点击弹窗的取消按钮触发
    onCancel() {
      this.$toast.fail("操作已取消！");
      this.$router.push("/orderlist");
    },
    // 点击弹窗的确定按钮触发
    confirmDialog() {
      this.showPassWord = !this.showPassWord;
      this.value = ""; //初始化密码输入框
    },
    // 密码输入框
    onInput(key) {
      this.value = (this.value + key).slice(0, 6);
    },
    // 清除密码输错
    onDelete() {
      this.value = this.value.slice(0, this.value.length - 1);
    },
    //输入完成
    onConfirm() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        loadingType: "spinner"
      });
      setTimeout(() => {
        //   密码输入正确要做的事情
        if (this.value == "123456") {
          this.showPassWord = !this.showPassWord;
          this.$toast.clear();
          this.$toast.success("支付成功");
          setTimeout(() => {
            this.$router.push("/orderlist");
          }, 1000);
        } else {
          //   密码输入错误要做的事情
          this.showPassWord = !this.showPassWord;
          this.$toast.clear();
          this.$toast.fail("密码输入错误");
        }
      }, 500);
    }
  },
  created() {
    this.totalPrice = this.$route.query.total;
    this.cart_id = this.$route.query.id;
  }
};
</script>

<style lang="less" scoped>
.orderpay {
  width: 100%;
  background-color: #fff;
  .price {
    line-height: 15px;
    padding: 10px;
    color: #000;
    background-color: #fff;
    font-size: 15px;
    text-align: center;
    p {
      margin-top: 17px;
      color: #f2270c;
      span {
        font-size: 29px;
        font-family: "京东正黑体";
      }
    }
  }
  .pay-way {
    padding: 20px;
    .pay-btn {
      padding: 50px 10px;
    }
  }
  // 微信弹出支付
  .van-dialog {
    .mydialogtitle {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 20px;
      margin-bottom: 20px;
      i {
        font-size: 30px;
        color: #1afa29;
        margin-right: 20px;
      }
    }
    .mydialogcontent {
      box-sizing: border-box;
      padding: 5px 10px 20px;
      .erwm {
        width: 150px;
        height: 150px;
        margin: 5px auto 10px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      ul {
        li {
          font-weight: bold;
          padding: 0 20px;
          line-height: 30px;
          word-break: normal;
          &:first-of-type {
            p:last-child {
              display: inline-block;
              word-break: break-word;
              font-size: 14px;
              font-weight: normal;
              font-style: italic;
            }
          }
          &:not(:first-of-type) {
            span:last-child {
              color: #d81e06;
              margin-left: 20px;
            }
          }
        }
      }
    }
  }
}
</style>
