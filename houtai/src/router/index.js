import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/login.vue";
import Reg from "../views/reg.vue";
import Index from "../components/index.vue";
// import Admin from "../components/admin/admin.vue";
// import Student from "../components/student/student.vue";
// import Course from "../components/course/course.vue";
// import CourseAdd from "../components/course/courseadd.vue";
import Tx from "../components/Tx/Tx.vue";
import Tes from "../components/Tes.vue";
import HelloWorld from "../components/HelloWorld.vue";
// import Views from "../components/views/views.vue";
Vue.use(VueRouter);


const constantRouter = [{
    path: '/index',
    name: '首页',
    component: Index,
    children: [{
        path: '/one-1',
        name: '后台统计图',
        component: () => import('../components/Tx/Tx')
      },
      {
        path: '/one-2',
        name: '后台管理',
        component: () => import('../components/pages/appMain.vue'),
        // redirect: '/two-1',
        children: [{
            path: '/two-1',
            name: '用户管理',
            // redirect: '/three-1',
            component: () => import('../components/pages/appMain.vue'),
            children: [{
                path: '/three-1',
                name: '系统人员',
                component: () => import('../components/admin/admin.vue'),
              },
              {
                path: '/three-2',
                name: '学员管理',
                component: () => import('../components/student/student.vue'),
              },
            ]
          },
          {
            path: '/two-2',
            name: '课程管理',
            component: () => import('../components/course/course.vue'),
            children: [{
                path: '/three-3',
                name: '课程管理',
                component: () => import('../components/course/course.vue'),
              },
              {
                path: '/courseAdd',
                name: '课程编辑',
                component: () => import('../components/course/courseadd.vue'),

              }
              // ,{
              //   path: '/three-4',
              //   name: '视频管理',
              //   component: () => import('../components/views/views.vue'),
              // },
            ]
          },
          {
            path: '/two-3',
            name: '视频管理',
            component: () => import('../components/views/views.vue'),
            children: [{

              path: '/three-4',
              name: '视频管理',
              component: () => import('../components/views/views.vue'),

            }]
          }
        ]
      },
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/reg',
    name: 'reg',
    component: Reg
  },
]
const menu = [{

    path: '/index',
    name: '用户管理',
    component: Index,
    iconCls: 'el-icon-platform-eleme',
    children: [{
        path: '/Tx',
        component: Tx,
        name: '系统人员'
      },
      {
        path: '/Tes',
        component: Tes,
        name: '学员管理'
      }
    ]
  },
  {
    path: '/index',
    name: '课程管理',
    leaf: true, //只有一个节点
    component: Index,
    iconCls: 'el-icon-s-home',
    children: [{
      path: '/HelloWorld',
      component: HelloWorld,
      name: '单独的'
    }, ]
    // children: [{
    //     path: '/HelloWorld',
    //     component: HelloWorld,
    //     name: '课程管理'
    //   },
    //   {
    //     path: '/course',
    //     component: Course,
    //     name: '课程编辑'
    //   },
    //   {
    //     path: '/student',
    //     component: Student,
    //     name: '视频管理'
    //   }
    // ]


  },
  {
    path: '*',
    redirect: '/HelloWorld',
    hidden: true //控制是否在左边菜单栏目展示
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: constantRouter,
  menu,


});

export default router;