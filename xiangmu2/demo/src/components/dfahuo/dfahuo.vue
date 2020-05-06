<template>

        <div class="dfahuo">
            <dingdan></dingdan>
        </div>

</template>

<script>
   
   import dingdan from '../dingdan/dingdan'

   export default {
       name:"dfahuo",
       data(){
           return{
               msg:"dfahuo"
           }
       },
       components:{
          dingdan
       }
   }

</script>

<style scoped>
 

</style>