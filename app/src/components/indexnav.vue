<template>
  <div class="indexnav">
    <van-swipe @change="onChange" class="myswipe">
      <!-- 滑动的每一页 -->
      <van-swipe-item v-for="(items, index) in 2" :key="index">
        <div class="nav-1">
          <div class="navClass" v-for="(items, index) in 2" :key="index">
            <router-link to="/" v-for="(item, index) in navdata" :key="index">
              <img :src="item.image" alt="" />
              <p>{{ item.names }}</p>
            </router-link>
          </div>
        </div>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>
<script>
export default {
  name: "indexnav",
  data() {
    return {
      navdata: []
    };
  },
  methods: {
    onChange(index) {
      console.log(index);
    }
  },
  mounted() {
    this.axios({
      url: "https://api.ymduo.com/Home/IndexSep/indexPC",
      method: "post"
    }).then(res => {
      console.log(res.data.result.data.configure);
      this.navdata = res.data.result.data.configure;
    });
  }
};
</script>

<style lang="less" scoped>
.indexnav {
  width: 375px;
  height: 162px;
  .myswipe {
    .van-swipe-item {
      width: 375px;
      .nav-1 {
        height: 150px;
      }
      .navClass {
        display: flex;
        justify-content: space-around;
        align-content: center;
        margin: 10px 0;
        text-align: center;
      }
    }
  }
  .van-swipe__indicator--active {
    background-color: red;
  }
  img {
    width: 40px;
    height: 40px;
  }
}
</style>
