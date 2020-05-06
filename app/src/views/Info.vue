<template>
  <div class="info">
    <van-nav-bar left-arrow
                 fixed
                 @click-left="$router.go(-1)">
      <template #title
                v-if="infoFlag">
        <ul class="info-nav">
          <li v-for="(item, index) in titleNav"
              :key="index"
              @click="toTruePart(index)"
              :class="activeIndex == index ? 'active' : ''">
            {{ item.name }}
          </li>
        </ul>
      </template>
      <template #right>
        <van-icon name="more-o"
                  size="30"
                  color="black" />
      </template>
    </van-nav-bar>
    <van-swipe @change="onChange"
               id="model0">
      <van-swipe-item v-for="(item, index) in infoListImage"
                      :key="index"
                      @click="forImage(index)">
        <img :src="item"
             alt="" />
      </van-swipe-item>
    </van-swipe>
    <div class="infoCla">
      <div class="infoPrice">
        <span>￥{{ infoData.price }}</span>
        <div @click="iconChange">
          <van-icon :name="iconName"
                    size="16" />

          <span>收藏</span>
        </div>
      </div>
      <p>{{ infoData.goods_name }}</p>

      <div class="appraiseCla"
           id="model1">
        <h1>评价</h1>
        <div class="appraiseContent">
          暂时还没有评价~去看看详情吧...
        </div>
      </div>
      <div class="recommendCla"
           id="model2">
        <h1>热门推荐</h1>
        <div class="commendFirst">
          <div class="list-one"
               v-for="(item, index) in recommendList"
               :key="index"
               @click="toInfo(item.goods_id)">
            <!-- <router-link :to="{name:'info',params:{pid:item.goods_id}}"> -->
            <img :src="item.image"
                 alt="" />
            <p>{{ item.goods_name }}</p>
            <div class="for-price">
              <span>￥{{ item.price }}</span>
              <span>看相似</span>
            </div>
            <!-- </router-link> -->
          </div>
        </div>
      </div>
      <div class="detailCla"
           id="model3">
        <h1>详情 Detail</h1>
        <h2>{{ goodDetail.title }}</h2>
        <div ref="detailImg"
             v-html="goodDetail.in_detail"></div>
      </div>
    </div>
    <van-goods-action>
      <van-goods-action-icon icon="chat-o"
                             text="客服"
                             dot />
      <van-goods-action-icon icon="cart-o"
                             text="购物车"
                             :badge="$store.state.allCartNum"
                             to="/cart" />
      <van-goods-action-icon icon="shop-o"
                             text="店铺" />
      <van-goods-action-button type="warning"
                               text="加入购物车"
                               @click="addCart" />
      <van-goods-action-button type="danger"
                               text="立即购买" />
    </van-goods-action>
    <van-sku v-model="show"
             :sku="sku"
             :goods="goods"
             :goods-id="goodsId"
             :quota="5"
             :quota-used="0"
             :message-config="messageConfig"
             :custom-stepper-config="customStepperConfig"
             @buy-clicked="onBuyClicked"
             @add-cart="onAddCartClicked"
             @sku-selected="skuSelected"
             @stepper-change="stepperChange" />
  </div>
</template>
<script>
export default {
  name: "info",
  data () {
    return {
      infoListImage: [],
      infoData: {},
      pid: "",
      iconName: "star-o",
      show: false,
      infoFlag: false,
      goodsId: "",
      skuId: "",
      goodDetail: {},
      recommendList: [],
      activeIndex: 0, //头部激活索引
      scrollTop: 0, //鼠标滚动位置

      titleNav: [
        { name: "商品" },
        { name: "评价" },
        { name: "推荐" },
        { name: "详情" }
      ],
      stepperNum: 1,
      initialSku: {
        // 键：skuKeyStr（sku 组合列表中当前类目对应的 key 值）
        // 值：skuValueId（规格值 id）
        s1: "10000",
        s2: "10001",
        // 初始选中数量
        selectedNum: 5,
        // 初始选中的商品属性
        // 键：属性id
        // 值：属性值id列表
        selectedProp: {
          123: [1222]
        }
      },
      sku: {
        tree: [],
        // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
        list: [
          {
            id: 2200, // skuId，下单时后端需要
            price: "", // 价格（单位分）
            s1: "10000", // 规格类目 k_s 为 s1 的对应规格值 id
            s2: "10001", // 规格类目 k_s 为 s2 的对应规格值 id
            // s3: '10002', // 最多包含3个规格值，为0表示不存在该规格
            stock_num: 9999 // 当前 sku 组合对应的库存
          },
          {
            id: 2201, // skuId，下单时后端需要
            price: 100, // 价格（单位分）
            s1: "10000", // 规格类目 k_s 为 s1 的对应规格值 id
            s2: "10000", // 规格类目 k_s 为 s2 的对应规格值 id
            // s3: '10002', // 最多包含3个规格值，为0表示不存在该规格
            stock_num: 9999 // 当前 sku 组合对应的库存
          },
          {
            id: 2202, // skuId，下单时后端需要
            price: 100, // 价格（单位分）
            s1: "10001", // 规格类目 k_s 为 s1 的对应规格值 id
            s2: "10001", // 规格类目 k_s 为 s2 的对应规格值 id
            // s3: '10002', // 最多包含3个规格值，为0表示不存在该规格
            stock_num: 9999 // 当前 sku 组合对应的库存
          },
          {
            id: 2203, // skuId，下单时后端需要
            price: "", // 价格（单位分）
            s1: "10001", // 规格类目 k_s 为 s1 的对应规格值 id
            s2: "10000", // 规格类目 k_s 为 s2 的对应规格值 id
            // s3: '10002', // 最多包含3个规格值，为0表示不存在该规格
            stock_num: 9999 // 当前 sku 组合对应的库存
          },
          {
            id: 2204, // skuId，下单时后端需要
            price: "", // 价格（单位分）
            s1: "10002", // 规格类目 k_s 为 s1 的对应规格值 id
            s2: "10001", // 规格类目 k_s 为 s2 的对应规格值 id
            // s3: '10002', // 最多包含3个规格值，为0表示不存在该规格
            stock_num: 9999 // 当前 sku 组合对应的库存
          },
          {
            id: 2205, // skuId，下单时后端需要
            price: 100, // 价格（单位分）
            s1: "10002", // 规格类目 k_s 为 s1 的对应规格值 id
            s2: "10000", // 规格类目 k_s 为 s2 的对应规格值 id
            // s3: '10002', // 最多包含3个规格值，为0表示不存在该规格
            stock_num: 9999 // 当前 sku 组合对应的库存
          }
        ],
        price: "", // 默认价格（单位元）
        stock_num: 9999, // 商品总库存
        collection_id: 2261, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
        none_sku: false // 是否无规格商品
        // hide_stock: false // 是否隐藏剩余库存
      },
      goods: {
        // 默认商品 sku 缩略图
        // picture: 'https://img.yzcdn.cn/1.jpg'
      },
      messageConfig: {
        // 图片上传回调，需要返回一个promise，promise正确执行的结果需要是一个图片url
        uploadImg: () => {
          return new Promise(resolve => {
            setTimeout(
              () =>
                resolve(
                  "https://img.yzcdn.cn/upload_files/2017/02/21/FjKTOxjVgnUuPmHJRdunvYky9OHP.jpg!100x100.jpg"
                ),
              1000
            );
          });
        },
        // 最大上传体积 (MB)
        uploadMaxSize: 3,
        // placeholder 配置
        placeholderMap: {
          text: "xxx",
          tel: "xxx"
        },
        // 初始留言信息
        // 键：留言 name
        // 值：留言内容
        initialMessages: {
          留言: "留言信息"
        }
      },
      customStepperConfig: {
        // 自定义限购文案
        quotaText: "每次限购5件",
        // 自定义步进器超过限制时的回调
        handleOverLimit: data => {
          console.log(data);
        }
      },
      // 步进器变化的回调
      handleStepperChange: currentValue => {
        console.log(currentValue);
      },
      // 库存
      stockNum: 9999,
      // 格式化库存
      stockFormatter: stockNum => {
        console.log(stockNum);
      }
    };
  },
  methods: {
    // 去详情页面
    toInfo (pid) {
      this.$router.push({ name: "info", params: { pid: pid } });
      this.pid = pid;
      this.getInfoList();
      // 返回顶部
      document.documentElement.scrollTop ? document.documentElement.scrollTop = 0 : document.body.scrollTop = 0;

      // this.$router.go(0)
    },
    onChange (index) {
      console.log(index);
    },
    forImage (index) {
      this.$ImagePreview({
        images: this.infoListImage,
        startPosition: index
      });
    },
    iconChange () {
      this.iconName == "star-o"
        ? (this.iconName = "star")
        : (this.iconName = "star-o");
    },
    onBuyClicked () {
      console.log("立即购买按钮");
    },
    onAddCartClicked () {
      this.show = false;
      console.log("加入购物车按钮");
      this.axios
        .post(
          "https://api.ymduo.com/cart/add",
          this.$qs.stringify({
            user_id: 956532,
            shop_id: this.infoData.storeInfo.store_id,
            goods_id: this.infoData.goods_id,
            sku_id: this.skuId,
            goods_num: this.stepperNum,
            active_type: 0
          })
        )
        .then(res => {
          this.$Toast.success("加入购物车成功");
          console.log(res);
          // 购物车总数量
          this.$store.commit("getCartNum");
        });
    },
    // 弹出层的加入购物车
    addCart () {
      if (this.infoData.attr.length == 0) {
        this.onAddCartClicked();
      } else {
        // 显示弹出层
        this.show = true;
      }
    },
    skuSelected (skuValue, selectedSku, selectedSkuComb) {
      // 暂时先将price设置成固定的每一个price
      this.sku.list.forEach(item => {
        item.price = this.infoData.price * 100;
      });
      if (selectedSkuComb != null) {
        this.skuId = selectedSkuComb.id;
      }

      // console.log(this.sku.list);
      // console.log(skuValue, selectedSku, selectedSkuComb);
    },
    // 计步器数量变化
    stepperChange (val) {
      this.stepperNum = val;
    },
    // 头部导航跳转到对应位置
    toTruePart (index) {
      this.activeIndex = index;
      document
        .getElementById("model" + index)
        .scrollIntoView({ behavior: "instant" });
    },
    // 滚轮事件
    infoScroll () {
      this.scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      // 滚动到一定位置出现白色背景头部
      document.getElementsByClassName("van-nav-bar")[0].style.background =
        "rgba(255,255,255, " + 0.0025 * this.scrollTop + ") ";
      // 滚动时展示头部导航
      if (this.scrollTop == 0) {
        this.infoFlag = false;
      } else {
        this.infoFlag = true;
      }

      // console.log(this.scrollTop)
      var modelTop1 = document.getElementById("model1").offsetTop - 50; //获取评价到顶部的距离
      var modelTop2 = document.getElementById("model2").offsetTop - 50; //获取推荐到顶部的距离
      var modelTop3 = document.getElementById("model3").offsetTop - 50; //获取详情到顶部的距离
      if (this.scrollTop < modelTop1) {
        this.activeIndex = 0;
      } else if (this.scrollTop >= modelTop1 && this.scrollTop < modelTop2) {
        this.activeIndex = 1;
      } else if (this.scrollTop >= modelTop2 && this.scrollTop < modelTop3) {
        this.activeIndex = 2;
      } else if (this.scrollTop >= modelTop3) {
        this.activeIndex = 3;
      }
    },
    // 获取info列表
    getInfoList () {
      this.axios
        .get("https://api.ymduo.com/item/index", {
          params: {
            gid: this.pid
          }
        })
        .then(res => {
          this.infoListImage = res.data.result.data.image;
          this.infoData = res.data.result.data;
          // 整理需要的数据
          const attr = [];
          res.data.result.data.attr.forEach((item, index) => {
            this.sku.list[index].price = this.infoData.price * 100;
            // console.log(item)
            var c = [];
            c = item.attr_values.split(",").map((i, ind) => {
              return {
                id: "1000" + ind,
                name: i
              };
            });
            attr.push({
              k: item.attr_name,
              v: c,
              k_s: "s" + (index + 1)
            });
          });
          this.sku.tree = attr; //获取到的tree里的attr的数据
          this.sku.price = this.infoData.price;
          this.goods.picture = res.data.result.data.image[0];
          this.goodsId = this.infoData.goodsId;
          // 获取商品详情
          this.goodDetail = res.data.result.data.detail;
          // 推荐
          this.recommendList = res.data.result.data.recommend;
          console.log("aa", this.recommendList);
        });
    }
  },
  updated () {
    this.$refs.detailImg.querySelectorAll("img").forEach(item => {
      item.style.width = "100%";
    });
  },
  mounted () {
    // 监听滚轮事件
    window.addEventListener("scroll", this.infoScroll);
    this.pid = this.$route.params.pid;
    this.getInfoList();

    // this.$store.dispatch('changeActFoot', false)
    // 购物车总数量
    this.$store.commit("getCartNum");
  },
  destroyed () {
    // 监听滚轮事件
    window.removeEventListener("scroll", this.infoScroll);
  }
};
</script>

<style lang="less">
.info {
  padding-bottom: 60px;
  .info-nav {
    display: flex;
    justify-content: space-around;
    li {
      height: 40px;
    }
    .active {
      border-bottom: 3px solid red;
    }
  }
  .van-swipe {
    width: 100%;
    height: 375px;
    img {
      width: 375px;
      height: 375px;
    }
  }
  .van-nav-bar {
    background: transparent;
    color: black;
  }

  .infoCla {
    .infoPrice {
      padding: 0 10px;
      box-sizing: border-box;
      width: 100%;
      height: 50px;
      display: flex;
      justify-content: space-between;

      span:nth-child(1) {
        font-size: 20px;
        color: red;
        line-height: 50px;
      }
      div {
        height: 50px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        span {
          padding-top: 3px;
          font-size: 10px;
        }
      }
      .van-goods-action-button {
        border-radius: 0;
      }
    }
    .appraiseCla {
      width: 100%;
      height: 100px;
      .appraiseContent {
        height: 80px;
        text-align: center;
        line-height: 80px;
      }
      h1 {
        padding: 0 10px;
        box-sizing: border-box;
        font-size: 14px;
        font-weight: bold;
        line-height: 32px;
        color: red;
      }
    }
    // 推荐

    .recommendCla {
      .commendFirst {
        padding: 0 5px;
        box-sizing: border-box;
        width: 375px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
      }
      h1 {
        padding: 0 10px;
        box-sizing: border-box;
        font-size: 14px;
        font-weight: bold;
        line-height: 32px;
        color: red;
      }
    }
    .detailCla {
      h1 {
        padding: 0 10px;
        box-sizing: border-box;
        font-size: 14px;
        font-weight: bold;
        line-height: 32px;
        color: red;
      }
      h2 {
        text-align: center;
        font-size: 14px;
        line-height: 30px;
      }
    }
  }
  p {
    font-size: 16px;
    font-weight: bold;
    padding: 0 10px;
    box-sizing: border-box;
  }
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
[class*="van-hairline"]::after {
  border: 0;
}
</style>
