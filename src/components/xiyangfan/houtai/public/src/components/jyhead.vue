<template>
  <div>
    <!-- element-ui 饿了么-ui -->
    <div class="head_nav">
      <router-link to="/index">
        <img
          class="logo"
          src="https://dss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=1248459755,2757790998&fm=202&mola=new&crop=v1"
          alt=""
        />
      </router-link>
      <ul>
        <li><i class="el-icon-platform-eleme"></i>好运教育</li>
        <li><i class="el-icon-phone"></i>在线客服</li>
        <li class="el-icon-success"><i></i>常见问题</li>
        <li
          @click="dialogFormVisible = true"
          class="el-icon-picture-outline-round"
        >
          <i></i>安全中心
        </li>
        <li @click="quit"><i class="el-icon-folder-delete"></i>退出</li>
        <li>{{ userinfo.turename }}</li>
        <li><img src="../assets/bg_pic.jpg" alt="" /></li>
      </ul>
    </div>
    <div class="nav">
      <ul>
        <li @mouseover="tab(0)" @mouseout="wrapflag = false">用户管理</li>
        <li @mouseover="tab(1)" @mouseout="wrapflag = false">课程管理</li>
      </ul>
      <div
        class="content"
        @mouseover="wrapflag = true"
        @mouseout="wrapflag = false"
        v-show="wrapflag"
      >
        <ul v-if="!tabflag">
          <li @click="turnAdmin">
            系统人员
          </li>
          <li @click="turnStudent">学员管理</li>
        </ul>
        <ul v-if="tabflag">
          <li @click="turncourse">课程管理</li>
          <li>课程编辑</li>
          <li>视频管理</li>
        </ul>
      </div>
    </div>

    <el-dialog title="修改密码" :visible.sync="dialogFormVisible">
      <el-form label-width="80px">
        <el-form-item label="原密码">
          <el-input v-model="formLabelAlign.oldpass"> </el-input>
        </el-form-item>
        <el-form-item label="新密码">
          <el-input v-model="formLabelAlign.newpass"></el-input>
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input v-model="formLabelAlign.surepass"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="surePassword">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "jyhead",

  data() {
    return {
      tabflag: 0,
      wrapflag: false,
      userinfo: "",
      dialogFormVisible: false, //密码框这遮罩,
      formLabelAlign: {}
    };
  },
  created() {
    this.axios({
      url: "/VueHandler/AdminHandler?action=returnuserinfo",
      method: "post"
    }).then(res => {
      console.log(res);
      this.userinfo = res.data;
    });
  },
  methods: {
    turncourse() {
      this.$router.push("/course");
    },
    turnAdmin() {
      this.$router.push("/admin");
    },
    turnStudent() {
      this.$router.push("/student");
    },
    surePassword() {
      // 修改密码
      if (this.formLabelAlign.newpass == this.formLabelAlign.surepass) {
        this.axios({
          url: "/VueHandler/AdminHandler?action=updatepass",
          method: "post",
          data: {
            userPwd: this.formLabelAlign.oldpass,
            newPwd: this.formLabelAlign.newpass
          }
        }).then(res => {
          console.log(res);
          if (res.data.err) {
            this.$message.error(res.data.err);
          } else {
            this.$message.success("修改密码成功");
            this.dialogFormVisible = false;
            location.href = "/login";
          }
        });
      } else {
        this.$message.error("新密码俩次不一致");
      }
    },
    quit() {
      this.axios({
        method: "get",
        url: "/VueHandler/AdminHandler?action=quit"
      }).then(res => {
        if (res.data.success) {
          location.href = "/login";
        } else {
          this.$message.error("退出失败");
        }
      });
    },
    tab(index) {
      this.wrapflag = true;
      this.tabflag = index;
    }
  }
};
</script>

<style lang="less" scoped>
.head_nav {
  .logo {
    width: 60px;
    width: 80px;
    margin-left: 20px;
    cursor: pointer;
    margin-top: 5px;
  }
  height: 60px;
  width: 100%;
  background: #222;
  ul {
    width: 555px;
    display: flex;
    justify-content: space-around;
    float: right;
    li {
      color: #9d9d9d;
      line-height: 50px;
      cursor: pointer;
      img {
        width: 50px;
        height: 50px;
      }
    }
  }
}
.nav {
  width: 100%;
  height: 50px;
  background: skyblue;
  position: relative;
  ul {
    li {
      float: left;
      list-style: none;
      width: 100px;
      line-height: 50px;
      font-size: 18px;
      color: white;
      margin-left: 80px;
      cursor: pointer;
    }
  }
}
.content {
  width: 100%;
  height: 144px;
  top: 50px;
  left: 0;
  background: blue;
  position: absolute;
  z-index: 999;
  ul {
    width: 600px;
    display: flex;
    justify-content: space-around;
    li {
      margin-top: 40px;
      line-height: 50px;
      text-decoration: underline;
      width: 120px;
      text-align: center;
      height: 50px;
      border: 1px solid red;
    }
  }
}
</style>
