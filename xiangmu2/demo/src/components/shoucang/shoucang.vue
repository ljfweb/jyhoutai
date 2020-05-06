<template>

        <div class="shoucang">
            <div class="shoucang-head">
                <div class="head-img" @click="goBack">
                    <img src="../../../static/img/d2.png" >
                    &nbsp;

                    返回
                </div> 
                <div class="head-yhu">我的收藏</div>
            </div>


             <div class="kong" v-if="collect.length==0">
                <div class="tupian">
                    <img src="../../../static/img/sc1.png" ><br>
                    <span>暂无任何收藏</span>
                </div>
            </div>
              <!-- 渲染页面 -->
            <div v-else>
                <div :key="index" v-for="(item,index) in collect" class="shangpin">
                    <img class="pic1" :src= "item.img" >
                    <div class="cont">

                        <span>{{item.mingcheng}}</span><br>
                        <span>销量:{{item.xiaoliang}}库存:{{item.kucun}}</span><br>
                        <span>￥:{{item.jiage}}.00 <del>￥:{{item.yuanjia}}.00</del></span><br>

                    </div>

                    <img class="pic2" @click="del(item.id,index)" src="../../../static/img/ch1.png" alt="">
                </div>
                <p>全部加载完毕</p>

            </div>
           


        </div>

</template>

<script>
   
   import {mapGetters} from 'vuex'
   export default {
       name:"shoucang",
       data(){
           return{
               msg:"shoucang"
           }
       },
       components:{
          
       },
       computed:{//计算属性
         ...mapGetters(['collect']) //vuex接收数据
       },
       methods:{
           goBack(){
               this.$router.go(-1)
           },
           del(id){
               this.collect.splice(id,1)
               this.$store.commit("expurgate",id)
               let ew = false
               this.$store.commit("expurgate",id)
           }
       }
   }

</script>

<style scoped>
    /* 头部 */
    .shoucang{
        height: 41.6875rem;
    }
   .shoucang-head{
       box-sizing: border-box;
       overflow: hidden;
       background:white; 
       width: 100%;
       display: flex;
       padding: .9375rem .9375rem ;
   }
   .head-img{
       font-size: .875rem;
       line-height: 1.125rem;
   }
   .head-img img{
       vertical-align: middle;
       width: .5rem;
       height: .9375rem;
   }
   .head-yhu{
       margin-left: 6.25rem;
   }

    /* 商品 */
    .shangpin{
        margin: 10px 0 0 0;
        /* margin-top: 20px; */
        border-bottom: solid 1px gainsboro;
        position: relative;
        padding: 10px 0 10px 10px;
        background: white;
        box-sizing: border-box;
        overflow: hidden;
        display: flex;
        /* border: solid 1px; */
    }
    .shangpin img{
        padding: 0 10px 0 0;
        width: 90px;
    }
   
    .shangpin .pic2{
        padding: 0 20px;
        width: 15px;
        height: 20px;
    }
    .pic1{
        height: 100%;
        width: 100%;
    }
    .cont span{
        font-size: 14px;

    }
    .cont span:nth-of-type(2){
        font-size: 12px;
        color: gray;
    }
    .cont span:nth-of-type(3){
        font-size: 14px;

    }
    /* 暂无收藏 */
    .kong{
        width: 100%;
    }
    .tupian{
        width: 100px;
        margin: 150px auto ;
    }
    .tupian img{
        margin-left: 10px;
        width: 80px;
        height: 80px;
    }
    .tupian span{
        text-align: center;
    }
    

    
    del{
        color: gray;
    }
    p{  
        font-size: 14px;
        text-align: center;
        color: gray;
    }
</style>