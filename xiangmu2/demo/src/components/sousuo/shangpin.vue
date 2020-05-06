<template>

   <div class="shangpin">
       
        <div class="shangpin-head">
                                <!-- 给要点击的图片外部的盒子一个点击事件 -->
            <div class="shangpin-img" @click="goBack" > 
                <img src="../../../static/img/d2.png" >
                &nbsp;

                返回
            </div> 
            <div class="shangpin-title">{{searchval}}</div>
        </div>
      
      <div class="shangpin-nav">
          <ul>
              <li>综合</li>
              <li>销量</li>
              <li>新品</li>
              <li>价格</li>
              <li>信用</li>
          </ul>
      </div>
      
      <div class="tan">
      
        <div @click="xiangqing(item.id)" class="content" :key="index" v-for="(item,index) in infor" >
                <img :src= item.url  />
                <span class="content-name">{{item.type}}</span>
        </div>
      </div>
   </div>

</template>

<script>

    import axios from 'axios';

    export default {
        name:"shangin",
        data(){
            return {
               searchval:"",
               infor:[]
            }
        },
        created(){
            this.getMsg()
        },
        methods:{
           goBack(){
               this.$router.go(-1)
           },
           getMsg(){
               this.searchval = this.$route.query.search_val
               console.log("this.searchval:",this.searchval)
               let url = "http://127.0.0.1:83/merchandise";
               axios.post(url,{searchval:this.searchval}).then(res=>{
                 
                this.infor = res.data.arr
                console.log("this.commodity:", this.infor)
               }).catch(err=>{

               })
               
           },
           xiangqing(id){
               this.$router.push({path:"/spxiangqingone",query:{id:id}})
           }
        }
    }

</script>

<style scoped>
    .shangpin{
        height: 100%;
    }
    .shangpin-head{
       box-sizing: border-box;
       overflow: hidden;
       background:white; 
       width: 100%;
       display: flex;
       padding: .9375rem .9375rem ;
    }
    .shangpin-img{
       font-size: .875rem;
       line-height: 1.125rem;
    }
    .shangpin-img img{
       vertical-align: middle;
       width: .5rem;
       height: .9375rem;
    }
    .shangpin-title{
       margin-left: 6.25rem;
    }
    .shangpin-nav{
        margin-top: 4px;
        background: white;
    }
    .shangpin-nav ul{
        padding: 0;
        margin: 0;
        display: flex;
    }
    .shangpin-nav ul li{
        color: #404245;
        text-align: center;
        padding: 10px 0;
        width: 80px;
        list-style: none;
    }
    .shangpin-nav ul li:hover{
        border-bottom: solid 2px gray;
    }
    

    .tan{
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }
    .content{
        padding: .1875rem 0;
        width: 49%;
    }
    .content img{
        width: 100%;
        display: block;
    }
    .content-name{
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

