<template>
  <div class="headerbar">
    <!-- 带搜索栏的头部导航 -->
    <van-sticky v-if="!ishead">
      <van-nav-bar
        class="container"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
      >
        <template #left>
          <van-icon name="wap-nav" />
        </template>
        <template #right>
          <div class="myLoginStatus" v-html="isLoginTxt">
            <!-- 登录 -->
            <!-- <i class="my-iconfont iconwodedangxuan"></i> -->
          </div>
        </template>
        <template #title>
          <van-search
            v-model="value"
            shape="round"
            background="#e43130"
            placeholder="搜索"
            @focus="onFocus"
          >
            <template #label>
              <i class="my-iconfont">&#58947;</i>
            </template>
          </van-search>
        </template>
      </van-nav-bar>
    </van-sticky>
    <!-- 不带搜索的头部导航 -->
    <van-nav-bar
      v-else
      class="border-bottom"
      :title="title"
      left-arrow
      @click-left="onBackLeft"
    >
      <template #right>
        <!-- 显示右边按钮 -->
        <more-pup :hascontainer="hascontainer"></more-pup>
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
import MorePup from "components/MorePopup"; //引入右边公共的分享按钮
export default {
  name: "headerbar",
  components: {
    MorePup
  },
  props: ["ishead", "title", "hascontainer"], //切换不同的导航及添加标题
  data() {
    return {
      value: ""
    };
  },
  computed: {
    isLoginTxt() {
      let status = "登录";
      if (this.$store.state.userToken) {
        status = `<i class="my-iconfont iconwodedangxuan"></i>`;
      }
      return status;
    }
  },
  methods: {
    onClickLeft() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        loadingType: "spinner"
      });
      setTimeout(() => {
        this.$toast.clear();
        this.$router.push("/category");
      }, 500);
    },
    onClickRight() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        loadingType: "spinner"
      });
      setTimeout(() => {
        this.$toast.clear();
        if (this.isLoginTxt == "登录") {
          this.$router.push("/login");
        } else {
          this.$router.push("/mine");
        }
      }, 500);
    },
    onFocus() {
      this.$router.push("/search");
    },
    onBackLeft() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="less" scoped>
.headerbar {
  width: 100%;
  height: 44px;
  .van-nav-bar {
    .myLoginStatus {
      width: 35px;
      text-align: center;
      color: #fff;
    }
    .van-icon {
      font-size: 24px;
      color: #252525;
    }
  }
  .container {
    width: 100%;
    height: 100%;
    background-color: #e43130;
  }
}
</style>
