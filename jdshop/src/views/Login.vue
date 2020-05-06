<template>
  <div class="mine">
    <van-nav-bar title="京东登录注册" left-arrow @click-left="onClickLeft" />
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="用户名"
        placeholder="用户名"
        clearable
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        placeholder="密码"
      />
      <div style="margin: 16px;">
        <van-button class="login" round block type="info" native-type="submit">
          登录
        </van-button>
        <van-button
          class="one-login"
          round
          block
          type="info"
          native-type="submit"
        >
          一键登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>
<script>
export default {
  name: "mine",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },

    onSubmit() {
      this.axios
        .post("/api/login", {
          username: this.username,
          password: this.password
        })
        .then(res => {
          if (res.data.code == 200) {
            this.$Toast.success("登录成功");
            localStorage.token = res.data.token;
            location.href = "/home";
          } else {
            this.$Toast.fail("登录失败");
          }
        });
    }
  }
};
</script>

<style lang="less" scoped>
.login {
  background-color: #fab3b3;
  border: none;
  margin: 10px 0;
}
.one-login {
  background-color: white;
  border: 1px solid red;
  color: red;
}
</style>
