<template>
  <div style="background-color: white;">
    <van-nav-bar
      title="购物车"
      left-arrow
      @click-left="$router.go(-1)"
      @click-right="deleteAll"
    >
      <template #right>
        <van-icon name="delete" size="22" />
      </template>
    </van-nav-bar>
    <!-- 购物车逻辑部分 -->
    <van-row
      v-for="(item, index) in shoppingcartDateList"
      :key="index"
      style="background-color: gainsboro;"
    >
      <van-row align="center" type="flex" style="padding: 10px;">
        <van-col
          ><van-checkbox
            v-model="item.shop[item.shop.length - 1].shopallFlag"
            @change="checkShopName(item.shop[0].shop_id, item)"
          ></van-checkbox
        ></van-col>
        <van-col style="padding-left: 8px;"
          >商店：{{ item.shop[0].shop_name }}</van-col
        >
      </van-row>
      <van-row
        type="flex"
        align="center"
        class="shopShowSet"
        v-for="(ite, ind) in item.shop"
        :key="ind"
      >
        <van-col span="2">
          <van-checkbox
            v-model="ite.shopcheced"
            @click="checkThisShopp(ite)"
          ></van-checkbox>
        </van-col>
        <van-col span="22" ref="shoppingcart"
          ><van-swipe-cell>
            <van-card
              :num="ite.goods_num"
              :price="ite.current_price"
              :desc="ite.shop_name"
              :title="ite.goods_name"
              :thumb="ite.goods_pic"
            >
              <template #tags>
                <span style="text-decoration: line-through;"
                  >原价:{{ ite.origin_price }}
                  <h2>{{ ite.is_checked }}</h2></span
                >
              </template>
              <template #footer>
                <van-stepper
                  v-model="ite.goods_num"
                  input-width="40px"
                  button-size="32px"
                  integer
                  @plus="nowNum(ite, 'jia')"
                  @minus="nowNum(ite, 'jian')"
                />
              </template> </van-card
            ><template #right>
              <van-button
                square
                text="删除"
                type="danger"
                class="delete-button"
                @click="deleteThisShop(ite)"
              /> </template
          ></van-swipe-cell>
        </van-col>
      </van-row>
    </van-row>
    <div style="padding-top: 150px;"></div>
    <!-- 提交数据 -->
    <van-submit-bar
      class="submitArea"
      :price="nowCount"
      :button-text="'提交:(' + shopNums + ')'"
      @submit="jiesuan"
    >
      <van-checkbox v-model="shopCheckedAll" @click="isCheckedAllFunction"
        >全选</van-checkbox
      >
    </van-submit-bar>
  </div>
</template>

<script>
import { Dialog } from "vant";
export default {
  created() {
    this.getShoppingCartDate();
    this.$store.commit("getshoppingCartNum");
  },
  data() {
    return {
      value: 1,
      shoppingcartDateList: [],
      shopCheckedAll: false,
      result: [],
      shopvalue: 1,
      nowCount: 0,
      checkTotal: [],
      shopNums: 0, //商品数量
      handleCheck: {}, //处理商品单选
      shopcheck: {
        //商店全选
      },
      jiesuanShop: []
    };
  },
  computed: {
    totalNums() {
      return this.$store.getters.cartnum;
    }
  },
  methods: {
    handle_date(res) {
      //渲染
      this.shoppingcartDateList = [];
      //数据处理用于实时显示
      var flagCheck = true;
      res.result.data.info.forEach(ele => {
        var shopall = true;
        ele.shop.forEach(element => {
          element.shopcheced = element.is_checked == "0" ? false : true;
          element.allChecked = true;
          if (!element.shopcheced) {
            flagCheck = false;
            shopall = false;
          }
          element.shopallFlag = shopall; //判断商店全选?
        });
        this.shoppingcartDateList.push(ele);
      });
      if (flagCheck) {
        this.shopCheckedAll = true;
      } else {
        this.shopCheckedAll = false;
      }
      this.nowCount = Number(res.result.data.total_price) * 100;
      this.shopNums = Number(res.result.data.total_num);
      console.log(this.shoppingcartDateList);
    },
    deleteThisShop(val) {
      //删除商品方法
      console.log(val);
      //删除购物车
      this.axios({
        url: "https://api.ymduo.com/cart/del",
        method: "post",
        data: this.$qs.stringify({
          user_id: 956535,
          shop_id: val.shop_id,
          goods_id: val.goods_id,
          sku_id: 0,
          pmid: 0
        })
      }).then(res => {
        console.log(res);
        this.getShoppingCartDate(); //重新更新数据
        this.$store.commit("getshoppingCartNum");
      });
    },
    deleteAll() {
      Dialog.confirm({
        message: "是否删除选中商品？"
      })
        .then(() => {
          // on confirm
          //全部删除
          this.axios({
            url: "https://api.ymduo.com/cart/del",
            method: "post",
            data: this.$qs.stringify({
              user_id: 956535
            })
          }).then(res => {
            console.log(res);
            this.getShoppingCartDate(); //实时更新
            this.$store.commit("getshoppingCartNum");
          });
        })
        .catch(() => {
          // on cancel
          console.log("已经取消");
        });
    },
    async getShoppingCartDate() {
      //获得购物车数据
      const { data: res } = await this.axios.post(
        `https://api.ymduo.com/Cart/lists`,
        this.$qs.stringify({ user_id: 956535 })
      );
      console.log(res);
      this.handle_date(res);
    },
    async checkShopName(shopididids, val) {
      //选中商品店全选
      console.log(shopididids, val.shop[val.shop.length - 1].shopallFlag); //商店全选逻辑问题
      var checkeds = val.shop[val.shop.length - 1].shopallFlag ? "1" : "0";
      console.log(checkeds);
      const { data: res } = await this.axios({
        url: "https://api.ymduo.com/cart/is_checked",
        method: "post",
        data: this.$qs.stringify({
          user_id: 956535,
          is_checked: checkeds,
          shop_all: 1, //shopall 店铺全选
          shop_id: shopididids
        })
      });
      console.log(res);
      this.handle_date(res); //实时更新
    },
    async checkThisShopp(val) {
      //是否选种商品
      const { data: res } = await this.axios({
        url: "https://api.ymduo.com/cart/is_checked",
        method: "post",
        data: this.$qs.stringify({
          user_id: 956535,
          goods_id: val.goods_id,
          sku_id: 0,
          shop_id: val.shop_id,
          is_checked: val.is_checked == "0" ? "1" : "0",
          pmid: 0
        })
      });
      console.log(res);
      this.getShoppingCartDate(); //实时更新
    },
    async nowNum(val, mode) {
      //数量加减
      // console.log(val, mode);
      var shuLiang = 0;
      if (mode == "jia") {
        shuLiang = Number(val.goods_num) + 1;
      } else {
        shuLiang = Number(val.goods_num) - 1;
      }
      const { data: res } = await this.axios({
        url: "https://api.ymduo.com/Cart/update",
        method: "post",
        data: this.$qs.stringify({
          user_id: 956535,
          shop_id: val.shop_id,
          goods_id: val.goods_id,
          sku_id: 0,
          goods_num: shuLiang //处理后的数据
        })
      });
      console.log(res);
      this.getShoppingCartDate(); //s实时更新
    },
    async isCheckedAllFunction() {
      //是否全选
      this.shopCheckedAll = !this.shopCheckedAll;
      var checkedMode = this.shopCheckedAll ? "1" : "0";
      console.log(this.shopCheckedAll);
      const { data: res } = await this.axios({
        url: "https://api.ymduo.com/cart/is_checked",
        method: "post",
        data: this.$qs.stringify({
          user_id: 956535,
          check_all: 1,
          is_checked: checkedMode
        })
      });
      console.log(res);
      this.getShoppingCartDate(); //全选后渲染
    },
    async isShopChecked(shopId) {
      //商铺全选按钮
      const { data: res } = await this.axios({
        url: "https://api.ymduo.com/cart/is_checked",
        method: "post",
        data: this.$qs.stringify({
          user_id: 956535,
          shop_id: shopId,
          sku_id: 0,
          shop_all: 1
        })
      });
      console.log(res);
    },
    //商品加减计算
    async jiesuan() {
      this.jiesuanShop = [];
      this.shoppingcartDateList.forEach(ele => {
        ele.shop.forEach(element => {
          if (element.is_checked == "1") {
            this.jiesuanShop.push(element.id);
          }
        });
      });
      console.log(this.jiesuanShop.join()); //转换成字符串
      if (!this.jiesuanShop.join()) return; //如果购物车没值就禁止操作跳转支付页
      this.$router.push({
        name: "jiesuan",
        query: {
          jiesuan: this.jiesuanShop.join()
        }
      });
    }
  },
  mounted() {}
};
</script>
<style lang="less" scoped>
.submitArea {
  margin-bottom: 1.4rem;
}
.shopShowSet {
  background-color: #fafafa;
}
.van-checkbox {
  margin-left: 4px;
}
.delete-button {
  height: 100%;
}
</style>
