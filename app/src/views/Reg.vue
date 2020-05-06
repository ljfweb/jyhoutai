<template>
  <div class="reg">
    <van-nav-bar title="注册" left-arrow @click-left="onClickLeft" />
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
        <van-button round block type="info" native-type="submit">
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
    onClickLeft() {
      this.$router.go(-1);
    },

    onSubmit() {
      this.axios({
        url: "/api/checkuser",
        method: "post",
        data: {
          username: this.username
        }
      }).then(res => {
        if (res.data.code == 400) {
          this.$Toast.fail("用户名已注册");
        } else {
          this.axios({
            url: "/api/register",
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
              this.$Toast.fail("注册失败");
              this.$Toast.fail("注册失败");
            }
          });
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.van-button {
  background-color: #fab3b3;
  border: none;
  margin: 10px 0;
}
</style>
