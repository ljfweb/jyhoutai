<template>
  <div class="orderlist">
    <!-- 头部导航 -->
    <van-sticky>
      <headerBar :ishead="showHead" :title="myTitle"></headerBar>
    </van-sticky>
    <!-- 搜索订单栏 -->
    <van-search
      class="border-bottom"
      v-model="value"
      shape="round"
      placeholder="请输入搜索关键词"
      :show-action="showAction"
      @focus="onFocus"
      @blur="onBlur"
    >
      <template #action>
        <div @click="onCancel">取消</div>
      </template>
    </van-search>
    <!-- 订单内容 -->
    <!-- 订单tabs选项卡 -->
    <van-tabs v-model="active" ellipsis swipeable lazy-render @change="getList">
      <!-- 全部订单 -->
      <van-tab v-for="(val, i) in tabsList" :key="i" :title="val.title">
        <van-panel
          v-for="(item, index) in orderList"
          :key="index"
          v-show="orderList"
          icon=" my-iconfont iconjingdong"
          :title="item.goods[0].store_name"
          status="待支付"
        >
          <div class="border-bottom">
            <div class="item-content">
              <div class="item-img">
                <img :src="item.goods[0].goods_img" alt="" />
              </div>
              <div class="content txt-cut">
                {{ item.goods[0].goods_name }}
              </div>
            </div>
            <div class="item-total-bar">
              <p>共{{ item.order_goods_number }}件商品</p>
              <div class="payNum">
                应付金额：<span class="price">¥{{ item.real_pay }}</span>
              </div>
            </div>
          </div>
          <template #footer>
            <van-button size="small" type="danger">去支付</van-button>
            <van-button
              size="small"
              round
              type="default"
              color="#aaa"
              @click="toLogistics(item)"
              >查看物流</van-button
            >
            <div class="left-tags">
              <van-icon name=" my-iconfont icontime" />
              <p>支付剩余21时36分</p>
            </div>
          </template>
        </van-panel>
        <!-- 没有订单数据 -->
        <div class="order-empty" v-show="showEmpty">
          <img
            src="https://img12.360buyimg.com/img/s220x220_jfs/t1/109425/11/5810/36261/5e413d09E382bfa26/d29c1a60c5f03453.png"
            alt=""
          />
          <div>您暂时没有相关订单！</div>
        </div>
      </van-tab>
      <!-- 待付款订单
      <van-tab title="待付款"></van-tab>
      <van-tab title="待收货"></van-tab>
      <van-tab title="已完成"></van-tab> -->
    </van-tabs>
  </div>
</template>

<script>
import Qs from "qs";
import headerBar from "components/headerBar"; //引入头部导航
export default {
  name: "orderlist",
  components: {
    headerBar
  },
  data() {
    return {
      uid: 956538,
      showHead: true,
      myTitle: "我的订单",
      value: "", //搜索栏
      showAction: false, //是否显示取消按钮
      tabsList: [
        { id: 1, title: "全部", status: 0 },
        { id: 2, title: "待付款", status: 1 },
        { id: 3, title: "待收货", status: 3 },
        { id: 4, title: "已完成", status: 4 }
      ],
      showEmpty: false, //没有订单时显示
      active: 0, //tab标签页状态
      orderList: [], //订单列表
      type: "" //区分订单的状态
    };
  },
  methods: {
    // 聚焦时显示取消按钮
    onFocus() {
      this.showAction = true;
    },
    // 失焦时显示取消按钮
    onBlur() {
      this.showAction = false;
    },
    // 搜索取消按钮
    onCancel() {
      this.onBlur();
    },
    // 切换按钮获取数据
    getList(i) {
      if (i > 2) {
        this.getOrderList(i + 1);
      } else {
        this.getOrderList(i);
      }
    },
    // 跳转物流按钮
    toLogistics(item) {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true
      });
      setTimeout(() => {
        this.$toast.clear();
        this.$router.push({ name: "logistics", params: { item } });
      }, 500);
    },
    // 获取订单数据
    getOrderList(type) {
      this.axios
        .post(
          "https://api.ymduo.com/ordershow/index",
          Qs.stringify({
            userid: this.uid,
            page: 1,
            type: type
          })
        )
        .then(res => {
          // console.log(res);
          if (res.data.code == 200) {
            this.orderList = res.data.result.data;
            this.showEmpty = false;
          } else {
            this.orderList = [];
            this.showEmpty = true;
          }
        });
    }
  },
  created() {
    this.type = this.$route.params.type;
    if (this.type > 1) {
      this.active = this.type - 1;
      this.getOrderList(this.type);
    } else {
      this.active = this.type;
      this.getOrderList(this.type);
    }
  }
};
</script>

<style lang="less" scoped>
.orderlist {
  width: 100%;
  .van-search {
    .van-search__action {
      padding: 0;
      border: 1px solid #ccc;
      color: #333;
      margin: 0 10px;
      left: 10px;
      width: 50px;
      height: 30px;
      border-radius: 3px;
      box-sizing: border-box;
      line-height: 30px;
      text-align: center;
      font-size: 14px;
    }
  }
  .van-panel {
    margin: 15px;
    padding: 10px;
    font-size: 14px;
    line-height: 1.5;
    color: #666;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.05);
    .van-panel__header {
      line-height: 24px;
      padding: 0;
      .iconjingdong {
        font-size: 48px;
        color: #d81e06;
      }
      .van-cell__title {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        span {
          font-size: 16px;
          color: #333;
          padding-right: 12px;
        }
      }
    }
    .van-panel__content {
      .item-content {
        display: flex;
        margin-top: 8px;
        overflow: hidden;
        .item-img {
          width: 75px;
          height: 75px;
          margin-right: 10px;
          border-radius: 6px;
          flex-shrink: 0;
          img {
            width: 100%;
            height: 100%;
            border-radius: 6px;
            overflow: hidden;
          }
        }
        .content {
          align-self: center;
          font-size: 14px;
          color: #333;
          line-height: 21px;
          -webkit-line-clamp: 2;
        }
      }
      .item-total-bar {
        padding: 6px 0;
        display: flex;
        p {
          font-size: 12px;
          color: #999;
          text-align: right;
          line-height: 21px;
          flex: 1;
        }
        .payNum {
          margin-left: 10px;
          font-size: 14px;
          color: #999;
          line-height: 21px;
          span {
            color: #151515;
          }
        }
      }
    }
    .van-panel__footer {
      padding: 10px 0 0 0;
      display: flex;
      flex-direction: row-reverse;
      font-size: 14px;
      color: #333;
      line-height: 30px;
      .van-button {
        margin-left: 8px;
      }
      .van-button--danger {
        background-image: linear-gradient(
          135deg,
          #f2140c,
          #f2270c 70%,
          #f24d0c
        );
        box-shadow: 0 3px 6px 0 rgba(242, 39, 12, 0.2);
        color: #fff;
        border: none;
        height: 30px;
        line-height: 30px;
        text-align: center;
        width: 86px;
        border-radius: 15px;
        flex-shrink: 0;
      }
      .left-tags {
        font-size: 12px;
        color: #333;
        line-height: 30px;
        position: relative;
        padding-left: 15px;
        .icontime {
          position: absolute;
          top: 50%;
          left: 0;
          width: 12px;
          height: 12px;
          margin-top: -6px;
        }
      }
    }
  }
  .order-empty {
    text-align: center;
    padding: 100px 10px 15px;
    font-size: 14px;
    line-height: 1.5;
    color: #666;
    img {
      width: 100px;
      height: 100px;
      overflow: hidden;
      display: inline-block;
    }
    div {
      margin-top: 15px;
      font-size: 16px;
      color: #666;
      letter-spacing: 0.41px;
      line-height: 24px;
    }
  }
}
</style>
