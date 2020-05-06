<template>

        <div class="dpingjia">
            <dingdan></dingdan>
        </div>

</template>

<script>
   
   import dingdan from '../dingdan/dingdan'

   export default {
       name:"dpingjia",
       data(){
           return{
               msg:"dpingjia"
           }
       },
       components:{
          dingdan
       }
   }

</script>

<style scoped>
 

</style>