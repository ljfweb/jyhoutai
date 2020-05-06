<template>
  <div>
    <van-nav-bar title="" left-text="" left-arrow >
      <template #right>
        <van-icon name="phone-circle-o" size="18" color="black" />
        <van-icon name="bullhorn-o" size="18" color="black"/>
      </template>
    </van-nav-bar>
    
    <div class="goods">
       <img :src="cartid.goods_img" alt="" style="width:90px;height:90px;">
   
       <p>{{cartid.goods_name}}</p>
    </div>
    <div class="qs" style="" >已签收</div>
    
    <div class="pj"> 
      <div class="pj1">
      <p>评价快递员 XXX</p>
      <img src="../assets/logo.png" alt="" style="width:30px;height:30px">
      <van-rate v-model="value" style="background:white"/>
      </div>
      <van-icon name="more-o" size="22" />
    </div>
     <P style="background:#f7f7f7;width:100%;padding:8px 0px">邮政快递：9784678414209
       <van-icon name="brush-o" size="15" />
     </P>
    <div class="news">
       <p><van-icon name="coupon" />本数据由菜鸟裹裹提供</p>
       <div v-for="(item,index) in deliveryData" :key="index">
         <p><span class="s1">{{item.time.slice(5)}}</span><span class="s2">{{item.context}}</span></p>
         
       </div>
    </div>
  </div>
 
</template>
<script>
export default {
  name:"delivery",
  
    data() {
    return {
      value: 3,
      deliveryData:"",
      cartid:"",
    };
  },
  created(){
   this.cartid = this.$route.params.cartid;
    console.log(this.cartid)
    
    this.axios({
      url:"http://route.showapi.com/64-19",
      method:"post",
      data:this.$qs.stringify({
         showapi_sign:"16f271fc4b73489dafca80718d1adea7",//你的应用id
        showapi_appid:"194998",//你的密钥
       com:"auto",
       nu:"9784678414209"
    })
    })
    
    .then(res=>{
      
        
    
      console.log(res);
      this.deliveryData=res.data.showapi_res_body.data;
      

    })
  }
}
</script>
<style lang="less" scoped>

div{
  position: relative;
  .van-nav-bar{
    position: fixed;
    top: 0;
    left: 0;
    background: #f3f3f3;
    width: 100%;
    height: 60px;
    z-index: 999;
  }
  background: #f3f3f3;
  padding: 0px 10px;
  box-sizing: border-box;
 .van-icon{
   margin: 5px;
 }
 
 .goods{
   z-index: 1;
   height: 210px;
   
   padding-top: 80px;
   background: white;
   text-align: center;
   margin: 10px 0px 0px;
   
   img{
     margin-bottom: 10px;
   }
 }
 .qs{
   width:100%;
   height:50px;
   font-size:18px;
   line-height: 50px;
   color:white;
   background:red
 }
 .pj{
   width:100%;
   height:100px;
   font-size:15px;
    padding-top: 15px;
   background: white;
   line-height: 30px;
   margin: 15px 0px 0px;
   display: flex;
   justify-content: space-between;
   .pj1{
     background: white;
   }
 }
 .news{
   width:100%;
   height:auto;
    padding-top: 15px;
   background: white;
   margin: 15px 0px 0px;
   div{
     background: white;
     font-size: 13px;
     line-height: 26px;
     
     p{
       display: flex;
       justify-content: space-around;
       
       span{
         margin: 5px;

       }
       .s1{
         width: 20%;
       }
       .s2{
         width: 80%;text-align: left;
       }
     }
   }
 }
}
</style>