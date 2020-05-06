<template>
  <div>
    <jy-head></jy-head>
    <table-list></table-list>
  </div>
</template>

<script>
import jyHead from "../jyhead";
import tableList from "./tablelist";

export default {
  name: "admin",
  components: {
    jyHead,
    tableList
  }
};
</script>

<style></style>
