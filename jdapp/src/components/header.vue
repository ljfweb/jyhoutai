<template>
  <div class="myheader">
    <van-nav-bar
      title="标题"
      right-text="登录"
      bind:click-left="onClickLeft"
      bind:click-right="onClickRight"
      fixed
    >
      <template #title>
        <van-search
          class="mysearch"
          v-model="value"
          shape="round"
          background="#ff0000"
          placeholder="请输入搜索关键词"
          @focus="turnsearch"
        >
          <template #left-icon>
            <van-icon name="search" />
          </template>
        </van-search>
      </template>

      <template #left>
        <router-link :to="{ name: 'category' }">
          <van-icon name="apps-o" size="25" color="white" />
        </router-link>
      </template>
      <template #right>
        <router-link :to="{ name: 'login' }">
          <span>登录</span>
        </router-link>
      </template>
    </van-nav-bar>
    <div class="banner" v-if="!bannerFlag">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item
          v-for="(item, index) in bannerlist"
          :key="index"
          @click="turninfo(item.url)"
        >
          <img :src="item.image" alt />
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script>
export default {
  name: "headers",
  props: ["bannerFlag"],
  data() {
    return {
      value: "",
      bannerlist: []
    };
  },

  created() {
    this.axios({
      url: "https://api.ymduo.com/Home/IndexSep/indexPC",
      method: "post"
    }).then(res => {
      console.log(res);
      this.bannerlist = res.data.result.data.banner;
    });
  },

  mounted() {
    // this.$store.dispatch("getData");
    // console.log(this.$store.state.indexData)
    // this.bannerlist=this.$store.state.indexData.result.data.banner;
    // console.log(this.bannerlist)
  },

  methods: {
    turninfo(url) {
      var pid = url.substring(url.indexOf("?") + 8, url.indexOf("&"));
      console.log(pid);
      this.$router.push({ name: "info", params: { pid: pid } });
    },
    turnsearch() {
      //输入框获取焦点 跳转搜索页
      this.$router.push("/search");
    },
    onClickLeft() {},
    onClickRight() {
      this.$router.push({ name: "login" });
    }
  }
};
</script>

<style lang="less">
.mysearch .van-icon {
  display: inline-block;
}
.van-search {
  height: 46px;
}
.myheader .van-nav-bar {
  background: red;
}
.banner {
  padding-top: 46px;
  width: 90%;
  margin: 0 auto;
  height: 140px;
}
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;

  img {
    width: 100%;
    height: 140px;
    border-radius: 20px;
  }
}
</style>
