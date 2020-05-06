<template>
  <div class="morepopup">
    <div v-if="!hascontainer" class="right-icon" @click="onClickRight">
      <van-icon name="more-o" color="#000" size="28px" />
    </div>
    <!-- 三个点按钮弹出层 -->
    <van-popup v-model="show" overlay-class="myoverlay" close-on-popstate>
      <ul>
        <li @click="toHome">
          <van-icon name="home-o" color="#fff" /><strong>首页</strong>
        </li>
        <li @click="toSearch">
          <van-icon name="search" color="#fff" /><strong>分类搜索</strong>
        </li>
        <li @click="toMine">
          <van-icon name="user-o" color="#fff" /><strong>我的京东</strong>
        </li>
        <li @click="toFootprint">
          <van-icon name="eye-o" color="#fff" /><strong>浏览记录</strong>
        </li>
        <li @click="$toast('我的关注')">
          <van-icon name="like-o" color="#fff" /><strong>我的关注</strong>
        </li>
      </ul>
    </van-popup>
  </div>
</template>

<script>
export default {
  name: "morepopup",
  props: ["hascontainer"],
  data() {
    return {
      show: false
    };
  },
  methods: {
    onClickRight() {
      //右边分享按钮
      this.show = true;
    },
    // 跳转首页
    toHome() {
      this.$router.push("/home");
      this.$store.dispatch("setNavbarActive", 0);
    },
    // 跳转分类搜索
    toSearch() {
      this.$router.push("/category");
      this.$store.dispatch("setNavbarActive", 1);
    },
    // 跳转我的页面
    toMine() {
      this.$router.push("/mine");
      this.$store.dispatch("setNavbarActive", 4);
    },
    // 跳转足迹列表
    toFootprint() {
      this.$router.push("/myfootprint");
    }
  }
};
</script>

<style lang="less">
.morepopup {
  .myoverlay {
    background-color: rgba(0, 0, 0, 0);
  }
  .van-popup {
    background-color: transparent;
    top: 22%;
    left: 78%;
    ul {
      background: rgba(0, 0, 0, 0.8);
      border-radius: 4px;
      width: 125px;
      li {
        position: relative;
        border-bottom: 1px solid hsla(0, 0%, 100%, 0.2);
        height: 40px;
        line-height: 40px;
        margin-left: 40px;
        z-index: 1000;
        text-align: left;
        strong {
          font-weight: 400;
          color: #fff;
          font-size: 14px;
        }
        .van-icon {
          position: absolute;
          font-size: 20px;
          top: 0;
          left: -40px;
          width: 40px;
          height: 40px;
          text-align: center;
          line-height: 40px;
        }
      }
    }
  }
}
</style>
