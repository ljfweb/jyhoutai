<template>
  <div>
    <jy-head></jy-head>
    <video-list></video-list>
  </div>
</template>
<script>
import JyHead from "./../header";
import VideoList from "./videolist";
export default {
  name:"videos",

  components: {
    JyHead,
    VideoList
  },
}
</script>
<style scoped lang="less">

</style>