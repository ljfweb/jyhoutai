<template>
  <div class="register">
    <div class="reg-face">
      <h1>注册</h1>
      <h3>在这里输入您的手机号</h3>
      <van-cell-group>
        <van-field
          v-model="uname"
          type="tel"
          maxlength="11"
          @focus="focus(1)"
          @blur="blur(1)"
          :style="
            showColorname ? { 'border-bottom': `2px solid ${boderColor}` } : ''
          "
          clearable
          required
          placeholder="1*******"
          @click-right-icon="$toast('用户名必须是手机号')"
        >
          <template #right-icon>
            <img src="../assets/images/loginicon1.png" alt="" />
          </template>
        </van-field>
        <van-field
          v-model="upwd"
          type="password"
          @focus="focus(2)"
          @blur="blur(2)"
          :style="
            showColorpwd ? { 'border-bottom': `2px solid ${boderColor}` } : ''
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
        <van-field
          v-model="cupwd"
          type="password"
          @focus="focus(3)"
          @blur="blur(3)"
          :style="
            showColorcupwd ? { 'border-bottom': `2px solid ${boderColor}` } : ''
          "
          clearable
          required
          placeholder="请再次确认一遍密码"
          @click-right-icon="$toast('请再次输入密码')"
        >
          <template #right-icon>
            <img src="../assets/images/loginicon3.png" alt="" />
          </template>
        </van-field>
        <van-field
          v-model="veriResult"
          maxlength="6"
          @focus="focus"
          @blur="blur"
          :style="
            showColoryzm ? { 'border-bottom': `2px solid ${boderColor}` } : ''
          "
          clearable
          required
          placeholder="输入验证码"
        >
          <template #right-icon>
            <van-button :disabled="isDisYzm || disable" @click="sendYzm">
              <img
                v-if="countDownFlag"
                class="yamBtn"
                src="../assets/images/login4.png"
                alt=""
              />
              <p v-else>已发送 {{ countDown }} S</p>
            </van-button>
          </template>
        </van-field>
      </van-cell-group>
    </div>
    <div class="reg-submit">
      <div></div>
      <div class="submit-btn">
        <van-button :disabled="isDisabled" :loading="isLoading" @click="regBtn">
          <img src="../assets/images/login5.png" alt="" />
        </van-button>
      </div>
    </div>
    <div class="protocol">
      <span>注册即代表您同意</span>
      <span class="user-protocol" @click="$toast('用户协议')">
        &lt;&lt;XXX商城用户协议&gt;&gt;
      </span>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex"; //引入vuex
export default {
  name: "register",
  data() {
    return {
      uname: "",
      upwd: "",
      cupwd: "",
      countDown: 0, //倒计时
      countDownFlag: true, //验证码倒计时锁
      veriResult: null, //返回前端的验证码
      showColorname: false,
      showColorpwd: false,
      showColorcupwd: false,
      showColoryzm: false,
      boderColor: "#5d74e2",
      disable: false, //禁止触发
      isLoading: false //注册loading
    };
  },
  computed: {
    // 手机号码验证
    phoneNumberRight() {
      // 1.1 当输入的手机号大于10位进行验证
      if (this.uname.length > 10) {
        return /[1][3,4,5,6,7,8][0-9]{9}$/.test(this.uname);
      } else {
        return true;
      }
    },
    // 验证码按钮状态
    isDisYzm: {
      get() {
        if (this.uname.length > 10 && this.phoneNumberRight) {
          return false;
        } else {
          return true;
        }
      },
      set(val) {
        this.disable = val;
      }
    },
    // 生成指定长度的随机数
    randomCode() {
      let chars = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
      let result = "";
      for (let i = 0; i < chars.length; i++) {
        let index = Math.ceil(Math.random() * 9);
        result += chars[index];
      }
      return result;
    },
    // 注册按钮状态
    isDisabled() {
      return !this.uname || !this.upwd || !this.cupwd || !this.veriResult
        ? true
        : false;
    }
  },
  methods: {
    // 同步用户登录的token
    ...mapActions(["setUserToken", "setMyIsLogin"]),
    focus(e) {
      if (e == 1) {
        this.showColorname = !this.showColorname;
      } else if (e == 2) {
        this.showColorpwd = !this.showColorpwd;
      } else if (e == 3) {
        this.showColorcupwd = !this.showColorcupwd;
      } else {
        this.showColoryzm = !this.showColoryzm;
      }
    },
    blur(e) {
      if (e == 1) {
        this.showColorname = !this.showColorname;
      } else if (e == 2) {
        this.showColorpwd = !this.showColorpwd;
      } else if (e == 3) {
        this.showColorcupwd = !this.showColorcupwd;
      } else {
        this.showColoryzm = !this.showColoryzm;
      }
    },
    // 发送验证码
    async sendYzm() {
      this.countDown = 60;
      let timer = setInterval(() => {
        this.countDown--;
        this.countDownFlag = false;
        this.isDisYzm = true;
        if (this.countDown == 0) {
          clearInterval(timer);
          this.countDownFlag = true;
          this.isDisYzm = false;
        }
      }, 1000);
      // 获取验证码
      let res = await this.axios({
        method: "get",
        url:
          "https://www.fastmock.site/mock/d740fc2fd5f677d40dcfabc7b78132d4/api/verifycode",
        params: {
          phoneNumber: this.uname
        }
      });
      // console.log(res);
      if (res.data.success_code == 200) {
        this.veriResult = res.data.data.code;
        // 4.3  获取验证码成功
        this.$Dialog.alert({
          title: "温馨提示",
          message: "验证码 " + res.data.data.code
        });
      }
    },
    // 点击注册按钮
    async regBtn() {
      if (this.upwd !== this.cupwd) {
        this.$toast("二次密码输入不一致");
        return false;
      }
      if (!this.isDisabled) {
        let res = await this.axios({
          method: "post",
          url:
            "https://www.fastmock.site/mock/d740fc2fd5f677d40dcfabc7b78132d4/api/register",
          data: {
            username: this.uname,
            password: this.upwd,
            veri: this.veriResult
          }
        });
        // console.log(res);
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
    }
  },
  mounted() {
    // this.axios({
    //   method: "get",
    //   url:
    //     "/myapi/send_code?phoneNumber=15233335555&Geek-James=11629213359996621717"
    // }).then(res => {
    //   console.log(res);
    // });
  }
};
</script>

<style lang="less" scoped>
.register {
  width: 100%;
  overflow: hidden;
  box-sizing: border-box;
  padding-bottom: 0;
  padding: 25px;
  background-color: #fff;
  .reg-face {
    width: 100%;
    height: 360px;
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
        margin-bottom: 15px;
        border-bottom: 2px solid #d3dfef;
        &:nth-of-type(3) {
          margin-bottom: 6px;
        }
        img {
          width: 140px;
          height: 35px;
          &:not(.yamBtn) {
            width: 20px;
            height: 20px;
          }
        }
        p {
          width: 140px;
          height: 35px;
          line-height: 35px;
          text-align: center;
          background-image: linear-gradient(
            to right,
            #17ead9,
            #36b8e0,
            #5f7aea
          );
          color: white;
          font-size: 16px;
          font-weight: bold;
          border-radius: 16px;
        }
      }
    }
  }
  .reg-submit {
    width: 100%;
    height: 50px;
    display: flex;
    margin-top: 25px;
    justify-content: space-between;
    align-items: center;
    .submit-btn {
      width: 165px;
      height: 50px;
      // box-shadow: 2px 2px 10px #9edaed;
      img {
        width: 100%;
        height: 100%;
        box-shadow: 2px 3px 10px 2px #5e6566c9;
        border-radius: 8px;
      }
    }
  }
  .protocol {
    margin-top: 15px;
    text-align: center;
    color: #666875;
    .user-protocol {
      color: slateblue;
    }
  }
}
</style>
