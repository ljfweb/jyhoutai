<template>
  <div>
    <jy-head></jy-head>
     <table-list></table-list>

  </div>
</template>

<script>
import jyHead from "./jyhead";
import tableList from "../components/admin/tableList"

export default {
  name: "myindex",
  data() {
    return {
     
    };
  },
  components: {
    jyHead,
    tableList
  },
  mounted() {
   

  },
  methods: {
   
    
  }
};
</script>

<style lang="less" scoped>

</style>
