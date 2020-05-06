<template>
    <div class="regs">
        <van-nav-bar title="京东注册" left-text="返回" left-arrow></van-nav-bar>
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
    <van-button round type="info" class="reg" @click="reg">注册</van-button>
    
    </div>
    </div>
</template>
<script>

export default{
name:"reg",
data(){
    return{
        username:"",
        password:""
    }
},
methods:{
    reg(){
        this.axios.post("/api/checkuser",{
            username:this.username,
        }).then(res=>{
            console.log(res);
            if(res.data.code==400){
                this.$Toast.fail('用户名已存在');
            }else{
                this.axios.post("/api/register",{
                    username:this.username,
                    password:this.password
                }).then(res=>{
                    if(res.data.code==200){
                        this.$Toast.success("注册成功")
                        console.log(res);
                        location.href="/login"
                    }else{
                        this.$Toast.fail('注册失败');
                    }

                })
            }
            
        })
    }
}


}
</script>  
<style lang="less">
.regs .van-nav-bar{
 background: white;
    
}
</style>