<template>
  <div>
   
    <jy-head></jy-head>
       <course-table></course-table>
  </div>
</template>
<script>
import JyHead from './../header';
import CourseTable from "./courseTable";
export default {
  name:"course",
  components: {
    JyHead,
   CourseTable
   
  }
}
</script>
<style scoped lang="less">

</style>