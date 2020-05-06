<template>
  <div>
    <jy-head></jy-head>
   <system-student></system-student>
  </div>
</template>

<script>
import jyHead from "./jyhead";

import systemStudent from "../components/admin/systemStudent"
export default {
  name: "student",
  data() {
    return {
     
    };
  },
  components: {
    jyHead,
   
    systemStudent
  },
  mounted() {
   

  },
  methods: {
   
    
  }
};
</script>

<style lang="less" scoped>

</style>
