<template>
  <div id="app">

    <router-view/>
       <!-- <tab></tab> -->
     
  </div>
</template>

<script>

// import tab from './components/tab/tab'

export default {
  name: 'App',
  data(){
      return {
        
      }
  },
  components:{
    // tab
  }
}
</script>

<style scoped>
    html,body{
      margin: 0;
      padding: 0;
    }
    #app{
      background: #f2f2f2;
       /* padding: 0 0 3.125rem 0; */
    }

    
    
</style>
