<template>
  <div>
    <div class="wrap">
      <div class="head404"></div>
      <div class="txtbg404">
        <div class="txtbox">
          <p>对不起，您请求的页面不存在、或已被删除、或暂时不可用</p>
          <p class="paddingbox">请点击以下链接继续浏览网页</p>
          <p>》<a onclick="history.back()">返回上一页面</a></p>
          <p>》<a @click.stop="toHome">返回网站首页</a></p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "404",
  methods: {
    toHome() {
      this.$router.replace("/home");
      this.$store.dispatch("setNavbarActive", 0);
    }
  }
};
</script>
<style scoped>
.wrap {
  width: 100%;
  height: 90vh;
  background-color: #494949;
}
.head404 {
  width: 100%;
  height: 234px;
  margin: 0 auto 0 auto;
  background: url(https://www.daixiaorui.com/Public/images/head404.png)
    no-repeat;
  background-size: 100%;
}

.txtbg404 {
  width: 100%;
  height: 169px;
  margin: 10px auto 0 auto;
  background: url(https://www.daixiaorui.com/Public/images/txtbg404.png)
    no-repeat;
  background-size: 100% 200px;
}

.txtbg404 .txtbox {
  width: 100%;
  position: relative;
  top: 30px;
  left: 60px;
  color: #eee;
  font-size: 13px;
}

.txtbg404 .txtbox p {
  width: 70vw;
  margin: 5px 0;
  line-height: 18px;
}

.txtbg404 .txtbox .paddingbox {
  padding-top: 15px;
}

.txtbg404 .txtbox p a {
  color: #eee;
  text-decoration: none;
}
</style>
