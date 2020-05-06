<template>
    <div class="login">
      <van-nav-bar
		  title="京东登录注册"
		  left-text="返回"
		  left-arrow
		 
		/>
 <div class="field"> 
<!-- 输入手机号，调起手机号键盘 -->
<van-field 
    v-model="username" 
    label="用户名"
    type="username"
    placeholder="请输入用户名" 
    />

<!-- 输入密码 -->
<van-field 
    v-model="password" 
    label="密码"
    type="password"
    placeholder="请输入密码" 
    />
    <van-button round type="info" class="log" @click="log">登录</van-button>
    <van-button round type="info" class="one_log">一键登录</van-button>
    </div>
    </div>

</template>
<script>
export default{
    name:"login",
    mounted(){
        
    },
    data(){
        return{
           username:"",
           password:""
        }
    },
    methods:{
      log(){
          this.axios.post("/api/login",{
            username:this.username,
            password:this.password
        }).then(res=>{
            console.log(res);
              if(res.data.code==400){
					 this.$Toast.fail("登录失败")  
				   }else{
					   this.$Toast.success("登录成功")
					   localStorage.token=res.data.token;
					   location.href="/home";
				   }
				   
        })
      }

    }
    
    

}
</script>
<style lang="less">

.login .van-nav-bar{
    background: white;
    
}
.field{
    
    width: 80%;
    margin: auto;
    margin-top: 50px;
}
.van-button{
    width: 100%;
    height: 50px;
    margin: 10px 0px;
    font-size: 20px;
}
.log{
    background: #fab3b3;
    color:white;
}
.one_log{
    background: white;
    color: #fab3b3;
    border: 2px solid #fab3b3;
}
</style>