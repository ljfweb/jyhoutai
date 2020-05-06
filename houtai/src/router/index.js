import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/login.vue";
import Reg from "../views/reg.vue";
import Index from "../components/index.vue";
import Header from "../components/header";
import Admin from "../components/admin/admin.vue";
import Tablelist from '../components/admin/tablelist.vue';
import Course from '../components/course/course.vue';
import Student from "../components/student/student.vue";
import Video from "../components/video/video.vue";
import CourseAdd from "../components/course/courseadd.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/index",
    name: "index",
    component: Index
  },
  {
    path: "/student",
    name: "student",
    component: Student
  },
  {
    path: "/admin",
    name: "admin",
    component: Admin
  },
  {
    path: "/tablelist",
    name: "tablelist",
    component: Tablelist
  },
  {
    path: "/video",
    name: "video",
    component: Video
  },
  {
    path: "/courseadd",
    name: "courseadd",
    component: CourseAdd
  },
  {
    path: "/header",
    name: "header",
    component: Header
  },
  {
    path: "/reg",
    name: "reg",
    component: Reg
  },
  {
    path: "/course",
    name: "course",
    component: Course
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
