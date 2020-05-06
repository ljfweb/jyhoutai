<template>
    <div class="mei">

        <tab></tab>
         <!-- 标题 -->
         <div class="mei-title">个人中心 </div>
         
         <div class="mei-content">
              
              <!-- 头部 -->
            <div class="mei-content-head">
                
               <div class="mei-head-avatar">
                  <img src="../../../static/img/g1.png" alt="">
               </div>
                <!-- 用户 -->
               <div class="mei-head-info">
                   <div>{{arr}}</div>
                   <div>用户注册</div>
               </div>

            </div>

               <!-- 全部订单 -->
               <router-link tag="div" to="/dingdan">
                    <div class="mei-item">
                        <img class="item-icon" src="../../../static/img/g8.png" alt="">
                        <div class="item-name">我的订单</div>
                        <div class="item-desc">查看全部订单</div>
                        <img class="item-arrow" src="../../../static/img/g10.png" alt="">
                    </div>
               </router-link>
               
               <!-- 待收货，待发货 -->
               <div class="mei-profile-menu">

                   <router-link tag="div" to="/dfukuan">
                       <div class="menu-item">
                           <img class="item-icon" src="../../../static/img/g11.png" alt="">
                           <div class="item-text">待付款</div>
                       </div>
                   </router-link>

                   <router-link tag="div" to="/dfahuo">
                       <div class="menu-item">
                           <img class="item-icon" src="../../../static/img/g14.png" alt="">
                           <div class="item-text">待发货</div>
                       </div>
                   </router-link>

                   <router-link tag="div" to="/dshouhuo">
                       <div class="menu-item">
                           <img class="item-icon" src="../../../static/img/g13.png" alt="">
                           <div class="item-text">待收货</div>
                       </div>
                   </router-link>

                   <router-link tag="div" to="/dpingjia">
                       <div class="menu-item">
                           <img class="item-icon" src="../../../static/img/g12.png" alt="">
                           <div class="item-text">待评价</div>
                       </div>
                   </router-link>

               </div>
               
                <!-- 我的收藏 -->
                <router-link tag="div" to="/shoucang">
                    <div class="mei-profile-item">
                        <img class="item-icon" src="../../../static/img/g7.png" alt="">
                        <div class="item-name">我的收藏</div>
                        <img class="item-arrow" src="../../../static/img/g10.png" alt="">
                    </div>
                 </router-link>
               
                <!-- 收货地址 -->
                <router-link tag="div" to="/dizhi">
                    <div class="mei-profile-item">
                        <img class="item-icon" src="../../../static/img/g4.png" alt="">
                        <div class="item-name">收货地址</div>
                        <img class="item-arrow" src="../../../static/img/g10.png" alt="">
                    </div>
                 </router-link>
               
                <!-- 我的积分-->
                <router-link tag="div" to="/jifen">
                    <div class="mei-profile-item">
                        <img class="item-icon" src="../../../static/img/g9.png" alt="">
                        <div class="item-name">我的积分</div>
                        <img class="item-arrow" src="../../../static/img/g10.png" alt="">
                    </div>
                 </router-link>
               
                <!-- 我的红包 -->
                <router-link tag="div" to="/hongbao">
                    <div class="mei-profile-item">
                        <img class="item-icon" src="../../../static/img/g6.png" alt="">
                        <div class="item-name">我的红包</div>
                        <img class="item-arrow" src="../../../static/img/g10.png" alt="">
                    </div>
                 </router-link>
               
                <!-- 我的推荐 -->
                <router-link tag="div" to="/tuijian">
                    <div class="mei-profile-item">
                        <img class="item-icon" src="../../../static/img/g3.png" alt="">
                        <div class="item-name">我的推荐</div>
                        <img class="item-arrow" src="../../../static/img/g10.png" alt="">
                    </div>
                 </router-link>
               
                <!-- 我的资金 -->
                 <router-link tag="div" to="/zijin">
                    <div class="mei-profile-item">
                        <img class="item-icon" src="../../../static/img/g2.png" alt="">
                        <div class="item-name">我的资金</div>
                        <img class="item-arrow" src="../../../static/img/g10.png" alt="">
                    </div>
                 </router-link>
               
                <!-- 使用帮助 -->
                <router-link tag="div" to="/bangzhu">
                    <div class="mei-profile-item">
                        <img class="item-icon" src="../../../static/img/g5.png" alt="">
                        <div class="item-name">使用帮助</div>
                        <img class="item-arrow" src="../../../static/img/g10.png" alt="">
                    </div>
                 </router-link>
               
                <!-- 修改密码-->
                <router-link tag="div" to="/mima">
                    <div class="mei-profile-item">
                        <img class="item-icon" src="../../../static/img/g5.png" alt="">
                        <div class="item-name">修改密码</div>
                        <img class="item-arrow" src="../../../static/img/g10.png" alt="">
                    </div>
                 </router-link>

        
         </div>
                <div @click="loginout" class="profile-submit">
                     退出登录
                </div>

        
    </div>
</template>

<script>
    import tab from '../tab/tab'
    import dingdan from '../dingdan/dingdan'
    import dfukuan from '../dfukuan/dfukuan'
    import dfahuo from '../dfahuo/dfahuo'
    import dshouhuo from '../dshouhuo/dshouhuo'
    import dpingjia from '../dpingjia/dpingjia'
    import shoucang from '../shoucang/shoucang'
    import dizhi from '../dizhi/dizhi'
    import jifen from '../jifen/jifen'
    import tuijian from '../tuijian/tuijian'
    import zijin from '../zijin/zijin'
    import bangzhu from '../bangzhu/bangzhu'
    import mima from '../mima/mima'

    export default {
        name:"mei",
        data(){
            return {
                arr:sessionStorage.phone
            }
        },
        components:{
           dingdan,
           dfukuan,
           dfahuo,
           dshouhuo,
           dpingjia,
           shoucang,
           dizhi,
           jifen,
           tuijian,
           zijin,
           bangzhu,
           mima,
           tab
        },
        methods:{
            loginout(){
                console.log(123456789)
                sessionStorage.removeItem("token");
                // sessionStorage.removeItem("userId");
                sessionStorage.removeItem("phone");
                sessionStorage.removeItem("pwd");
                this.phone2=this.phone=this.pwd="";
                this.$router.push("/shoppingcart");
            }
        },


    }



</script>

<style scoped>
    .mei{
        width: 100%;
        background: #f2f2f2;
        padding: 0 0 3.125rem 0;
    }
    .mei-title{
        background: white;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        text-align: center;
        font-size: .875rem;
        padding: .9375rem 0;
    }
    .mei-content{
        background: white;
        margin-top: 2.875rem;
        width: 100%;
    }
    
    .mei-content-head{
        padding: 1.25rem 0;
        background: #125F8D;
        display: flex;
    }
    .mei-head-avatar{
        margin-left: 1.5rem;

    }
    .mei-head-avatar img{
       width: 3.875rem;
       height: 3.875rem;
    }
    .mei-head-info div{
        color: white;
        margin-top: .5rem;
        font-size: .875rem;
    }
    .mei-head-info{
        margin-left: .75rem;
    }
    
    .mei-item,
    .mei-profile-item{
        border-top: solid 1px #f8f8f8;
        box-sizing: border-box;
        overflow: hidden;
        padding: .9375rem .9375rem;
        width: 100%;
        display: flex;
        font-size: .875rem;
    }
    .mei-item .item-icon,
    .mei-profile-item .item-icon{
        vertical-align: middle;
        width: 1.5rem;
        height: 1.5rem;
    }
    .item-name{
        
        margin-left: 1.25rem;
        line-height: 1.5rem;
    }
    .item-desc{
        margin-left: 8.875rem;
        line-height: 1.5rem;
        color: #888888;
    }
   
    .mei-item .item-arrow,
    .mei-profile-item .item-arrow{
        vertical-align: middle;
        width: .375rem;
        height: .75rem;
        margin-left: .8125rem;
        margin-top: .4375rem;

    }
    .mei-profile-menu{
        padding: 1.25rem 0;
        width: 100%;
        display: flex;
        justify-content: space-around;
        border-top: solid .0625rem #f8f8f8;

    }
    .menu-item .item-icon{
        margin-left: .375rem;
        width: 1.5rem;
        height: 1.5rem;
    }
    .mei-profile-item{
         display: flex;
    }

    .item-text{
        margin-top: .1875rem;
        font-size: .75rem;
    }
    
    .mei-profile-item .item-arrow{
        padding: 0 0 0 14rem;
    }
    
    .profile-submit{
        /* margin: .625rem 0 .9375rem 0; */
        display: block;
        height: 2.75rem;
        margin-top: .625rem;
        box-sizing: border-box;
        border: none;
        border-radius: .25rem;
        overflow: hidden;
        background-color: #404245;
        color: #ffffff;
        font-size: .875rem;
        font-weight: normal;
        line-height: 2.75rem;
        text-align: center;
    }
</style>