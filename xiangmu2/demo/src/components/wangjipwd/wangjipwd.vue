<template>

   <div class="wangjipwd">
         <div class="wangjipwd-head">
            <div class="head-img" @click="goBack">
                <img src="../../../static/img/d2.png" >
                &nbsp;

                返回
            </div> 
            <div class="wangjipwd-yhu">找回密码</div>
        </div>
        
        <div class="wangjipwd-fangshi">
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
                 <input class="onet" type="text" placeholder="请输入手机号">
                 <input class="twot" type="text" placeholder="请输入手机验证码">
                 <button type="button" class="btn1">获取验证码</button>
             </div>
             <div class="count-one">
                 <input class="onet" type="text" placeholder="设置密码">
                 <input class="twot" type="text" placeholder="确认密码">
             <div class="yqiu">6-20位数字/子母/符号</div>
             </div>

             <button class="zce">注册</button>
             <!-- <p>点击注册表示同意<a>《用户协议》</a></p> -->

         </div>
          
          <!-- 邮箱 -->
         <div class="email-count" v-show="show" >
            
             <div class="email-one">
                 <input class="sru" type="text" placeholder="请输入您的邮箱">
                 <div class="yqiu">我们将发送密码修改链接到您绑定的邮箱</div>
             </div>
             

             <button class="zce" type="button">发送邮件</button>
         </div>
   </div>

</template>

<script>

    export default {
        name:"wangjipwd",
        data(){
            return {
                show:false
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
            }
        }
    }

</script>

<style scoped>
   
    .wangjipwd{
         height: 41.6875rem;
     }
    .wangjipwd-head{
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
    .wangjipwd-yhu{
       margin-left: 100px;
    }
    .wangjipwd-fangshi{
       box-sizing: border-box;
       overflow: hidden;
       margin-top: 5px;
       background: white;
       /* padding: 12px 0; */
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
        font-size: .875rem;
        margin-top: .625rem;
        text-align: center;
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
        /* margin-top: 27px; */
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
        border: solid .0625rem white;
        width: 100%;
        margin: 3.125rem 0 0 0;
        padding: .9375rem 0;
        text-indent: 1.25rem;
        font-size: .875rem;

    }
    .tyi{
        font-size: .875rem;
        text-align: center;
    }
    .phone,
    .email{
        display: inline-block;
        line-height: 2.8125rem;
        height:2.8125rem;
        width: 5.625rem;
        text-align: center;
        margin-left: 2.8125rem;
    }

    .fangshi:hover{
        width: 50%;
          border: solid .0625rem goldenrod;
    }
     .fangshi{
         width: 50%;
     }
</style>

