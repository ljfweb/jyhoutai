<template>
  <div id="loginbg">
    <background> </background>
    <el-row>
      <el-col :span="8"><div class="grid-content bg-purple-light"></div></el-col>
      <el-col :span="8" class="centerinput">
        <el-form style="font-size: 32px;text-align: center;padding: 5px;"> Login</el-form>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="用户名" prop="user">
            <el-input v-model="ruleForm.user" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="verification" class="veriWidth"> <el-input v-model="ruleForm.verification" autocomplete="off"></el-input><veri-com></veri-com> </el-form-item>
          <el-form-item>
            <el-button type="success" @click="submitForm('ruleForm')">点击登录</el-button>
            <el-button type="primary" @click="resetForm('ruleForm')">申请账号</el-button>
            <el-button type="danger" @click="resetForm('ruleForm')">忘记密码</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="8"><div class="grid-content bg-purple-light"></div></el-col>
    </el-row>
  </div>
</template>

<script>
import VeriCom from '../components/veriStr.vue';
import background from '../components/background';
export default {
  components: {
    VeriCom,
    background,
  },
  data() {
    return {
      ruleForm: {
        user: '',
        password: '',
        verification: '',
      },
      rules: {
        user: [{ trigger: 'blur' }],
        password: [{ trigger: 'blur' }],
        verification: [{ trigger: 'blur' }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.checkVeriString();
          console.log(this.$refs.ruleForm.model);
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    async checkVeriString() {
      //检验登录验证码
      const { data: res } = await this.axios({
        url: '/VueHandler/AdminLoginAndRegHandler?action=checkVerification',
        method: 'get',
        params: {
          veri: this.$refs.ruleForm.model.verification,
        },
      });
      console.log(res);
      if (res.err) return this.$message.error(res.success);
      if (res.success) {
        this.$message.success(res.success);
        this.loginCheck(); //登录方法调用
      }
    },
    //登录方法
    async loginCheck() {
      const { data: res } = await this.axios({
        url: '/VueHandler/AdminLoginAndRegHandler?action=login',
        method: 'post',
        data: {
          userName: this.$refs.ruleForm.model.user,
          password: this.$refs.ruleForm.model.password,
        },
      });
      if (res.err) return this.$message.error(res.err);
      if (res.success) {
        this.$message.success(res.success);
        sessionStorage.user = this.$refs.ruleForm.model.user;
        this.$router.push({ name: 'home', query: { user: this.$refs.ruleForm.model.user } });
      }
    },
  },
};
</script>
<style lang="less" scoped>
#loginbg {
  position: relative;
  width: 100vw;
  height: 100vh;
}
.el-row {
  width: 100vw;
  position: absolute;
  top: 30%;
  margin-bottom: 20px;
}
.centerinput {
  background-color: gainsboro;
  padding: 20px;
  box-sizing: border-box;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.veriWidth {
  width: 300px;
}
</style>
