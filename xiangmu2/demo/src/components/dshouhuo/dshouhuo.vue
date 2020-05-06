<template>

        <div class="dshouhuo">
            <dingdan></dingdan>
        </div>

</template>

<script>
    
   import dingdan from '../dingdan/dingdan'

   export default {
       name:"dshouhuo",
       data(){
           return{
               msg:"dshouhuo"
           }
       },
       components:{
          dingdan
       }
   }

</script>

<style scoped>
 

</style>