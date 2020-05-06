import Vue from "vue";
import VueRouter from "vue-router";
import Login from "views/login/login.vue";
import Index from "views/index.vue";
import Admin from "views/admin/admin.vue";
import Student from "views/student/student.vue";
import Course from "views/course/course.vue";
import CourseEdit from "views/course/courseEdit/courseEdit.vue";
import Video from "views/video/video.vue";
import Aa from "views/video/videoList.vue";

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
  // 用户管理的系统人员页面
  {
    path: "/admin",
    name: "admin",
    component: Admin
  },
  // 用户管理学员人员的页面
  {
    path: "/student",
    name: "student",
    component: Student
  },
  // 课程管理课程列表的页面
  {
    path: "/course",
    name: "course",
    component: Course
  },
  // 课程管理课程编辑的页面
  {
    path: "/courseedit",
    name: "courseedit",
    component: CourseEdit
  },
  // 课程管理视频管理的页面
  {
    path: "/video",
    name: "video",
    component: Video
  },
  {
    path: "/aa",
    name: "aa",
    component: Aa
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
