<template>
  <div>
    <!-- layout布局 -->
    <van-row>
      <!-- 跳转到分类页面 -->
      <van-col span="3" class="leftIcon" @click="Jump"
        ><van-icon color="white"
          ><span class="iconfont">&#xe641;</span></van-icon
        ></van-col
      >
      <van-col span="18" class="searchVal">
        <van-search
          v-model="value"
          placeholder="请输入搜索关键词"
          shape="round"
          @focus="turnSearch"
        >
          <template #left-icon>
            <span class="iconfont">&#xe812;</span>
            <span class="iconfont">&#xe63a;</span>
            <span class="iconfont">&#xe643;</span>
          </template>
          <template #action>
            <div @click="onSearch">搜索</div>
          </template>
        </van-search>
      </van-col>
      <van-col span="3" class="rightText">
        <!-- 登录判断存在就true，否则false，右上角的文字随着变化 -->
        <span
          style="color: white;"
          @click="changeModeFunction"
          v-html="loginMode ? '退出' : '登录'"
        ></span>
      </van-col>
    </van-row>
  </div>
</template>

<script>
export default {
  created() {
    this.checkToken();
  },
  data() {
    return {
      value: "",
      //登录是否，默认false
      loginMode: false
    };
  },
  methods: {
    onSearch() {},
    //检查登录成功是否右上角显示的文字
    checkToken() {
      if (sessionStorage.token) {
        //存在即true
        this.loginMode = true;
      } else {
        this.loginMode = false;
      }
    },
    //判断登录和登出的跳转和相关的操作
    changeModeFunction() {
      if (this.loginMode) {
        // console.log('退出登录');
        //清空token值
        sessionStorage.token = "";
        window.location.reload(); //刷新页面,不重复提交页面。
      } else {
        // console.log('登录跳转');
        this.$router.push({ name: "login" });
      }
    },
    Jump() {
      //跳转到分类页面
      this.$router.push({ name: "classify" });
    },
    //获取焦点时触发
    turnSearch() {
      this.$router.push({ name: "search" });
    }
  },
  computed: {}
};
</script>
<style lang="less" scoped>
.van-row {
  height: 45px;
  background-color: #c82519;
  line-height: 45px;
  .leftIcon {
    text-align: center;
  }
  .searchVal {
    .van-search {
      height: 45px;
      background-color: #c82519;
    }
  }
  .rightText {
    color: white;
    text-align: center;
    font-size: 14px;
  }
}
</style>
