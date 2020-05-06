<template>
  <div class="nav_wrap">
    <van-swipe :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(items, index) in 2" :key="index">
        <router-link v-for="(item, index) in navlist" :key="index" to="/">
          <img :src="item.image" alt="" />
          <p>{{ item.names }}</p>
        </router-link>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>
<script>
export default {
  name: "indexnav",
  data() {
    return {
      navlist: []
    };
  },
  created() {
    this.axios({
      url: "https://api.ymduo.com/Home/IndexSep/indexPC",
      method: "post"
    }).then(res => {
      console.log(res);
      this.navlist = res.data.result.data.configure;
      this.navlist = this.navlist.concat(this.navlist);
    });
  },
  mounted() {
    console.log(this.navlist);
    // this.navlist=this.navlist.concat(this.navlist)
  }
};
</script>

<style lang="less">
.nav_wrap {
  background: white;
  height: 162px;
  margin-top: 20px;
  margin-bottom: 10px;
  .van-swipe-item {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    a {
      width: 65px;
      height: 65px;
      text-align: center;
      img {
        width: 40px;
        height: 40px;
      }
      p {
        text-align: center;
        font-size: 16px;
      }
    }
  }
}
</style>
