<template>
  <div>
    <van-row class="backImgs">
      <van-col span="1"></van-col>
      <van-col span="22">
        <van-swipe class="my-swipe" :autoplay="3000">
          <van-swipe-item v-for="(item, index) in swiperDatas" :key="index">
            <router-link :to="item.webs">
              <img :src="item.image" alt="" />
            </router-link>
          </van-swipe-item>
        </van-swipe>
      </van-col>
      <van-col span="1"></van-col>
    </van-row>
  </div>
</template>

<script>
export default {
  created() {
    this.getFullSwiperData();
  },
  data() {
    return {
      swiperDatas: []
    };
  },
  methods: {
    //获取轮播图图片
    async getFullSwiperData() {
      const { data: res } = await this.$axios.get(
        "/index/slide?token=1ec949a15fb709370f"
      );
      console.log(res.data);
      //赋值给接受对象
      this.swiperDatas = res.data;
    }
  }
};
</script>
<style lang="less" scoped>
.backImgs {
  background: url("../assets/header_searchimg.png") no-repeat;
  background-color: white;
}
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: white;
}
.custom-indicator {
  position: absolute;
  right: 5px;
  bottom: 5px;
  padding: 2px 5px;
  font-size: 12px;
  background: rgba(0, 0, 0, 0.1);
}
.van-swipe-item {
  width: 336px;
  height: 134px;
  border-radius: 10px;
  margin-bottom: 10px;
  padding: 0;
  img {
    width: 100%;
    height: 134px;
    border-radius: 10px;
    margin-top: -0.5rem;
  }
}
</style>
