<template>
<div>
  <van-nav-bar title="京东用户登录" left-text="返回" left-arrow @click.native="turn" />
  <van-form @submit="onSubmit">
    <van-field
      v-model="username"
      name="用户名"
      label="用户名"
      placeholder="用户名"
      :rules="[{ required: true, message: '请填写用户名' }]"
    />
    <van-field
      v-model="password"
      type="password"
      name="密码"
      label="密码"
      placeholder="密码"
      :rules="[{ required: true, message: '请填写密码' }]"
    />
    <div class="an" style="margin: 16px;">
      <van-button round block type="info" native-type="submit">登录</van-button>
      <van-button round block type="info" native-type="reger" @click="reger">注册</van-button>
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
    onSubmit() {
      this.axios
        .post("http://127.0.0.1:9527/login", {
          username: this.username,
          password: this.password
        })
        .then(res => {
          console.log(res);
          if(res.code == 400){
            this.$Toast.fail('没有该用户');
          }else{
              this.$Toast.success("登录成功")
               localStorage.token=res.token;
            //    this.$router.push({name: "/home", params: {}});
               location.href="/home";
          }
        });
    },
    reger() {
      this.$router.push({
        name: "reg",
        params: {}
      });
    },
    turn() {
      this.$router.push({
        name: "home",
        params: {}
      });
    }
  },
  mounted() {}
};
</script>

<style lang="less" scope>
.an {
  // width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.van-button {
  width: 40%;
  display: inline;
}
.van-button:last-child {
}
</style>
