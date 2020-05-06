<template>
    <div class="shoppingcart">
       
        <div class="shoppingcart-head">
            <div class="head-img" @click="goBack">
                <img src="../../../static/img/d2.png" >
                &nbsp;

                取消
            </div> 
            <div class="head-yhu">用户登录</div>
        </div>
        
        <div class="shoppingcart-count">
            <div class="shoppingcart-user">

                <input type="text" placeholder="请输入用户名/邮箱/手机号" v-model="phone" />
                <img src="../../../static/img/d3.png" alt="">

            </div>
            <div class="shoppingcart-pwd">

                <input type="password" placeholder="请输入密码" v-model="pwd" />
                <img src="../../../static/img/d4.png" alt="">

            </div>
        <button type="button" @click="register" >登录</button>
        </div>

         <div class="shoppingcart-stern">
            <router-link tag="div" to="/zhuce">
                <div class="zce">
                    快速注册
                </div>
            </router-link>
            
            <router-link tag="div" to="/wangjipwd">
                <div class="wjmma">
                    忘记密码?
                </div>
            </router-link>
         </div>
    </div>
</template>

<script>
   import axios from 'axios'
   import { Toast } from 'mint-ui'
   import zhuce from '../zhuce/zhuce'
   import wangjipwd from '../wangjipwd/wangjipwd'

   export default {
       name:"shoppingcart",
       data(){
           return {
               phone:"",
               pwd:""
           }
       },
       components:{
          zhuce,
          wangjipwd,
       },
       created(){
           
       },
       methods:{
           goBack(){
               this.$router.push("/home")
           },
           register(){
                let de = this;
                const {phone,pwd} = this;
                if(!this.phone){
                    Toast("请输入手机号")
                    return
                }else if(!this.pwd){
                    Toast("请输入密码")
                    return
                }else{
                    let sjhao = /^1(3|4|5|6|7|8|9)\d{9}$/;
                    if(!sjhao.test(this.phone)){
                        let cellphone = Toast("请输入正确的手机号")
                        setTimeout(()=>{
                            cellphone.close()
                        },1000)
                        return
                    }
                }
                let url = "http://127.0.0.1:83/postLogin";
                axios.post(url,{phone:this.phone,pwd:this.pwd}).then(res=>{
                    console.log("res:",res)
                    if(res.data.success === 0){
                        sessionStorage.token = res.data.token;//登录成功就把token存到sessionStorage中
                        sessionStorage.phone=this.phone;//
                        sessionStorage.pwd=this.pwd;
                        de.$router.push('/home')
                    }
                }).catch(err=>{
                    console.log("err:",err)
                })
           }

       }
   }

</script>

<style scoped>
    .shoppingcart{
        height: 41.6875rem;
    }
   .shoppingcart-head{
       box-sizing: border-box;
       overflow: hidden;
       background:white; 
       width: 100%;
       display: flex;
       padding: .9375rem .9375rem ;
   }
   .head-img{
       font-size: .875rem;
       line-height: 1.125rem;
   }
   .head-img img{
       vertical-align: middle;
       width: .5rem;
       height: .9375rem;
   }
   .head-yhu{
       margin-left: 6.25rem;
   }

   .shoppingcart-count{
       position: relative;
       background: white;
       margin-top: 1.6875rem;
   }
    
   .shoppingcart-user input,
   .shoppingcart-pwd input{
       box-sizing: border-box;
       overflow: hidden;
       border: solid 1px white;
       font-size: .875rem;
       text-indent: 1.875rem;
       width: 100%;
       padding: 1rem 1rem;
   }
   .shoppingcart-user{
       border-bottom: solid .0625rem #f8f8f8;
   }
   .shoppingcart-user img{
       width: 1.5rem;
       height: 1.5rem;
       position:absolute;
       top: .8125rem;
       left: .625rem;
   }
   .shoppingcart-pwd img{
       width: 1.5rem;
       height: 1.5rem;
       position:absolute;
       top: 3.9375rem;
       left: .625rem;
   }

   button{
       margin-left: 2.5%;
       display: inline-block;
       width: 95%;
       padding: .8125rem 0;
       background: black;
       border: solid .0625rem black;
       border-radius:.3125rem; 
       color: white;
       text-align: center;
       margin-top: 1.6875rem;
   }

   .shoppingcart-stern{
       font-size: .875rem;
       display: flex;
       justify-content: space-between;
       overflow: hidden;
       box-sizing: border-box;
       padding: .9375rem .5625rem;
   }
</style>
