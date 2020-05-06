<template>
  <div>
    <jy-head></jy-head>
   <vedio-list></vedio-list>
  </div>
</template>

<script>
import jyHead from "./jyhead";
import vedioList from "../components/admin/vedioList"
export default {
  name: "video",
  data() {
    return {
     
    };
  },
  components: {
    jyHead,
    vedioList
  },
  mounted() {
   

  },
  methods: {
   
    
  }
};
</script>

<style lang="less" scoped>

</style>
