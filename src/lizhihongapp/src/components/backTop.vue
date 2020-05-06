<template>
  <div class="backtop">
    <div class="backtop-wrap">
      <van-icon
        name=" my-iconfont iconmove-top"
        size="25px"
        @click="toBackTop"
        v-if="btnFlag"
      ></van-icon>
    </div>
  </div>
</template>

<script>
export default {
  name: "backtop",
  data() {
    return {
      btnFlag: false, //是否显示置顶图标
      scrollTop: 0 // 距离顶部的高度
    };
  },
  methods: {
    // 返回顶部 加计时器是为了过渡顺滑
    toBackTop() {
      const that = this;
      let timer = setInterval(() => {
        let ispeed = Math.floor(-that.scrollTop / 5);
        document.documentElement.scrollTop = document.body.scrollTop =
          that.scrollTop + ispeed;
        if (that.scrollTop === 0) {
          clearInterval(timer);
        }
      }, 16);
    },
    // 为了计算距离顶部的高度，当高度大于600显示回顶部图标，小于600则隐藏
    scrollToTop() {
      const that = this;
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      that.scrollTop = scrollTop;
      if (that.scrollTop > 600) {
        that.btnFlag = true;
      } else {
        that.btnFlag = false;
      }
    }
  },
  mounted() {
    window.addEventListener("scroll", this.scrollToTop);
  },
  destroyed() {
    window.removeEventListener("scroll", this.scrollToTop);
  }
};
</script>

<style lang="less" scoped>
.backtop {
  width: 100%;
  // height: 100vh;
  position: relative;
  .backtop-wrap {
    width: 50px;
    border-radius: 50%;
    background-color: rgba(170, 167, 167, 0.3);
    text-align: center;
    position: fixed;
    bottom: 120px;
    right: 0;
    z-index: 1000;
    .iconmove-top {
      padding: 12px 0;
    }
  }
}
</style>
