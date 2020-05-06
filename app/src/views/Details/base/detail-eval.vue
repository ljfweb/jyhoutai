<template>
  <div class="detaileval">
    <!-- 商品评价 -->
    <div class="eval-title">
      <van-nav-bar left-text="评价" @click-right="onClickRight">
        <template #title>
          <ul>
            <li>好评 98%</li>
            <li>共 3.1万+ 条</li>
          </ul>
        </template>
        <template #right>
          <van-icon name="arrow" size="22" color="#666" />
        </template>
      </van-nav-bar>
    </div>
    <div class="eval-container">
      <div class="eval-tag">
        <van-tag color="#fdf0f0" text-color="#666" size="medium"
          >简单方便(186)</van-tag
        >
        <van-tag color="#fdf0f0" text-color="#666" size="medium"
          >十分漂亮(170)</van-tag
        >
        <van-tag color="#fdf0f0" text-color="#666" size="medium"
          >功能丰富(137)</van-tag
        >
        <van-tag color="#fdf0f0" text-color="#666" size="medium"
          >颜色漂亮(67)</van-tag
        >
        <van-tag color="#fdf0f0" text-color="#666" size="medium"
          >外表漂亮(53)</van-tag
        >
        <van-tag color="#fdf0f0" text-color="#666" size="medium"
          >有趣好玩(50)</van-tag
        >
        <van-tag color="#fdf0f0" text-color="#666" size="medium"
          >十分好用(50)</van-tag
        >
      </div>
      <div class="eval-user">
        <ul class="user-list">
          <li>
            <div class="username">
              <img
                src="http://t00img.yangkeduo.com/goods/images/2019-10-30/526f64fc7a60b40159ae57355ecea78f.jpeg"
              />
              <span>神****武</span>
              <van-rate
                v-model="value"
                color="#ff4142"
                size="12px"
                gutter="0"
              />
              <span>2020-04-01</span>
            </div>
            <div class="userdesc txt-cut">
              京东送货就是快，头天晚上下单，第二天中午就到了！特别喜欢，东西超棒，所以也不太确定准不准确听说跟隔壁家的，我最喜欢京东的快递没得说，凌晨下单下午就送到。
            </div>
            <div class="userpics"></div>
          </li>
        </ul>
        <div class="eval-more">
          <van-button
            color="#2f2f2f"
            plain
            round
            size="small"
            @click="$toast('查看评价')"
            >查看全部评价 ></van-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "detaileval",
  data() {
    return {
      value: 5
    };
  },
  methods: {
    onClickRight() {}
  }
};
</script>

<style lang="less" scoped>
.detaileval {
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 8px;
  background-color: #fff;
  overflow: hidden;
  .eval-title {
    .van-nav-bar__left {
      .van-nav-bar__text {
        font-size: 16px;
        color: #333;
      }
    }
    .van-nav-bar__title {
      max-width: 70%;
      ul {
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        :first-child {
          color: #e4393c;
        }
      }
    }
  }
  .eval-container {
    padding: 0 10px;
    .eval-tag {
      position: relative;
      padding: 12px 3px 0 0;
      max-height: 63px;
      margin: 0;
      overflow: hidden;
      .van-tag {
        margin: 0 10px 10px 0;
        height: 25px;
        padding: 0 10px;
        font-size: 10px;
      }
    }
    .eval-user {
      .user-list {
        color: #333;
        li {
          padding: 10px 0;
          .username {
            line-height: 25px;
            margin-bottom: 8px;
            display: flex;
            align-items: center;
            img {
              width: 25px;
              height: 25px;
              border-radius: 50%;
            }
            span:first-of-type {
              margin: 0 5px 0 10px;
              color: #333;
              max-width: 8.2em;
            }
            span:last-of-type {
              margin-left: auto;
              color: #999;
            }
          }
          .userdesc {
            -webkit-line-clamp: 3;
            line-height: 1.5;
            font-size: 14px;
            margin: 5px 0;
            word-break: break-all;
            white-space: pre-line;
            max-height: 126px;
          }
        }
      }
      .eval-more {
        text-align: center;
        padding: 10px 0;
      }
    }
  }
}
</style>
