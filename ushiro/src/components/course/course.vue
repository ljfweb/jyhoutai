<template>
  <div>
    <jy-head></jy-head>
    <course-table></course-table>
  </div>
</template>

<script>
import jyHead from "../jyhead";
import CourseTable from "./courseTable";
export default {
  name: "course",
  components: {
    jyHead,
    CourseTable
  }
};
</script>

<style></style>
