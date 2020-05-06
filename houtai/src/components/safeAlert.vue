<template>
  <div class="safecore">
    <!-- 安全中心 -->
    <div class="safe-wrap">
      <el-dialog
        title="修改密码"
        width="40%"
        :visible.sync="dialogFormVisible"
        center
      >
        <el-form :model="form" :rules="rules" ref="form">
          <el-form-item label="当前密码" :label-width="formLabelWidth">
            <el-input
              show-password
              type="password"
              v-model="form.oldPass"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="新密码"
            prop="pass"
            :label-width="formLabelWidth"
          >
            <el-input
              show-password
              type="password"
              v-model="form.pass"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="确认密码"
            prop="checkPass"
            :label-width="formLabelWidth"
          >
            <el-input
              show-password
              type="password"
              v-model="form.checkPass"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="repPassword('form')"
            >确 定</el-button
          >
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "safecore",
  props: ["dialogformvisible"],
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.form.checkPass !== "") {
          this.$refs.form.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      // dialogFormVisible: this.dialogformvisible,
      formLabelWidth: "80px",
      form: {
        oldPass: "",
        pass: "",
        checkPass: ""
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  computed: {
    dialogFormVisible: {
      get() {
        return this.dialogformvisible;
      },
      set(val) {
        this.$emit("onclosedialog", val);
      }
    }
  },
  methods: {
    // 确定修改密码
    repPassword(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.axios
            .post("/VueHandler/AdminHandler?action=updatepass", {
              userPwd: this.form.oldPass,
              newPwd: this.form.checkPass
            })
            .then(res => {
              console.log(res);
              if (res.data.err) {
                this.$message.error(res.data.err);
              } else {
                this.$message.success("修改密码成功");
                this.dialogFormVisible = false;
                setTimeout(() => {
                  this.$router.push("/login");
                }, 500);
              }
            });
        } else {
          this.$message.error("新密码俩次不一致");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.safecore {
  width: 100%;
}
</style>
