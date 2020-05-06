<template>
  <div>
    <jy-head></jy-head>
    <table-list></table-list>
  </div>
</template>
<script>
import JyHead from './../header';
import tableList from './tablelist';

export default {
  name:"admin",
   components: {
    JyHead,
    tableList,
   
  }
}
</script>
<style scoped>

</style>