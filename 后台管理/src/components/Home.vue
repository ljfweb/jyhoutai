<template>
  <el-container class="info_container">
    <el-header>
      <!-- 头部区域 -->
      <div>
        <img src="../assets/login.jpg" />
        <span>二哈后台管理</span>
      </div>
      <div class="info_ringth" >
        <div v-for="item in home_header" :key="item.id">
          <i></i>
          <span :class="item.class">{{item.title}}</span>
        </div>
        <!-- 用户信息 -->
        <div>
          <span>哈士奇</span>
          <i>
            <img src="../assets/login_two.jpg" alt />
          </i>
        </div>
      </div>
    </el-header>
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px">
        <!-- <div @click="toogl">
          <span title="收起" v-show="!istoggle">收起</span>
          <span title="展开" v-show="istoggle">==></span>
          <span></span>
        </div> -->
        <el-menu
          background-color="#000"
          text-color="#fff"
          active-text-color="red"
          unique-opened
          :collapse="istoggle"
          router
        >
          <!-- 侧边栏用户管理 -->
          <el-submenu index="1">
            <template slot="title">
              <!-- 图标 -->
              <i class="el-icon-user-solid"></i>
              <!-- 文本 -->
              <span>用户管理</span>
            </template>
            <!-- 一级菜单 -->
            <el-menu-item-group>
              <el-menu-item class="el-icon-menu" index="welcom">系统人员</el-menu-item>
              <el-menu-item class="el-icon-menu" index="mis">学员管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <!-- 侧边栏课程管理 -->
          <el-submenu index="2">
            <template slot="title">
              <!-- 图标 -->
              <i class="el-icon-user-solid"></i>
              <!-- 文本 -->
              <span>课程管理</span>
            </template>
            <!-- 一级菜单 -->
            <el-menu-item-group>
              <el-menu-item class="el-icon-menu" index="curraculum">课程管理</el-menu-item>
              <el-menu-item class="el-icon-menu" index="redacd">课程编辑</el-menu-item>
              <el-menu-item class="el-icon-menu" index="video">视频管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 主体右侧区域 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      //头部左边区域
      home_header:[
        {id:'001' ,icon :"", title :"卓新思创" ,class:""},
        {id:'002' ,icon :"", title :"常见问题" ,class:""},
        {id:'003' ,icon :"", title :"修改密码" ,class:"passwd"},
        {id:'004' ,icon :"", title :"在线客服" ,class:""},
        {id:'005' ,icon :"", title :"退出"     ,class:""},
        // {icon :"../assets/login_two.jpg", tite :"哈士奇"},
        ],
      istoggle: false,
    };
  },
  methods: {
    toogl() {
      this.istoggle = !this.istoggle;
    },
    home() {
      // this.axios
      //   .post("/VueHandler/AdminHandler?action=returnuserinfo", {})
      //   .then(res => {
      //     console.log(res);
      //   })
      //   .catch(err => {
      //     console.error(err);
      //   });
    },
    //修改密码
    passwd() {
      console.log(document.getElementsByClassName("passwd")[0])
      document.getElementsByClassName("passwd")[0].onclick =function(){
        alert("未开发修改密码")
      }

      // this.axios
      //   .post("/VueHandler/AdminHandler?action=returnuserinfo", {})
      //   .then(res => {
      //     console.log(res);
      //   })
      //   .catch(err => {
      //     console.error(err);
      //   });
    },
  },
  created() {
    this.home();
  },
  mounted () {
    this.passwd()
  }
};
</script>

<style lang="less" scoped>
// Container 布局容器 外包装
.info_container {
  height: 100%;
}
//Container 布局容器header
.el-header {
  background-color:#fff;
  color: #333;
  font-size: 33px;
  display: flex;
  justify-content: space-between;
  padding: 0 0;
  //   text-align: center;
  //   line-height: 60px;
  > div {
    display: flex;
    align-items: center;
    > img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
    > span {
      padding-left: 22px;
    }
  }
  .info_ringth {
    font-size: 15px;
    display: flex;
    align-items: center;
    > div {
      padding: 0 6px;
      display: flex;
      align-items: center;
      img {
        width: 50px;
        height: 50px;
        padding-left: 10px;
        border-radius: 50%;
      }
    }
  }
}
// Container 布局容器 aside
.el-aside {
  background-color:#000;
  color: #333;
}
//Container 布局容器main
.el-main {
  background-color: #CCC;
  color: #333;
}
// 右侧
.el-main {
  padding: 0 0;
}
// 二级菜单图标与文字距离
.el-icon-menu:before {
  padding-right: 10px;
}
// 下拉菜单超出处理
.el-menu {
  border-radius: none;
}
</style>
