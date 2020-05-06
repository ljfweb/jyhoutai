import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcom from '../components/Home/User/Welcom.vue'
import Mis from '../components/Home/User/Mis.vue'
import Curraculum from '../components/Home/Course/Curraculum.vue'
import Redacd from '../components/Home/Course/Redacd.vue'
import video from '../components/Home/Course/video.vue'
import Echarts from '../components/Home/Course/Echarts.vue'
import FromInput from '../components/Home/Course/FromInput.vue'



Vue.use(VueRouter)

  const routes = [
    { path: '/', redirect: "/login" },
    { path: '/login',name:"login", component: Login},
    {
    path: '/home',
    name:"home",
    component: Home,
    redirect:"/welcom",
    children:[
      { path: '/welcom',     component: Welcom,redirect:"/fromInput",
      children:[
        { path: '/fromInput',      component: FromInput},
        { path: '/echarts',      component: Echarts},
      ]},
      { path: '/mis',        component: Mis},
      { path: '/curraculum', component: Curraculum},
      { path: '/redacd',     component: Redacd},
      { path: '/video',      component: video},
      

    ]
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
// router.beforeEach((to,from, next)=>{
//   if(to.path == "/login") return next()
// })
export default router
