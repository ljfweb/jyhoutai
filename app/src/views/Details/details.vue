<template>
  <div class="detail">
    <!-- 顶部导航 -->
    <!-- 导航返回图片即更多 -->
    <div class="nav-icon" v-if="scrollTop <= 0.8">
      <div class="left-icon" @click="onClickLeft">
        <van-icon name="arrow-left" size="24px" color="#fff" />
      </div>
      <div class="right-icon" @click="onClickRight">
        <van-icon name="ellipsis" size="26px" color="#fff" />
      </div>
    </div>
    <!-- 分享弹出层 -->
    <van-popup v-model="show" overlay-class="myoverlay" close-on-popstate>
      <ul>
        <li @click="toHome">
          <van-icon name="home-o" color="#fff" /><strong>首页</strong>
        </li>
        <li @click="toSearch">
          <van-icon name="search" color="#fff" /><strong>分类搜索</strong>
        </li>
        <li @click="toMine">
          <van-icon name="user-o" color="#fff" /><strong>我的京东</strong>
        </li>
        <li @click="toFootprint">
          <van-icon name="eye-o" color="#fff" /><strong>浏览记录</strong>
        </li>
        <li @click="$toast('我的关注')">
          <van-icon name="like-o" color="#fff" /><strong>我的关注</strong>
        </li>
        <li @click="$toast('分享')">
          <van-icon name="setting-o" color="#fff" /><strong>分享</strong>
        </li>
      </ul>
    </van-popup>
    <van-tabs
      class="myvantabs"
      :background="mybagcolor"
      :color="mycolor"
      :title-inactive-color="mytxtcolor"
      :title-active-color="mytxtcolor"
      v-model="active"
      scrollspy
      sticky
      @scroll="onScroll"
    >
      <template #nav-left>
        <div class="navleft">
          <van-icon @click="onClickLeft" name="arrow-left" size="24px" />
        </div>
      </template>
      <template #nav-right>
        <div class="navright">
          <van-icon @click="onClickRight" name="ellipsis" size="24px" />
        </div>
      </template>
      <van-tab title="商品">
        <!-- 详情页轮播图 -->
        <van-swipe
          class="my-swipe"
          indicator-color="red"
          :loop="false"
          :stop-propagation="false"
          @change="onChange"
        >
          <van-swipe-item
            v-for="(item, index) in bannerList"
            :key="index"
            @click="onShow"
          >
            <img class="swiper-pic" v-lazy="item" />
          </van-swipe-item>
        </van-swipe>
        <!-- 轮播图预览图 -->
        <van-image-preview
          v-model="prevShow"
          :images="bannerList"
          @change="onChangePrev"
        >
          <template v-slot:index
            >{{ current + 1 }}/{{ bannerList.length }}</template
          >
        </van-image-preview>
        <!-- 商品标题，价格，收藏，分享 -->
        <detail-info :detailinfolist="detailinfolist"></detail-info>
        <!-- 商品优惠卷，促销 -->
        <detail-cpon></detail-cpon>
        <!-- 商品选购 -->
        <detail-buyer></detail-buyer>
      </van-tab>
      <!-- 商品评价 -->
      <van-tab title="评价">
        <detail-eval></detail-eval>
      </van-tab>
      <!-- 商品推荐 -->
      <van-tab title="推荐">
        <detail-recomend :remlist="recommendList"></detail-recomend>
      </van-tab>
      <!-- 商品详情 -->
      <van-tab title="详情">
        <div class="detail-describe">
          <van-divider
            :style="{
              color: '#1989fa',
              borderColor: '#1989fa',
              padding: '0 16px'
            }"
          >
            宝贝详情
          </van-divider>
          <div v-html="detailImgs"></div>
        </div>
      </van-tab>
      <!-- 详情页底部导航 -->
      <van-goods-action safe-area-inset-bottom>
        <van-goods-action-icon
          @click="$toast('联系客服')"
          icon="chat-o"
          text="联系客服"
        />
        <van-goods-action-icon
          @click="$toast('店铺')"
          icon="shop-o"
          text="店铺"
        />
        <van-goods-action-icon
          icon="cart-o"
          text="购物车"
          @click="trunCart"
          :badge="cartNum == 0 ? '' : cartNum"
        />
        <van-goods-action-button
          type="warning"
          text="加入购物车"
          @click="showDetailSku"
        />
        <van-goods-action-button
          type="danger"
          text="立即购买"
          @click="showDetailSku"
        />
      </van-goods-action>
      <!-- 商品规格选择 -->
      <detail-sku ref="sku" @cartnum="setCartNum"></detail-sku>
    </van-tabs>
  </div>
</template>

<script>
import detailInfo from "./base/detail-info";
import detailCpon from "./base/detail-coupons";
import detailBuyer from "./base/detail-buyer";
import detailEval from "./base/detail-eval";
import detailRecomend from "./base/detail-recomend";
import detailSku from "./base/detail-sku";
import Qs from "qs";
export default {
  name: "detail",
  components: {
    detailInfo,
    detailCpon,
    detailBuyer,
    detailEval,
    detailRecomend,
    detailSku
  },
  data() {
    return {
      uid: 956538, //用户id
      scrollTop: 0,
      show: false, //右上角弹出窗口
      // gid: "",
      bannerList: [], //轮播图
      detailinfolist: {}, //标题价格等数据
      detailsAttrObj: {}, //商品规格
      prevShow: false,
      current: 0,
      cartNum: 0, //购物车数量
      recommendList: [], //推荐列表数据
      detailImgs: "", //详情内容图片
      active: 0,
      mybagcolor: "hsla(0,0%,100%,0)", //移动tabs背景切换
      mytxtcolor: "rgba(50,50,51,0)",
      mycolor: "rgba(238,10,36,0)"
    };
  },
  methods: {
    onClickLeft() {
      //左边返回按钮
      this.$router.go(-1);
    },
    onClickRight() {
      //右边分享按钮
      this.show = true;
    },
    // 跳转首页
    toHome() {
      this.$router.push("/home");
      this.$store.dispatch("setNavbarActive", 0);
    },
    // 跳转分类搜索
    toSearch() {
      this.$router.push("/category");
      this.$store.dispatch("setNavbarActive", 1);
    },
    // 跳转我的页面
    toMine() {
      this.$router.push("/mine");
      this.$store.dispatch("setNavbarActive", 4);
    },
    // 跳转足迹列表
    toFootprint() {
      this.$router.push("/myfootprint");
    },
    // 点击购物车跳转购物车
    trunCart() {
      this.$router.push("/cart");
      this.$store.dispatch("setNavbarActive", 3);
    },
    // 顶部导航显隐
    scroll() {
      const top = document.documentElement.scrollTop || document.body.scrollTop;
      if (top > 60) {
        let opacity = top / 300;
        opacity = opacity > 1 ? 1 : opacity;
        this.scrollTop = opacity;
      } else {
        this.scrollTop = 0;
      }
      if (top) {
        this.show = false;
      }
    },
    onScroll(top) {
      if (top.scrollTop > 60) {
        let opacity = top.scrollTop / 300;
        opacity = opacity > 1 ? 1 : opacity;
        this.mybagcolor = `hsla(0,0%,100%,${opacity})`;
        this.mytxtcolor = `rgba(50,50,51,${opacity})`;
        this.mycolor = `rgba(238,10,36,${opacity})`;
      } else {
        this.mybagcolor = `hsla(0,0%,100%,0)`;
        this.mytxtcolor = `rgba(50,50,51,0)`;
        this.mycolor = `rgba(238,10,36,0)`;
      }
    },
    // 轮播指示器
    onChange(index) {
      this.current = index;
    },
    // 轮播图预览显示
    onShow() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        loadingType: "spinner"
      });
      setTimeout(() => {
        this.$toast.clear();
        this.prevShow = true;
      }, 500);
    },
    // 预览图片滑动时改变current
    onChangePrev(index) {
      this.current = index;
    },
    // 显示商品规格
    showDetailSku() {
      this.$refs.sku._data.showSku = true;
      this.setShopSku();
    },
    // 设置商品的规格
    setShopSku() {
      if (this.detailsAttrObj.list == undefined) {
        this.detailsAttrObj.list = [];
      }
      this.$refs.sku._data.goodsId = this.detailsAttrObj.goodsid;
      this.$refs.sku._data.sku.tree = this.detailsAttrObj.attr;
      this.$refs.sku._data.sku.list = this.detailsAttrObj.list;
      this.$refs.sku._data.sku.price = this.detailsAttrObj.price;
      this.$refs.sku._data.sku.stock_num = Number(this.detailsAttrObj.stocknum);
      this.$refs.sku._data.goods.picture = this.detailsAttrObj.image;
    },
    // 获取商品详情信息
    getDetailData(id) {
      // this.gid = this.$route.query.goods_id;
      this.$axios({
        method: "post",
        url: "https://api.ymduo.com/item/index",
        data: Qs.stringify({
          gid: id,
          uid: this.uid
        }),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        // console.log(res.data);
        if (res.data.code !== 500) {
          this.bannerList = res.data.result.data.image;
          this.recommendList = res.data.result.data.recommend;
          this.detailImgs = res.data.result.data.detail.in_detail;
          let infoObj = {
            goods_name: res.data.result.data.goods_name,
            old_price: res.data.result.data.old_price,
            price: res.data.result.data.price,
            freight_price: res.data.result.data.freight_price
          };
          this.detailinfolist = infoObj;
          const attrObj = {};
          const goodsid = res.data.result.data.goods_id;
          const images = res.data.result.data.image[0];
          const price = res.data.result.data.price;
          const stocknum = res.data.result.data.goods_stock;
          const attr = [];
          const list = [];
          res.data.result.data.attr.forEach((ele, index) => {
            let val = ele.attr_values.split(",");
            const myval = val.map((item, i) => {
              return { id: "1000" + i, name: item };
            });
            attr.push({
              k: ele.attr_name,
              k_id: index + 1,
              v: myval,
              k_s: "s" + (index + 1)
            });
            const mylist = val.map((item, i) => {
              return {
                id: goodsid,
                price: price * 100,
                s1: "1000" + i,
                s2: "1000" + i,
                name: item,
                stock_num: Number(stocknum)
              };
            });
            list.push(mylist);
          });
          attrObj.goodsid = goodsid;
          attrObj.image = images;
          attrObj.price = price;
          attrObj.stocknum = stocknum;
          attrObj.attr = attr;
          attrObj.list = list[0];
          this.detailsAttrObj = attrObj;
          // console.log(this.detailsAttrObj);
          this.$refs.sku._data.detaildata = res.data.result.data; //商品详情
        }
        // this.$store.dispatch("setDetailGoodsData", res.data.result.data);
      });
    },
    // 获取购物车数量
    getCartNum() {
      if (this.uid && this.$store.state.userToken) {
        this.axios
          .post(
            "https://api.ymduo.com/Home/Cart/cartnum",
            Qs.stringify({
              uid: this.uid
            })
          )
          .then(res => {
            if (res.data.code == 200) {
              this.cartNum = res.data.result.data;
            }
          });
      }
    },
    //修改购物车数量
    setCartNum(num) {
      this.cartNum = num;
    }
  },
  created() {
    // 商品id
    let gid = this.$route.query.goods_id;
    // 获取商品详情信息
    this.getDetailData(gid);
    // 获取购物车数量
    this.getCartNum();
  },
  mounted() {
    // console.log(window);
    window.addEventListener("scroll", this.scroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.scroll);
  }
};
</script>

<style lang="less" scoped>
.detail {
  width: 100%;
  margin-bottom: 60px;
  .van-popup {
    background-color: transparent;
    top: 27%;
    left: 78%;
    ul {
      background: rgba(0, 0, 0, 0.8);
      border-radius: 4px;
      width: 125px;
      li {
        position: relative;
        border-bottom: 1px solid hsla(0, 0%, 100%, 0.2);
        height: 40px;
        line-height: 40px;
        margin-left: 40px;
        z-index: 1000;
        strong {
          font-weight: 400;
          color: #fff;
          font-size: 14px;
        }
        .van-icon {
          position: absolute;
          font-size: 20px;
          top: 0;
          left: -40px;
          width: 40px;
          height: 40px;
          text-align: center;
          line-height: 40px;
        }
      }
    }
  }
  .van-sticky {
    position: absolute;
    z-index: 1000;
    width: 100%;
    opacity: 0;
    .navleft {
      display: flex;
      align-items: center;
      margin: 0 8% 0 2%;
    }
    .navright {
      display: flex;
      align-items: center;
      margin: 0 4% 0 8%;
    }
    .van-tabs__wrap {
      width: 60%;
      margin: 0 auto;
      .van-tabs__line {
        width: 30px;
        transform: translateX(44px) translateX(-120%);
      }
    }
  }
  .nav-icon {
    width: 100%;
    height: 46px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    padding: 0 5px;
    box-sizing: border-box;
    top: 0;
    z-index: 777;
    .left-icon {
      width: 26px;
      height: 26px;
      border: 2px solid white;
      border-radius: 50%;
      background-color: rgba(0, 0, 0, 0.4);
    }
    .right-icon {
      width: 26px;
      height: 26px;
      border-radius: 50%;
      margin-right: 6px;
      background-color: rgba(0, 0, 0, 0.6);
    }
  }
  .my-swipe {
    position: relative;
    z-index: 10;
  }
  .van-goods-action {
    z-index: 999;
    .van-goods-action-icon {
      min-width: 52px;
    }
    .van-goods-action-button {
      height: 100%;
      border-radius: 0;
      font-size: 16px;
      font-weight: 700;
      margin: 0;
    }
  }
  .detail-describe {
    width: 100%;
    box-sizing: border-box;
    background-color: #fff;
    padding: 5px 10px 0;
    img {
      width: 100%;
      height: auto;
    }
  }
}
</style>
