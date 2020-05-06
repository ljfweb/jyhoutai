<template>
  <div class="loop">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white" >
      <van-swipe-item v-for="(item,index) in ImgArr" :key="index">
        <img :src="item.image" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  name: "loop",
  props: ["ImgArr"],
  data() {
    return {
      arr: []
    };
  },
  
  created() {
     this.arr = this.$store.state.arr;
  },
  methods: {},
  mounted() {
     
      console.log(this.arr);
  }
};
</script>

<style lang="less">
.loop {
  width: 100%;
  height: 162px;
  .my-swipe {
    width: 100%;
    height: 100%;
    line-height: 20px;
    text-align: center;
    .van-swipe__track {
      .van-swipe-item {
        background: none;

        img {
          height: 160px;
          border-radius: 20px;
          box-shadow: 2px 2px 5px dodgerblue, -2px -2px 5px dodgerblue;
        }
      }
    }
  }
}
</style>
