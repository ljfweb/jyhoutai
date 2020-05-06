<template>
  <div>
    <van-swipe
      class="my-swipe"
      indicator-color="white"
      style="margin-top: 4px;"
    >
      <van-swipe-item v-for="value in 2" :key="value">
        <van-grid :column-num="5" class="gridnav">
          <van-grid-item
            style="height: 75px;"
            v-for="(item, index) in gridnav"
            :key="index"
            :text="item.title"
          >
            <template #icon>
              <img :src="item.image" />
            </template>
          </van-grid-item>
        </van-grid>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  created() {
    this.getFullGrid();
  },
  data() {
    return {
      gridnav: []
    };
  },
  methods: {
    //获取九宫格数据导航
    async getFullGrid() {
      const { data: res } = await this.$axios.get(
        "http://vueshop.glbuys.com/api/home/index/nav?token=1ec949a15fb709370f"
      );
      console.log(res.data);
      this.gridnav = this.gridnav.concat(res.data);
    }
  },
  mounted() {
    this.getFullGrid();
    this.getFullGrid();
  }
};
</script>
<style lang="less" scoped>
.my-swipe .van-swipe-item {
  height: 154px;
  color: black;
  font-size: 20px;
  text-align: center;
}
.gridnav {
  img {
    width: 38px;
    height: 38px;
    margin-bottom: 4px;
  }
}
.van-grid-item__content {
  background-color: none;
}
</style>
