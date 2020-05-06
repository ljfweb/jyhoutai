<template>
  <div class="content">
    <bg-canvas> </bg-canvas>
    <div class="wrap">
      <h1>积云后台管理</h1>
      <div class="login_wrap">
        <el-input placeholder="用户名"
                  v-model="username">
          <template slot="prepend">
            <i class="el-icon-user-solid"></i>
          </template>
        </el-input>
        <el-input placeholder="密码"
                  v-model="password">
          <template slot="prepend">
            <i class="el-icon-turn-off"></i>
          </template>
        </el-input>
        <div class="veri">
          <el-input placeholder="验证码"
                    v-model="veri">
            <template slot="prepend">
              <i class="el-icon-platform-eleme"></i>
            </template>
          </el-input>
          <div class="myveri">
            <veri></veri>
          </div>
        </div>
        
      </div>
      <div class="btn_wrap">
        <el-button type="danger">忘记密码</el-button>
        <el-button type="success"
                   @click="checkVeri">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import bgCanvas from "../components/bgCanvas";
import Veri from "../components/veri";
export default {
  name: "login",
  components: { bgCanvas,Veri},
  data () {
    return {
      username: "",
      password: "",
      veri: ""
    };
  },
  methods: {
    login(){
      this.axios({
        url: "/VueHandler/AdminLoginAndRegHandler?action=login",
        method: "post",
        data:{
          userName:this.username,
          password:this.password
        }
      }).then(res=>{
        console.log(res);
        if(res.data.err){
          this.$message.error(res.data.err);
        }else{
          this.$message.success("登录成功正在跳转主页");
          location.href = "/index";

        }
      })
    },

    checkVeri(){
      console.log(this.veri);
      this.axios({
        url:"/VueHandler/AdminLoginAndRegHandler",
        method:"get",
        params:{
          action: "checkVerification",
          veri: this.veri
        }
      }).then(res=>{
        console.log(res);
if(res.data.err){
  this.$message.error("验证码错误");

}else{
  this.login()
}
      })
    }
  }

};
</script>

<style scoped lang="less">
.content {
  background: #0d1953;
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
</style>
