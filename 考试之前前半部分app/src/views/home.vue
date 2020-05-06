<template>
  <div class="home">
    <header-com></header-com>
    <loop :ImgArr="loopImg"></loop>
    <div class="Nav">
      <van-swipe class="my-swipe" :autoplay="5000" indicator-color="white">
        <van-swipe-item v-for="(item, index) in 2" :key="index">
          <van-grid>
            <van-grid-item
              v-for="(item2,index2) in Nav"
              :key="index2"
              :icon="item2.image"
              :text="item2.title"
            ></van-grid-item>
          </van-grid>
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="miao">
      <!-- 京东秒杀头部 -->
      <div class="miao_top">
        <div class="miao_top_left">
          <span class="tu"></span>
          <span class="chang">
            <span>{{Time}}</span>点场
          </span>
          <div class="miao_top_time">
            <span class="hour">{{hour}}</span>&nbsp;:
            <span class="minute">{{minu}}</span>&nbsp;:
            <span class="second">{{sec}}</span>
          </div>
        </div>
        <div class="miao_top_right">
          <span class="more">更多秒杀</span>
          <span>&gt;</span>
        </div>
      </div>
      <!-- 京东秒杀商品 -->
      <div class="miao_center">
        <ul v-for="(item3,index3) in goods" :key="index3">
          <li>
            <img :src="item3.image" alt />
          </li>
          <li>
            <span>￥</span>
            {{item3.price}}
          </li>
          <li>
            <span>￥</span>1000
          </li>
        </ul>
      </div>
      <!-- 为你推荐 -->
      <div class="tui">
          <div class="tui_top">
            <img src="../assets/tuijian.png" alt="">
          </div>
          <div class="goods">
             <ul v-for="(item,index) in goods" :key="index" @click="toInfo(item.gid)">
                <li><img :src="item.image" alt=""></li>
                <li>{{item.title}}</li>
                <li>
                  <span>￥{{item.price}}</span>
                  <span>看相似</span>
                </li>
                <li></li>
             </ul>
          </div>
      </div>

    </div>
  </div>
</template>

<script>
import headerCom from "../components/header.vue";
import loop from "../components/loop";
import { getSwipe, indexNav, indexGoods } from "../api/index";
export default {
  name: "home",
  data() {
    return {
      Nav: [],
      Time: 0,
      hour: 0,
      minu: 0,
      sec: 0,
      timing: 2 * 60 * 60,
      miao: 0,
      goods: [],
      loopImg:[]
    };
  },
  components: {
    headerCom,
    loop
  },
  created() {
   

    getSwipe().then(res => {
      console.log(res.data);
      this.loopImg = res.data
      this.$store.commit("addLoopSwiper",res.data)
      console.log(this.$store.state.arr);
    });
  },
  mounted() {
    //获取时间
    // this.hour = new Date().getHours(); //得到小时
    // if (this.hour % 2 == 0) {
    //   this.Time = this.hour;
    // } else {
    //   this.Time = this.hour - 1;
    // }

    // console.log(this.timing);
    // this.time();


    
    this.Sum();
    this.getGoods();
    

  },
  methods: {
    // time() {
    //   setInterval(() => {
    //     console.log(this.timing);
    //     this.hour = Math.floor(this.timing / (60 * 60));
    //     this.miao = this.timing % (60 * 60);

    //     //  console.log(this.timing)
    //     this.minu = Math.floor(this.miao / 60);
    //     //  this.sec = this.timing % 60;
    //   }, 1000);
    // },
    getNav() {
      indexNav().then(res => {
        console.log(res.data);
        this.Nav = this.Nav.concat(res.data);
        console.log(this.Nav);
      });
    },
    Sum() {
      for (let i = 0; i < 4; i++) {
        this.getNav();
      }
    },
    getGoods() {
      indexGoods().then(res => {
        console.log(res)
        let randomMath = Math.floor(Math.random(res.data.length) * 3);
        this.goods = res.data[randomMath].items;
      });
    },
    toInfo(id){
      this.$router.push({
        name: "info",
        params: {
          id:id,
          home:'home'
        }
      });
    }
    
    


  }
};
</script>
<style lang="less" scope>
.loop {
  margin-top: 20px;
}
.Nav {
  width: 100%;
  height: 190px;
  .my-swipe {
    width: 100%;
    height: 100%;
    // margin-top: 40px;
    .van-swipe__track {
      width: 100%;
      height: 100%;
      .van-swipe-item {
        width: 100%;
        height: 100%;
        background: none;
        .van-grid {
          width: 100%;
          height: 100%;
          display: flex;
          flex-flow: row wrap;
          .van-grid-item {
            width: 25%;
            height: 50%;
            .van-grid-item__content {
              display: flex;
              flex-flow: rpw wrap;
              .van-icon {
                width: 100%;
                .van-icon__image {
                  width: 38px;
                  height: 38px;
                }
              }
              .van-grid-item__text {
                width: 100%;
                display: inline-block;

                height: 14px;
                line-height: 14px;
              }
            }
          }
        }
      }
    }
  }
}
//京东秒杀
.miao {
  width: 90%;
  height: 160px;
  border: 1px solid;
  margin: 10px auto;
  border-radius: 20px;
  background-color: white;

  .miao_top {
    width: 100%;
    height: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .miao_top_left {
      width: 56%;
      height: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .tu {
        display: block;
        width: 66px;
        height: 26px;
        background: url(../assets/miao.png) no-repeat;
        background-size: cover;
        border-radius: 20px;
      }
      .chang {
        font-family: fantasy;
        font-weight: 600;
      }
      .miao_top_time {
        width: 76px;
        height: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;

        span {
          display: block;

          border: 1px solid #ccc;
        }
      }
    }
    // 京东秒杀头部右半部分
    .miao_top_right {
      width: 22%;
      .more {
        color: red;
      }
      span:last-child {
        background-color: red;
        display: inline-block;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        line-height: 10px;
        text-align: center;
        color: white;
        margin-left: 5px;
      }
    }
  }
  // 京东秒杀商品部分
  .miao_center {
    width: 100%;
    height: 130px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    overflow: hidden;
    ul {
      width: 20%;
      height: 100%;
      text-align: center;
      li {
        width: 90%;
        margin: 0px auto;
      }
      li:first-child {
        margin-bottom: 10px;
        img {
          width: 64px;
          height: 64px;
          padding-top: 10px;
          box-sizing: border-box;
        }
      }
      li:nth-child(2) {
        color: red;
        font-weight: 600;
        margin-bottom: 10px;
      }
      li:last-child {
        color: #ccc;
        text-decoration: line-through;
      }
    }
  }
}
//推荐商品
.tui{
  width: 100%;
   margin-top: 10px;
   margin-bottom: 60px;
   background-color: white;
   .tui_top{
     width: 94%;
     height: 34px;
     text-align: center;
     img{
       width: 50%;
       height: 100%;

     }
   }
   .goods{
     width: 100%;
     background-color: white;
     display: flex;
     flex-flow: row wrap;
    //   box-sizing: border-box;
     ul{
       width: 50%;
       height:263px;
       padding: 0 5px;
       box-sizing: border-box;
       li:first-child{
         width: 100%;
         height: 151px;
         img{
           width: 100%;
           height: 100%;
         }
       }
       li:nth-child(2){
         width: 100%;
         height: 33px;
         box-sizing: border-box;

        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        word-break: break-all;
        color: #232326;
        font-size: 13px;
        margin-top: 5px;
        margin-bottom: 3px;
        padding: 0 4px;
       }
       li:nth-child(3){
          width: 100%;
         height: 31px;
         display: flex;
         justify-content: space-between;
         align-items: center;

         span:first-child{
           color: red;
           font-size: 20px;

         }
         span:last-child{
          
           font-size: 12px;
           text-align: center;
           border: 1px solid #ccc;
           padding: 3px;
         }
       }
       li:last-child{
          width: 100%;
          height: 31px;
       }
     }
   }
}
body {
  background-color: #f6f6f6;
}
</style>
