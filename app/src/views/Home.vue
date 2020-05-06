<template>
  <div class="home">
    <div style="height:90vh"
         ref="wrap">
      <div>
        <header-com></header-com>
        <index-nav-com></index-nav-com>

        <div class="for-title">
          <h1>为你推荐</h1>
        </div>
        <div class="list">
          <div class="listFirst"
               v-if="styleFlag">
            <div class="list-one"
                 v-for="(item, index) in forList"
                 :key="index"
                 @click="toInfo(item.goods_id)">
              <!-- <router-link :to="{name:'info',params:{pid:item.goods_id}}"> -->
              <img v-lazy="item.image"
                   alt="" />
              <p>{{ item.goods_name }}</p>
              <div class="for-price">
                <span>￥{{ item.price }}</span>
                <span>看相似</span>
              </div>
              <!-- </router-link> -->
            </div>
          </div>
          <div class="listSecond"
               v-if="!styleFlag">
            <van-card v-for="(item, index) in forList"
                      :key="index"
                      @click="toInfo(item.goods_id)"
                      :price="item.price"
                      :desc="item.goods_name">
              <template #num>
                <span>看相似</span>
              </template>
              <template #thumb>
                <img style="width:88px;height:88px"
                     v-lazy="item.image"
                     alt="" />
              </template>
            </van-card>
          </div>
        </div>
      </div>
    </div>
    <div class="icon"
         @click="changeStyle">
      <van-icon size="32"
                :name="iconStyle"
                color="#ccc" />
    </div>
    <!-- <foryou-com></foryou-com> -->
  </div>
</template>

<script>
import HeaderCom from "../components/header.vue";
import IndexNavCom from "../components/indexnav.vue";
// 为你推荐
// import ForyouCom from "../components/foryou.vue"
import BScroll from "better-scroll";

export default {
  name: "Home",
  components: {
    HeaderCom,
    IndexNavCom
    // ForyouCom,
  },
  data () {
    return {
      forList: [],
      myscroll: "",
      page: 1,
      styleFlag: true,
      iconStyle: "orders-o"
    };
  },
  created () {
    this.getlist();
  },
  methods: {
    toInfo (pid) {
      this.$router.push({ name: "info", params: { pid: pid } });
    },
    getlist () {
      this.axios({
        url: "https://api.ymduo.com/Interface/recommendlists",
        method: "post",
        data: this.$qs.stringify({
          p: this.page
        })
      }).then(res => {
        console.log("aaa", res.data.result.data);
        this.forList = this.forList.concat(res.data.result.data);
      });
    },
    // 切换展示样式
    changeStyle () {
      this.styleFlag = !this.styleFlag;
      this.iconStyle = this.iconStyle == "apps-o" ? "orders-o" : "apps-o";
    }
  },
  mounted () {
    // 初始化
    this.$nextTick(() => {
      this.myscroll = new BScroll(this.$refs.wrap, {
        scrollY: true, //y方向滚动开启
        click: true, //开启点击
        pullDownRefresh: {
          threshold: 50,
          probeType: 3
        },
        pullUpLoad: {
          threshold: 744
        }
      });
      // 监控上拉
      this.myscroll.on("pullingUp", () => {
        this.page++;
        this.getlist();
        console.log("this.page", this.page);
        this.$nextTick(() => {
          this.myscroll.refresh(); //dom结构发生变化,重新初始化BScroll
        });
        this.myscroll.finishPullUp(); // 上拉加载动作完成后调用此方法告诉BScroll完成一次上拉动作
      });
      // 监控下拉
      this.myscroll.on("pullingDown", () => {
        this.forList = [];
        this.page++;
        this.getlist();
        this.$nextTick(() => {
          this.myscroll.refresh(); // DOM 结构发生变化后，重新初始化BScroll
        });
        this.myscroll.finishPullDown(); // 下拉加载动作完成后调用此方法告诉BScroll完成一次上拉动作
      });
    });
  }
};
</script>
<style lang="less" scoped>
.for-title {
  width: 356px;
  height: 35px;
  h1 {
    color: blue;
    font-size: 20px;
    text-align: center;
    line-height: 35px;
    letter-spacing: 8px;
  }
}

.list .listFirst {
  padding: 0 5px 60px;
  box-sizing: border-box;
  width: 375px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;

  .list-one {
    width: 177px;
    height: 271px;
    border: 1px solid #ccc;
    margin: 2px 0;
    img {
      width: 176px;
      height: 176px;
    }
    p {
      width: 100%;
      height: 32px;
      line-height: 16px;
      font-size: 12px;
      padding: 0 3px;
      box-sizing: border-box;
      word-wrap: break-word;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }
    .for-price {
      margin-top: 10px;
      display: flex;
      padding: 0 3px;
      box-sizing: border-box;
      justify-content: space-between;
      :nth-of-type(1) {
        color: red;
        font-size: 16px;
      }
      :nth-of-type(2) {
        display: inline-block;
        width: 50px;
        height: 24px;
        line-height: 24px;
        text-align: center;
        border: 1px solid #ccc;
        margin-right: 10px;
      }
    }
  }
}
.list .listSecond {
  padding-bottom: 60px;
  .van-card {
    background-color: white;
    .van-card__num {
      width: 50px;
      height: 24px;
      line-height: 24px;
      text-align: center;
      border: 1px solid #ccc;
    }
    .van-card__desc {
      font-size: 15px;
      height: 40px;
      line-height: 20px;
      overflow: hidden;
      max-height: 40px;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      white-space: pre-wrap;
    }
  }
}
.icon {
  width: 40px;
  height: 40px;
  background-color: white;
  position: fixed;
  bottom: 10%;
  right: 4%;
  border-radius: 50%;
  .van-icon {
    top: 5px;
    left: 5px;
  }
}
</style>
