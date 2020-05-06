import Vue from "vue"
import VueRouter from "vue-router"
import Login from "../views/Login.vue"
import Reg from "../views/Reg.vue"
import Test from "../views/Test.vue"
import Home from "../views/Home.vue"
import Admin from "../views/Admin/admin" //系统用户
import Student from "../views/Student/student" //学员管理

import Course from "../views/Course/course" //课程管理
import CourseEdit from "../views/Course/courseEdit" //课程编辑

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "login",
    component: Login,
  },
  {
    path: "/reg",
    name: "reg",
    component: Reg,
  },
  {
    path: "/test",
    name: "test",
    component: Test,
  },
  {
    path: "/home",
    name: "home",
    component: Home,
  },
  // 系统用户
  {
    path: "/admin",
    name: "admin",
    component: Admin,
  },
  // 学员管理
  {
    path: "/student",
    name: "student",
    component: Student,
  },
  //课程管理
  {
    path: "/course",
    name: "course",
    component: Course,
  },
  // 课程编辑
  {
    path: "/courseEdit",
    name: "courseEdit",
    component: CourseEdit,
  },
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
})

export default router
