<template>
    <div class="home">
       
        <!--tab切换-->
       <tab></tab>
       
       <!-- 搜索 -->
       <sousuo></sousuo>
       
       <!-- 图片 -->
       <div class="home-pic">
            <div :key="index" v-for="(item,index) in home" class="pic-jPing">

                    <img @click="imgUrl(item.id)" :src="item.pic" alt="" >
                    
            </div>
       </div>
       
       <!-- 商品分类 -->
       <div class="home-menu">

           <div class="menu-item">
               <router-link tag="div" to="/classify">  
                    <img src="../../../static/img/f2.png" alt="">
                    <span>分类</span>
                </router-link>
           </div>
            
            <div class="menu-item">
               <router-link tag="div" to="/indent">  
                    <img src="../../../static/img/f4.png">
                    <span>订单</span>
               </router-link>
            </div>

           <div class="menu-item">
               <router-link tag="div" to="/collect">  
                    <img src="../../../static/img/f3.png">
                    <span>收藏</span>
                </router-link>
           </div>

           <div class="menu-item">
              <router-link tag="div" to="/shopping">  
                  <img src="../../../static/img/f1.png">
                  <span>购物车</span>
              </router-link>
           </div>   

       </div>
       
       <!-- 精品推荐 -->
       <div class="home-product" :key="index" v-for="(item,index) in homelist" >


            <div class="product-header">

                <img src="../../../static/img/h-1.png">

                <span>{{item.name}}</span>

                <img src="../../../static/img/h-3.png">

            </div>


            <div class="product-item">
                <div  class="item-photo" :key="aa" v-for="(zal,aa) in item.product" >
                   <img @click="imgUrl(zal.id)" :src=" zal.url ">
                   <span class="item-name">{{zal.type}}</span>
                </div>
            </div>


       </div>


    </div>

</template>

<script>

import router from '../../router'

import tab from '../tab/tab'

import axios from 'axios'

import classify from '../classify/classify'
import shoppingcart from '../shoppingcart/shoppingcart'
import mei from '../mei/mei'


import indent from '../indent/indent'
import collect from '../collect/collect'
import sousuo from '../sousuo/sousuo'
import shopping from '../shopping/shopping'


export default {
     name:"home",
     data(){
         return{
             msg:"aaaaaaaaaaaaaaaa",
             home:[],
             homelist:[],
             id:""
             
         }
     },
     created(){
        this.getData()
      
     },
     methods:{
         getData(){
               let url = "http://127.0.0.1:83/getData";
                axios.get(url).then(res=>{
                console.log("res:",res)
                // 将res.data.data转换成数组,接着获取homerfr
                this.home = JSON.parse(res.data.data).home
                this.homelist = JSON.parse(res.data.data).homelist

                console.log("this.home:",this.home)
           
                })
         },
         imgUrl(id){
              console.log("this.id:",id)
              //编程式路由
              this.$router.push({path:'/spxiangqingone',query:{id:id}})
         }
     },
     components:{
         classify,
         shoppingcart,
         mei,
         indent,
         collect,
         sousuo,
         tab,
         shopping
     } 
}
</script>

<style scoped>
    .home{
        padding: 3.125rem 0 3.125rem 0;
    }
    .pic-jPing{
        width: 100%;
    }
    .pic-jPing  img{
        width: 100%;
        display: block;
    }
    .menu-item img{
        width: 2.75rem;
        height: 2.75rem;
    }
    .router-link-exact-active.router-link-active{
         text-decoration: none；
    }
    .home-menu{
        background: white;
        display: flex;
        justify-content: space-around;
    }
    .menu-item{
        padding: .9375rem 0;
    } 
    .menu-item span{
        text-align: center;
        display: block;
        height: 1.5rem;
        font-size: .875rem;
        line-height: 1.5rem;
    }
    .product-header{
        padding: 1.875rem 0 .3125rem 0;
        text-align: center;
    }
    .product-header span{
        font-size: 1rem;
        color: #e76f0e;
    }
    
    .product-header img{
        width: 1.875rem;
        height: 1.875rem;
        vertical-align: middle;
    }
    .product-item{
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }
    .item-photo{
        padding: .1875rem 0;
        width: 49%;
    }
    .item-photo img{
        width: 100%;
        display: block;
    }
    .item-name{
        padding: .625rem 0 .625rem .3125rem;
        width: 100%;
        height: 2.1875rem;
       
        display:inline-block;
        font-size:.8125rem;
        background: white;
        white-space:nowrap;
		overflow: hidden;
        text-overflow: ellipsis;
        box-sizing: border-box;
    }
    
</style>