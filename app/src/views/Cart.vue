<template>
  <div class="cart">
    <van-nav-bar title="购物车"
                 left-arrow
                 @click-left="onClickLeft">
      <template #right>
        <!-- <van-icon name="more-o" size="30" /> -->
        <span @click="delChooseGoods"
              class="delChooseCla">删除选中商品</span>
      </template>
    </van-nav-bar>

    <div class="content"
         v-if="!nullCartFlag">
      <div class="storeCla"
           v-for="(item, index) in shopList"
           :key="index">
        <div class="shopCla">
          <van-checkbox v-model="item.storeCheck"
                        checked-color="red"
                        @click="isCheckedChoose(item, 'store')"></van-checkbox>
          <h1>{{ item.shop[0].shop_name }}</h1>
        </div>
        <div class="goodsCla"
             v-for="(ele, i) in item.shop"
             :key="i">
          <van-swipe-cell>
            <!-- <template #left> -->
            <div class="flexContent">
              <van-checkbox v-model="ele.is_checked"
                            checked-color="red"
                            @click="isCheckedChoose(ele, 'goods')"></van-checkbox>
              <!-- </template> -->

              <van-card :price="ele.current_price"
                        :title="ele.goods_name"
                        :thumb="ele.goods_pic">
                <template #num>
                  <van-stepper v-model="ele.goods_num"
                               @plus="plusAdd(ele.goods_num, ele)"
                               @minus="minus(ele.goods_num, ele)" />
                </template>

                <!-- <template #footer>
                <van-button size="mini">删除</van-button>
              </template> -->
              </van-card>
            </div>
            <template #right>
              <van-button square
                          text="删除"
                          type="danger"
                          class="delete-button"
                          @click="del(ele)" />
            </template>
          </van-swipe-cell>
        </div>
      </div>
    </div>
    <van-submit-bar :price="totalPrice"
                    :button-text="'提交订单' + '(' + cartNum + ')'"
                    @submit="onSubmit"
                    v-if="!nullCartFlag">
      <van-checkbox v-model="checkedAll"
                    checked-color="red"
                    @click="isCheckedChoose(checkedAll, 'all')">全选</van-checkbox>
    </van-submit-bar>
    <div v-if="nullCartFlag"
         class="nullCartCla">购物车空空如也,去逛逛吧~</div>
  </div>
</template>
<script>
export default {
  name: "cart",
  data () {
    return {
      radio: 0,
      result: [],
      stepperVal: 1,
      shopList: [],
      checkedAll: 1,
      totalPrice: 0,
      submitData: [],
      cartNum: 0,
      nullCartFlag: false
    };
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1);
    },
    // 提交订单
    onSubmit () {
      this.axios
        .post(
          "https://api.ymduo.com/order/order_confirm",
          this.$qs.stringify({
            userid: 956532,
            cart_id: this.submitData.toString(),
            use_balance: 1,
            use_integral: 1
          })
        )
        .then(res => {
          // console.log(res)
          if (res.data.code == "202") {
            this.$Toast.fail(res.data.msg);
            this.$router.push("/cart");
          } else {
            this.$router.push({
              name: "orderConfirm",
              params: {
                allGoods: res.data.result.data,
                confirmData: this.submitData.toString()
              }
            });
          }
        });
    },
    // 删除选中商品
    delChooseGoods () {
      console.log("删除选中商品");
      this.$Dialog
        .confirm({
          message: "确认要删除选中商品?"
        })
        .then(() => {
          this.axios
            .post(
              "https://api.ymduo.com/cart/del",
              this.$qs.stringify({
                user_id: 956532
              })
            )
            .then(res => {
              console.log(res.data);
              this.getList();
            });
        })
        .catch(() => { });
    },

    // 步数变化时触发的事件
    onChange (value, ele) {
      ele.goods_num++
      value++
      console.log("步数变化时", value, ele);
      this.axios
        .post(
          "https://api.ymduo.com/Cart/update",
          this.$qs.stringify({
            user_id: ele.user_id,
            shop_id: ele.shop_id,
            goods_id: ele.goods_id,
            sku_id: ele.sku_id,
            goods_num: ele.goods_num
          })
        )
        .then(res => {
          console.log("aaa", res);
          // 重新获取list
          this.getList();
        });
    },
    plusAdd (value, ele) {
      ele.goods_num++
      this.updateNum(ele)

    },
    minus (value, ele) {
      ele.goods_num--
      this.updateNum(ele)
    },
    // 修改商品数量
    updateNum (ele) {
      this.axios
        .post(
          "https://api.ymduo.com/Cart/update",
          this.$qs.stringify({
            user_id: ele.user_id,
            shop_id: ele.shop_id,
            goods_id: ele.goods_id,
            sku_id: ele.sku_id,
            goods_num: ele.goods_num
          })
        )
        .then(res => {
          console.log(res);
          // 重新获取list
          this.getList();
        });
    },
    // 删除
    del (ele) {
      console.log("del", ele);
      this.$Dialog
        .confirm({
          message: "确认要删除此商品?"
        })
        .then(() => {
          this.axios
            .post(
              "https://api.ymduo.com/cart/del",
              this.$qs.stringify({
                user_id: 956532,
                shop_id: ele.shop_id,
                goods_id: ele.goods_id,
                sku_id: ele.sku_id,
                pmid: ele.pmid
              })
            )
            .then(res => {
              console.log(res.data);
              this.getList();
            });
        })
        .catch(() => { });
    },
    // 复选框点击
    isCheckedChoose (item, type) {
      console.log(item, type);
      var reqData = {};
      if (type == "store") {
        reqData = {
          user_id: 956532,
          is_checked: Number(!item.storeCheck),
          shop_all: 1,
          shop_id: item.shop[0].shop_id
        };
      } else if (type == "goods") {
        reqData = {
          user_id: 956532,
          goods_id: item.goods_id,
          sku_id: item.sku_id,
          shop_id: item.shop_id,
          is_checked: Number(!item.is_checked),
          pmid: 0
        };
      } else {
        reqData = {
          user_id: 956532,
          check_all: 1,
          is_checked: Number(!this.checkedAll)
        };
      }
      this.axios
        .post(
          "https://api.ymduo.com/cart/is_checked",
          this.$qs.stringify(reqData)
        )
        .then(res => {
          console.log(res);
          var info = res.data.result.data.info;
          let checkedAll = true; //全选框
          info.forEach(item => {
            let storeCheck = true; //店铺选框
            item.shop.forEach(goods => {
              // 判断商品是否选中
              goods.is_checked = goods.is_checked == "0" ? false : true;
              //未选中
              if (!goods.is_checked) {
                storeCheck = false;
                checkedAll = false;
                // console.log("aaa", this.submitData.indexOf(goods.id))
                //确认订单的goodsid是否存在,存在删除
                if (this.submitData.indexOf(goods.id) >= 0) {
                  this.submitData = this.submitData.splice(
                    this.submitData.indexOf(goods.id),
                    1
                  );
                }
              } else {
                // 确认订单的选中的cartId
                if (this.submitData.indexOf(goods.id) == -1) {
                  this.submitData = this.submitData.concat(goods.id);
                }
              }
            });
            item.storeCheck = storeCheck;
            this.checkedAll = checkedAll;
          });
          this.shopList = res.data.result.data.info;
          this.totalPrice = Number(res.data.result.data.total_price * 100);
          this.cartNum = res.data.result.data.total_num;

          // console.log("确认订单的id",this.submitData)
        });
    },
    // 获取购物车数据列表
    getList () {
      this.axios
        .post(
          "https://api.ymduo.com/Cart/lists",
          this.$qs.stringify({
            user_id: 956532
          })
        )
        .then(res => {
          console.log(res);
          var info = res.data.result.data.info;
          // 判断购物车是否有数据
          if (info.length == 0) {
            this.nullCartFlag = true;
          } else {
            info.forEach(item => {
              let storeCheck = true;
              item.shop.forEach(goods => {
                goods.is_checked = goods.is_checked == "0" ? false : true;
                if (!goods.is_checked) {
                  storeCheck = false;
                  this.checkedAll = false;
                } else {
                  this.submitData = this.submitData.concat(goods.id);
                }
              });
              item.storeCheck = storeCheck;
            });
            this.shopList = res.data.result.data.info;
            this.totalPrice = Number(res.data.result.data.total_price * 100);
            this.cartNum = res.data.result.data.total_num;
          }
        });
    }
  },
  created () {
    this.getList();
  },
  // 修改删除样式
  updated () {
    document.getElementsByClassName("delete-button").forEach(item => {
      item.style.height = "112px";
    });
  }
};
</script>

<style lang="less" scoped>
.cart {
  .van-nav-bar {
    position: sticky;
    top: 0;
    .delChooseCla {
      color: red;
      border: 1px solid;
    }
  }
}
.content {
  box-sizing: border-box;
  background-color: #ddd;
  padding-top: 13px;
  margin-bottom: 100px;
}
.content .storeCla {
  margin-bottom: 13px;
}
.goodsCla .flexContent {
  display: flex;
  background-color: white;
  padding: 0 10px;
  width: 100%;
  .van-checkbox {
    width: 42px;
    height: 46px;
    .van-checkbox__icon {
      margin: auto;
    }
  }
  .van-card {
    width: 330px;
    background-color: white;
  }
  .delete-button {
    height: 112px;
  }
}
.shopCla {
  padding: 0 10px;
  width: 100%;
  height: 46px;
  display: flex;
  background-color: white;

  .van-checkbox {
    width: 42px;
    height: 46px;
    .van-checkbox__icon {
      margin: auto;
    }
  }
  h1 {
    width: 330px;
    height: 46px;
    line-height: 46px;
    font-size: 20px;
    padding-left: 10px;
    letter-spacing: 3px;
  }
}
.nullCartCla {
  text-align: center;
  line-height: 400px;
}
.van-submit-bar {
  bottom: 60px;
}
</style>
