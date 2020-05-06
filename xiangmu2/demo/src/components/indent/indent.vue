<template>

        <div class="indent">
           <dingdan></dingdan>
        </div>

</template>

<script>
   
   import dingdan from '../dingdan/dingdan'

   export default {
       name:"indent",
       data(){
           return{
               msg:"indent"
           }
       },
       components:{
          dingdan
       }
   }

</script>

<style scoped>

</style>