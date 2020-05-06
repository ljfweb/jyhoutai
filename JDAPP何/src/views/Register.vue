<template>
  <div>
    <van-nav-bar title="京东注册" left-arrow @click-left="onClickLeft" />
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
        <router-link to="login">账号密码登录</router-link><span></span>
      </div>
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">
          注册
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return { username: "", password: "" };
  },
  methods: {
    //注册表单方法
    async onSubmit(values) {
      console.log("submit", values); //检测输入的value值
      let { data: res } = await this.axios.post(
        "http://127.0.0.1:9527/checkuser",
        {
          username: this.username,
          password: this.password
        }
      );
      console.log(res);
      if (res.code == 200) {
        //如果后台状态返回正常就注册
        //执行注册的Promise请求
        const { data: reg } = await this.axios.post(
          "http://127.0.0.1:9527/register",
          {
            //注册请求
            username: this.username,
            password: this.password
          }
        );
        if (reg.code !== 200) return this.$toast.fail("注册失败"); //返回代码错误抛出错误
        this.$toast.success("注册成功"); //否则就抛出祖册成功
      } else {
        //否则就抛出错误
        return this.$toast.fail("该用户名已占用");
      }
    },
    //跳转到首页
    onClickLeft() {
      this.$router.push({ name: "home" });
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
