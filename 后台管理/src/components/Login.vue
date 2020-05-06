<template>
  <div class="login_container">
  <!-- <bg-canvas/> 背景-->
    <div class="login_box">
      <div class="avatar_box">
        <img src="../assets/login.jpg">
      </div>
    <!-- 登录标题 -->
    <!-- 登录表单区域 -->
    <el-form class="login_from" :model="loginFrom" :rules="login_from_rules" ref="login_from_ref"  >
      <!-- 用户名 -->
      <el-form-item prop="userName">
        <el-input prefix-icon="el-icon-user-solid" v-model="loginFrom.userName"></el-input>
      </el-form-item>
      <!-- 密码 -->
       <el-form-item prop="password">
        <el-input prefix-icon="el-icon-s-order" v-model="loginFrom.password" type="password"></el-input>
      </el-form-item>
      <!-- 验证码区域 -->
      <el-form-item class="Vcode_input" inline=true>
         <el-col :span="12" >
           <el-input prefix-icon="el-icon-s-order" v-model="veri" ></el-input>
        </el-col>
        <!-- 验证码 -->
        <el-col :span="12">
           <Vcode/>
        </el-col>
      </el-form-item>
      <!-- 按钮区域 -->
     <el-form-item class="btns">
         <el-button type="primary" @click="Vcode(veri)">登录</el-button>
          <el-button type="info" @click="resetloginfrom">重置</el-button>
      </el-form-item>
    </el-form>
    </div>
  </div>
</template>

<script>
// import bgCanvas from "./bgCanvas.vue"
import Vcode from "./Vcode"

export default {
components:{Vcode},
data () {
  return {
    // 登录表单数据对象
    loginFrom:{
      userName:"Max_Uncle",
      password:"123456"
    },
    veri:"",
    // 表单的验证规则
    login_from_rules:{
      //用户的验证规则
      userName:[
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 3, max: 99, message: '长度在 3 到 5 个字符', trigger: 'blur' }
      ],
      //密码的验证规则
      password:[
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, max: 15, message: '长度在 3 到 5 个字符', trigger: 'blur' }
      ]
    }
  }
},
methods: {
  // 重置点击
  resetloginfrom(){
    // console.log(this.$refs.login_from_ref.resetFields)
    this.$refs.login_from_ref.resetFields();
    console.log()
  },
    // 点击登录,判断验证码正确，调用login()
    Vcode(veri){
      console.log(this.$refs)
      this.$refs.login_from_ref.validate(valid=>{
        if(!valid) return;
      this.axios.get("/VueHandler/AdminLoginAndRegHandler?action=checkVerification",{params:{veri: veri}})
      .then(res => {
        console.log(res)
        res.data.success !== "验证码正确" ? alert(res.data.err) : this.login()
      })
      .catch(err => {
        console.error(err);
      })
      })
    },
  // 登录
  login(){
    this.axios.post("/VueHandler/AdminLoginAndRegHandler?action=login",this.loginFrom)
    .then(res => {
      console.log(res)
      res.data.success == "true" ? this.$router.push("home"):alert(res.data.err)
    })
    .catch(err => {
      console.error(err);
    })
  }
},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.login_container {
  background-color:lightblue;
  height: 100%;
}
.login_box{
  background-color:#fff ;
  width: 500px;
  height: 350px;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  //transform属性允许你旋转，缩放，倾斜或平移给定元素
  .avatar_box{
    width: 130px;
    height: 130px;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;// ?
    position: absolute;
    left: 50%;
    transform: translate(-50%,-50%);//    ?
    background-color: #fff;
    img{
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color:#ccc ;
    }
  }
  
}
.Vcode{width: 10px;}
//表单
.login_from{
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing:border-box ;
}
//按钮
.btns{
  display: flex;
  justify-content: flex-end;
}
</style>
