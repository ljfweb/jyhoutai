// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import "./assets/icon/iconfont.css"
import "./assets/css/normalize.css"

import NProgress from 'nprogress' //进度条
import './assets/css/nprogress.css' //样式

Vue.config.productionTip = false

import mint from "mint-ui"
import "../node_modules/mint-ui/lib/style.css"
import {Swipe,SwipeItem} from "mint-ui" 
Vue.use(mint)

Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

// router.beforeEach((to, from, next) => {
//   NProgress.start();
//   next()
// });

// router.afterEach(transition => {
// NProgress.done();
// });


import { Toast } from 'mint-ui';
router.beforeEach((to,from,next)=>{
  if(to.meta.isLogin){//判断路由里面有没有isLogin属性,是不是true
    if(sessionStorage.token){//判断有没有token ,两个条件都成立就可以进入你要进入的路由
      //如果有就判断第二个条件
      next();
    }else{//不成立执行
      Toast({
        message: '请先登录',
        position: 'bottom',
        duration: 1000 //弹框出现1秒
      });
      setTimeout(()=>{
        next('/shoppingcart');
      },1100)
    }
  }else{
   //如果没有isLogin属性就不需要登录就可以进入
    next();
  }
})


router.afterEach(() => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
})


NProgress.configure({ showSpinner: false })
router.beforeEach((to, from, next) => { 
     NProgress.start();  
     next()}); 
     
router.afterEach(transition => {
     NProgress.done();
});
