<template>
  <div>
    <van-nav-bar title="标题"
                 right-text="登录"
                 bind:click-left="onClickLeft"
                 bind:click-right="onClickRight">
      <template #title>
        <van-search v-model="value"
                    shape="round"
                    background="#ff0000"
                    placeholder="请输入搜索关键词"
                    @focus="turnsearch">
          <template #left-icon>
            <van-icon name="search"
                      class="jd" />
            <van-icon name="search"
                      class="sou" />
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
      <van-swipe-item v-for="(item,index) in bannerlist"
                      :key="index">
        <a :href="item.url">
          <img :src="item.image"
               alt="">
        </a>

      </van-swipe-item>

    </van-swipe>
    </div>
  </div>
</template>

<script>
export default {
  name: "headers",
 
  data () {
    return {
      value: "",
      bannerlist: [],
     
    }
  },
  created () {
    this.axios({
      url: "https://api.ymduo.com/Home/IndexSep/indexPC",
      method: "post"
    }).then(res => {
      console.log(res)
      this.bannerlist = res.data.result.data.banner;
    })
  },

  methods: {
    onClickLeft () {

    },
    onClickRight () {

    },
    turnsearch(){
      this.$router.push("/search");
    }
  }

}
</script>

<style lang="less" scoped>
.mysearch .van-icon {
  display: inline-block;
}
.van-search {
  height: 46px;
}
.van-search {
  height: 46px;
}
.van-nav-bar {
  background: red;
}
.banner {
  width: 90%;
  margin: 0 auto;
  height: 140px;
}
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: red;
}
.jd {
  float: left;
}
.sou {
  margin: 0px 5px;
}
img {
  width: 100%;
  height: 140px;
  border-radius: 20px;
}
</style>
