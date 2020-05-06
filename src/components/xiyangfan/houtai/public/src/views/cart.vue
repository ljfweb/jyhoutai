<template>
  <div>
    <van-nav-bar title="购物车"
                 left-text="返回"
                 right-text="按钮"
                 left-arrow
                 @click-left="onClickLeft"
                 @click-right="onClickRight" />
    <div class="cart_wrap">
      <div class="shop"
           v-for="(item, index) in cartlist"
           :key="index">
        <div class="shop_title">
          <van-checkbox v-model="item.shop[item.shop.length - 1].shopall"
                        @change="ckshopall(item.shop[item.shop.length - 1].shopall, item)"></van-checkbox>
          <h2>
            {{ item.shop[0].shop_name }}
          </h2>
        </div>
        <div class="shop_list">
          <van-swipe-cell v-for="(goodsitem, gindex) in item.shop"
                          :key="gindex">
            <div class="shop_one">
              <van-checkbox v-model="goodsitem.is_checked"
                            @change="check(goodsitem.is_checked, goodsitem)"></van-checkbox>
              <img :src="goodsitem.goods_pic"
                   alt="" />
              <div class="goods_info">
                <div class="pname van-multi-ellipsis--l2">
                  {{ goodsitem.goods_name }}
                </div>
                <div class="sku">i7 1060 16g</div>
                <div class="price">
                  <span>{{ goodsitem.current_price }}</span>
                  <van-stepper @change="updatenum(goodsitem.goods_num, goodsitem)"
                               v-model="goodsitem.goods_num" />
                </div>
              </div>
            </div>
            <template #right>
              <van-button square
                          text="删除"
                          type="danger"
                          class="delete-button"
                          @click="del(goodsitem)" />
            </template>
          </van-swipe-cell>
        </div>
      </div>
    </div>
    <van-submit-bar :price="total_price"
                    :button-text="'去结算:(' + total_num + ')'"
                    @submit="onSubmit">
      <van-checkbox v-model="checked">全选</van-checkbox>
      <template #tip>
        你的收货地址不支持同城送,
        <span @click="onClickEditAddress">修改地址</span>
      </template>
    </van-submit-bar>
  </div>
</template>

<script>
export default {
  name: "cart",
  data () {
    return {
      checked: false,
      value: 1,
      cartlist: [],
      total_price: 0,
      total_num: 0,
      cartid: [] //购物车id
    };
  },

  created () {
    this.axios({
      url: "https://api.ymduo.com/Cart/lists",
      method: "post",
      data: this.$qs.stringify({
        user_id: 956519
      })
    }).then(res => {
      console.log(res);
      // this.cartlist = res.data.result.data;
      // is_checked  "0"  "1"
      // 给店铺设置一个数据  是否全选
      this.getcartlist(res.data.result.data);
    });
  },
  methods: {
    del (goods_item) {
      //删除购物车
      this.axios({
        url: "https://api.ymduo.com/cart/del",
        method: "post",
        data: this.$qs.stringify({
          user_id: 956519,
          shop_id: goods_item.shop_id,
          goods_id: goods_item.goods_id,
          sku_id: 0,
          pmid: 0
        })
      }).then(res => {
        console.log(res);
        this.getcartlist(res.data.result.data);
        this.$store.commit("getNum");
      });
    },
    getcartlist (data) {
      //数据处理函数
      this.cartlist = [];
      data.info.forEach(element => {
        var flag = true;
        element.shop.forEach(ele => {
          // 把每个商品的is_checked 变成true和false
          ele.is_checked = ele.is_checked == "0" ? false : true;
          if (!ele.is_checked) {
            flag = false;
          }
          ele.shopall = flag;
        });
        this.cartlist.push(element);
      });
      this.total_price = Number(data.total_price) * 100;
      this.total_num = Number(data.total_num);
    },
    updatenum (num, goodsitem) {
      console.log(num);
      console.log(goodsitem);
      this.axios({
        url: "https://api.ymduo.com/Cart/update",
        method: "post",
        data: this.$qs.stringify({
          user_id: 956519,
          shop_id: goodsitem.shop_id,
          goods_id: goodsitem.goods_id,
          sku_id: 0,
          goods_num: num
        })
      }).then(res => {
        console.log(res);
        this.getcartlist(res.data.result.data);
      });
    },
    ckshopall (is_checked, item) {
      //店铺全选
      console.log(is_checked);
      var check = is_checked ? "1" : "0";
      this.axios({
        url: "https://api.ymduo.com/cart/is_checked",
        method: "post",
        data: this.$qs.stringify({
          user_id: 956519,
          is_checked: check,
          shop_all: 1, //shopall 店铺全选
          shop_id: item.shop[0].shop_id
        })
      }).then(res => {
        this.getcartlist(res.data.result.data);
      });
    },
    onSubmit () {
      // 点击结算 需要所有的购物车id
      //循环数据  判断商店被选中 把id传到
      this.cartid = [];
      console.log(this.cartlist);
      console.log(8888888888);
      this.cartlist.forEach(ele => {
        ele.shop.forEach(element => {
          if (element.is_checked) {
            this.cartid.push(element.id);
          }
        });
      });
      console.log(this.cartid.join());
      //去结算
      this.$router.push({
        name: "order",
        params: { cartid: this.cartid.join() }
      });
    },
    onClickLeft () { },
    onClickRight () { },
    onClickEditAddress () { },
    check (is_checked, item) {
      //购物车商品单选
      var check = is_checked ? "1" : "0";
      //单个选中
      this.axios({
        url: "https://api.ymduo.com/cart/is_checked",
        method: "post",
        data: this.$qs.stringify({
          user_id: 956519,
          sku_id: 0,
          shop_id: item.shop_id,
          is_checked: check,
          pmid: 0,
          goods_id: item.goods_id
        })
      }).then(res => {
        console.log(res);
        this.getcartlist(res.data.result.data);
      });
    }
  }
};
</script>

<style lang="less">
.shop_title {
  width: 100%;
  line-height: 40px;
  display: flex;
  border-bottom: 1px solid #e5e5e5;
  .van-checkbox {
    margin-left: 20px;
  }
  h2 {
    margin-left: 20px;
  }
}
.shop_one {
  background: white;
  margin-top: 10px;
  height: 182px;
  display: flex;
  justify-content: flex-start;

  .van-checkbox {
    width: 65px;
    margin-left: 10px;
  }
  img {
    width: 80px;
    height: 80px;
    margin-left: 10px;
    margin-top: 50px;
  }
  .goods_info {
    width: 195px;
    margin-left: 10px;
    .pname {
      margin-top: 10px;
      height: 50px;
      font-weight: bold;
      line-height: 25px;
      font-size: 14px;
    }
    .sku {
      font-size: 14px;
      color: #ccc;
      line-height: 20px;
    }
    .price {
      margin-top: 30px;
      width: 195px;
      display: flex;
      margin-left: 10px;
      justify-content: space-between;
      line-height: 60px;
      span {
        color: red;
        font-size: 20px;
      }
    }
  }
}
.van-submit-bar {
  bottom: 60px;
}
.delete-button {
  height: 181px;
}
.cart_wrap {
  padding-bottom: 144px;
}
</style>
