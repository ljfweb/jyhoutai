<template>

        <div class="dingdan">
            <div class="dingdan-head">
                <div class="head-img" @click="goBack">
                    <img src="../../../static/img/d2.png" >
                    &nbsp;

                    返回
                </div> 
                <div class="head-yhu">我的订单</div>
            </div>
            
            <div class="dingdan-filter">
                <div class="filter-item">
                    <span>全部</span>
                </div>
                <div class="filter-item">
                    <span>待付款</span>
                </div>
                <div class="filter-item">
                    <span>待发货</span>
                </div>
                <div class="filter-item">
                    <span>待收货</span>
                </div>
                <div class="filter-item">
                    <span>待评价</span>
                </div>
            </div>


            <div class="kong">
                <div class="tupian">
                    <img src="../../../static/img/dd1.png" ><br>
                    <span>暂无任何订单</span>
                </div>
            </div>
        </div>

</template>

<script>
   

   export default {
       name:"dingdan",
       data(){
           return{
               msg:"dingdan"
           }
       },
       components:{
          
       },
       methods:{
           goBack(){
               this.$router.go(-1)
           }
       }
   }

</script>

<style scoped>
   /* 头部 */
    .dingdan{
        height: 41.6875rem;
    }
    .dingdan-head{
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
    /* 导航栏 */
    .dingdan-filter{
        background: white;
        margin-top: 5px;
        /* height: 50px; */
        line-height: 50px;
        width: 100%;
        display: flex;
    }
    .dingdan-filter .filter-item{
        height: 50px;
        width: 20%;
        text-align: center;
        
    }
    .dingdan-filter .filter-item span{
        height: 50px;
        font-size: 14px;
    }
    .dingdan-filter .filter-item:hover{
        border: solid 1px goldenrod;
    }
    .dingdan-filter .filter-item:hover{
        border-bottom: solid 2px gray;
    }

    /* 暂无订单 */
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
</style>