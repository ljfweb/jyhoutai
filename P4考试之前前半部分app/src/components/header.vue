<template>
  <div>
    <van-nav-bar
      :right-text="tok"
      @click-left="onClickLeft"
      @click-right="onClickRight"
      
    >
      <template #title>
        <van-search
          v-model="value"
          shape="round"
          background="#ff0000"
          placeholder="请输入搜索关键词"
          @search="onSearch"
          @focus="turnSearch"
        >
          <template #left-icon>
            <van-icon name="search" />
          </template>
        </van-search>
      </template>

      <template #left>
        <van-icon name="wap-nav" />
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
export default {
  name: "headers",

  data() {
    return {
      value: "",
      tok: ""
    };
  },
  mounted() {
    if (localStorage.token) {
      this.tok = "注销";
    } else {
      this.tok = "登录";
    }
  },
  methods: {
    turnSearch(){
       this.$router.push("/search");
    },
    onSearch(val) {
      this.$Toast(val);
    },
    onClickLeft() {},
    onClickRight() {
       if (this.tok == "登录") {
        this.$router.push({
          name: "login",
          params: {}
        });
      } else {
        // localStorage.token.clear();
        // this.$Toast.fail("请登录")
        this.$Dialog
          .confirm({
            title: "提示",
            message: "您确认要注销吗?"
          })
          .then(() => {
            localStorage.clear();
            location.href = "/home";
          })
          .catch(() => {
            this.$Dialog.close;
          });
      }
    },
    
    
  }
};
</script>

<style lang="less">
.van-search {
  height: 46px;
}
.van-nav-bar {
  background: #ff0000;
  .van-nav-bar__left {
    .van-icon {
      width: 40px;
      height: 40px;
      line-height: 40px;
      color: white;
      font-size: 24px;
    }
  }
  .van-nav-bar__right {
    .van-nav-bar__text {
      color: white;
    }
  }
}
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}
</style>
