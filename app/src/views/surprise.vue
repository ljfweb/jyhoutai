<template>
  <div class="surprise">
    <div class="wrap">
      <p><img :src="require('assets/images/a.jpg')" alt="" /></p>
      <p><img :src="require('assets/images/ewm.png')" alt="" /></p>
    </div>
  </div>
</template>
<script>
export default {
  name: "surprise",
  data() {
    return {};
  }
};
</script>
<style lang="less" scoped>
.surprise {
  width: 100%;
  .wrap {
    height: 80vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    p:last-of-type {
      text-align: center;
      width: 100px;
      height: 100px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
