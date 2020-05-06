<template>

   <div class="sousuo">
       <div class="home-spn"  @click="way" >
           <input type="text" v-model="monicker" class="spn-qing" placeholder="请输入您要搜索的商品">
           <a><img src="../../../static/img/s1.png" alt=""></a>
       </div>
   </div>

</template>

<script>

    export default {
        name:"sousuo",
        data(){
            return {
                monicker:""
            }
        },
        methods:{
            way(){
                this.$router.push({path:'/merchandise',query:{monicker:this.monicker}})
            }
        }
    }

</script>

<style scoped>
   .home-spn{
        background: white;
        width: 100%;
        padding: .3125rem 0;
        position: fixed;
        top: 0;
        left: 0;
    }
 
    a{
        position: absolute;
        top: .625rem;
        left: 1.0625rem;
    }
    a img{
        width: 1.875rem;
        height: 1.875rem;
    }
    .spn-qing{
        border: solid #f2f2f2;
        margin-left: .625rem;
        padding: .625rem 0;
        width: 95%;
        text-indent: 2.75rem;
        border-radius: 1.0625rem;
        background: #f2f2f2;
        color:#a2a6ad;
        font-size: .9375rem;
    }



</style>

