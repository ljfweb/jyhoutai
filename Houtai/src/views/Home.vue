<template>
  <div>
    <el-container>
      <el-header>
        <!-- 头部导航栏目 -->
        <el-menu style="font-size: 32px;color: white;background-color: #545C64;padding-left: 20px;">积云教育教学资源管理服务平台</el-menu>
        <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
          <el-menu-item index="1"><i class="iconfont icon-diqiu"></i>积云教育在线</el-menu-item>
          <el-menu-item index="2"><i class="iconfont icon-icon--"></i>在线客服</el-menu-item>
          <el-menu-item index="3"><i class="iconfont icon-book"></i>常见问题</el-menu-item>
          <el-menu-item index="4" @click="pwdChange"><i class="iconfont  icon-suo"></i>安全中心</el-menu-item>
          <el-menu-item index="5" @click="loginOutUsers"><i class="iconfont  icon-tuichu"></i>退出</el-menu-item>
          <el-menu-item index="6"><i class="iconfont  icon-yonghu"></i>用户：{{ nowUser }} <img src="../assets//logo.png" alt=""/></el-menu-item>
        </el-menu>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <!-- 侧边栏 -->
          <el-col :span="24">
            <el-menu router default-active="1" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
              <el-submenu index="1">
                <template slot="title">
                  <i class="iconfont  icon-yonghu2"></i>
                  <span>用户管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="1-1" route="/xitongrenyuan">系统人员</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                  <el-menu-item index="1-2" route="/xueyuanguanli">学员管理</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="2">
                <template slot="title">
                  <i class="iconfont icon-sikuaitubiao"></i>
                  <span>课程管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="2-1" route="/kechengliebiao">课程列表</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                  <el-menu-item index="2-2" route="/kechengbianji">课程编辑</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                  <el-menu-item index="2-3" route="/shipinguanli">视频管理</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-menu-item index="3">
                <i class="el-icon-menu"></i>
                <span slot="title">课程列表</span>
              </el-menu-item>
              <el-menu-item index="4">
                <i class="iconfont  icon-jiahao"></i>
                <span slot="title">课程添加</span>
              </el-menu-item>
              <el-menu-item index="5" route="/yonghuzhuce">
                <i class="iconfont  icon-sigelanmulianjieziyuan"></i>
                <span slot="title">用户注册</span>
              </el-menu-item>
              <el-menu-item index="6">
                <i class="iconfont  icon-shipin"></i>
                <span slot="title">视频管理</span>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-aside>
        <el-container>
          <el-main>
            <!-- 显示用户信息 -->
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
    <!-- 修改成功 -->
    <el-dialog title="修改密码" :visible.sync="pwddialogVisible" width="40%">
      <!-- 修改 -->
      <el-form :model="ruleForm" status-icon ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="原密码" prop="oldpass">
          <el-input type="password" v-model="ruleForm.oldpass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPass">
          <el-input type="password" v-model="ruleForm.newPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkNewPass">
          <el-input type="password" v-model="ruleForm.checkNewPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()">提交</el-button>
          <el-button @click="resetForm()">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  created() {
    this.getUserInfo();
    if (this.$route.query.user) {
      this.nowUser = this.$route.query.user;
    } else {
      this.nowUser = sessionStorage.user;
    }
  },
  data() {
    return {
      activeIndex: '1',
      nowUser: '',
      activeIndex2: '1',
      pwddialogVisible: false,
      ruleForm: {
        oldpass: '',
        newPass: '',
        checkNewPass: '',
      },
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    async getUserInfo() {
      const { data: res } = this.axios({
        url: '/VueHandler/AdminHandler?action=returnuserinfo',
        method: 'post',
      });
      console.log(res);
    },
    async loginOutUsers() {
      //退出登录
      const { data: res } = await this.axios({
        url: '/VueHandler/AdminHandler?action=quit',
        method: 'get',
      });
      if (res.err) return this.$message.warning(res.err);
      if (res.success) {
        (location.href = '/#/login'), this.$message.success(res.success);
      }
    },
    async pwdChange() {
      //修改密码
      this.pwddialogVisible = true;
      // const { data: res } = await this.axios({});
    },
    async submitForm() {
      // console.log(this.ruleForm.newPass == this.ruleForm.checkNewPass);登录方法
      if (this.ruleForm.newPass == this.ruleForm.checkNewPass && this.ruleForm.oldpass == !this.ruleForm.newPass) {
        const { data: res } = await this.axios({
          url: '/VueHandler/AdminHandler?action=updatepass',
          method: 'post',
          data: {
            userPwd: this.ruleForm.oldpass,
            newPwd: this.ruleForm.checkNewPass,
          },
        });
        if (res.err) return this.$message.warning(res.err);
        if (res.success) {
          this.$message.success(res.success);
          this.pwddialogVisible = false;
        }
      } else {
        if (this.ruleForm.oldpass == this.ruleForm.newPass) return this.$message.error('新旧密码相同，请重新修改!');
        return this.$message.error('两次新密码输入不一致，请重新输入保持一致，才可添加成功!');
      }
    },
    resetForm() {
      //重置表单
      this.ruleForm = {
        oldpass: '',
        newPass: '',
        checkNewPass: '',
      };
    },
  },
};
</script>
<style lang="less" scoped>
.el-menu {
  border: 0;
}
.el-container {
  width: 100vw;
  height: 100vh;
}
.el-header,
.el-footer {
  background-color: #545c64;
  color: #545c64;
  text-align: center;
  line-height: 60px;
}

.el-header {
  display: flex;
  justify-content: space-between;
  padding: 0;
  .el-menu-item {
    background-color: #333;
  }
  img {
    width: 50px;
    height: 50px;
  }
}

.el-aside {
  background-color: #545c64;
  color: #333;
  text-align: center;
  .el-submenu {
    width: 100%;
  }
  .el-menu-vertical-demo {
    width: 100%;
  }
}

.el-main {
  background-color: #e9eef3;
  color: #333;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.iconfont {
  padding-right: 10px;
}
</style>
