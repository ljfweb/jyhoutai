<template>
  <div>
    <van-nav-bar title="京东登录注册" left-arrow @click-left="$router.go(-1)" />
    <van-form>
      <van-field
        v-model="username"
        name="用户名"
        clearable
        placeholder="用户名"
      />
      <van-field
        v-model="password"
        type="password"
        clearable
        name="密码"
        placeholder="密码"
      />
      <div style="margin: 16px;" class="mybtn">
        <van-button @click="login" round block type="danger">
          登录
        </van-button>
        <van-button round block type="primary" @click="$router.push('/reg')">
          注册
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    login() {
      this.axios
        .post("/api/login", {
          username: this.username,
          password: this.password
        })
        .then(res => {
          console.log(res);
          if (res.data.code == 400) {
            this.$notify("登录失败");
          } else {
            localStorage.token = res.data.token;
            location.href = "/home";
          }
        });
    }
  }
};
</script>

<style>
.mybtn .van-button {
  margin-top: 20px;
}
.login {
  background: #fab3b3;
}
.one_login {
  background: white;
  border: 2px solid #fab3b3;
  color: #000000;
}
</style>
