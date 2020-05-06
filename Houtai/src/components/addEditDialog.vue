<template>
  <div>
    <el-dialog :title="title" :visible.sync="addEditdialog" width="50%">
      <!-- 内容显示区域 -->
      <el-form :model="userForm" status-icon ref="userForm" label-width="100px">
        <el-form-item label="用户名">
          <el-input v-model="userForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="userForm.realname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="userForm.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="权限选择">
          <!-- 下拉菜单区域 -->
          <el-select v-model="userForm.powerCode" placeholder="请选择">
            <el-option v-for="item in userForm.options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addEditdialog = false">取 消</el-button>
        <el-button type="primary" @click="addOrEditUserFunction">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'dialogCom',
  props: ['title', 'addEditdialog', 'changeMode', 'userForm', 'tokenIdds'],
  methods: {
    async addOrEditUserFunction() {
      const userInfoDate = {
        userName: this.userForm.username,
        turename: this.userForm.realname,
        phone: this.userForm.phone,
        password: '123456',
        power: this.userForm.powerCode,
      };
      var urlReq = '';
      if (this.changeMode == 'add') {
        urlReq = '/VueHandler/AdminLoginAndRegHandler?action=add';
      } else {
        urlReq = '/VueHandler/AdminHandler?action=update';
        userInfoDate.tokenId = this.tokenIdds;
        userInfoDate.password = '';
      }
      // axios请求
      //增加用户数据
      const { data: res } = await this.axios({
        url: urlReq,
        method: 'post',
        data: userInfoDate,
      });
      if (res.err) return this.$message.warning(res.err);
      if (res.success) {
        this.$message.success(res.success);
        this.addEditdialog = false;
        location.reload(); //要重新连服务器以读得新的页面(虽然页面是一样的)
        urlReq = '';
      }
    },
  },
};
</script>
<style scoped></style>
