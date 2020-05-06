import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

import home from '@/components/home/home'
import classify from '@/components/classify/classify'
import shoppingcart from '@/components/shoppingcart/shoppingcart'
import mei from '@/components/mei/mei'


import indent from '@/components/indent/indent'
import collect from '@/components/collect/collect'

import dingdan from '@/components/dingdan/dingdan'
import dfukuan from '@/components/dfukuan/dfukuan'
import dfahuo from '@/components/dfahuo/dfahuo'
import dshouhuo from '@/components/dshouhuo/dshouhuo'
import dpingjia from '@/components/dpingjia/dpingjia'
import shoucang from '@/components/shoucang/shoucang'
import dizhi from '@/components/dizhi/dizhi'
import jifen from '@/components/jifen/jifen'
import hongbao from '@/components/hongbao/hongbao'
import tuijian from '@/components/tuijian/tuijian'
import zijin from '@/components/zijin/zijin'
import bangzhu from '@/components/bangzhu/bangzhu'
import mima from '@/components/mima/mima'
import sousuo from '@/components/sousuo/sousuo'
import zhuce from '@/components/zhuce/zhuce'
import wangjipwd from '@/components/wangjipwd/wangjipwd'
import spxiangqingone from '@/components/spxiangqingone/spxiangqingone'
import shopping from '@/components/shopping/shopping'
import jiajian from '@/components/jiajian/jiajian'
import mydingdan from '@/components/mydingdan/mydingdan'
import allcommodity from '@/components/allcommodity/allcommodity'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/home'
    },{
      path: '/home',
      component:home,
      meta:{
        isLogin:false
      }
    },{
      path: '/classify',
      name: 'classify',
      component:classify
    },{
      path: '/shoppingcart',
      name: 'shoppingcart',
      component:shoppingcart
    },{
      path: '/mei',
      name: 'mei',
      component:mei,
      meta:{ isLogin:true}
    },{
      path: '/indent',
      name: 'indent',
      component:indent
    },{
      path: '/collect',
      name: 'collect',
      component:collect
    },{
      path: '/dingdan',
      name: 'dingdan',
      component:dingdan
    },{
      path: '/dfukuan',
      name: 'dfukuan',
      component:dingdan
    },{
      path: '/dfahuo',
      name: 'dfahuo',
      component:dfahuo
    },{
      path: '/dshouhuo',
      name: 'dshouhuo',
      component:dshouhuo
    },{
      path: '/dpingjia',
      name: 'dpingjia',
      component:dpingjia
    },{
      path: '/shoucang',
      name: 'shoucang',
      component:shoucang
    },{
      path: '/dizhi',
      name: 'dizhi',
      component:dizhi
    },{
      path: '/jifen',
      name: 'jifen',
      component:jifen
    },{
      path: '/hongbao',
      name: 'hongbao',
      component:hongbao
    },{
      path: '/tuijian',
      name: 'tuijian',
      component:tuijian
    },{
      path: '/zijin',
      name: 'zijin',
      component:zijin
    },{
      path: '/bangzhu',
      name: 'bangzhu',
      component:bangzhu
    },{
      path: '/mima',
      name: 'mima',
      component:mima
    },{
      path: '/sousuo',
      name: 'sousuo',
      component:sousuo
    },{
      path: '/zhuce',
      component:zhuce,
      meta:{
        isLogin:false
      }
    },{
      path: '/wangjipwd',
      name: 'wangjipwd',
      component:wangjipwd
    },{
      path: '/spxiangqingone',
      name: 'spxiangqingone',
      component:spxiangqingone
    },{
      path: '/shopping',
      name: 'shopping',
      component:shopping,
      meta:{ isLogin:true}
    },{
      path: '/dfukuan',
      name: 'dfukuan',
      component:dfukuan
    },{
      path: '/jiajian',
      name: 'jiajian',
      component:jiajian
    },{
      path: '/mydingdan',
      name: 'mydingdan',
      component:mydingdan
    },{
      path: '/allcommodity',
      name: 'allcommodity',
      component:allcommodity
    }
  ]
})
