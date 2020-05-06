<template>
  <div class="recommend">
    <!-- 为你推荐标题 -->
    <div class="show-title border-rightbottom">
      <img :src="floortitle" alt="" />
    </div>
    <!-- 为你推荐商品列表 -->
    <div class="show-goods">
      <van-grid :border="false" :column-num="2" :gutter="5">
        <van-grid-item
          v-for="(item, index) in recommlist"
          :key="index"
          @click="goDetail(item.goods_id)"
        >
          <div class="show-goods-item">
            <dl>
              <dt>
                <img :src="item.image || item.hd_url" alt />
              </dt>
              <dd class="txt-cut">{{ item.goods_name }}</dd>
              <dd>
                <p>
                  ￥<span>{{ item.price }}</span>
                </p>
                <a href="##">看相似</a>
              </dd>
            </dl>
          </div>
        </van-grid-item>
        <!-- <van-grid-item>
            <div class="show-goods-item">
              <dl>
                <dt>
                  <img :src="imgSrc" alt />
                </dt>
                <dd>前行者游戏背光发光牧马人机 械键盘鼠标套装有线网吧电...</dd>
                <dd>
                  <p>￥<span>28.50</span></p>
                  <a href="##">看相似</a>
                </dd>
              </dl>
            </div>
          </van-grid-item> -->
      </van-grid>
    </div>
  </div>
</template>

<script>
export default {
  name: "recommend",
  props: ["floortitle", "recommlist"],
  data() {
    return {
      // imgSrc: "https://img14.360buyimg.com/mobilecms/s372x372_jfs/t1/97192/36/16656/130956/5e8064baE61a8c528/f61e33446a1414e1.jpg!q70.dpg.webp"
    };
  },
  methods: {
    // 跳转详情页
    goDetail(id) {
      const goods_id = id;
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        loadingType: "spinner"
      });
      setTimeout(() => {
        this.$toast.clear();
        this.$router.push({
          name: "details",
          query: {
            goods_id
          }
        });
      }, 500);
    }
  }
};
</script>

<style lang="less" scoped>
.recommend {
  width: 100%;
  margin-bottom: 20px;
  .show-title {
    height: 35px;
    line-height: 35px;
    color: rgba(244, 122, 255, 1);
    font-size: 14px;
    text-align: center;
    background: #ff0;
    margin: 10px 10px 0;
    border-radius: 8px 8px 0 0;
    img {
      width: 100%;
      height: 100%;
      border-radius: 8px 8px 0 0;
    }
  }
  .show-goods {
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-flow: wrap;
    .van-grid {
      width: 100%;
      margin: 0 5px;
      .show-goods-item {
        width: 100%;
        height: 250px;
        background-color: rgba(255, 255, 255, 1);
        dl {
          width: 100%;
          height: 100%;
          box-sizing: border-box;
          dt {
            // width: 176px;
            height: 176px;
            img {
              width: 100%;
              height: 100%;
            }
          }
          dd:first-of-type {
            box-sizing: border-box;
            height: 31px;
            font-size: 13px;
            -webkit-line-clamp: 2;
            word-break: break-all;
            color: #232326;
            margin-top: 5px;
            line-height: 16px;
            margin-bottom: 3px;
            padding: 0 5px;
          }
          dd:last-of-type {
            height: 26px;
            box-sizing: border-box;
            font-size: 13px;
            text-align: left;
            overflow: hidden;
            position: relative;
            p {
              color: #f23030;
              display: inline-block;
              padding: 0 5px;
              height: 25px;
              line-height: 25px;
              span {
                font-size: 16px;
              }
            }
            a {
              display: block;
              position: absolute;
              top: 0;
              right: 8px;
              text-align: center;
              color: #686868;
              font-size: 12px;
              width: 49px;
              height: 24px;
              line-height: 25px;
              border: 1px solid #bfbfbf;
              border-radius: 4px;
            }
          }
        }
      }
    }
  }
}
</style>
