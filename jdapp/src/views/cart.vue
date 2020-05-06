<template>
  <div>
    <div>
      <van-nav-bar
        title="购物车"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
      />
    </div>
    <div class="box">
      <div class="goodsCard" v-for="(item,index) in data_list" :key="index">
        <!--  @click="infoTurn(item.shop[0].goods_id)" -->
        <div class="shop">
          <van-checkbox @click.stop="isCheck(item,1)" v-model="item.shop[0].is_checked"></van-checkbox>
          <span>{{item.shop[0].shop_name}}}</span>
        </div>
        <van-swipe-cell class="goods_list" v-for="(ite,inde) in item.shop" :key="inde">
          <div class="lefts">
            <van-checkbox @click.stop="isCheck(ite,2)" v-model="ite.is_checked"></van-checkbox>
            <img :src="ite.goods_pic" />
          </div>
          <div class="rights">
            <div class="title">{{ite.goods_name}}</div>
            <div class="unit">{{ite.sku_attr}}</div>
            <div class="price" style=" color:red;font-size:16px">{{ite.current_price}}</div>
            <!-- <div class="btns" @click.stop="del(ite)">删除</div> -->
            <div class="btn">
              <van-stepper @change="updatenum(ite.goods_num, ite)" v-model="ite.goods_num" />
            </div>
          </div>

          <template #right>
            <van-button square text="删除" type="danger" class="delete-button" @click="del(ite)" />
          </template>
        </van-swipe-cell>
      </div>
    </div>
    <div>
      <van-submit-bar
        :price="total_price"
        :suffix-label="total_num"
        button-text="提交订单"
        @submit="onSubmit"
      >
        <van-checkbox v-model="isch" @click="isCheck(this,3)">全选</van-checkbox>
        <!-- <template #tip>
          你的收货地址不支持同城送,
          <span @click="onClickEditAddress">修改地址</span>
        </template>-->
      </van-submit-bar>
    </div>
  </div>
</template>
<script>
import { Toast } from "vant";
export default {
  name: "cart",
  data() {
    return {
      checked: true,
      data_list: [],
      total_price: 0,
      total_num: "aa",
      aa: [],
      isch: ""
    };
  },
  methods: {
    onClickLeft() {
      Toast("返回");
      this.$router.go(-1); //返回上一层
    },
    onClickRight() {},
    getList() {
      this.axios
        .post(
          "https://api.ymduo.com/Cart/lists",
          this.$qs.stringify({
            user_id: 956547
          })
        )
        .then(res => {
          console.log(res);
          console.log(res.data.result.data.info);
          this.data_list = res.data.result.data.info;
          this.total_price = res.data.result.data.total_price * 100;
          this.total_num = "(" + res.data.result.data.total_num + ")";
          if (this.total_price > 0) {
            this.isch = 1;
          } else {
            this.isch = 0;
          }
          this.data_list.forEach(c => {
            if (c["shop"][0]["is_checked"] == 1) {
              c["shop"][0]["is_checked"] = "checked";
            } else {
              c["shop"][0]["is_checked"] = "";
            }
          });
        });
    },
    updatenum(num, goodsitem) {
      console.log("098655");
      console.log(num, goodsitem);
      this.axios({
        url: "https://api.ymduo.com/Cart/update",
        method: "post",
        data: this.$qs.stringify({
          user_id: 956547,
          shop_id: goodsitem.shop_id,
          goods_id: goodsitem.goods_id,
          sku_id: 0,
          goods_num: num
        })
      }).then(res => {
        console.log(res);
        this.getList();
      });
    },
    isCheck(data, num) {
      console.log(data);
      console.log(num);
      if (num == 1) {
        // 店铺选择
        var daa = data.shop[0];
        console.log(daa);
        daa.is_checked == 0 ? (daa.is_checked = 1) : (daa.is_checked = 0);
        console.log(daa.is_checked);
        console.log(11111);
        this.axios
          .post(
            "https://api.ymduo.com/cart/is_checked",
            this.$qs.stringify({
              user_id: 956547,
              is_checked: daa.is_checked,
              shop_all: 1,
              shop_id: daa.shop_id
            })
          )
          .then(res => {
            console.log(res);
            this.getList();
          });
      } else if (num == 2) {
        // 商品选择
        this.axios
          .post(
            "https://api.ymduo.com/cart/is_checked",
            this.$qs.stringify({
              user_id: 956547,
              goods_id: data.goods_id,
              sku_id: data.sku_id,
              shop_id: data.shop_id,
              is_checked: data.is_checked,
              pmid: data.pmid
            })
          )
          .then(res => {
            console.log(res);
            this.getList();
          });
      } else {
        // 全选
        console.log(this);
        console.log(2222);
        this.checked == true ? (this.checked = 0) : (this.checked = 1);
        this.axios
          .post(
            "https://api.ymduo.com/cart/is_checked",
            this.$qs.stringify({
              user_id: 956547,
              check_all: 1,
              is_checked: this.checked
            })
          )
          .then(res => {
            console.log(res);
            this.getList();
          });
      }
    },
    onSubmit() {
      var cratId = [];
      console.log(this.data_list);
      this.data_list.forEach(c => {
        if (c["shop"][0]["is_checked"] == "checked") {
          cratId.push(c["shop"][0]["id"]);
        }
      });
      cratId.join(",");
      console.log(4523);
      this.axios
        .post(
          "https://api.ymduo.com/order/order_confirm",
          this.$qs.stringify({
            user_id: 956547,
            cart_id: cratId,
            use_balance: 1,
            use_integral: 1
          })
        )
        .then(res => {
          console.log(res);
          this.$router.push({
            name: "submitorder",
            params: {
              cart_id: cratId
            }
          });
        });
    },
    del(data) {
      console.log(data);
      // https://api.ymduo.com/cart/del
      this.axios
        .post(
          "https://api.ymduo.com/cart/del",
          this.$qs.stringify({
            user_id: 956547,
            shop_id: data.shop_id,
            goods_id: data.goods_id,
            sku_id: data.sku_id,
            pmid: data.pmid
          })
        )
        .then(res => {
          console.log(res);
          this.getList();
        });
    },
    infoTurn(id) {
      this.$router.push({
        name: "info",
        params: {
          pid: id
        }
      });
    }
  },
  created() {
    this.getList();
  }
};
</script>
<style lang="less" scoped>
.box {
  padding-bottom: 150px;
}
.shop {
  display: flex;
  height: 30px;
}
.shop span {
  line-height: 30px;
  margin-left: 10px;
  font-size: 15px;
}
.lefts {
  display: inline-block;
  float: left;
  width: 30%;
  img {
    width: 70px;
    height: 70px;
  }
}
.delete-button {
  height: 99px;
}
.goods_list {
  // display: flex;
  margin-top: 15px;
  margin-left: 15px;
  // padding: 5px;
}
.rights {
  display: inline-block;
  float: right;
  line-height: 24px;
  padding-left: 8px;
  position: relative;
  // margin-right: 6px;
  width: 63%;
  .unit {
    color: #cccccc;
    background-color: #eeeeee;
    display: inline-block;
    padding: 0px 5px;
  }
}
.btn {
  position: absolute;
  right: 0px;
  bottom: 0;
  color: #858685;
}
</style>