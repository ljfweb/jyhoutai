<template>
  <div>
    <head-search-com></head-search-com>
    <swiper-com></swiper-com>
    <grid-nav-com></grid-nav-com>
    <dao-ji-shi></dao-ji-shi>
    <recommend-com></recommend-com>
    <div style="padding-top: 92px;"></div>
  </div>
</template>

<script>
//引入头部组件
import headSearchCom from "../components/Head_search.vue";
//轮播图组件
import swiperCom from "../components/swiper.vue";
//宫格导航
import gridNavCom from "../components/gridNav";
//为你推荐组件
import recommendCom from "../components/recommend";
//引入倒计时组件
import daoJiShi from "../components/countdown";
export default {
  components: {
    headSearchCom,
    swiperCom,
    gridNavCom,
    recommendCom,
    daoJiShi
  },
  data() {
    return {};
  }
};
</script>
<style></style>
