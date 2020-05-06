<template>
  <div>
    <van-nav-bar title="京东注册" left-text="返回" left-arrow @click-left="onClickLeft" />
    <div class="aa">
      <img src="../assets/1.jpg" alt />
    </div>
    <div class="inp">
      <van-form>
        <van-field v-model="username" name="用户名" clearable placeholder="用户名/邮箱/手机号" />
        <van-field v-model="password" type="password" clearable name="密码" placeholder="请输入密码" />
        <div style="margin: 16px;" class="mybtn">
          <van-button @click="reg" class="login" round block type="info">注册</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
//项目构建  写页面  写效果  加数据（调接口）
export default {
  name: "regs",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    onClickLeft() {
      this.$router.push({ name: "login" });
    },
    reg() {
      this.axios
        .post("/api/checkuser", {
          username: this.username
        })
        .then(res => {
          console.log(res);
          if (res.data.code == 400) {
            this.$Toast.fail("用户名已存在");
          } else {
            this.axios({
              url: "api/register",
              method: "post",
              data: {
                username: this.username,
                password: this.password
              }
            }).then(res => {
              if (res.data.code == 200) {
                this.$Toast.success("注册成功");
                location.href = "/login";
              } else {
                this.$Toast.fail("注册失败");
              }
            });
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
</style>
