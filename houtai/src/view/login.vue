<template>
  <div class="content">
    <bg-canvas></bg-canvas>
    <div class="login_box">
      <div class="avatar_box">
        <img src="../assets/1.jpg" alt />
      </div>
      <!-- 表单区域 -->
      <el-form class="login_form" :model="loginForm" :rules="loginFormRules" ref="loginFormRefs">
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input prefix-icon="el-icon-s-custom" v-model="loginForm.username"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input prefix-icon="el-icon-lock" v-model="loginForm.password" type="password"></el-input>
          <div class="veri">
            <el-input placeholder="验证码" v-model="veri">
              <template slot="prepend">
                <i class="el-icon-open"></i>
              </template>
            </el-input>
            <div class="myveri">
              <veri></veri>
            </div>
          </div>
        </el-form-item>
        <!-- 登录 -->
        <el-form-item class="login_btn">
          <el-button type="primary" @click="login">登录</el-button>
          <!-- 注册 -->
          <el-button type="info" @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import bgCanvas from "../components/bgCanvas";
import Veri from "../components/veri";
export default {
  name: "login",
  components: { bgCanvas, Veri },
  data() {
    return {
      username: "",
      password: "",
      veri: "",
      // 登录表单的数据绑定对象
      loginForm: {
        username: "admin",
        password: "123456"
      },
      //   验证表单规则对象
      loginFormRules: {
        username: [
          {
            required: true,
            message: "请输入名称",
            trigger: "blur"
          },
          {
            min: 2,
            max: 5,
            message: "请输入2-5个字的名字",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          },
          {
            min: 6,
            max: 10,
            message: "请输入6-10个字的名字",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    resetForm() {
      this.$refs.loginFormRefs.resetFields();
    },
    login() {
      // console.log(this.loginForm.username);
      // console.log(this.loginForm.password);
      this.axios({
        url: "/VueHandler/AdminLoginAndRegHandler?action=login",
        method: "post",
        data: {
          userName: this.loginForm.username,
          password: this.loginForm.password
        }
      }).then(res => {
        console.log(res);
        if (res.data.err) {
          this.$message.error(res.data.err);
        } else {
          this.$message.success("登录成功正在跳转主页");
          // 存储token
          localStorage.tokenId = res.data.tokenId;
          location.href = "/index";
          //  this.$router.push("/home");
        }
      });
    },
    checkVeri() {
      console.log(this.veri);
      console.log(1827727);
      this.axios({
        url: "/VueHandler/AdminLoginAndRegHandler",
        method: "get",
        params: {
          action: "checkVerification",
          veri: this.veri
        }
      }).then(res => {
        console.log(res);

        if (res.data.err) {
          this.$message.error("验证码错误");
        } else {
          // 登录
          this.login();
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.content {
  background: #0d1953;
}
.veri {
  display: flex;
  position: relative;
  margin-top: 14px;
  .el-input {
    width: 337px;
  }
  .myveri {
    position: absolute;
    right: 0;
  }
}
.wrap {
  position: absolute;
  top: 20%;
  left: 50%;
  margin-left: -255px;
  width: 510px;

  h1 {
    text-align: center;
    color: white;
    font-size: 35px;
  }
  .login_wrap {
    height: 220px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    .veri {
      display: flex;
      position: relative;
      .el-input {
        width: 337px;
      }
      .myveri {
        position: absolute;
        right: 0;
      }
    }
  }
  .btn_wrap {
    display: flex;
    justify-content: space-between;
  }
}
.login_box {
  width: 450px;
  height: 300px;
  background: #fff;
  border-radius: 3px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .avatar_box {
    width: 130px;
    height: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #eee;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
}
.login_btn {
  display: flex;
  justify-content: flex-end;
}

.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
</style>
