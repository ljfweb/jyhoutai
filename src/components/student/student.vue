<template>
  <div>
    <jy-head></jy-head>
    <student-table></student-table>
  </div>
</template>

<script>
import jyHead from "../jyhead";
import studentTable from "./studentTable";
export default {
  name: "student",
  components: {
    jyHead,
    studentTable
  }
};
</script>

<style></style>
