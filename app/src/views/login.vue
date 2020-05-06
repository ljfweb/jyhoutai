<template>
  <div class="login">
    <div class="container-wrap">
      <van-nav-bar title="京东登录/注册" @click-left="onClickLeft" left-arrow>
      </van-nav-bar>
      <div class="ctrlBtn" @click="change">
        <img :src="ctrl" />
      </div>
      <!-- 登录界面 -->
      <transition name="fade" leave-active-class="animated bounceOutRight">
        <div class="login-container" v-if="changeBtn">
          <div class="login-face">
            <h1>登录</h1>
            <h3>用户名/手机号/账号</h3>
            <van-cell-group>
              <van-field
                v-model="uname"
                @focus="focus(1)"
                @blur="blur(1)"
                :style="
                  showColorname
                    ? { 'border-bottom': `2px solid ${boderColor}` }
                    : ''
                "
                clearable
                required
                placeholder="1*******"
                @click-right-icon="$toast('用户名是手机号或者账号')"
              >
                <template #right-icon>
                  <img src="../assets/images/loginicon1.png" alt="" />
                </template>
              </van-field>
              <van-field
                v-model="upwd"
                type="password"
                @focus="focus"
                @blur="blur"
                :style="
                  showColorpwd
                    ? { 'border-bottom': `2px solid ${boderColor}` }
                    : ''
                "
                clearable
                required
                placeholder="在这里输入您的密码"
                @click-right-icon="$toast('密码必须是数字、字母、下划线')"
              >
                <template #right-icon>
                  <img src="../assets/images/loginicon2.png" alt="" />
                </template>
              </van-field>
            </van-cell-group>
            <div class="forget-pwd" @click="$toast('忘记密码？')">
              忘记密码？
            </div>
          </div>
          <div class="login-submit">
            <van-checkbox
              v-model="checked"
              icon-size="15px"
              @click="forgetUname"
              >记住账号</van-checkbox
            >
            <div class="submit-btn">
              <van-button
                :disabled="isDisabled"
                :loading="isLoading"
                @click="loginBtn"
              >
                <img src="../assets/images/login2.png" alt="" />
              </van-button>
            </div>
          </div>
          <van-divider
            :style="{
              color: '#6078ea',
              borderColor: '#aeb9f0',
              padding: '0 16px'
            }"
          >
            第三方登录
          </van-divider>
          <div class="otherLogin">
            <img
              src="../assets/images/weixin.png"
              alt=""
              @click="$toast('微信登录')"
            />
            <img
              src="../assets/images/qq.png"
              alt=""
              @click="$toast('QQ登录')"
            />
            <img
              src="../assets/images/xinlang.png"
              alt=""
              @click="$toast('微博登录')"
            />
          </div>
        </div>
        <!-- 注册界面 -->
        <Register v-else></Register>
      </transition>
    </div>
  </div>
</template>

<script>
import Register from "components/register";
import { mapActions } from "vuex"; //引入vuex
export default {
  name: "login",
  components: {
    Register
  },
  data() {
    return {
      changeBtn: true,
      ctrl: require("assets/images/login1.png"),
      uname: "",
      upwd: "",
      showColorname: false,
      showColorpwd: false,
      boderColor: "#5d74e2",
      checked: false,
      isLoading: false //登录loading
    };
  },
  computed: {
    isDisabled() {
      return !this.uname || !this.upwd ? true : false;
    }
  },
  methods: {
    // 同步用户登录的token
    ...mapActions(["setUserToken", "setMyIsLogin"]),
    onClickLeft() {
      this.$router.back();
    },
    //切换按钮状态
    change() {
      if (this.changeBtn) {
        this.ctrl = require("assets/images/login3.png");
        this.changeBtn = false;
      } else {
        this.ctrl = require("assets/images/login1.png");
        this.changeBtn = true;
      }
    },
    focus(e) {
      if (e == 1) {
        this.showColorname = !this.showColorname;
      } else {
        this.showColorpwd = !this.showColorpwd;
      }
    },
    blur(e) {
      if (e == 1) {
        this.showColorname = !this.showColorname;
      } else {
        this.showColorpwd = !this.showColorpwd;
      }
    },
    forgetUname() {
      this.checked = !this.checked;
    },
    // 登录按钮
    loginBtn() {
      if (this.uname == "") {
        this.$toast("用户名不能为空");
        return false;
      }
      if (this.upwd == "") {
        this.$toast("密码不能为空");
        return false;
      }
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
        if (this.uname && this.upwd) {
          this.axios
            .post(
              "https://www.fastmock.site/mock/d740fc2fd5f677d40dcfabc7b78132d4/api/login",
              {
                username: this.uname,
                password: this.upwd
              }
            )
            .then(res => {
              console.log(res);
              if (res.data.success_code !== 200) {
                this.$toast.fail("用户名或密码错误");
              } else {
                if (res.data.data.token !== null) {
                  this.setUserToken(res.data.data.token);
                  this.setMyIsLogin(true);
                  if (this.$route.params.to) {
                    //如果存在参数
                    this.$router.push(this.$route.params.to); //则跳转至进入登录页前的路由
                  } else {
                    this.$router.push("/mine"); //否则跳转至我的页面
                    this.$store.dispatch("setMyIsLogin", true);
                  }
                  this.$toast.success("登录成功");
                } else {
                  this.$toast.success("登录失败");
                }
              }
            });
        }
      }, 1000);
    }
  },
  mounted() {
    this.$Dialog
      .alert({
        title: "登录方式",
        message:
          "提 示：\n 账 &nbsp;&nbsp; 号： admin &nbsp;\n 密 &nbsp;&nbsp; 码： 123456"
      })
      .then(() => {
        // on close
      });
  }
};
</script>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  // background-color: aquamarine;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  // z-index: 10;
  .container-wrap {
    width: 100%;
    height: 100%;
    position: absolute;
    overflow-y: scroll;
    .van-nav-bar {
      height: 150px;
      background-color: transparent;
      background: url("../assets/images/loginbg.png") no-repeat;
      background-size: 100% auto;
      .van-nav-bar__left {
        top: 0;
        bottom: 100px;
        .van-icon {
          color: white;
          font-size: 22px;
          border: 2px solid white;
          border-radius: 50%;
          padding: 3px 5px 3px 2px;
        }
      }
      .van-nav-bar__title {
        color: white;
        font-weight: bold;
        letter-spacing: 2px;
      }
    }
    .ctrlBtn {
      width: 250px;
      height: 35px;
      position: absolute;
      z-index: 999;
      left: 50%;
      top: 132px;
      transform: translateX(-50%);
      border-radius: 17px;
      box-shadow: 0 0 10px 2px #9bd9ed;
      img {
        width: 100%;
        height: 100%;
        border-radius: 17px;
      }
    }
    .login-container {
      width: 100%;
      box-sizing: border-box;
      padding: 25px;
      background-color: #fff;
      .login-face {
        width: 100%;
        height: 255px;
        background-color: white;
        box-shadow: 4px 4px 10px 3px #95a4d3;
        border-radius: 10px;
        h1 {
          font-size: 24px;
          padding: 25px 0;
          margin-left: 25px;
          letter-spacing: 3px;
        }
        h3 {
          font-size: 12px;
          letter-spacing: 1px;
          margin-left: 25px;
        }
        .van-cell-group {
          padding: 0 8px;
          .van-field {
            margin-bottom: 20px;
            border-bottom: 2px solid #d3dfef;
            img {
              width: 20px;
              height: 20px;
            }
          }
        }
        .forget-pwd {
          font-size: 12px;
          font-weight: bold;
          color: #6078ea;
          float: right;
          margin-right: 20px;
        }
      }
      .login-submit {
        width: 100%;
        height: 50px;
        display: flex;
        margin-top: 28px;
        justify-content: space-between;
        align-items: center;
        .van-checkbox {
          margin-left: 15px;
        }
        .submit-btn {
          width: 165px;
          height: 50px;
          // box-shadow: 2px 2px 10px #9edaed;
          position: relative;
          img {
            width: 100%;
            height: 100%;
            box-shadow: 2px 3px 10px 2px rgba(31, 156, 255, 0.84);
            border-radius: 8px;
          }
          .van-button span::before {
            position: absolute;
            bottom: -20%;
            left: 5%;
            content: "";
            width: 90%;
            height: 90%;
            background-color: rgba(31, 156, 255, 0.84);
            border-radius: 30%;
            z-index: -1;
            filter: blur(7px);
          }
        }
      }
      .van-divider {
        margin-top: 45px;
      }
      .otherLogin {
        width: 100%;
        display: flex;
        justify-content: space-around;
        img {
          width: 40px;
          height: 40px;
        }
      }
    }
  }
}
</style>
