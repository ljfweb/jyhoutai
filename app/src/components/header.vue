<template>
  <div class="headers">
    <van-nav-bar left-arrow
                 @click-left="onClickLeft">
      <template #right>
        <span v-if="iconFlag"
              @click="onClickRight">登录</span>
        <van-icon v-if="!iconFlag"
                  name="contact"
                  size="30"
                  color="white" />
      </template>
      <template #title>
        <van-search v-model="value"
                    shape="round"
                    background="red"
                    placeholder="请输入搜索关键词"
                    @focus="toSearch">
          <template #left-icon>
            <van-icon name="search" />
            <!-- <van-icon name="search" /> -->
          </template>
        </van-search>
      </template>
      <template #left>
        <van-icon name="search" />
      </template>
    </van-nav-bar>
    <div class="banner">
      <van-swipe class="my-swipe"
                 :autoplay="3000"
                 indicator-color="white">
        <van-swipe-item v-for="(item, index) in bannerList"
                        :key="index">
          <!-- <router-link :to="item.url"> -->
          <img :src="item.image"
               @click="toInfo(item.url)"
               alt="" />
          <!-- </router-link> -->
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>
<script>
export default {
  name: "headers",
  created () {
    // 判断是否登录
    if (localStorage.token) {
      this.iconFlag = false;
    } else {
      this.iconFlag = true;
    }
    this.axios({
      url: "https://api.ymduo.com/Home/IndexSep/indexPC",
      method: "post"
    }).then(res => {
      this.bannerList = res.data.result.data.banner;
    });
  },
  methods: {
    onClickLeft () { },
    onClickRight () {
      if (this.iconFlag) {
        location.href = "/login#/login";
      } else {
        location.href = "/mine/mine";
      }
    },
    toSearch () {
      this.$router.push("/search");
    },
    toInfo (url) {
      var id = url.substring(url.indexOf("?") + 8, url.indexOf("&"));
      // console.log(id)
      this.$router.push({ name: "info", params: { pid: id } });
    }
  },
  updated () {
    // 登录按钮修改成白色
    document.getElementsByClassName("van-nav-bar__right")[0].style.color =
      "white";
  },
  data () {
    return {
      value: "",
      bannerList: [],
      iconFlag: true
    };
  }
};
</script>

<style lang="less" scoped>
.van-search {
  height: 46px;
}
.headers .van-nav-bar {
  background: red;
  .van-icon-search::before {
    color: white;
  }
}
.van-field__left-icon .van-icon-search {
  display: inline-block;
}
.banner {
  width: 90%;
  margin: auto;
}
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  width: 90%;
  img {
    width: 100%;
    height: 140px;
    border-radius: 20px;
  }
}
</style>
