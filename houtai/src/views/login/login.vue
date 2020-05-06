<template>
  <div class="mylogin">
    <!-- 背景图 -->
    <bgCanvas></bgCanvas>
    <!-- 动态时间 -->
    <timeSvg class="mytime"></timeSvg>
    <!-- 登录模块 -->
    <div class="login-wrap">
      <el-form
        :model="ruleForm"
        :rules="rules"
        status-icon
        ref="ruleForm"
        label-width="100px"
        class="loginform"
      >
        <h1>
          <img :src="require('assets/images/1.jpg')" alt="" />积云后台管理
        </h1>
        <el-form-item prop="userName" label-width="0">
          <el-input
            type="text"
            v-model="ruleForm.userName"
            autocomplete="off"
            placeholder="用户名"
            clearable
            v-myfocus
          >
            <template #prepend>
              <i class="el-icon-user-solid"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password" label-width="0">
          <el-input
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
            placeholder="密码"
            show-password
            v-myfocus
          >
            <template #prepend>
              <i class="el-icon-lock"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item class="veri" prop="veri" label-width="0">
          <el-input
            type="text"
            v-model="ruleForm.veri"
            autocomplete="off"
            placeholder="请输入验证码"
            clearable
            v-myfocus
          >
            <template #prepend>
              <i class="el-icon-lock"></i>
            </template>
            <template #append>
              <div class="veriCon">
                <veriCanvas></veriCanvas>
              </div>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item class="formBtns" label-width="0">
          <el-button type="primary" @click="submitForm('ruleForm')"
            >登录</el-button
          >
          <el-button
            type="danger"
            size="small"
            round
            @click="resetForm('ruleForm')"
            >重置</el-button
          >
          <el-button type="success" @click="onReg">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import bgCanvas from "components/bgCanvas";
import timeSvg from "components/timeSvg";
import veriCanvas from "components/veriCanvas";
export default {
  name: "mylogin",
  components: {
    bgCanvas,
    timeSvg,
    veriCanvas
  },
  data() {
    return {
      bodyBgImage: [
        "url(" + require("assets/images/banner1.jpg") + ")",
        "url(" + require("assets/images/banner2.jpg") + ")",
        "url(" + require("assets/images/banner3.jpg") + ")",
        "url(" + require("assets/images/banner4.jpg") + ")",
        "url(" + require("assets/images/banner5.jpg") + ")"
      ],
      ruleForm: {
        userName: "",
        password: "",
        veri: ""
      },
      rules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 20,
            message: "用户名为20个有效英文及数字、下划线",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            message: "密码长度为6位以上！",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    // 提交登录
    submitForm() {
      this.axios({
        url: "/VueHandler/AdminLoginAndRegHandler",
        method: "get",
        params: {
          action: "checkVerification",
          veri: this.ruleForm.veri
        }
      }).then(res => {
        console.log(res);
        if (res.data.err) {
          this.$message.error("验证码错误");
        } else {
          // 登录
          this.turnLogin();
        }
      });
    },
    // 登录接口地址
    turnLogin() {
      this.axios
        .post("/VueHandler/AdminLoginAndRegHandler?action=login", {
          userName: this.ruleForm.userName,
          password: this.ruleForm.password
        })
        .then(res => {
          console.log(res);
          if (res.data.err) {
            this.$message.error(res.data.err);
          } else {
            this.$message.success("登录成功正在跳转主页");
            setTimeout(() => {
              this.$router.push("/index");
            }, 1000);
          }
        });
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 跳转注册地址
    onReg() {
      location.href = "http://localhost:3000/addAdmin.html";
    },
    // 添加body图片
    setBodyBackGround(i) {
      document.body.style.backgroundSize = "100% 100%";
      document.body.style.backgroundRepeat = "no-repeat";
      document.body.style.backgroundImage = this.bodyBgImage[i];
    },
    // 清除背景图
    clearBodyBackGround() {
      document.body.style.backgroundImage = "";
    }
  },
  // 自定义全局foucus指令
  directives: {
    myfocus(el) {
      let minput = el.querySelector("input");
      minput.onfocus = function() {
        el.children[0].children[0].style.color = "blue";
      };
      minput.onblur = function() {
        el.children[0].children[0].style.color = "";
      };
    }
  },
  mounted() {
    // 进来的时候调用添加
    this.setBodyBackGround(Math.floor(Math.random() * 5));
  },
  beforeDestroy() {
    // 离开页面的时候清除
    this.clearBodyBackGround();
  }
};
</script>

<style lang="less" scoped>
.mylogin {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .mytime {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 500px;
    height: 200px;
    z-index: 100;
  }
  .login-wrap {
    position: absolute;
    top: 50%;
    left: 50%;
    background-color: rgba(127, 138, 87, 0.5);
    transform: translate(-50%, -50%);
    border-radius: 50px;
    .loginform {
      width: 25vw;
      padding: 50px;
      i {
        font-size: 20px;
      }
      h1 {
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        img {
          width: 60px;
          height: 60px;
          margin-right: 30px;
          border-radius: 20px;
        }
      }
      .veri {
        width: 88%;
      }
      .formBtns {
        .el-button--primary {
          width: 35%;
          margin-right: 40px;
        }
      }
    }
  }
}
</style>
