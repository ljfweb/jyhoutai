<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="formLabelAlign.username"> </el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="formLabelAlign.turename"></el-input>
        </el-form-item>
        <el-form-item label="手机">
          <el-input v-model="formLabelAlign.phone"></el-input>
        </el-form-item>
        <el-form-item label="权限">
          <el-select v-model="formLabelAlign.power" placeholder="请选择">
            <el-option
              v-for="item in formLabelAlign.options"
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
        <el-button type="primary" @click="zhuce">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "adminalert",
  props: ["tokenid", "title", "formLabelAlign", "dialogFormVisible", "status"],
  methods: {
    zhuce() {
      var mydata = {
        userName: this.formLabelAlign.username,
        turename: this.formLabelAlign.turename,
        phone: this.formLabelAlign.phone,
        power: this.formLabelAlign.power,
        password: "123456"
      };
      var url = "";
      if (this.status == "edit") {
        mydata.tokenId = this.tokenid;
        url = "/VueHandler/AdminHandler?action=update";
      } else {
        url = "/VueHandler/AdminLoginAndRegHandler?action=add";
      }
      console.log(this.formLabelAlign.turename, this.formLabelAlign.power);
      // 发送数据
      this.axios({
        url: url,
        method: "post",
        data: mydata
      }).then(res => {
        console.log(res);
        this.dialogFormVisible = false;
      });
    }
  }
};
</script>

<style></style>
