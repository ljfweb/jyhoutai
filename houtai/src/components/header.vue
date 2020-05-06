<template>
  <div class="header">
    <div class="nav">
      <ul>
        <li>卓新思创</li>
        <li>在线客服</li>
        <li>常见问题</li>
        <li @click="changePwd">安全中心</li>
        <li @click="quit">退出</li>
        <li>
          <span>{{ username }}</span>
          <img src="../assets/good.jpg"
               alt="" />
        </li>
      </ul>
    </div>
    <div class="navContent">
      <div @mouseover="choose(0)"
           @mouseout="flag = false">
        用户管理
      </div>
      <div @mouseover="choose(1)"
           @mouseout="flag = false">
        课程管理
      </div>
    </div>
    <div v-show="flag"
         @mouseout="flag = false"
         @mouseover="flag = true">
      <div class="manageContent"
           v-if="!tabFlag">
        <ul>
          <li @click="toPush('/admin')">系统人员</li>
          <li @click="toPush('/student')">学员管理</li>
        </ul>
      </div>
      <div class="manageContent"
           v-if="tabFlag">
        <ul>
          <li @click="toPush('/course')">课程管理</li>
          <li>课程编辑</li>
          <li>视频管理</li>
        </ul>
      </div>
    </div>
    <el-dialog title="修改密码"
               :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="当前密码:"
                      :label-width="formLabelWidth">
          <el-input v-model="form.userPwd"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码:"
                      :label-width="formLabelWidth">
          <el-input v-model="form.newPwd"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确定密码:"
                      :label-width="formLabelWidth">
          <el-input v-model="form.truePwd"
                    autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary"
                   @click="determine">确 定</el-button>
      </div>
    </el-dialog>
    <i class="el-icon-house"
       @click="$router.push('/home')"></i>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  data () {
    return {
      flag: false,
      tabFlag: true,
      username: "",
      form: {},
      dialogFormVisible: false,
      formLabelWidth: "120px",
    }
  },
  methods: {
    choose (x) {
      this.flag = true
      this.tabFlag = x
    },
    // 修改密码
    changePwd () {
      this.$confirm("确定修改密码吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.dialogFormVisible = true
          this.form = {}
          // this.$message({
          //   type: "success",
          //   message: "退出成功!",
          // })
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消修改密码",
          })
        })
    },
    // 确定修改
    determine () {
      if (this.form.newPwd != this.form.truePwd) {
        this.$message({
          type: "error",
          message: "原密码和新密码不一致",
        })
      } else {
        this.dialogFormVisible = false
        this.axios({
          url: "/VueHandler/AdminHandler?action=updatepass",
          method: "POST",
          data: {
            userPwd: this.form.userPwd,
            newPwd: this.form.newPwd,
          },
        }).then((res) => {
          console.log(res)
        })
      }
    },

    // 取消修改
    cancel () {
      this.dialogFormVisible = false
      this.$message({
        type: "info",
        message: "已取消修改密码",
      })
    },
    // 退出
    quit () {
      this.$confirm("确定退出吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.axios({
            url: "/VueHandler/AdminHandler?action=quit",
            method: "GET",
          }).then((res) => {
            console.log(res)
            this.$message({
              type: "success",
              message: "退出成功!",
            })
            location.href = "/"
          })
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出",
          })
        })
    },
    toPush (url) {
      if (this.$route.path != url) {
        this.$router.push(url)
      }
    },
  },
  mounted () {
    this.axios({
      url: "/VueHandler/AdminHandler?action=returnuserinfo",
      method: "POST",
    }).then((res) => {
      this.username = res.data.turename
    })
  },
}
</script>
<style lang="less" scoped>
.nav {
  width: 100%;
  height: 50px;
  background: black;
  ul {
    float: right;
    li {
      width: 80px;
      line-height: 50px;
      float: left;
      color: #ddd;
    }
  }
}
.navContent {
  height: 50px;
  background: #4e5d9c;

  div {
    width: 150px;
    color: white;
    line-height: 50px;
    text-align: center;
    float: left;
  }
}
.manageContent {
  width: 100%;
  height: 150px;
  border: 1px solid #ddd;
  ul {
    padding-top: 55px;
    li {
      float: left;
      width: 200px;
      height: 40px;
      border: 1px solid #ddd;
      line-height: 40px;
      text-align: center;
      margin: 0 80px;
    }
    li:hover {
      background: #4e5d9c;
      text-decoration: underline;
      cursor: pointer;
      color: blue;
    }
  }
}
img {
  margin-left: 15px;
  width: 50px;
  height: 50px;
}
.el-icon-house {
  font-size: 40px;
  position: fixed;
  top: 0;
  color: white;
  left: 20px;
  line-height: 50px;
}
</style>
