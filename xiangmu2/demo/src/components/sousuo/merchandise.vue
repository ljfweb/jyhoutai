<template>

   <div class="merchandise">
       <div class="merchandise-head">
           <input type="text" class="spn-qing" @keypress="searchBtn" placeholder="请输入您要搜索的商品">
           <a><img src="../../../static/img/s1.png" alt=""></a>
           <div class="cancel" @click=" goBack" >取消</div>
       </div>
       
       <div class="record" v-show="false" >
           <p>
               <img src="../../../static/img/s2.png" alt="">
               &nbsp;
               最近搜索
           </p>
       </div>



       <div class="hot">
           <p>
               <img src="../../../static/img/s3.png" alt="">
               &nbsp;
               热门搜索
           </p>
        <div class="aa">
           <div :key="index" v-for="(item,index) in arr" class="fenlei">
               {{item}}
           </div>
        </div>
       </div>
   </div>

</template>

<script>
    
    import {Toast} from 'mint-ui'

    export default {
        name:"merchandise",
        data(){
            return {
               arr:[
                  "实木", 
                  "双层床",
                  "床",
                  "松堡王国",
                  "书桌",
                  "ALL",
                  "UNION",
                  "SELECT",
                  "豆丁",
                  "儿童床"
               ],
               msg:"merchandise"
            }
        },
        methods:{
            goBack(){
               this.$router.go(-1)
            },
            searchBtn(event){ 
		       if (event.keyCode == 13) { //如果按的是enter键 13是enter 
                    event.preventDefault(); //禁止默认事件（默认是换行） 
                    console.log(event.target.value)
                    var searchval = event.target.value;
               if(searchval == ''||searchval==null){
                    Toast('搜索内容不能为空');
               }else{
                    this.$router.push({path:'/shangpin',query:{search_val:searchval}});
               }
		    } 
    	} 
      }
    }

</script>

<style scoped>
 
  .merchandise{
        background: #f2f2f2;
        width: 100%;
        height: 100%;
        padding: .3125rem 0;
        position: fixed;
        top: 0;
        left: 0;
    }
    a{
        position: absolute;
        top: 17px;
        left: 1.0625rem;
    }
    a img{
        width: 24px;
        height:24px;
    }
    .merchandise-head{
        padding: 6px 0;
        background: white;
    }
    .spn-qing{
        border: solid #f2f2f2;
        margin-left: .625rem;
        padding: 8px 0;
        width: 82%;
        text-indent:36px;
        border-radius: 1.0625rem;
        background: #f2f2f2;
        color:#a2a6ad;
        font-size: 14px;
    }
    .cancel{
        position: absolute;
        top: 20px;
        left: 333px;
        font-size: 14px;
    }
    .hot p,
    .record p{
        margin-left: 10px;
    }
    .hot p img,
    .record p img{
        width: 18px;
        height: 18px;
        vertical-align: middle;
    }
    .hot span{
        background: white;
        border: gray solid 1px;
        padding: 5px 7px;
        display: inline-block;
        margin-left: 10px;
        margin-top:8px;
        font-size: 14px;
    }
    .aa{
        display: flex;
        flex-wrap: wrap;

    }
    .fenlei{
        font-size: 14px;
        text-align: center;
        width: 57px;
        border: solid 1px;
        padding: 6px 4px;
        margin-left: 7px;
        margin-top: 5px;
    }
</style>

