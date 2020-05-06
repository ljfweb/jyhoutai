<template>
  <div class="detailbuyer">
    <!-- 商品选购 -->
    <div class="shop-choose">
      <p>已选</p>
      <div class="content1">
        <span>2019新灵智2代 30cm高，1个</span>
      </div>
      <div class="rmore">
        <van-icon name="weapp-nav" size=".56rem" />
      </div>
    </div>
    <!-- 商品配送 -->
    <div class="shop-tools">
      <p>送至</p>
      <div class="content1">
        <span>北京朝阳区三环到四环之间</span>
      </div>
      <div class="content2">
        <span>现货</span>
        <span
          >今日15:59前完成下单，今天即可发货，预计明天中午12:30分前即可送达</span
        >
      </div>
      <div class="rmore">
        <van-icon name="weapp-nav" size=".56rem" />
      </div>
    </div>
    <!-- 商品运费 -->
    <div class="shop-freight">
      <p>运费</p>
      <div class="content1">
        <span>店铺单笔订单不满29元，收运费8元 </span>
      </div>
    </div>
    <!-- 商品服务 -->
    <ul class="shop-serve">
      <li class="serve-item">
        <van-icon name="passed" color="red" />
        <span>商家发货&售后</span>
      </li>
      <li class="serve-item">
        <van-icon name="passed" color="red" />
        <span>7天无理由退货</span>
      </li>
      <li class="rmore">
        <van-icon name="weapp-nav" size=".56rem" />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "detailbuyer",
  data() {
    return {};
  }
};
</script>

<style lang="less" scoped>
.detailbuyer {
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 8px;
  background-color: #fff;
  .shop-choose,
  .shop-tools,
  .shop-freight {
    position: relative;
    padding: 10px 30px 5px 50px;
    color: #333;
    word-break: break-word;
    overflow: hidden;
    font-size: 12px;
    line-height: 18px;
    p {
      position: absolute;
      left: 15px;
      top: 18px;
      color: #999;
    }
    .content1 {
      height: 25px;
      line-height: 35px;
      overflow: hidden;
      word-break: break-word;
      margin-bottom: 7px;
      font-size: 14px;
    }
    .content2 {
      height: auto;
      line-height: 18px;
      color: #999;
      word-break: break-word;
      margin-bottom: 7px;
      span {
        height: 25px;
        font-weight: bold;
        &:first-child {
          color: #e4393c;
          margin-right: 3px;
          font-weight: normal;
        }
      }
    }
    .rmore {
      position: absolute;
      right: 10px;
      top: 15px;
    }
  }
  .shop-serve {
    position: relative;
    padding: 10px 40px 0 15px;
    color: #999;
    font-size: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    .serve-item {
      padding: 5px 12px 5px 0;
      display: inline-block;
      line-height: 1;
      .van-icon {
        vertical-align: middle;
        margin-top: -2px;
        margin-right: 5px;
        width: 12px;
        height: 12px;
        font-weight: bold;
        font-size: 14px;
      }
    }
    .rmore {
      position: absolute;
      color: #333;
      right: 10px;
      top: 10px;
    }
  }
}
</style>
