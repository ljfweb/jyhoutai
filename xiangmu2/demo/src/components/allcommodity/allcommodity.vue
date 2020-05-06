<template>
   <div class="allcommodity">
       <!-- 标题 -->
       <div class="allcommodity-head">
                                <!-- 给要点击的图片外部的盒子一个点击事件 -->
            <div class="allcommodity-img" @click="goBack" > 
                <img src="../../../static/img/d2.png" >
                &nbsp;

                返回
            </div> 
            <div class="allcommodity-title">{{tit}}</div>
        </div>
      
      <div class="allcommodity-nav">
          <ul>
              <li>综合</li>
              <li>销量</li>
              <li>新品</li>
              <li>价格</li>
              <li>信用</li>
          </ul>
      </div>
      
      <div :key="index" v-for="(item,index) in cont" class="allcommodity-content">
          <img @click="imgUrl(item.id)" :src="item.url" alt="">
          <div class="title">{{item.type}}</div>
          <div class="fukuan">{{item.fkuan}}</div>
      </div>
   </div>
</template>

<script>
   import axios from 'axios'
   export default {
       name:"allcommodity",
       data(){
           return {
               kk:"",
               tit:"",
               cont:[]
           }
       },
       mounted(){
         this.getData()
       },
       methods:{
           goBack(){
              this.$router.go(-1)
           },
           getData(){
               this.tit = this.$route.query.lm;
               console.log("lm:",this.tit)
               let url = "http://127.0.0.1:83/getCatetary"
               axios({
                   method:"post",
                   url:url,
                   data:{
                       tit:this.tit
                   }
               }).then(res=>{
                   console.log("res:",res.data.commodity)
                   let sju = res.data.commodity;//获取res里data中的commodity
                   let str = sju.filter(item=>item.user == this.tit) //用filter过滤查找里面的user和前台传过来的是否一致
                   this.cont = str; //一致就用cont来接收一下
                   console.log("this.cont:",this.cont)
               })
           },
           imgUrl(id){
              console.log("this.id:",id)
              //编程式路由
              this.$router.push({path:'/spxiangqingone',query:{id:id}})
         }
       }
   }
 
</script>

<style scoped>
     .allcommodity{
         color: #404245;
         height: 41.6875rem;
     }
    .allcommodity-head{
       box-sizing: border-box;
       overflow: hidden;
       background:white; 
       width: 100%;
       display: flex;
       padding: .9375rem .9375rem ;
    }
    .allcommodity-img{
       font-size: .875rem;
       line-height: 1.125rem;
    }
    .allcommodity-img img{
       vertical-align: middle;
       width: .5rem;
       height: .9375rem;
    }
    .allcommodity-title{
       margin-left: 6.25rem;
    }
    .allcommodity-nav{
        margin-top: 4px;
        background: white;
    }
    .allcommodity-nav ul{
        padding: 0;
        margin: 0;
        display: flex;
    }
    .allcommodity-nav ul li{
        color: #404245;
        text-align: center;
        padding: 10px 0;
        width: 80px;
        list-style: none;
    }
    .allcommodity-nav ul li:hover{
        border-bottom: solid 2px gray;
    }
    
    .allcommodity-content{
        background: white;
        margin-top: 3px;
        width: 49%;
    }
    .allcommodity-content img{
        width: 100%;
    }
    .allcommodity-content .title{
        padding: 8px 0;
        font-size: 14px;
        display:block;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
     .allcommodity-content .fukuan{
         display:block;
         font-size: 12px;
         color: gray;
         margin-left: 138px;
         padding: 0 0 8px 0;
     }
</style>