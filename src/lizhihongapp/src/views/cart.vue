<template>
  <div class="cart">
    <!-- 头部标题跳转 -->
    <van-sticky>
      <headerBar :ishead="showHead" :title="myTitle"></headerBar>
    </van-sticky>
    <!-- 购物车没有商品 -->
    <showEmptyCart v-if="!isShowEmptyCart" :tipstext="tipsText"></showEmptyCart>
    <!-- 购物车有商品时 -->
    <div class="hasgoods" v-if="isShowEmptyCart">
      <!-- 收货地址信息及编辑商品 -->
      <div class="address-bar">
        <div class="address">
          <div v-show="!showDelView">
            <van-icon name="location" />
            <div class="text">北京市</div>
          </div>
        </div>
        <div class="btn" @click="editShop">{{ editText }}</div>
      </div>
      <!-- 购物车商品订单列表 -->
      <div class="goodslist" v-for="(item, index) in cartList" :key="index">
        <!-- 购物车店铺信息 -->
        <div class="shopstore">
          <van-checkbox
            v-model="isShopChecked[cartList.indexOf(item)]"
            checked-color="#e93b3d"
            @click="onCheckAll(item)"
          />
          <van-icon name="shop" size="20px" color="#9e9e9e" />
          <div class="title one-txt-cut">{{ item.shop[0].shop_name }} ></div>
        </div>
        <!-- 购物车商品信息 -->
        <div
          class="shopitem"
          v-for="(shopItem, shopIndex) in item.shop"
          :key="shopIndex"
        >
          <van-checkbox
            v-model="shopItem.is_checked"
            checked-color="#e93b3d"
            @click="onItemCheck(shopItem)"
          />
          <van-card
            :price="shopItem.current_price"
            :title="shopItem.goods_name"
            :thumb="shopItem.goods_pic"
          >
            <!-- 商品规格重选 -->
            <template #tags>
              <div class="sku-line">
                <div class="sku one-txt-cut">{{ shopItem.sku_attr }}</div>
                <van-icon name="arrow-down" />
              </div>
            </template>
            <!-- 商品数量选择 -->
            <template #num>
              <van-stepper
                v-model="shopItem.goods_num"
                input-width="30px"
                button-size="20px"
                async-change
                integer
                @change="onChangeNum(shopItem.goods_num, shopItem)"
              />
            </template>
            <!-- 商品操作 -->
            <template #footer>
              <span style="color:#999;margin-right:20px">移入关注</span>
              <span style="color:#999" @click="onDelete(shopItem)">删除</span>
            </template>
          </van-card>
        </div>
      </div>
      <!-- 提交订单导航 -->
      <van-submit-bar
        safe-area-inset-bottom
        label="总计∶"
        :price="totalPrice"
        :button-text="`去结算(${totalNum}件)`"
        :disabled="!(totalNum > 0)"
        @submit="onSubmit(isCheckGoods)"
        v-if="!showDelView"
      >
        <van-checkbox
          v-model="isCheckedAll"
          checked-color="#e93b3d"
          @click="onCheckAll(cartList)"
          ><span>全选</span></van-checkbox
        >
        <template #tip>
          你的收货地址不支持同城送,
          <span @click="onClickEditAddress">修改地址</span>
        </template>
      </van-submit-bar>
      <!-- 编辑商品时显示的控件 -->
      <van-submit-bar
        safe-area-inset-bottom
        button-text="删 除"
        @submit="onDelete"
        v-if="showDelView"
      >
        <template #default>
          <div class="editContent">
            <van-checkbox
              v-model="isCheckedAll"
              checked-color="#e93b3d"
              @click="onCheckAll(cartList)"
              ><span>全选</span></van-checkbox
            >
            <div class="delTips">移至收藏</div>
          </div>
        </template>
      </van-submit-bar>
    </div>
    <!-- 为你推荐 -->
    <recommend :floortitle="tjTitle" :recommlist="recommendList"></recommend>
    <!-- 一键置顶 -->
    <!-- <backTop></backTop> -->
  </div>
</template>

<script>
import Qs from "qs";
// 引入vuex
import { mapState } from "vuex";
// 引入空购物车或未登录的页面
import showEmptyCart from "views/cartcommon/noLogin";
import headerBar from "components/headerBar"; //引入头部导航
import Recommend from "components/recommend"; //引入推荐列表数据
// import backTop from "components/backTop"; //一键置顶
export default {
  name: "cart",
  components: {
    showEmptyCart,
    headerBar,
    Recommend
    // backTop
  },
  data() {
    return {
      uid: 956538, //用户登录id
      showHead: true,
      myTitle: "购物车",
      tjTitle:
        "https://img11.360buyimg.com/jdphoto/jfs/t1/31601/22/15554/14040/5cc2a86fEbdb1098b/88174b36f85283b6.png",
      tipsText: "去登录", //没有商品购物车显示按钮的文字
      value: 1, //改变shopnum的值
      cartList: [], //购物车店铺列表
      showDelView: false, //切换编辑页面
      editText: "编辑商品",
      totalPrice: 0, //总价
      totalNum: 0, //结算总数
      recommendList: [] //为你推荐商品
    };
  },
  computed: {
    // vuex的公共状态
    ...mapState(["userToken", "cartNum"]),
    // 显示空购物车的样式
    isShowEmptyCart() {
      let flag = false;
      let that = this;
      if (this.userToken) {
        if (this.cartNum > 0) {
          flag = true;
        } else {
          flag = false;
          that.tipsText = "去逛逛";
        }
      }
      return flag;
    },
    // 过滤已选中的商品
    isCheckGoods() {
      let checkArr = [];
      let num = 0;
      for (let i = 0; i < this.cartList.length; i++) {
        const shops = this.cartList[i].shop;
        for (let j = 0; j < shops.length; j++) {
          if (shops[j].is_checked) {
            checkArr[num++] = shops[j].id;
          }
        }
      }
      return checkArr;
    },
    // 购物车中的商品是否全选
    isCheckedAll: {
      get() {
        for (var i = 0; i < this.cartList.length; i++) {
          if (!this.isShopChecked[i]) {
            return false;
          }
        }
        return true;
      },
      // 这里要加一个空的setter，因为用v-model绑定时会报错
      set() {}
    },
    // 店铺中的商品是否全选
    isShopChecked() {
      let tempArr = [];
      for (var i = 0; i < this.cartList.length; i++) {
        tempArr[i] = true;
        let shops = this.cartList[i].shop;
        for (var j = 0; j < shops.length; j++) {
          if (!shops[j].is_checked) {
            tempArr[i] = false;
            break;
          }
        }
      }
      return tempArr;
    }
  },
  methods: {
    // 点击改变购物车数量
    onChangeNum(cutnum, item) {
      this.$toast.loading({ className: "myToast", forbidClick: true });
      setTimeout(() => {
        this.$toast.clear();
        const shopId = item.shop_id;
        const goodsId = item.goods_id;
        const skuId = item.sku_id;
        const goodsNum = cutnum;
        this.setShopNum(shopId, goodsId, skuId, goodsNum);
      }, 500);
    },
    // 编辑商品
    editShop() {
      this.showDelView = !this.showDelView;
      if (this.showDelView) {
        this.editText = "完成";
      } else {
        this.editText = "编辑商品";
      }
    },
    // 点击删除当前商品
    onDelete(item) {
      this.$Dialog
        .confirm({
          title: "O(∩_∩)O",
          message: "确认删除此商品吗？",
          cancelButtonText: "返回",
          confirmButtonText: "删除",
          confirmButtonColor: "#f2270c"
        })
        .then(() => {
          // on confirm
          let params = {};
          if (item) {
            params = {
              user_id: this.uid,
              shop_id: item.shop_id,
              goods_id: item.goods_id,
              sku_id: item.sku_id,
              pmid: item.pmid
            };
          } else {
            params = {
              user_id: this.uid
            };
          }
          this.axios
            .post("https://api.ymduo.com/cart/del", Qs.stringify(params))
            .then(res => {
              console.log(res);
              if (res.data.code == 200) {
                this.getShopCart();
                this.showDelView = false;
              } else if (res.data.code == 201) {
                this.$toast.fail(res.data.msg + ",请选择商品再删除!");
              }
            });
        })
        .catch(() => {
          // on cancel
        });
    },
    // 选中商品时触发
    onItemCheck(item) {
      const data = {
        goods_id: item.goods_id,
        sku_id: item.sku_id,
        shop_id: item.shop_id,
        is_checked: item.is_checked ? 0 : 1,
        pmid: item.pmid
      };
      this.getIsChecked(data).then(res => {
        if (res.data.code == 200) {
          this.getShopCart();
        }
      });
    },
    // 全选购物车或者单个店家
    onCheckAll(all) {
      // 参数all可传入shops数组或者shops数组内的一个对象
      // all传入shops数组表示购物车中商品全选
      // all传入一个对象表示某个店铺中商品全选
      if (all instanceof Array) {
        let bool = !this.isCheckedAll;
        const data = {
          is_checked: bool ? 1 : 0,
          check_all: 1
        };
        this.getIsChecked(data).then(res => {
          if (res.data.code == 200) {
            this.getShopCart();
          }
        });
      } else {
        var index = this.cartList.indexOf(all);
        var bool = !this.isShopChecked[index];
        const data = {
          is_checked: bool ? 1 : 0,
          shop_all: 1,
          shop_id: all.shop[0].shop_id
        };
        this.getIsChecked(data).then(res => {
          if (res.data.code == 200) {
            this.getShopCart();
          }
        });
      }
    },
    // 结算提交按钮
    onSubmit(id) {
      this.$toast.loading({ className: "myToast", forbidClick: true });
      setTimeout(() => {
        this.$toast.clear();
        if (id !== []) {
          this.$router.push({ name: "submitorder", query: { id } });
        }
      }, 500);
    },
    onClickEditAddress() {},
    // 是否选中状态
    getIsChecked(...args) {
      let params = {
        user_id: this.uid,
        ...args[0]
      };
      // console.log(params);
      return this.axios.post(
        "https://api.ymduo.com/cart/is_checked",
        Qs.stringify(params)
      );
    },
    // 获取购物车商品信息
    getShopCart() {
      if (this.uid) {
        this.axios
          .post(
            "https://api.ymduo.com/Cart/lists",
            Qs.stringify({
              user_id: this.uid
            })
          )
          .then(res => {
            // console.log(res);
            if (res.data.code == 200) {
              let arr = res.data.result.data.info;
              arr.forEach(ele => {
                ele.shop.forEach(item => {
                  if (item.is_checked == "0") {
                    return (item.is_checked = false);
                  } else {
                    return (item.is_checked = true);
                  }
                });
              });
              this.cartList = arr;
              this.totalPrice = Number(res.data.result.data.total_price * 100);
              this.totalNum = res.data.result.data.total_num;
              this.$store.commit("getCartNum");
            }
          });
      }
    },
    // 加减按钮调用公用数据
    setShopNum(shopId, goodsId, skuId, goodsNum) {
      this.axios
        .post(
          "https://api.ymduo.com/Cart/update",
          Qs.stringify({
            user_id: this.uid,
            shop_id: shopId,
            goods_id: goodsId,
            sku_id: skuId,
            goods_num: goodsNum
          })
        )
        .then(res => {
          if (res.data.code == 200) {
            this.getShopCart();
          }
        });
    },
    // 请求为你推荐商品数据
    getRcommendData() {
      this.$axios({
        method: "post",
        url: "https://api.ymduo.com/Interface/recommendlists",
        data: Qs.stringify({
          pf: 1,
          p: 8
        }),
        timeout: 10000
      }).then(res => {
        this.recommendList = res.data.result.data;
      });
      // 另一套数据接口
      // this.axios({
      //   method: "get",
      //   url: "/recommData",
      //   timeout: 20000
      // }).then(res => {
      //   // console.log(res);
      //   this.recommendList = res.data.data;
      // });
    }
  },
  created() {
    // 调用方法获取购物车数据
    this.getShopCart();
    // 调用方法获取为你推荐商品
    this.getRcommendData();
  }
};
</script>

<style lang="less" scoped>
.cart {
  width: 100%;
  margin-bottom: 20vh;
  .van-nav-bar {
    .van-icon {
      font-size: 24px;
      color: #252525;
    }
  }
  .hasgoods {
    .address-bar {
      width: 100%;
      height: 45px;
      line-height: 45px;
      color: #333;
      box-sizing: border-box;
      overflow: hidden;
      padding: 0 10px;
      border-radius: 0 0 10px 10px;
      background: #fff;
      display: flex;
      .address {
        flex: 1;
        color: #999;
        margin-right: 10px;
        padding-left: 18px;
        white-space: nowrap;
        overflow: hidden;
        font-size: 14px;
        position: relative;
        .van-icon {
          position: absolute;
          top: 50%;
          left: 0;
          font-size: 16px;
          transform: translateY(-50%);
        }
        .text {
          max-width: 100%;
          display: inline-block;
          vertical-align: top;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .btn {
        flex-shrink: 0;
        padding-left: 10px;
        font-size: 14px;
        color: #333;
      }
    }
    .goodslist {
      margin: 15px 0;
      border-radius: 10px;
      background: #fff;
      overflow: hidden;
      .shopstore {
        min-height: 46px;
        color: #333;
        box-sizing: border-box;
        position: relative;
        display: flex;
        align-items: center;
        padding: 5px 10px 5px 42px;
        min-height: 46px;
        z-index: 1;
        .van-checkbox {
          position: absolute;
          left: 3%;
        }
        .title {
          box-sizing: border-box;
          font-size: 16px;
          font-weight: 700;
          margin: 0 10px 0 5px;
          width: 100%;
        }
      }
      .shopitem {
        overflow: hidden;
        color: #333;
        position: relative;
        .van-checkbox {
          position: absolute;
          top: 40%;
          transform: translateY(-60%);
          left: 3%;
          z-index: 10;
        }
        .van-card {
          padding-left: 40px;
          padding-bottom: 10px;
          background-color: #fff;
          .van-card__header {
            .van-card__content {
              .van-card__title {
                font-size: 14px;
                word-break: break-all;
                margin-bottom: 5px;
              }
              .sku-line {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin: 5px 5px 0 0;
                padding-right: 5px;
                font-size: 10px;
                background: #f7f7f7;
                .sku {
                  padding: 0 15px 0 5px;
                  height: 20px;
                  line-height: 20px;
                  color: #666;
                  flex: 1;
                  border-radius: 2px;
                }
              }
              .van-card__bottom {
                .van-card__price {
                  color: #f2270c;
                }
              }
            }
          }
          .van-card__footer {
            margin: 15px 0 20px;
          }
        }
      }
    }
    .van-submit-bar {
      margin: 0 auto;
      background: hsla(0, 0%, 100%, 0.95);
      color: #333;
      font-size: 14px;
      position: fixed;
      left: 0;
      right: 0;
      bottom: 7.3vh;
      box-shadow: 0 -2px 5px 0px #e0dede inset;
      .van-submit-bar__bar {
        padding: 0 8px;
        .van-checkbox {
          display: flex;
          flex-direction: column;
          span {
            font-size: 12px;
            color: #999;
          }
        }
        .van-submit-bar__text {
          font-weight: 700;
          font-size: 16px;
          line-height: 1em;
          height: 1em;
          overflow: hidden;
          .van-submit-bar__price {
            font-weight: 700;
            color: #f2270c;
          }
        }
        .van-button {
          font-weight: 700;
          font-size: 14px;
          .van-button__text {
            white-space: nowrap;
          }
        }
        .editContent {
          flex: 1;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .delTips {
            box-sizing: border-box;
            border: 1px solid #ccc;
            width: 76px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            font-size: 14px;
            border-radius: 15px;
            background-color: #fff;
            color: #333;
            margin: 6px 10px 0 0;
          }
        }
      }
    }
  }
}
</style>
