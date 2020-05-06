<template>

        <div class="mima">
            <transition>
			  <div v-if="ok">toggled content</div>
			</transition>
        </div>

</template>

<script>
   

   export default {
       name:"mima",
       data(){
           return{
               msg:"mima"
           }
       },
       components:{
          
       }
   }

</script>

<style scoped>
 

</style>