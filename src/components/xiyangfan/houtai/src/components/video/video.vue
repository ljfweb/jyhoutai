<template>
  <div>
    <jy-head></jy-head>
    <video-list></video-list>
  </div>
</template>

<script>
import jyHead from "../jyhead";
import videoList from "./videolist";
export default {
  name: "videos",
  components: { jyHead, videoList }
};
</script>

<style></style>
