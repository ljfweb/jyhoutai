<template>

        <div class="collect">
            <shoucang></shoucang>
        </div>

</template>

<script>
   
   import shoucang from '../shoucang/shoucang'
   export default {
       name:"collect",
       data(){
           return{
               msg:"collect"
           }
       },
       components:{
           shoucang
       }
   }

</script>

<style scoped>

</style>