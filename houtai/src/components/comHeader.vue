<template>
  <div class="indexheader">
    <!-- 头部导航 -->
    <div class="head-nav">
      <div class="logo-warp">
        <div style="cursor:pointer" @click="$router.push('/index')">
          <img :src="require('assets/images/1.jpg')" alt="" />
          <span>积云后台管理</span>
        </div>
      </div>
      <ul class="head-list">
        <li @click="$router.push('/index')">
          <i class="my-iconfont iconlogo"></i>积云教育
        </li>
        <li><i class="my-iconfont iconkefu1"></i>在线客服</li>
        <li><i class="my-iconfont iconbook"></i>常见问题</li>
        <li @click="safeShow"><i class="my-iconfont iconlock"></i>安全中心</li>
        <li @click="signOut"><i class="my-iconfont iconsignout"></i>退出</li>
        <li>
          <span>{{ userinfo.turename }}</span>
          <img :src="require('assets/logo.png')" alt="" />
        </li>
      </ul>
    </div>
    <!-- 二级导航 -->
    <div class="sub-bar">
      <ul>
        <li>
          <div class="navName">
            <i class="my-iconfont icondrxx10"></i><span>用户管理</span>
          </div>
          <div class="navItems">
            <div class="item">
              <router-link to="/admin"
                ><i class="my-iconfont iconrenyuanguanli"></i
                ><span>系统人员</span></router-link
              >
            </div>
            <div class="item">
              <router-link to="/student"
                ><i class="my-iconfont iconzu"></i
                ><span>学员管理</span></router-link
              >
            </div>
          </div>
        </li>
        <li>
          <div class="navName">
            <i class="my-iconfont iconkecheng"></i><span>课程管理</span>
          </div>
          <div class="navItems">
            <div class="item">
              <router-link to="/course"
                ><i class="my-iconfont iconkechengguanli"></i
                ><span>课程列表</span></router-link
              >
            </div>
            <div class="item">
              <router-link to="/courseedit"
                ><i class="my-iconfont iconbianji"></i
                ><span>课程编辑</span></router-link
              >
            </div>
            <div class="item">
              <router-link to="/video"
                ><i class="my-iconfont iconshipinguanli"></i
                ><span>视频管理</span></router-link
              >
            </div>
          </div>
        </li>
      </ul>
    </div>
    <!-- 弹窗显示 -->
    <safeAlert
      :dialogformvisible="isDialog"
      @onclosedialog="closeDialog"
    ></safeAlert>
  </div>
</template>

<script>
import safeAlert from "./safeAlert.vue";
export default {
  name: "indexheader",
  components: {
    safeAlert
  },
  data() {
    return {
      userinfo: "",
      isDialog: false // 控制安全弹窗 显示
    };
  },
  methods: {
    // 显示安全中心的弹窗
    safeShow() {
      this.isDialog = true;
    },
    // 退出登录
    signOut() {
      this.axios.get("/VueHandler/AdminHandler?action=quit").then(res => {
        if (res.data.success) {
          this.$message.success(res.data.success);
          setTimeout(() => {
            this.$router.replace("/login");
          }, 500);
        } else {
          this.$message.error("退出失败");
        }
      });
    },
    // 通过子组件来关闭弹窗
    closeDialog(val) {
      this.isDialog = val;
    }
  },
  created() {
    // 获取用户信息
    this.axios
      .post("/VueHandler/AdminHandler?action=returnuserinfo")
      .then(res => {
        this.userinfo = res.data;
      });
  }
};
</script>

<style lang="less" scoped>
.indexheader {
  width: 100%;
  // 头部导航
  .head-nav {
    width: 100%;
    height: 50px;
    box-sizing: border-box;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    padding: 0 15px;
    background-color: #222;
    .logo-warp {
      flex-basis: 200px;
      height: 100%;
      div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        img {
          width: 50px;
          height: 50px;
        }
        span {
          color: white;
          font-size: 22px;
        }
      }
    }
    .head-list {
      display: flex;
      justify-content: center;
      align-items: center;
      color: #9d9d9d;
      font-size: 12px;
      li {
        padding: 0 15px;
        i {
          position: relative;
          top: 2px;
          margin-right: 6px;
        }
        &:hover {
          color: #fff;
          cursor: pointer;
        }
        &:last-of-type {
          display: flex;
          align-items: center;
          img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            margin-left: 6px;
            background-color: #fff;
          }
        }
      }
    }
  }
  // 次级导航
  .sub-bar {
    width: 100%;
    box-sizing: border-box;
    height: 50px;
    position: relative;
    background-image: linear-gradient(180deg, #394a85, #2e3192, #3cacec);
    ul {
      /*padding-left: 500px;*/
      overflow: hidden;
      margin: 0 auto;
      width: 100%;
      li {
        i {
          margin-right: 8px;
        }
        .navName {
          font-size: 16px;
          float: left;
          padding: 0 30px;
          color: whitesmoke;
          text-align: center;
          line-height: 50px;
          cursor: pointer;
          position: relative;
          &::before {
            content: "";
            width: 10px;
            height: 10px;
            position: absolute;
            transition: 0.3s ease;
            opacity: 0;
            top: 15px;
            left: 28px;
            border-top: 2px solid #ffffff;
            border-left: 2px solid #ffffff;
          }
          &::after {
            content: "";
            width: 10px;
            height: 10px;
            position: absolute;
            transition: 0.3s ease;
            opacity: 0;
            bottom: 15px;
            right: 28px;
            border-bottom: 2px solid #ffffff;
            border-right: 2px solid #ffffff;
          }
        }
        &:hover .navName::before {
          top: 2px;
          left: 2px;
          opacity: 1;
        }
        &:hover .navName::after {
          bottom: 2px;
          right: 2px;
          opacity: 1;
        }
        .navItems {
          box-sizing: border-box;
          position: absolute;
          z-index: 200;
          top: 50px;
          width: 100%;
          height: 116px;
          background-image: linear-gradient(180deg, #ccccb2, #757519);
          border: 1px solid #ececec;
          display: none;
          .item {
            float: left;
            margin: 32px 40px;
            width: 249px;
            height: 40px;
            border: 1px solid #ececec;
            font-size: 15px;
            line-height: 42px;
            text-align: center;
            cursor: pointer;
            transition: 0.2s ease;
            span {
              color: #fff;
            }
            &:hover {
              background-color: skyblue;
            }
          }
        }
        &:hover .navItems {
          display: block;
        }
      }
    }
  }
}
</style>
