<template>
  <div class="detailsku">
    <!-- 商品规格 -->
    <van-sku
      v-model="showSku"
      :sku="sku"
      :goods="goods"
      :goods-id="goodsId"
      :quota="quota"
      :quota-used="quotaUsed"
      :hide-stock="sku.hide_stock"
      :close-on-click-overlay="true"
      safe-area-inset-bottom
      show-add-cart-btn
      reset-stepper-on-hide
      @buy-clicked="onBuyClicked"
      @add-cart="onAddCartClicked"
    ></van-sku>
  </div>
</template>

<script>
import Qs from "qs";
export default {
  name: "detailsku",
  data() {
    return {
      uid: 956538, //用户id
      skuid: null, //规格id
      detaildata: {}, //商品详情
      showSku: false, //弹出sku
      goodsId: 23444, //商品id
      quota: 0, //限购数量 0表示不限购
      quotaUsed: 345, //已经购买过的数量
      sku: {
        // 规格数据
        tree: [
          {
            k: "颜色", // skuKeyName：规格类目名称
            k_id: 1,
            v: [
              {
                id: "1214", // skuValueId：规格值 id
                name: "红色", // skuValueName：规格值名称
                imgUrl:
                  "http://t00img.yangkeduo.com/goods/images/images/2019-10-05/a886e0b1-f10d-46bd-bc5c-9ca19f9cbc09.jpg", // 规格类目图片，只有第一个规格类目可以定义图片
                previewImgUrl:
                  "http://t00img.yangkeduo.com/goods/images/images/2019-10-05/a886e0b1-f10d-46bd-bc5c-9ca19f9cbc09.jpg" // 用于预览显示的规格类目图片
              },
              {
                id: "1215",
                name: "蓝色",
                imgUrl:
                  "http://t00img.yangkeduo.com/goods/images/images/2019-10-05/a886e0b1-f10d-46bd-bc5c-9ca19f9cbc09.jpg",
                previewImgUrl:
                  "http://t00img.yangkeduo.com/goods/images/images/2019-10-05/a886e0b1-f10d-46bd-bc5c-9ca19f9cbc09.jpg"
              }
            ],
            // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
            k_s: "s1"
          }
          // {
          //   k: "尺码",
          //   k_id: 2,
          //   v: [
          //     {
          //       id: "1194",
          //       name: "S码"
          //     },
          //     {
          //       id: "1195",
          //       name: "M码"
          //     },
          //     {
          //       id: "1196",
          //       name: "L码"
          //     }
          //   ],
          //   k_s: "s2"
          // }
        ],
        // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
        list: [
          //  红色规格
          /*{
            id: 2259, // skuId，下单时后端需要
            price: 100, // 价格（单位分）
            s1: "1214", // 规格类目 k_s 为 s1 的对应规格值 id
            s2: "1194", // 规格类目 k_s 为 s2 的对应规格值 id
            // s3: "0", // 最多包含3个规格值，为0表示不存在该规格
            stock_num: 110 // 当前 sku 组合对应的库存
          }
          {
            id: 2259,
            price: 129,
            s1: "1214",
            s2: "1195",
            stock_num: 130
          },
          {
            id: 2259,
            price: 129,
            s1: "1214",
            s2: "1196",
            stock_num: 130
          },
          // 蓝色规格
          {
            id: 2259,
            price: 129,
            s1: "1215",
            s2: "1194",
            stock_num: 130
          },
          {
            id: 2259,
            price: 129,
            s1: "1215",
            s2: "1195",
            stock_num: 130
          },
          {
            id: 2259,
            price: 129,
            s1: "1215",
            s2: "1196",
            stock_num: 130
          }*/
        ],
        price: "9.68-15.96", // 默认价格（单位元）
        stock_num: 227, // 商品总库存
        collection_id: 2261, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
        none_sku: false, // 是否无规格商品
        hide_stock: false //是否隐藏剩余商品库存
      },
      goods: {
        //商品信息
        title: "无线蓝牙耳机双耳单耳塞迷你入耳式运动vivo苹果oppo安卓手机通用",
        picture:
          "http://t00img.yangkeduo.com/goods/images/2019-10-26/757305fa0ef438882a0d3db39cebcda3.jpeg?imageMogr2/sharpen/1%7CimageView2/2/w/300/q/70/format/webp"
      }
    };
  },
  methods: {
    onBuyClicked(skuData) {
      if (this.$store.state.userToken) {
        this.$toast.loading({ className: "myToast", forbidClick: true });
        setTimeout(() => {
          this.$toast.clear();
          let data = {
            userid: this.uid,
            active_type: 0,
            goods_id: skuData.goodsId,
            sku_id: this.skuid,
            goods_num: skuData.selectedNum,
            use_balance: 0,
            use_integral: 0,
            use_auction_integral: 0,
            is_pei: 0,
            pf: 1
          };
          this.$router.push({ name: "submitorder", params: { data } });
        }, 300);
      } else {
        this.$router.push("/login");
      }
    },
    onAddCartClicked(skuData) {
      if (this.$store.state.userToken) {
        let params = {};
        if (skuData.selectedSkuComb !== undefined && this.detaildata) {
          this.axios
            .post(
              "https://api.ymduo.com/item/attr",
              Qs.stringify({
                gid: skuData.goodsId,
                attr: skuData.selectedSkuComb.name
              })
            )
            .then(res => {
              this.skuid = res.data.result.data[0].sku_id;
            });
          params = {
            user_id: this.uid,
            shop_id: this.detaildata.storeInfo.store_id,
            goods_id: skuData.goodsId,
            sku_id: this.skuid,
            goods_num: skuData.selectedNum,
            active_type: 0
          };
        } else if (this.detaildata) {
          params = {
            user_id: this.uid,
            shop_id: this.detaildata.storeInfo.store_id,
            goods_id: skuData.goodsId,
            goods_num: skuData.selectedNum,
            active_type: 0
          };
        }
        if (this.detaildata) {
          this.axios
            .post("https://api.ymduo.com/cart/add", Qs.stringify(params))
            .then(() => {
              // console.log(res);
              this.showSku = false;
              this.$toast.success("购物车添加成功");
              this.axios
                .post(
                  "https://api.ymduo.com/Home/Cart/cartnum",
                  Qs.stringify({
                    uid: this.uid
                  })
                )
                .then(res => {
                  if (res.data.code == 200) {
                    this.$emit("cartnum", res.data.result.data);
                  }
                });
            });
        }
      } else {
        this.$router.push("/login");
      }
    }
  }
};
</script>

<style lang="less" scoped>
.detailsku {
  width: 100%;
}
</style>
