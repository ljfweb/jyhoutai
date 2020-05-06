<template>
  <div class="box">
    <!-- 头部 -->
    <div class="top">
      <div class="top_left">
        <van-icon name="arrow-left" @click="turn" />
      </div>
      <ul class="top_center">
        <li>商品</li>
        <li>评价</li>
        <li>详情</li>
        <li>推荐</li>
      </ul>
      <div class="top_right">
        <van-icon name="ellipsis" />
      </div>
    </div>
    <!-- 轮播图片 -->
    <div class="InfoLoop">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(item,index) in goodsInfo.images" :key="index">
          <img v-lazy="item" @click="big(index)" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 价格 -->
    <div class="price">
      <div class="price_left">
        <ul>
          <li>${{goodsInfo.price}}</li>
          <li>$998</li>
          <li>粉丝价</li>
        </ul>
      </div>
      <div class="price_right">
        <ul>
          <li>
            <van-icon name="gold-coin-o" />
          </li>
          <li>降价提醒</li>
        </ul>
        <ul>
          <li>
            <van-icon name="star-o" />
          </li>
          <li>收藏</li>
        </ul>
      </div>
    </div>
    <!-- 说明 -->
    <div class="goodsName">{{goodsInfo.title}}</div>
    <!-- 底部购物 -->
    <van-goods-action class="indNav">
      <van-goods-action-icon class="one" icon="chat-o" text="客服" />
      <van-goods-action-icon class="two" icon="cart-o" text="购物车" />
      <van-goods-action-button type="warning" text="加入购物车" @click="onClickButtonBuy(id)"/>
      <van-goods-action-button type="danger" text="立即购买"  @click="toenorder()"/>
    </van-goods-action>

    <!-- 图片放大 -->
    <van-image-preview v-model="show" :images="goodsInfo.images" @change="onChange(index)">
      <template v-slot:index>第{{ index }}页</template>
    </van-image-preview>
    <!-- 点击购买弹出 -->
    <van-sku
      v-model="Buy"
      :sku="sku"
      :goods="goods"
      :goods-id="goodsId"
      :quota="quota"
      :quota-used="quotaUsed"
      :hide-stock="sku.hide_stock"
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
      id: "",
      goodsInfo: [],
      dataname: "",
      show: false,
      index: 0,
      Buy: false,
      goodsId: "",
      quota: 6,
      quotaUsed: 1,
      sku: {
        // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
        // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
        tree: [
          {
            k: "颜色", // skuKeyName：规格类目名称
            v: [
              {
                id: "30349", // skuValueId：规格值 id
                name: "红色", // skuValueName：规格值名称
                
              },
              {
                id: "1215",
                name: "蓝色",
               
              }
            ],
            k_s: "s1" // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
          }
        ],
        // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
        list: [
          {
            id: 2259, // skuId，下单时后端需要
            price: 100, // 价格（单位分）
            s1: "1215", // 规格类目 k_s 为 s1 的对应规格值 id
            s2: "30349", // 规格类目 k_s 为 s2 的对应规格值 id
            s3: "0", // 最多包含3个规格值，为0表示不存在该规格
            stock_num: 110 // 当前 sku 组合对应的库存
          }
        ],
        price: "66.00", // 默认价格（单位元）
        stock_num: 227, // 商品总库存
        collection_id: 2261, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
        none_sku: false, // 是否无规格商品
        
        hide_stock: false // 是否隐藏剩余库存
      },
      goods: {
        // 默认商品 sku 缩略图
        picture: "//vueshop.glbuys.com/uploadfiles/1524555954.jpg"
      },
      initialSku: {
        // 键：skuKeyStr（sku 组合列表中当前类目对应的 key 值）
        // 值：skuValueId（规格值 id）
        s0: "10000",
        s1: "10001",
        // 初始选中数量
        selectedNum:1,
        // 初始选中的商品属性
        // 键：属性id
        // 值：属性值id列表
        selectedProp: {
          123: [1222]
        }
      },
     customStepperConfig: {
  // 自定义限购文案
  quotaText: '每次限购5件',
  // 自定义步进器超过限制时的回调
  handleOverLimit: (data) => {
    const { action, startSaleNum } = data;

    if (action === 'minus') {
      this.$Toast(startSaleNum > 1  ? `${startSaleNum}件起售` : '至少选择一件商品');
    } else if (action === 'plus') {
      // const { LIMIT_TYPE } = Sku.skuConstants;
     
        this.$Toast('库存不够了');
     
    }
  },
  // 步进器变化的回调
  handleStepperChange: currentValue => {
    console.log(currentValue)
  },
  // 库存
  stockNum: 1999,
  // 格式化库存
  stockFormatter: stockNum => {
    console.log(stockNum)
  },
}
    };
  },

  mounted() {
    console.log(this.$route.params);
    this.id = this.$route.params.id;
    this.dataname = this.$route.params.home;
    console.log(this.dataname);

    this.ShowInfo(this.id);
  },
  methods: {

    
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
      console.log("添加购物车")
    },
    ShowInfo(id) {
      this.axios
        .get(
          `http://vueshop.glbuys.com/api/home/goods/info?gid=${id}&type=details&token=1ec949a15fb709370f`
        )
        .then(res => {
          console.log(res);
          this.goodsInfo = res.data;
          console.log(this.goodsInfo);
        });
    },
    ShowInfoTo(gid) {
      this.axios
        .get(
          `http://vueshop.glbuys.com/api/home/goods/info?gid=${gid}&type=spec&token=1ec949a15fb709370f`
        )
        .then(res => {
          console.log(res);
        });
    },
    // 返回上一页
    turn() {
      this.$router.go(-1);
    },
    //点击加入购物车
    onClickButtonBuy(id) {
      this.$Toast("点击按钮");
      console.log(id);
      this.ShowInfoTo(id);
      this.goodsId = id;
      this.Buy = true;
       this.axios
        .get(
          `http://vueshop.glbuys.com/api/goods/fav?uid=696443691&gid=286026274&token=1ec949a15fb709370f`
        )
        .then(res => {
          console.log(res);
        });

    },
    toenorder(){
       this.$router.push({
         name:'ensureorder',
         params:{
           
         }
       })
    },
    onChange(index) {
      this.index = index;
    },
    //点击图片变大成预览图
    big(index) {
      this.index = index;
      this.show = true;
    }
  }
};
</script>

<style lang="less" scope>
.info_nav {
  display: flex;
  justify-content: space-around;
}
.box {
  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 44px;
    background-color: white;
    border-bottom: 1px solid #ccc;
    .top_left {
      width: 40px;
      height: 44px;
      line-height: 44px;
      text-align: center;
      font-size: 20px;
      .van-icon {
        vertical-align: top;
        line-height: 44px;
      }
    }
    .top_center {
      width: 235px;
      display: flex;
      justify-content: space-around;
      align-content: center;
      font-size: 16px;
    }
    .top_right {
      width: 40px;
      height: 44px;
      line-height: 44px;
      text-align: center;
      font-size: 20px;
      .van-icon {
        vertical-align: top;
        line-height: 44px;
      }
    }
  }
  // 轮播图
  .InfoLoop {
    width: 100%;
    height: 375px;
    .my-swipe {
      width: 100%;
      height: 100%;
      line-height: 20px;
      text-align: center;
      .van-swipe__track {
        .van-swipe-item {
          background: none;

          img {
            height: 375px;
          }
        }
      }
    }
  }
  // 价格部分
  .price {
    width: 94%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin: 0 auto;
    .price_left {
      width: 52%;
      height: 100%;
      ul {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        padding-top: 16px;
        box-sizing: border-box;

        li:first-child {
          color: red;
          font-size: 24px;
          font-weight: 600;
        }
        li:nth-child(2) {
          color: #714aff;
          font-size: 16px;
          height: 32px;
          padding-top: 8px;
          box-sizing: border-box;
        }
        li:last-child {
          display: inline-block;
          width: 32px;
          height: 14px;
          color: white;
          background-color: #714aff;
          font-size: 5px;
          text-align: center;
          margin-top: 4px;
        }
      }
    }
    .price_right {
      width: 30%;
      height: 100%;
      display: flex;
      justify-content: space-evenly;
      ul {
        padding-top: 5px;
        box-sizing: border-box;
        width: 50%;
        height: 100%;
        text-align: center;

        li:first-child {
          width: 100%;
          line-height: 25px;
          font-size: 14px;
        }
      }
    }
  }
  // 商品介绍
  .goodsName {
    margin-top: 20px;
    padding: 0 10px;
    box-sizing: border-box;
    font-size: 16px;
    font-weight: 600;
  }
  //底部导航购物
  .indNav {
    .one {
      height: 100%;
      .van-icon {
        height: 50%;
      }
    }
    .two {
      height: 100%;
      .van-icon {
        height: 50%;
      }
    }
  }
}
.van-popup{
  .van-icon{
    width: 30px;
    height: 30px;
  }
}
</style>
