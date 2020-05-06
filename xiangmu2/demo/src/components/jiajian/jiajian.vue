<template>

 
        <!-- 加减 -->
        <div class="jiajian">
            <span class="sliang">数量</span>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

            <img @click="reduceCount" src="../../../static/img/xq3.png" alt="">

            &nbsp;&nbsp;&nbsp;&nbsp;

            <input type="text" v-model="prouductCount" min="1">

            &nbsp;&nbsp;&nbsp;&nbsp;
            
            <img @click="addCount" src="../../../static/img/xq4.png" alt="">
        </div>
  
</template>

<script>
    export default {
        name:"jiajian",
        data(){
            return{
               prouductCount:1
            }
        },
        methods:{
            addCount(){
                this.prouductCount++
            },
            reduceCount(){
                if( this.prouductCount == 0){
                    return
                }
                this.prouductCount--
            }
        }


    }
</script>

<style scoped>
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

    .sliang{
        color: gray;
    }
</style>
