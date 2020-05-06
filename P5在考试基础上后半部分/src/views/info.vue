<template>
  <div class="wrap">
    <van-nav-bar @click-left="onClickLeft" title="标题" right-text="按钮" left-arrow>
      <!-- v-slot:title 简写 #title -->
      <template #title>
        <ul class="info_nav">
          <li
            v-for="(item, index) in navdata"
            :key="index"
            :class="index == activeIndex ? 'active' : ''"
            @click="scrollpage(index)"
          >{{ item.name }}</li>
        </ul>
      </template>
    </van-nav-bar>
    <!-- 轮播图 -->
    <van-swipe class="my-swipe1" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item, index) in bannerlist" :key="index">
        <img :src="item" @click="yulan(index)" />
      </van-swipe-item>
    </van-swipe>
    <!-- 详情部分 -->
    <div class="price">
      <span>¥{{ infoData.price }}</span>
      <span>
        <van-icon name="search" />
        <a href>收藏</a>
      </span>
    </div>
    <div class="pname">{{ infoData.goods_name }}</div>
    <div class="des">{{ infoData.goods_subtitle }}</div>

    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" dot />
      <van-goods-action-icon icon="cart-o" text="购物车" info="5" :badge="$store.getters.cartnum" />
      <van-goods-action-icon icon="shop-o" text="店铺" />
      <van-goods-action-button @click="showSku" text="加入购物车" type="warning" />
      <van-goods-action-button text="立即购买" type="danger" />
    </van-goods-action>
    <!-- 商品规格 -->
    <van-sku
      v-model="show"
      :sku="sku"
      :goods="goods"
      :goods-id="goodsId"
      :quota="quota"
      :quota-used="quotaUsed"
      :custom-stepper-config="customStepperConfig"
      @sku-selected="changesku"
      @sku-prop-selected="changepro"
      @buy-clicked="onBuyClicked"
      @add-cart="onAddCartClicked"
    />
  </div>
</template>

<script>
export default {
  name: "info",
  data() {
    return {
      navdata: [
        { name: "商品" },
        { name: "评价" },
        { name: "推荐" },
        { name: "详情" }
      ],
      show: false,
      pid: "",
      num: 1,
      quota: 8, //库存
      bannerlist: [],
      infoData: "",
      goods: {
        //商品数据
        // 默认商品 sku 缩略图
        picture: "https://img.yzcdn.cn/1.jpg",
        name: "箱子"
      },
      initialSku: {
        // 键：skuKeyStr（sku 组合列表中当前类目对应的 key 值）
        // 值：skuValueId（规格值 id）
        s0: "10000",
        s1: "10001",
        // 初始选中数量
        selectedNum: 3,
        // 初始选中的商品属性
        // 键：属性id
        // 值：属性值id列表
        selectedProp: {
          123: [1222]
        }
      },
      customStepperConfig: {
        //计数器
        //计数器数据
        // 自定义限购文案
        quotaText: "每人限购2件",
        // 自定义步进器超过限制时的回调
        handleOverLimit: data => {
          console.log(data);
        },
        // 步进器变化的回调
        handleStepperChange: currentValue => {
          console.log(currentValue);
          this.num = currentValue;
        }
        // 库存
        // stockNum: 1999
        // 格式化库存
        // stockFormatter: stockNum => { }
      },
      goodsId: "19314", //商品id
      quotaUsed: 0, //已购数量
      sku: {
        // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
        // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
        tree: [],
        // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
        list: [
          {
            id: 2259, // skuId，下单时后端需要
            price: 100, // 价格（单位分）
            s0: "10000", // 规格类目 k_s 为 s1 的对应规格值 id
            s1: "10001", // 规格类目 k_s 为 s2 的对应规格值 id
            stock_num: 110 // 当前 sku 组合对应的库存
          },
          {
            id: 2259, // skuId，下单时后端需要
            price: 100, // 价格（单位分）
            s0: "10001", // 规格类目 k_s 为 s1 的对应规格值 id
            s1: "10000", // 规格类目 k_s 为 s2 的对应规格值 id
            stock_num: 110 // 当前 sku 组合对应的库存
          }
        ],
        price: "188.00", // 默认价格（单位元）
        stock_num: 227, // 商品总库存
        collection_id: 2261, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
        // none_sku: false, // 是否无规格商品
        hide_stock: false // 是否隐藏剩余库存
      }
    };
  },
  methods: {
    
    onClickLeft() {
      // 回到上一页
      this.$router.go(-1);
    },
    changesku(skuValue, selectedSku, selectedSkuComb) {
      console.log(skuValue, selectedSku, selectedSkuComb);
    },
    changepro(propValue, selectedProp, selectedSkuComb) {
      console.log(propValue, selectedProp, selectedSkuComb);
    },
    onBuyClicked() {
      console.log("购买");
    },
    onAddCartClicked() {
      // 加入购物车   接口  用户id   商品id 商店id  数量
      this.axios
        .post(
          "https://api.ymduo.com/cart/add",
          this.$qs.stringify({
            user_id: 956519,
            shop_id: this.infoData.storeInfo.store_id,
            goods_id: this.infoData.goods_id,
            sku_id: "",
            goods_num: this.num,
            active_type: 0
          })
        )
        .then(res => {
          console.log(res);
        });
    },
    showSku() {
      this.show = true;
    },
    yulan(index) {
      this.$ImagePreview({
        images: this.bannerlist,
        startPosition: index,
        onClose() {
          // do something
        }
      });
    }
  },
  created() {
    // 获取列表页传来的 参数
    this.$store.commit("getNum");
    this.pid = this.$route.params.pid;
    console.log(typeof this.pid);
    this.axios({
      url: "https://api.ymduo.com/item/index",
      method: "get",
      params: {
        gid: this.pid
      }
    }).then(res => {
      console.log(res);
      this.bannerlist = res.data.result.data.image;
      console.log(this.bannerlist);
      this.infoData = res.data.result.data;
      const attr = [];
      this.goods.picture = res.data.result.data.image[0];
      res.data.result.data.attr.forEach((item, index) => {
        console.log(item);
        var val = item.attr_values.split(","); //[红色,蓝色]
        const myval = val.map((item, index) => {
          return { id: "1000" + index, name: item };
        });
        console.log("val---" + myval);
        attr.push({
          k: item.attr_name,
          v: myval,
          k_s: "s" + index
        });
      });
      console.log(attr);
      this.sku.tree = attr;
      console.log(this.sku.tree);
    });
  },
  mounted() {
    // // this.$store.dispatch("changeAfoot",false);
    // this.$store.dispatch("changeBfoot",false);
  }
};
</script>

<style lang="less" scoped>
.info_nav {
  display: flex;
  justify-content: space-around;
}
.my-swipe1 .van-swipe-item {
  color: #fff;
  font-size: 20px;
  height: 375px;
  text-align: center;
  background-color: #39a9ed;
}
.van-goods-action-button {
  border-radius: 0;
}
.my-swipe1 .van-swipe-item img {
  width: 100%;
  height: 375px;
}
.price {
  display: flex;
  justify-content: space-between;
  span:nth-child(1) {
    color: red;
    font-size: 18px;
    line-height: 49px;
  }
  span:nth-of-type(2) {
    height: 49px;
    display: flex;
    flex-direction: column;
  }
}
.pname {
  height: 72px;
  line-height: 23px;
  font-weight: bold;
  font-size: 20px;
}
.des {
  height: 35px;
  line-height: 17px;
  color: darkgrey;
}
</style>
