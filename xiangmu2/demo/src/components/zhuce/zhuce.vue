<template>

   <div class="zhuce">

       <div class="zhuce-head">
                                <!-- 给要点击的图片外部的盒子一个点击事件 -->
            <div class="head-img" @click="goBack" > 
                <img src="../../../static/img/d2.png" >
                &nbsp;

                返回
            </div> 
            <div class="head-yhu">用户注册</div>
        </div>
        
        <div class="zhuce-fangshi">
            <div class="fangshi">
               <span class="phone" @click="add">手机号</span>
            </div>
            <div class="fangshi">
               <span class="email" @click="ass">邮箱</span>
            </div>
        </div>
         

         <!-- 手机号                      !show 不等于show,和show相反,就是显示手机号页面 -->   
         <div class="phone-count" v-show="!show">
             <div class="count-one">
                 <input class="onet" type="text" placeholder="请输入手机号" v-model="phone" />
                 <input class="twot" type="number" placeholder="请输入手机验证码" v-model="cod" />
                 <button  type="button" class="btn1">获取验证码</button>
             </div>
             <div class="count-one">
                 <input class="onet" type="password" placeholder="设置密码" v-model="pwd" />
                 <input class="twot" type="password" placeholder="确认密码" v-model="qrpwd" />
             <div class="yqiu">6-20位数字/子母/符号</div>
             </div>

             <button @click="reg" class="zce">注册</button>
             <p>点击注册表示同意<a>《用户协议》</a></p>

         </div>
          
          <!-- 邮箱 -->
         <div class="email-count" v-show="show" >
             <div class="email-one">
                 <input class="sru" type="text" placeholder="用户名" v-model="user" />
                 <div class="yqiu">3-25位英文与数字</div>
             </div>
             <div class="email-one">
                 <input class="sru" type="password" placeholder="设置密码" v-model="psword" />
                 <input class="sru" type="password" placeholder="确认密码" v-model="qrpsword" />
                 <div class="yqiu">6-20位数字/子母/符号</div>
             </div>
             <div class="email-one">
                 <input class="sru" type="text" placeholder="请输入QQ邮箱" v-model="email" />
                 <div class="yqiu">如:&nbsp;username@company.com</div>
             </div>

             <button class="zce" type="button">注册</button>
             <p class="tyi">点击注册表示同意<a>《用户协议》</a></p>
         </div>

   </div>

</template>

<script>
    import axios from 'axios'
    import {Toast } from 'mint-ui'
    export default {
        name:"zhuce",
        data(){
            return {
                show:false, //show 代表的是邮箱,刚进页面邮箱是false 
                phone:"",
                cod:"",
                pwd:"",
                qrpwd:"",
                user:"",
                psword:"",
                qrpsword:"",
                email:""
            }
        },
        methods:{
           add(){
               this.show = false
           },
           ass(){
               this.show = true 
           },
           goBack(){
               this.$router.go(-1)
           },
           reg(){//手机号注册
            //    let _this = this;
               const {phone,cod,pwd,qrpwd} = this
               if(!this.phone){
                   Toast('请输入手机号')
                   return
               }else if(!this.pwd){
                   Toast('请输入密码')
                   return
               }else if(!this.qrpwd){
                   Toast('请确认密码')
                   return
               }else{
                   let reg = /^1(3|4|5|6|7|8|9)\d{9}$/;
                   if(!reg.test(this.phone)){//正则表达式判断是不是手机号,
                       let instance = Toast('请输入正确手机号')
                          setTimeout(() => {
                              instance.close()
                          },1000)
                          return
                   }
               }

               let url = "http://127.0.0.1:83/addPostObjUser";
               //将输入的信息传给后台
               axios.post(url,{phone:this.phone,pwd:this.pwd,qrpwd:this.qrpwd}).then(res=>{
                   //打印后台返回的数据
                   console.log("res:",res)
                   if(res.data.success === 1){//判断data.success === 1的时候Toast弹出注册成功
                       Toast({ //注册成功弹出
                           message:"注册成功" //message是Toast里面的信息,弹出内容是写
                       });
                       setInterval(()=>{ //三秒后跳到登录界面
                           this.$router.push('/shoppingcart')
                       },3000);
                   }else if(res.data.err === 2){//判断data.err === 2 的时候弹出用户名已存在
                       Toast({ //已注册弹出
                           message:res.data.msg //message是Toast里面的信息,弹出内容是写
                       })
                   }
               }).catch(err=>{//错误弹出
                   console.log('err',err)
               })

           },
           mailbox(){
               let _this = this;
               const {user,psword,qrpsword,email} = this
               if(!this.user){
                   Toast('请输入用户名')
                   return
               }else if(!this.psword){
                   Toast('请输入密码')
                   return
               }else if(!this.qrpsword){
                   Toast('请确认密码')
                   return
               }else if(!this.email){
                   Toast('请输入邮箱')
                   return
               }else{
                   let reg = /^[1-9]\d{7,10}@qq\.com$/;
                   if(!reg.test(this.email)){
                       let instance = Toast('请输入正确邮箱')
                          setTimeout(() => { //判断邮箱不正确后一秒钟后
                              instance.close()
                          },1000)
                          return
                   }
               }
               let url = "http://127.0.0.1:83/addPostObjEmail";
               axios.post(url,{user:this.user,psword:this.psword,qrpsword:this.qrpsword,email:this.email}).then(res=>{
                   console.log("res:",res)
                   if(res.data.success === 1){
                       Toast({
                           message:"注册成功"
                       })
                       setInterval(()=>{
                           this.$router.push('/shoppingcart')
                       })
                   }else if(res.data.err === 2){
                       Toast({
                           message:res.data.msg
                       })
                   }
               }).catch(err=>{
                   console.log("err:",err)
               })

           }

        }
    }
// 910535188@qq.com
</script>

<style scoped>
    .zhuce{
         height: 41.6875rem;
     }
    .zhuce-head{
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
    .zhuce-fangshi{
       box-sizing: border-box;
       overflow: hidden;
       margin-top: .3125rem;
       background: white;
       display: flex;
       justify-content: space-around;
    }
    .count-one{
        margin: 1.875rem 0;
        position: relative;
    }
    .count-one .onet,
    .count-one .twot{
        box-sizing: border-box;
        overflow: hidden;
        width: 100%;
        padding: .8125rem 1rem;
        font-size: .875rem;
        text-indent:.3125rem;
        border: solid .0625rem white;
    }
    .count-one .onet{
         border-bottom: solid .0625rem #f8f8f8;
    }
    .btn1{
        position: absolute;
        top: 3.0625rem;
        left: 18.3125rem;
        font-size: .75rem;
        color: white;
        background: black;
        border: solid .0625rem black;
        border-radius: .625rem;
        padding: .6875rem .625rem;
    }
    .yqiu{
        font-size: .8125rem;
        color: gray;
        margin-top: .625rem;
        margin-left: 1.3125rem;
    }
    .zce{
        margin-left: 2.5%;
        display: inline-block;
        width: 95%;
        padding: .8125rem 0;
        background: black;
        border: solid .0625rem black;
        border-radius:.3125rem; 
        color: white;
        text-align: center;
    }
    p{
        text-align: center;
        font-size: .875rem;
    }
    p a,
    p a{
        text-decoration: underline;
    }
    .email-one{
        padding: 1.25rem 0;
    }
    .sru{
        border: solid 1px white;
        width: 100%;
        padding: .9375rem 0;
        text-indent: 1.25rem;
    }
    .tyi{
        font-size: .875rem;
        text-align: center;
    }
    .phone,
    .email{
        line-height: 2.8125rem;
        height:2.8125rem;
        width: 5.625rem;
        text-align: center;
        margin-left:4.375rem;
    }

    .fangshi:hover{
        width: 50%;
        border: solid .0625rem goldenrod;
    }
     .fangshi{
         width: 50%;
     }
</style>

