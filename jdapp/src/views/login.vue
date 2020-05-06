<template>
  <div>
    <van-nav-bar title="京东登录" left-arrow />
    <div class="aa">
      <img src="../assets/1.jpg" alt />
    </div>
    <div class="inp">
      <van-form>
        <van-field v-model="username" name="用户名" clearable placeholder="用户名/邮箱/手机号" />
        <van-field v-model="password" type="password" clearable name="密码" placeholder="请输入密码" />
        <div style="margin: 16px;" class="mybtn">
          <van-button @click="login" class="login" round block type="info">登录</van-button>
        </div>
      </van-form>
    </div>
    <div class="other">
      <div class="leftd">短信验证码登录</div>
      <div class="rights" @click="turnReg">新用户注册</div>
    </div>
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
            this.$Toast.fail("登录失败");
          } else {
            this.$Toast.success("登录成功");
            localStorage.token = res.data.token;
            location.href = "/home";
          }
        });
    },
    turnReg() {
      this.$router.push({ name: "reg" });
    }
  }
};
</script>

<style>
.mybtn .van-button {
  margin-top: 20px;
  border: 0px;
}
.login {
  background: #fab3b3;
}
.one_login {
  background: white;
  border: 2px solid #fab3b3;
  color: #000000;
}
.aa {
  width: 66px;
  height: 66px;
  border-radius: 20px;
  margin: 0 auto;
  margin-top: 20px;
}
.aa img {
  width: 66px;
  height: 66px;
  border-radius: 30px;
}
.inp {
  margin-top: 20px;
}
.van-field {
  margin-top: 10px;
}
.other {
  width: 100%;
  font-size: 15px;
  color: #c9bfbf;
}
.leftd {
  float: left;
  margin-left: 15px;
}
.rights {
  float: right;
  margin-right: 15px;
}
</style>
