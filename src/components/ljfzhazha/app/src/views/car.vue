<template>
  <div class="car">

    <van-nav-bar title="购物车"
                 right-text="···"
                 left-arrow
                 @click-left="back" />
    <div class="address">
      <span>
        <van-icon name="location-o" />昌平区</span> <span @click="delall">删除选中</span>
    </div>
    <div class="shop_goods"
         v-for="(item,index) in shoparr"
         :key="index">
      <div class="shop">
        <van-checkbox v-model="item.shopall"
                      @click="shopclick(item.shopall,item)"></van-checkbox>

        <span>
          <van-icon name="shop-o"
                    class="biao" />{{item.shop[0].shop_name}}</span>
      </div>
      <div class="goodsall">
        <van-swipe-cell v-for="(ite,inde) in item.shop"
                        :key="inde">
          <div class="goods">
            <van-checkbox v-model="ite.is_checked"
                          @change="goodsclick(ite.is_checked,ite)"></van-checkbox>
            <dl class="de1">
              <dt><img :src="ite.goods_pic"></dt>
              <dd>
                <div class="van-multi-ellipsis--l2">
                  {{ite.goods_name}}
                </div>
              </dd>
              <dd>
                <span>¥{{ite.current_price}}</span>
                <van-stepper v-model="ite.goods_num"
                             @change="bianshu(ite)"
                             @overlimit="del(ite)" />
              </dd>
            </dl>
          </div>
          <template #right>
            <van-button square
                        text="删除"
                        type="danger"
                        class="delete-button"
                        @click="del(ite,5)" />
          </template>
        </van-swipe-cell>
      </div>
      <van-submit-bar :price="3050"
                      button-text="提交订单"
                      @submit="onSubmit">
        <van-checkbox v-model="checked"
                      @click=" checkAll (2)">全选</van-checkbox>
      </van-submit-bar>
    </div>
  </div>
</template>
<script>
export default {
  name: "car",
  data () {
    return {
      checked: false,
      shoparr: [],
      goodscheck: "",
      delfou: "",
      shanchu: false,
      qushan: false
    }
  },
  methods: {
    //删除商品
    del (ite, ke) {
      this.delfou = ke ? "确定删除此商品吗" : "此物品数量已经最低，是否删除"
      this.$Dialog.confirm({
        message: this.delfou,
      }).then(() => {
        this.shanchu = true
        this.axios({
          url: "https://api.ymduo.com/cart/del",
          method: "post",
          data: this.$qs.stringify({
            user_id: 956551,
            shop_id: ite.shop_id,
            goods_id: ite.goods_id,
            sku_id: 0,
            pmid: 0
          })
        }).then(res => {
          console.log(res)
          this.commenthan(res.data.result.data.info)
          this.$store.commit("dibu")
        })
      }).catch(() => {
        this.$Toast.fail("不删除，真有钱")
      });

    },
    //批量删除
    delall () {
      if (this.qushan) {
        this.shanchu = true
        this.axios({
          url: "https://api.ymduo.com/cart/del",
          method: "post",
          data: this.$qs.stringify({
            user_id: 956551,
          })
        }).then(res => {
          console.log(res)
          this.commenthan(res.data.result.data.info)
          this.$store.commit("dibu")
          this.$Toast.fail("你非要删,我这次不会提醒你")
        })
      } else {
        this.$Toast.fail("你没选中商品,删个屁")
      }


    },
    //改变商品数量
    bianshu (ite) {
      if (!this.shanchu) {
        this.axios({
          url: "https://api.ymduo.com/Cart/update",
          method: "post",
          data: this.$qs.stringify({
            user_id: 956551,
            shop_id: ite.shop_id,
            goods_id: ite.goods_id,
            sku_id: 0,
            goods_num: ite.goods_num
          })
        }).then(res => {
          console.log(ite.goods_id)
          this.commenthan(res.data.result.data.info)
          this.$store.commit("dibu")
        })
      } else {
        this.shanchu = false
      }
    },
    //点击返回
    back () {
      this.$router.go(-1)
    },
    //点击全选框
    checkAll (ii) {
      if (ii) {
        this.checked = !this.checked
      }
      var check = this.checked ? "1" : "0";
      this.axios({
        url: "https://api.ymduo.com/cart/is_checked",
        method: "post",
        data: this.$qs.stringify({
          user_id: 956551,
          check_all: 1,
          is_checked: check
        })
      }).then(res => {
        this.commenthan(res.data.result.data.info)
      })
    },
    onSubmit () {

    },
    //点击商店选框
    shopclick (checked, item) {
      var check = checked ? "0" : "1";
      this.axios({
        url: "https://api.ymduo.com/cart/is_checked",
        method: "post",
        data: this.$qs.stringify({
          user_id: 956551,
          shop_id: item.shop[0].shop_id,
          is_checked: check,
          shop_all: 1
        })
      }).then(res => {
        this.commenthan(res.data.result.data.info)
      })
    },

    //点击商品选框
    goodsclick (checked, ite) {
      var check = checked ? "1" : "0";
      this.axios({
        url: "https://api.ymduo.com/cart/is_checked",
        method: "post",
        data: this.$qs.stringify({
          user_id: 956551,
          goods_id: ite.goods_id,
          sku_id: 0,
          shop_id: ite.shop_id,
          is_checked: check,
          pmid: 0,
        })
      }).then(res => {
        this.commenthan(res.data.result.data.info)
      })
    },

    //点击商品选框函数
    commenthan (data) {
      this.shoparr = [];
      var ff = true
      var qunashan = false
      data.forEach(element => {
        var flag = true;
        element.shop.forEach(item => {
          item.is_checked == 1 ? item.is_checked = true : item.is_checked = false
          if (item.is_checked != "1") {
            flag = false//为商品选中做准备
            ff = false//为全选做准备
          } else {
            qunashan = true
          }
        })
        //为商店选中做准备
        element.shopall = flag;
        //为渲染页面
        this.shoparr.push(element)
      });
      //为全选做准备
      if (ff) {
        this.checked = true;
      } else {
        this.checked = false;
      }
      //为批量删除做准备
      if (qunashan) {
        this.qushan = true;
      } else {
        this.qushan = false;
      }
    }
  },
  created () {
    this.axios.post("https://api.ymduo.com/Cart/lists",
      this.$qs.stringify({
        user_id: 956551
      })
    ).then(res => {
      this.commenthan(res.data.result.data.info)
    })
  },


}
</script>
<style scoped lang="less">
.delete-button {
  height: 120px;
}
.van-nav-bar__text {
  font-size: 30px;
}
.van-submit-bar {
  bottom: 50px;
  opacity: 0.9;
}
.goods {
  display: flex;
  justify-content: end;
  align-items: center;
}
.shop {
  height: 45px;
  display: flex;
  justify-content: end;
  line-height: 45px;
}
.car {
  background: #f1f1f1;
  margin-bottom: 100px;
}
.address {
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0 15px;
  line-height: 45px;
  background: white;
  font-size: 14px;
  color: #999;
}
.shop_goods {
  margin-top: 15px;
  background: white;
  width: 100%;
  box-sizing: border-box;
  padding: 0 15px;
  .shop {
    span {
      margin-left: 10px;
      font-size: 16px;
      font-weight: 600;
      .biao {
        font-size: 22px;
        color: #999;
        vertical-align: -5px;
        margin-right: 4px;
      }
    }
  }
}
.de1 {
  height: 120px;
  width: 90%;
  margin-left: 10px;
  box-sizing: border-box;
  padding-top: 10px;
  dt {
    height: 100px;
    width: 30%;
    float: left;
    img {
      height: 100%;
      width: 100%;
    }
  }
  dd {
    display: flex;
    margin: 10px 0 20px 110px;
    width: 60%;
    line-height: 20px;
    color: #333;
    font-size: 14px;
    justify-content: space-between;
    align-items: center;
    span {
      color: red;
      font-size: 16px;
    }
  }
}
</style>
