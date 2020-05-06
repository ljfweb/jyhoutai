import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/login.vue";
import Index from "../components/index";
import Student from "../components/student";
import Course from "../components/course/course.vue";
import CourseAdd from "../components/course/courseadd.vue";
import Home from "../views/Home.vue";
import Video from "../components/video"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",   
    redirect: Home
  },
  {
    path: "/home",
    name:"home",
    component: Home
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
    path: "/video",
    name: "video",
    component: Video
  },
  {
    path: "/course",
    name: "course",
    component: Course
  },
  {
    path: "/courseadd",
    name: "courseadd",
    component: CourseAdd
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
