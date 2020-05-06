<template>
  <div class="detailrecomend">
    <div class="recom-content">
      <h1>为你推荐</h1>
      <div class="list">
        <van-grid :border="false" :column-num="2">
          <van-grid-item
            v-for="(item, index) in remlist"
            :key="index"
            @click="toDetails(item.goods_id)"
          >
            <dl class="list-item">
              <dt>
                <img :src="item.image" alt />
              </dt>
              <dd class="txt-cut">{{ item.goods_name }}</dd>
              <dd>
                <p>
                  ￥<span>{{ item.price }}</span>
                </p>
              </dd>
            </dl>
          </van-grid-item>
          <!-- <van-grid-item>
            <dl class="list-item">
              <dt>
                <img src="https://img.yzcdn.cn/vant/apple-1.jpg" alt />
              </dt>
              <dd>前行者游戏背光发光牧马人机 械键盘鼠标套装有线网吧电...</dd>
              <dd>
                <p>￥<span>28.50</span></p>
              </dd>
            </dl>
          </van-grid-item> -->
        </van-grid>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "detailrecomend",
  props: ["remlist"],
  data() {
    return {};
  },
  methods: {
    toDetails(id) {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        loadingType: "spinner"
      });
      setTimeout(() => {
        this.$toast.clear();
        location.href = "/details?goods_id=" + id;
      }, 500);
    }
  }
};
</script>

<style lang="less" scoped>
.detailrecomend {
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 8px;
  overflow: hidden;
  background-color: #fff;
  .recom-content {
    h1 {
      font-size: 14px;
      height: 40px;
      line-height: 40px;
      padding-left: 10px;
    }
    .list {
      .van-grid {
        .van-grid-item {
          .van-grid-item__content {
            .list-item {
              dd:first-of-type {
                padding: 5px 10px 0;
                height: 3em;
                line-height: 1.5em;
                color: #333;
                font-size: 12px;
                font-weight: 400;
                white-space: normal;
                -webkit-line-clamp: 2;
              }
              dd:last-of-type {
                height: 26px;
                line-height: 26px;
                padding: 0 10px;
                color: #e4393c;
                span {
                  font-size: 16px;
                  font-weight: bold;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
