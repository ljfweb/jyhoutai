<template>
     <div class="shangpin">
            <!-- 头部 -->
            <div class="spxiangqing-head">
                                <!-- 给要点击的图片外部的盒子一个点击事件 -->
                <div class="spxiangqing-img" @click="goBack" > 
                    <img src="../../../static/img/d2.png" >
                    &nbsp;

                    返回
                </div> 
                <div class="head-xqing">商品详情</div>
             </div>

            <!-- 轮播图 -->
            <div class="slideshow">
                <mt-swipe :auto="4000">
                     <mt-swipe-item :key="index" v-for="(item,index) in x.banner"><img :src="item" /></mt-swipe-item>  
                </mt-swipe>
            </div>
        
        <!-- 标题 -->
        <div class="xqing-title">
            <div class="title">{{x.mingcheng}}</div>

            <img  @click="enshrine" :src= "ew == false ? xq1:xq2" alt=""  >

            <!-- <img  src="../../../static/img/xq2.png" alt="" v-else > -->
        </div>
        <!-- 尺寸 -->
        <div class="leixing">
            <div class="measure">
                    {{x.chicun}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span class="luochuang">1350mm*1900mm</span>
            </div>
            <!-- 储物空间 -->
            <div class="measure">
                    {{x.jiegou}}&nbsp;
                    <span class="luochuang">不带</span>
            </div>
            
            <!-- 颜色分类 -->
            <div class="measure">
                    {{x.yanse}}&nbsp;
                    <span class="luochuang">高低床(裸床)</span>
            </div>
        </div>
        <!-- 加减-->
        <!-- 加减 -->
        <div class="jiajian">
            <span class="liang">数量</span>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

            <img @click="reduceCount" src="../../../static/img/xq3.png" alt="">

            &nbsp;&nbsp;&nbsp;&nbsp;

            <input type="text" v-model="prouductCount" min="1" >

            &nbsp;&nbsp;&nbsp;&nbsp;
            
            <img @click="addCount" src="../../../static/img/xq4.png" alt="">
        </div>
         
         <!-- 介绍 -->
        <div class="introduce">
            <p class="jshao">{{x.jieshao}}</p>
            <p class="pic" :key="index" v-for="(item,index) in x.jsPic" ><img :src="item" alt=""></p>
        </div>
        
        <!-- 客服，购买方式 -->
        <div class="stern">
           <div class="du">
               <router-link tag="div" to=""><span class="iconfont iFont">&#xe616;</span></router-link>
               <div class="fw">QQ客服</div>
           </div>
           <div class="du">
               <router-link tag="div" to=""><span class="iconfont iFont">&#xe614;</span></router-link>
               <div class="fw">电话</div>
           </div>
           <router-link tag="div" to="/shopping">
                <div class="du">
                        <router-link tag="div" to=""><span class="iconfont iFont">&#xe602;</span></router-link>
                        <div class="fw">购物车</div>
                </div>
           </router-link>
           <div @click="addShop" class="jr">
               加入购物车
           </div>
           <router-link tag="div" to="/shopping">
                <div class="gm">
                    立即购买
                </div>
           </router-link>
         <div class="sliang">{{getAllCount}}</div>
        </div>
    </div>
</template>

<script>
   
   import {mapGetters} from 'vuex'
    
   import { Swipe, SwipeItem } from 'mint-ui';

   import xq1 from '../../../static/img/xq1.png';
   import xq2 from '../../../static/img/xq2.png';

   import axios from 'axios'
   
   import { Toast } from 'mint-ui'

   export default {
       name:"spxiangqing",
       data(){
           return{
              msg:"123456",
              home:{},
              x:[],
              prouductCount:1,
              xq1:xq1,
              xq2:xq2,
              n:1
           }
       },
       created(){
           this.getData()
       },
       methods:{
           getData(){
                let url = "http://127.0.0.1:83/upData";
                let id = this.$route.query.id
                console.log("123id",id)

                axios({
                    method:"post",
                    url:url,
                    data:{
                        id:id
                    }
                }).then(res=>{
                    let arr = res.data
                    console.log("000000000:",arr)
                    this.x = arr[0].content
                    console.log("this.x:",this.x)
                })
           },
           goBack(){
               this.$router.go(-1)
           },
           addShop(){//添加到购物车
               if(sessionStorage.token){
                   const shop = {};
                   shop.img = this.x.banner[0];
                   shop.num = this. prouductCount;
                   shop.mingcheng = this.x.mingcheng;
                   shop.chicun = this.x.chicun;
                   shop.jiage = this.x.jiage;
                   this.$store.commit('addToCart',shop)// this.$store.commit是vuex中管理状态的方法
                   Toast("已加入购物车")
                   console.log("addToCart:",shop)
               }else{
                   return(
                        Toast("请先登录"),
                        this.$router.push("/shoppingcart")
                   )
               }
           },
           //收藏
           enshrine(){
                let ew = true
                this.$store.commit('getew',ew)// this.$store.commit是vuex中管理状态的方法
               if(sessionStorage.token){
                   const shri = {};
                   shri.img = this.x.banner[0];
                   shri.mingcheng = this.x.mingcheng;
                   shri.n = this.n;
                   shri.xiaoliang = this.x.xiaoliang;
                   shri.kucun = this.x.kucun;
                   shri.jiage = this.x.jiage;
                   shri.yuanjia = this.x.yuanjia;
                   this.$store.commit('addCollect',shri)// this.$store.commit是vuex中管理状态的方法
                   Toast("已收藏")
                   console.log("addCollect:",shri)
               }else{
                   return(
                        Toast("请先登录"),
                        this.$router.push("/shoppingcart")
                   )
               }
           },
           addCount(){
                this.prouductCount++
           },
            reduceCount(){
                if( this.prouductCount == 0){
                    return
                }
                this.prouductCount--
            }
       },
       computed:{
           ...mapGetters(['lists','ew']),
            getAllCount(state) {
                var sum = 0;//给一个初始值为0
                state.lists.forEach(item => {
                    sum += item.num;
                });
                return sum;
            },
       }
   }

</script>

<style scoped>
    .shangpin{
        box-sizing: border-box;
        overflow: hidden;
    }
    .spxiangqing-head{
        z-index: 1000;
        position: fixed;
        top: 0;
        left: 0;
        box-sizing: border-box;
        overflow: hidden;
        background:white; 
        width: 100%;
        display: flex;
        padding: .9375rem .9375rem ;
    }
    .spxiangqing-img{
       font-size: .875rem;
       line-height: 1.125rem;
    }
    .spxiangqing-img img{
       vertical-align: middle;
       width: .5rem;
       height: .9375rem;
    }
    .head-xqing{
       font-size: .9375rem;
       color: gray;
       margin-left: 6.25rem;
    }
    .slideshow{
        margin-top: 3rem;
        height: 23.4375rem;
    }
    .xqing-title{
        background: white;
        padding: .9375rem;
        box-sizing: border-box;
        overflow: hidden;
        display: flex;
       
    }
    .xqing-title img{
        padding: 0 0 0 .9375rem;
        width: 2.125rem;;
        height: 2.125rem;
    }

    .leixing{
        margin: 2.5rem 0;
        background: white;
    }
    .measure{
        padding: 1.25rem .9375rem;
        color: gray;
    }
    .measure .luochuang{
        background: black;
        color: white;
        font-size: .8125rem;
        padding: .375rem .9375rem;
    }
    .jshao{
        text-align: center;
        margin-top: 1.25rem;
        background: white;
        padding: 1.25rem 0;
    }
   
    .pic img{
        width: 21.6875rem;
        margin-left: .9375rem;
    }
    .stern{
        display: flex;
        background: white;
        position: fixed;
        bottom: 0;
        left: 0;
    }
    .du{
        padding: .3125rem 0 0 0;
        width: 3.5rem;
        height: 3.125rem;
        box-sizing: border-box;
        overflow: hidden;
    }
    .fw{
        text-align: center;
       margin: 0 auto;
       font-size: .75rem;
    }
    .jr{
        border: solid .0625rem;
        padding: .3125rem .5625rem;
        background:orange;
        color: white;
        line-height: 2.6875rem;
        border:solid .0625rem orange;
    }
    .gm{
        line-height: 2.6875rem;
        border: solid .0625rem red;
        padding: .3125rem 1.25rem;
        background: red;
        color: white

    }
   @font-face {
        font-family: 'iconfont';  /* project id 1306379 */
        src: url('//at.alicdn.com/t/font_1306379_fdioe7tslat.eot');
        src: url('//at.alicdn.com/t/font_1306379_fdioe7tslat.eot?#iefix') format('embedded-opentype'),
        url('//at.alicdn.com/t/font_1306379_fdioe7tslat.woff2') format('woff2'),
        url('//at.alicdn.com/t/font_1306379_fdioe7tslat.woff') format('woff'),
        url('//at.alicdn.com/t/font_1306379_fdioe7tslat.ttf') format('truetype'),
        url('//at.alicdn.com/t/font_1306379_fdioe7tslat.svg#iconfont') format('svg');
  }

  .iconfont{
    font-family:"iconfont" !important;
    font-size:25px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
    }
    /* 购物车数量 */
   .sliang{
        position: absolute;
        left: 144px;
        width: 8px;
        height:8px;
        line-height: 8px;
        font-size: 11px;
        background: red;
        color: white;
        border: solid 1px;
        text-align: center;
        padding: 5px;
        border-radius:50%; 
    }

    /* 加减 */
    .jiajian{
        padding: 20px 15px;
        color: gray;
    }

    .jiajian{
        background: white;
    }  
    .jiajian img{
        vertical-align: middle;
        width: 1rem;
        height: 1rem;
    }

    .liang{
        color: gray;
    }
</style>