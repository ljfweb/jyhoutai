import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/login.vue";
import Reg from "../views/reg.vue";
import Index from "../components/index.vue";
import Admin from "../components/admin/admin.vue";
import Student from "../components/student/student.vue";
import Course from "../components/course/course.vue";
import CourseAdd from "../components/course/courseadd.vue";
import Video from "../components/video/video.vue";
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
    path: "/admin",
    name: "admin",
    component: Admin
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
    path: "/course",
    name: "course",
    component: Course
  },
  {
    path: "/student",
    name: "student",
    component: Student
  },
  {
    path: "/index",
    name: "index",
    component: Index
  },
  {
    path: "/reg",
    name: "reg",
    component: Reg
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
