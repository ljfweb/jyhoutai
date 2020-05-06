<template>
  <div>
    <jy-head></jy-head>
    <student-table></student-table>
  </div>
</template>

<script>
import JyHead from "./../header";
import studentTable from "./studentTable";
export default {
  name: "student",
  components: {
    JyHead,
    studentTable
  }
};
</script>

<style></style>
