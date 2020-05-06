<template>
  <div style="padding: 0 14px;margin: 6px 0;">
    <!-- 头部 -->
    <van-row type="flex" align="center" style="background-color: white;">
      <van-col :span="7"><img src="../assets/cuteDown.png"/></van-col>
      <van-col :span="3">{{ nowHours }}点场</van-col>
      <van-col :span="6"
        ><van-count-down :time="time">
          <template v-slot="timeData">
            <span class="item">{{ timeData.hours }}</span>
            <span class="item">{{ timeData.minutes }}</span>
            <span class="item">{{ timeData.seconds }}</span>
          </template>
        </van-count-down></van-col
      ><van-col :span="4"></van-col>
      <van-col style="color: red;" :span="5"
        >更多秒杀
        <span style="border-radius: 50%;background-color: red;"
          ><van-icon name="play" color="white"/></span
      ></van-col>
    </van-row>
    <!-- 秒杀底部 -->
    <van-swipe
      class="my-swipe"
      indicator-color="white"
      style="height:100px;display:flex;"
    >
      <van-swipe-item>
        <van-grid border :column-num="6" icon-size="80px">
          <van-grid-item
            v-for="item in cuteDownListA"
            :key="item.gid"
            :icon="item.image"
            :text="item.price"
          ></van-grid-item>
        </van-grid>
      </van-swipe-item>
      <van-swipe-item
        ><van-grid border :column-num="6" style="width: 100%;" icon-size="50px">
          <van-grid-item
            v-for="item in cuteDownListB"
            :key="item.gid"
            :icon="item.image"
            :text="item.price"
          ></van-grid-item> </van-grid
      ></van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  created() {
    this.getCuteDownData();
  },
  data() {
    return {
      time: 1 * 60 * 60 * 1000,
      cuteDownListA: [],
      cuteDownListB: [],
      nowHours: ""
    };
  },
  methods: {
    async getCuteDownData() {
      const { data: res } = await this.$axios.get(
        "/index/recom?token=1ec949a15fb709370f"
      );
      console.log(res.data);
      this.cuteDownListA = res.data.slice(0, 5);
      this.cuteDownListB = res.data.slice(6, 11);
      this.nowHours = new Date().getHours(); //获取当前时间
    }
  }
};
</script>
<style lang="less" scoped>
.item {
  display: inline-block;
  width: 22px;
  margin-right: 5px;
  color: black;
  font-size: 12px;
  text-align: center;
  background-color: gainsboro;
}
.my-swipe .van-swipe-item {
  color: #fff;
  text-align: center;
  background-color: white;
}
</style>
