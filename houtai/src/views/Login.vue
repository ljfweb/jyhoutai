<template>
  <div class="login">
    <bg-canvas> </bg-canvas>
    <div class="content">
      <h1>后台管理系统</h1>
      <div>
        <el-input placeholder="用户名" v-model="user.username">
          <template slot="prepend">
            <i class="el-icon-user"></i>
          </template>
        </el-input>
        <el-input placeholder="密码" v-model="user.password">
          <template slot="prepend">
            <i class="el-icon-lock"></i>
          </template>
        </el-input>
        <div class="veriCla">
          <el-input placeholder="验证码" v-model="user.veri">
            <template slot="prepend">
              <i class="el-icon-lock"></i>
            </template>
          </el-input>
          <div class="myVeri">
            <veri-com></veri-com>
          </div>
        </div>
      </div>
      <div class="buttonCla">
        <el-button type="primary">忘记密码</el-button>
        <el-button type="success" @click="loginCommit">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import BgCanvas from "../components/bgCanvas"
import VeriCom from "../components/veri.vue"
export default {
  name: "login",
  components: { BgCanvas, VeriCom },
  data() {
    return {
      user: {
        username: "",
        password: "",
        veri: "",
      },
    }
  },
  methods: {
    loginCommit() {
      // 先校验验证码
      this.axios({
        url: "/VueHandler/AdminLoginAndRegHandler?action=checkVerification",
        method: "get",
        params: {
          veri: this.user.veri,
        },
      }).then((res) => {
        if (res.data.success) {
          this.$message.success("验证码成功")
          this.axios({
            url: "/VueHandler/AdminLoginAndRegHandler?action=login",
            method: "post",
            data: {
              userName: this.user.username,
              password: this.user.password,
            },
          }).then((res) => {
            console.log(res.data)
            if (res.data.success) {
              this.$message.success("登录成功")
              this.$router.push("/home")
            } else {
              this.$message.error("登录失败")
            }
          })
        } else {
          this.$message.error("验证失败")
        }
      })
    },
  },
  mounted() {},
}
</script>
<style lang="less">
.login {
  background-color: #0d1953;
}
.content {
  width: 510px;
  height: 300px;
  position: absolute;
  top: 25%;
  left: 50%;
  margin-left: -255px;
  // border: 1px solid;
  // text-align: center;
  color: white;
  h1 {
    font-size: 30px;
    font-weight: 530;
    text-align: center;
    opacity: 0.5;
    letter-spacing: 5px;
    line-height: 50px;
  }
  .el-input {
    width: 400px;
    padding-left: 55px;
    // padding: 0 auto;
    background-color: #0d1953;
    margin: 10px 0;
    div {
      background-color: #0d1953;
    }
    input {
      background-color: #0d1953;
    }
  }
  .veriCla .el-input {
    width: 290px;
    float: left;
  }
}

.myVeri {
  width: 100px;
  height: 38px;
  border: 1px solid white;
  float: left;
  margin-top: 10px;
  margin-left: 5px;
}
.buttonCla {
  clear: both;
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
}
</style>
