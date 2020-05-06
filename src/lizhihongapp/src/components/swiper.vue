<template>
  <div class="swiper">
    <van-swipe class="my-swipe" :autoplay="autoplay" indicator-color="white">
      <van-swipe-item v-for="item in images" :key="item.id">
        <van-image :src="item.img_url" radius="7" lazy-load />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  name: "swiper",
  props: ["autoplay", "images"],
  data() {
    return {};
  },
  mounted() {}
};
</script>

<style lang="less" scoped>
.swiper {
  width: 100%;
  position: relative;
  .slider-bg {
    background-image: linear-gradient(0deg, #f1503b, #c82519 50%);
    position: absolute;
    top: -44px;
    left: -25%;
    height: 145px;
    width: 150%;
    border-bottom-left-radius: 100%;
    border-bottom-right-radius: 100%;
  }
}
</style>
