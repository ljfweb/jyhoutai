<template>
  <div class="car">
    <van-nav-bar @click-left="onClickLeft" title="标题" right-text="按钮" left-arrow>
      <!-- v-slot:title 简写 #title -->
      <template #title>
        <span>购物车</span>
      </template>
    </van-nav-bar>

    <div class="goods" v-for="(item, index) in cartlist" :key="index">
      <div class="goods_top">
        <van-checkbox
          v-model="item.shop[item.shop.length - 1].shopall"
          @click="ckshopall(item.shop[item.shop.length - 1].shopall, item)"
        ></van-checkbox>
        <span>{{ item.shop[0].shop_name }}</span>
      </div>
      <div class="goods_center">
        <div class="box">
          <div class="shangpin" v-for="(ite, ind) in item.shop" :key="ind">
            <van-checkbox v-model="ite.is_checked" @change="check(ite.is_checked, ite)"></van-checkbox>
            <img :src="ite.goods_pic" alt />
            <ul>
              <li>{{ite.goods_name}}</li>
              <li>价格:￥{{ite.current_price}}</li>
              <li>原价:￥{{ite.origin_price}}</li>
              <li>
                <van-stepper @change="updatenum(ite.goods_num, ite)" v-model="ite.goods_num" />
              </li>
              <span @click="del(ite)">删除</span>
            </ul>
          </div>
          <van-submit-bar
            :price="total_price"
            :button-text="'去结算:(' + total_num + ')'"
            @submit="onSubmit"
          >
            <van-checkbox @click="cartall" v-model="checked">全选</van-checkbox>
          </van-submit-bar>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "cart",
  data() {
    return {
      tableData: [],
      cartlist: [],
      checked: false,
      xinxi: [],
      total_price: 0,
      total_num: 0,
      cartid: [], //购物车id,
      value: 1
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    //删除商品
    del(ite) {
      this.$dialog
        .confirm({
          title: "删除商品",
          message: "确认要移除此商品吗?"
        })
        .then(() => {
          console.log(ite);
          //删除购物车
          this.axios({
            url: "https://api.ymduo.com/cart/del",
            method: "post",
            data: this.$qs.stringify({
              user_id: 956519,
              shop_id: ite.shop_id,
              goods_id: ite.goods_id,
              sku_id: 0,
              pmid: 0
            })
          }).then(res => {
            console.log(res);
            this.getcartlist(res.data.result.data);
            this.$store.commit("getNum");
            this.$dialog({ message: "删除成功" });
          });
        })
        .catch(() => {});
    },
    //去结算
    onSubmit() {
      this.cartid = [];
      this.cartlist.forEach(ele => {
        ele.shop.forEach(element => {
          if (element.is_checked) {
            this.cartid.push(element.id);
          }
        });
      });
      console.log(this.cartid.join());
      this.$router.push({
        name: "ensureorder",
        params: { cartid: this.cartid.join() }
      });
    },

    onClickLeft() {
      this.$router.go(-1);
    },
    //获取购物车数据
    getData() {
      console.log(123);

      this.axios
        .post(
          "https://api.ymduo.com/Cart/lists",
          this.$qs.stringify({
            user_id: 956519
          })
        )
        .then(res => {
          console.log(res);
          // this.tableData = res.data.result.data;

          // console.log(this.tableData);
          this.getcartlist(res.data.result.data);
          this.$store.commit("getNum");
        });
    },
    //处理数据
    getcartlist(data) {
      //数据处理函数
      this.cartlist = [];
      data.info.forEach(element => {
        console.log(element);
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
      console.log(this.cartlist);
      this.total_price = Number(data.total_price) * 100;
      this.total_num = Number(data.total_num);
      this.$store.commit("getNum");
    },
    //步进器改变数量
    updatenum(num, ite) {
      console.log(num);
      console.log(ite);
      this.axios({
        url: "https://api.ymduo.com/Cart/update",
        method: "post",
        data: this.$qs.stringify({
          user_id: 956519,
          shop_id: ite.shop_id,
          goods_id: ite.goods_id,
          sku_id: 0,
          goods_num: num
        })
      }).then(res => {
        console.log(res);
        this.getcartlist(res.data.result.data);
      });
    },
    //购物车单选
    check(is_checked, item) {
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
    },

    cartall() {
      //购物车全选
      this.checked = !this.checked;
      var check = this.checked ? "1" : "0";
      this.axios({
        url: "https://api.ymduo.com/cart/is_checked",
        method: "post",
        data: this.$qs.stringify({
          user_id: 956519,
          check_all: 1,
          is_checked: check
        })
      }).then(res => {
        this.getcartlist(res.data.result.data);
      });
    },
    ckshopall(is_checked, item) {
      //店铺全选
      console.log(is_checked);
      var check = is_checked ? "0" : "1"; //点击事件不能切换 本身true和false
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
    }
  }
};
</script>

<style lang="less">
.car {
  position: relative;
  margin-bottom: 120px;
  .goods {
    width: 100%;

    .goods_top {
      width: 100%;
      height: 30px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .van-checked {
        width: 20px;
        height: 20px;
        margin-left: 30px;
      }
      span {
        color: yellowgreen;
        font-size: 18px;
        font-weight: 600;
        margin-left: 30px;
      }
    }
    .goods_center {
      width: 100%;
      .box {
        .shangpin {
          width: 100%;
          height: 160px;
          border: 1px solid;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          position: relative;

          input {
            width: 20px;
            height: 20px;
            margin-left: 30px;
          }
          img {
            width: 50px;
            height: 50px;
            margin-left: 30px;
          }
          ul {
            width: 50%;
            margin-left: 30px;
            li:nth-child(2) {
              color: red;
            }
            li:last-child {
              color: #ccc;
            }
          }
          span {
            display: inline-block;
            position: absolute;
            top: 10px;
            right: 20px;
            width: 50px;
            height: 20px;
            color: red;
            text-align: center;
            line-height: 20px;
            cursor: pointer;
          }
        }
      }
    }
  }
  .jiesuan {
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    position: fixed;
    left: 0;
    top: 550px;
    margin-bottom: 90px;
    border: 1px solid;

    input {
      width: 20px;
      height: 20px;
      margin-left: 30px;
    }

    span {
      width: 80px;
      height: 30px;
      background-color: red;
      color: white;
      border-radius: 25px;
      text-align: center;
      line-height: 30px;
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
