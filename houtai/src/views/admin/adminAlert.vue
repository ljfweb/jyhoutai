<template>
  <div class="adminalert">
    <!-- 添加和编辑的弹框 -->
    <el-dialog :title="title" :visible.sync="dialogFormVisible" center>
      <el-form label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="adminLabelAlign.username"> </el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="adminLabelAlign.turename"></el-input>
        </el-form-item>
        <el-form-item label="手机">
          <el-input v-model="adminLabelAlign.phone"></el-input>
        </el-form-item>
        <el-form-item label="权限">
          <el-select v-model="adminLabelAlign.power" placeholder="请选择">
            <el-option
              v-for="item in adminLabelAlign.options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="requird">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "adminalert",
  props: ["tokenid", "title", "adminLabelAlign", "dialogformvisible", "status"],
  data() {
    return {};
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
    // 确定提交
    requird() {
      const mydata = {
        userName: this.adminLabelAlign.username,
        turename: this.adminLabelAlign.turename,
        phone: this.adminLabelAlign.phone,
        power: this.adminLabelAlign.power,
        password: "123456"
      };
      let url = "";
      let text = "";
      if (this.status == "edit") {
        mydata.tokenId = this.tokenid;
        url = "/VueHandler/AdminHandler?action=update";
        text = "编辑成功！";
      } else {
        url = "/VueHandler/AdminLoginAndRegHandler?action=add";
        text = "添加成功！";
      }
      this.axios.post(url, mydata).then(() => {
        // console.log(res);刷新
        this.$message.success(text);
        this.dialogFormVisible = false;
        this.$emit("refresh");
      });
    }
  }
};
</script>

<style lang="less" scoped>
.adminalert {
  width: 100%;
}
</style>
