<template>
  <div>
    <van-nav-bar title="京东登录注册" left-text="返回" left-arrow />
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
        <van-button @click="reg" class="login" round block type="info">
          注册
        </van-button>
      </div>
    </van-form>
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
</style>
