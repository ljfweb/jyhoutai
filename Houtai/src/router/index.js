import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login.vue';
import Home from '../views/Home.vue';
import XiTongRenYuan from '../components/xitongrenyuan.vue';
import Xueyuanguanli from '../components/xueyuanguanli.vue';
import Welcome from '../components/welcome.vue';
import ErrorUrl from '../components/404Error.vue';
import KeChengLieBiao from '../components/kechengliebiao.vue';
import KeChengBianJi from '../components/kechengbianji.vue';
import ShiPinGuanli from '../components/shipinguanli.vue';
import YongHuZhuCe from '../components/yonghuzhuce.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '*', //404页面报错
    component: ErrorUrl,
  },
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        name: 'welcome',
        component: Welcome,
      },
      {
        path: '/xitongrenyuan',
        name: 'xitongrenyuan',
        component: XiTongRenYuan,
      },
      {
        path: '/xueyuanguanli',
        name: 'xueyuanguanli',
        component: Xueyuanguanli,
      },
      {
        path: '/kechengliebiao',
        name: 'kechengliebiao',
        component: KeChengLieBiao,
      },
      {
        path: '/kechengbianji',
        name: 'kechengbianji',
        component: KeChengBianJi,
      },
      {
        path: '/shipinguanli',
        name: 'shipinguanli',
        component: ShiPinGuanli,
      },
      {
        path: '/yonghuzhuce',
        name: 'yonghuzhuce',
        component: YongHuZhuCe,
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
});

export default router;
