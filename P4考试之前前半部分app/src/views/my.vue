<template>
  <div class="my">
    <van-nav-bar title="我的京东" left-text="返回" left-arrow @click.native="turn">
      <template>
        <van-icon name="search" size="18"></van-icon>
      </template>
    </van-nav-bar>

    <!-- 个人信息 -->
    <div class="my_top">
      <div class="top_t">
        <div class="shezhi">
          <span>账户设置</span>
        </div>
      </div>
      <div class="center">
        <img :src="mypro.head" alt />
        <ul>
          <li>{{mypro.nickname}}</li>
          <li>{{mypro.gender}}</li>
          <li>联系方式:{{mypro.cellphone}}</li>
        </ul>
      </div>
      <div class="bottom">
        <div class="hei"></div>
      </div>
    </div>
    <!-- 订单 -->
    <van-grid>
      <van-grid-item class="dan" square>
        <img src="https://img11.360buyimg.com/jdphoto/s40x40_jfs/t14911/113/1615678148/168/7734f24f/5a53578eN0e2811b6.png" alt="">
        <span>待付款</span>
      </van-grid-item>
      <van-grid-item  class="dan" square>
         <img src="https://img11.360buyimg.com/jdphoto/s40x40_jfs/t14608/2/1636876268/266/b4ebb3f2/5a535791N627c296c.png" alt="">
        <span>收获</span>
      </van-grid-item>
      <van-grid-item  class="dan" square>
         <img src="https://img11.360buyimg.com/jdphoto/s40x40_jfs/t15049/345/1573771240/492/7ef15694/5a5357eaNab882dcb.png" alt="">
        <span>退换/售后</span>
      </van-grid-item>
      <van-grid-item  class="dan" @click="toMyorder" square>
         <img src="https://img30.360buyimg.com/jdphoto/jfs/t14953/346/2113764063/185/1a1dcd24/5a6d7b8bN8431ea1a.png" alt="">
        <span>全部订单</span>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
export default {
  name: "my",
  data() {
    return {
      mypro: ""
    };
  },
  created() {
    this.axios
      .get(
        `http://vueshop.glbuys.com/api/user/myinfo/userinfo/uid/696443691?token=1ec949a15fb709370f`
      )
      .then(res => {
        console.log(res);
        this.mypro = res.data;
      });
  },
  mounted() {},
  methods: {
    turn() {
      this.$router.go(-1);
    },
    toMyorder(){
      this.$router.push({
        name:"myorder",
        params:{}
      })
    }
  }
};
</script>

<style lang="less" scoped>
.my {
  .van-nav-bar {
    width: 100%;
    height: 45px;
    .van-icon {
      color: black;
    }
    color: blue;
    background-color: white;
  }

  .my_top {
    width: 100%;
    height: 134px;
    // border: 1px solid red;
    background: linear-gradient(90deg, #eb3c3c, #ff7459);

    .top_t {
      height: 30px;
      display: flex;
      justify-content: flex-end;
      align-items: center;

      .shezhi {
        margin-right: 20px;
      }
    }
    .center {
      width: 100%;
      height: 72px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: 0 0 10px 15px;
      box-sizing: border-box;
      img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
      }
      ul {
        margin-left: 30px;
      }
    }
    .bottom {
      width: 100%;
      height: 32px;
      box-sizing: border-box;
      padding: 0 20px;
      color: #ffe678;
      font-size: 12px;
      .hei {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding: 7px 10px 10px;
        background: url(https://img11.360buyimg.com/jdphoto/s710x134_jfs/t1/43463/14/4447/108469/5cd2c002Ee4dcb4c9/445d4efb8eee08e9.png)
          no-repeat 0 0;
        background-size: 100% 67px;
      }
    }
  }
 
 .van-grid{

   .dan{
     img{
        width: 24px;
        height: 24px; 
     }
     span{
       margin-top: 10px;
     }
   }
 }
   
}
</style>
