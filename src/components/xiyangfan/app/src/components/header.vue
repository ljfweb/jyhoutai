<template>
  <div class="myheader">
    <van-nav-bar
      title="标题"
      :right-text="rtext"
      @click-left="onClickLeft"
      @click-right="onClickRight"
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
        <van-icon name="search" />
      </template>
    </van-nav-bar>
    <div class="banner" v-if="!bannerFlag">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item
          v-for="(item, index) in bannerlist"
          :key="index"
          @click="turninfo(item.url)"
        >
          <img :src="item.image" alt="" />
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
      bannerlist: [],
      rtext: ""
    };
  },

  created() {
    if (localStorage.token) {
      this.rtext = "我的";
    } else {
      this.rtext = "登录";
    }

    this.axios({
      url: "https://api.ymduo.com/Home/IndexSep/indexPC",
      method: "post"
    }).then(res => {
      console.log(res);
      this.bannerlist = res.data.result.data.banner;
    });
  },
  methods: {
    turninfo(url) {
      var pid = url.substring(url.indexOf("?") + 8, url.indexOf("&"));
      console.log(pid);
      this.$router.push({ name: "info", params: { pid: pid } });
    },
    turnsearch() {
      this.$router.push("/search");
    },
    onClickLeft() {},
    onClickRight() {
      console.log(888888888);
      if (localStorage.token) {
        this.$router.push("/my");
      } else {
        this.$router.push("/login");
      }
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
