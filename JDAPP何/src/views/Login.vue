<template>
  <div>
    <van-nav-bar title="京东登录" left-arrow @click-left="onClickLeft" />
    <!-- 输入区 -->
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="用户名"
        placeholder="用户名/邮箱/手机号"
        :rules="[{ required: true, message: '请填写用户名' }]"
        clearable
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        placeholder="请输入密码"
        :rules="[{ required: true, message: '请填写密码' }]"
        clearable
      />
      <div class="centerHandle">
        <span></span>
        <router-link to="register">新用户注册</router-link>
      </div>
      <div style="margin: 16px;">
        <van-button round block type="danger" native-type="submit"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
export default {
  created() {
    // 登陆先检查token
    this.checkTokened();
  },
  data() {
    return { username: "", password: "" };
  },
  methods: {
    //登录按钮
    async onSubmit(values) {
      console.log("submit", values);
      const { data: res } = await this.axios.post(
        "http://localhost:9527/login",
        { username: this.username, password: this.password }
      );
      console.log(res.code, res.token);
      //判断后台状态
      if (res.code !== 200) {
        return this.$toast.fail("登录失败");
      }
      //登陆成功将token存入sessionStorage里面
      sessionStorage.token = res.token;
      //再而弹出登陆成功
      this.$toast.success("登陆成功");
      //检查token值是否对
      this.checkTokened();
      this.$router.push({ name: "home" });
    },
    onClickLeft() {
      this.$router.push({ name: "home" });
    },
    //验证token
    /*axios原生写法
    this.$axios({
                method:'post',
                url:'api',
                data:this.qs.stringify({    //这里是发送给后台的数据
                      userId:this.userId,
                      token:this.token,
                })
            }).then((response) =>{          //这里使用了ES6的语法
                console.log(response)       //请求成功返回的数据
            }).catch((error) =>{
                console.log(error)       //请求失败返回的数据
            })
    **/
    async checkTokened() {
      const { data: res } = await this.axios({
        headers: {
          token: window.sessionStorage.getItem("token") //此处主要监测请求头token值是否准确，
          //由于本项目没有使用api集中进行操作，即二次Promise封装故此请求头需要按照传统写法
        },
        method: "get",
        url: "http://127.0.0.1:9527/checktoken"
      });
      if (res.err_code != 200)
        return this.$notify({ type: "danger", message: "Token验证失败" });
      if (res.err_code == 200)
        return this.$notify({ type: "primary", message: "Token验证成功" });
      console.log(res.err_code);
    }
  }
};
</script>
<style lang="less" scoped>
.van-form {
  background-color: white;
}
.centerHandle {
  display: flex;
  justify-content: space-between;
  a {
    font-size: 16px;
    color: gray;
    padding: 10px 10px;
    border-bottom: 1px solid grey;
  }
}
</style>
