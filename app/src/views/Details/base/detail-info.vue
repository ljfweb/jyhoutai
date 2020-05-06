<template>
  <div class="detailinfo">
    <!-- 商品价格描述 -->
    <div class="detail-price">
      <van-row type="flex" justify="space-between" align="center">
        <van-col span="18">
          <div class="price">
            <em>￥</em>
            <span class="price-1">{{ detailinfolist.price }}</span>
            <span class="old-price">￥{{ detailinfolist.old_price }}</span>
          </div>
          <div>
            <van-tag plain type="danger" round>新品</van-tag>
          </div>
        </van-col>
        <van-col class="text-right-coin" @click="onLikeCoin">
          <van-icon name="gold-coin-o" size="0.56rem" color="#999" />
          <div>降价提醒</div>
        </van-col>
        <van-col class="text-right-star" @click="onLikeStar">
          <van-icon name="star-o" size="0.56rem" color="#999" />
          <div>收藏</div>
        </van-col>
      </van-row>
    </div>
    <!-- 商品名称介绍 -->
    <div class="detail-titles">
      <h1 class="title">
        {{ detailinfolist.goods_name }}
      </h1>
      <!-- 商品公告提示 -->
      <div class="detail-tips" :class="{ omit: !showMore }">
        【京仓直发】就近仓库发货，当日达/次日达
        【充电插电可选】插电券后价109，充电券后价129
        【送运费险】30天无理由退换货，3年免费换新
        <van-icon
          :class="{ descmore: showMore }"
          :name="arrow"
          color="#999"
          @click="onMore"
        ></van-icon>
      </div>
      <!--快递，月销量，发货地址  -->
      <van-row type="flex" justify="space-between" align="center" class="sales">
        <van-col span="8" class="text-left">
          快递：{{ detailinfolist.freight_price }}.00
        </van-col>
        <van-col span="8" class="text-center">
          月销量2009
        </van-col>
        <van-col span="8" class="text-right">
          浙江杭州
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "detailinfo",
  props: ["detailinfolist"],
  data() {
    return {
      showMore: false,
      arrow: "arrow-down"
    };
  },
  methods: {
    onLikeCoin() {},
    onLikeStar() {},
    onMore() {
      this.showMore = !this.showMore;
      if (!this.showMore) {
        this.arrow = "arrow-down";
      } else {
        this.arrow = "arrow-up";
      }
    }
  },
  created() {
    // console.log(this.detailinfolist);
  }
};
</script>

<style lang="less" scoped>
.detailinfo {
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 8px;
  background-color: #fff;
  .detail-price {
    padding-bottom: 0;
    position: relative;
    padding: 16px 10px 0;
    line-height: 20px;
    margin-bottom: 5px;
    .price {
      font-size: 16px;
      color: #f2270c;
      .price-1 {
        line-height: 30px;
        color: #f2270c;
        font-size: 26px;
        display: inline-block;
        font-weight: bold;
      }
      .old-price {
        margin: 0 0 0 2px;
        text-decoration: line-through;
        color: #999;
        font-size: 12px;
      }
    }
    .text-right-coin,
    .text-right-star {
      text-align: center;
      color: #999;
      font-size: 12px;
    }
  }
  .detail-titles {
    position: relative;
    padding: 15px 10px;
    overflow: hidden;
    .title {
      font-weight: 700;
      line-height: 24px;
      padding-right: 0;
      min-height: 36px;
      display: flex;
      align-items: center;
      color: #333;
      overflow: hidden;
      font-size: 16px;
    }
    .detail-tips {
      position: relative;
      color: #999;
      padding: 5px 20px 0 0;
      line-height: 1.3;
      .van-icon {
        text-align: center;
        position: absolute;
        right: 0;
        top: 20px;
        width: 25px;
        height: 15px;
        background: #fff;
        &.descmore {
          right: auto;
          top: auto;
        }
      }
    }
    .omit {
      overflow: hidden;
      text-overflow: clip;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      max-height: 46px;
    }
    .sales {
      // position: relative;
      overflow: hidden;
      color: #999;
      margin-top: 15px;
      .text-center {
        text-align: center;
      }
      .text-right {
        text-align: right;
      }
    }
  }
}
</style>
