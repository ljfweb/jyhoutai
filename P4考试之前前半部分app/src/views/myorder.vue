<template>
  <div class="myorder">
    <van-nav-bar title="我的订单" left-text="返回" left-arrow @click.native="turn">
      <template>
        <van-icon name="search" size="18"></van-icon>
      </template>
    </van-nav-bar>

    <van-search v-model="value" placeholder="请输入搜索关键词" input-align="center" />

    <van-tabs v-model="active" @click="chuan">
      <van-tab title="全部订单">
        <div class="goods" v-for="(item,index) in alldata" :key="index">
          <div class="goods_all" v-for="(ite,ind) in item.goods" :key="ind">
            <div class="goods_all_top">
              <img :src="ite.image" alt />
              <ul>
                <li>{{ite.title}}</li>
                <li>
                  实付金额:￥
                  <span>{{ite.price}}</span> 元
                </li>
                <li v-for="(item2,index2) in ite.param" :key="index2">
                  <div>{{item2.title}} : {{item2.param[0].title}}</div>
                </li>
              </ul>
            </div>
            <div class="goods_all_bottom">
              <van-button round type="info">再次购买</van-button>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="待付款">待付款</van-tab>
      <van-tab title="已收货">
<div class="goods" v-for="(item,index) in alldata" :key="index">
          <div class="goods_all" v-for="(ite,ind) in item.goods" :key="ind">
            <div class="goods_all_top">
              <img :src="ite.image" alt />
              <ul>
                <li>{{ite.title}}</li>
                <li>
                  实付金额:￥
                  <span>{{ite.price}}</span> 元
                </li>
                <li v-for="(item2,index2) in ite.param" :key="index2">
                  <div>{{item2.title}} : {{item2.param[0].title}}</div>
                </li>
              </ul>
            </div>
            <div class="goods_all_bottom">
              <van-button round type="info">再次购买</van-button>
            </div>
          </div>
        </div>

      </van-tab>
      <van-tab title="待收货">待收货</van-tab>
      <van-tab title="取消订单">取消订单</van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: "myorder",
  data() {
    return {
      value: "",
      active: 0,
      alldata: "",
      type: ""
    };
  },
  methods: {
    turn() {
      this.$router.go(-1);
    },
    getlist() {
      this.getorder(this.active);
    },
    chuan(name,title){
       console.log(name,title)
       this.type = Number(name)
       this.alldata = [],
       this.getorder(this.type);
    },
    getorder(type) {
      this.axios
        .get(
          `http://vueshop.glbuys.com/api/user/myorder/index?uid=696443691&status=${type}&token=1ec949a15fb709370f&page=1`
        )
        .then(res => {
          console.log(res.data);
          
          this.alldata = res.data;
        });
    }
  },

  created() {},
  mounted() {
    console.log(this.active);
    this.type = this.$route.params.type;
    this.active = this.type;
    this.getorder(this.type);
  }
};
</script>
<style lang="less" scope>
.myorder {
  .van-nav-bar {
    width: 100%;
    height: 45px;
    .van-icon {
      color: black;
    }
    color: blue;
    background-color: white;
  }

  .van-search {
    .van-search__content {
      border-radius: 20px;
    }
  }
  .van-tab__pane {
    .goods {
      width: 100%;

      .goods_all {
        width: 90%;
        height: 160px;
        margin: 0 auto;
        border-radius: 16px;
        background-color: white;
        margin-top: 20px;
        padding: 0 10px;
        box-sizing: border-box;
        .goods_all_top {
          width: 100%;
          height: 70%;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          border-bottom: 1px solid #ccc;
          img {
            width: 90px;
            height: 90px;
            border-radius: 20px;
            margin-left: 30px;
          }
          ul {
            margin-left: 30px;
            height: 70px;
            li:first-child {
              width: 160px;
              overflow: hidden; /*超出部分隐藏*/
              white-space: nowrap; /*禁止换行*/
              text-overflow: ellipsis;
            }
            li:nth-child(2) {
              color: #ccc;
              margin-top: 10px;
              span {
                color: red;
              }
            }
            li:nth-child(3) {
              margin: 5px 0;
            }
          }
        }
        .goods_all_bottom {
          width: 100%;
          height: 20%;
          display: flex;
          justify-content: flex-end;
          margin-top: 10px;
          .van-button {
            width: 88px;
            height: 30px;
            line-height: 30px;
          }
        }
      }
    }
    .goods:last-child {
      margin-bottom: 70px;
    }
  }
}
</style>
