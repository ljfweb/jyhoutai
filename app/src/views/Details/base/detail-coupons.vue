<template>
  <div class="detailcoupon">
    <!-- 优惠卷 -->
    <div class="coupon">
      <p>优惠</p>
      <div class="content1">
        <van-tag round type="danger">满99减8</van-tag>
        <van-tag round type="danger">满59减5</van-tag>
      </div>
      <div class="content2">
        <van-tag plain type="danger">换购</van-tag>
        <span>购买1件可优惠换购热销商品</span>
      </div>
      <div class="rmore">
        <van-icon name="weapp-nav" size=".56rem" />
      </div>
    </div>
    <!-- 促销 -->
    <div class="promotion">
      <p>促销</p>
      <div class="content1" v-for="index in 3" :key="index">
        <van-tag plain round type="danger">多买优惠</van-tag>
        <span>满1件，立减最低1件商品价格，...</span>
      </div>
      <div class="rmore">
        <van-icon name="weapp-nav" size=".56rem" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "detailcoupon",
  data() {
    return {};
  }
};
</script>

<style lang="less" scoped>
.detailcoupon {
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 8px;
  background-color: #fff;
  .coupon,
  .promotion {
    position: relative;
    padding: 12px 30px 5px 50px;
    color: #333;
    word-break: break-word;
    overflow: hidden;
    font-size: 12px;
    line-height: 18px;
    p {
      position: absolute;
      left: 15px;
      top: 20px;
      color: #999;
    }
    .content1 {
      height: 25px;
      line-height: 0;
      overflow: hidden;
      word-break: break-word;
      margin-bottom: 7px;
      .van-tag {
        margin: 2px 10px;
      }
    }
    .content2 {
      height: 25px;
      line-height: 0;
      overflow: hidden;
      word-break: break-word;
      margin-bottom: 7px;
      .van-tag {
        margin: 2px 10px;
      }
    }
    .rmore {
      position: absolute;
      right: 10px;
      top: 15px;
    }
  }
}
</style>
