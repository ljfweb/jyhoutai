<template>
  <div>
    <el-card>
      <div class="regTitle">
        用户注册
      </div>
      <el-row>
        <el-col :span="8">
          <el-form :model="reg" label-width="80px">
            <el-form-item label="用户名：">
              <el-input v-model="reg.username"></el-input>
            </el-form-item>
            <el-form-item label="姓名：">
              <el-input v-model="reg.realname"></el-input>
            </el-form-item>
            <el-form-item label="手机号：">
              <el-input type="number" v-model="reg.phone"></el-input>
            </el-form-item>
            <el-form-item label="密码：">
              <el-input type="password" v-model="reg.pwd"></el-input>
            </el-form-item>
            <el-form-item label="权限：">
              <el-select v-model="reg.modeVal" placeholder="请选择">
                <el-option v-for="item in reg.modeValoptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <div class="handle">
        <el-button type="primary" @click="handle_addUser('add')">提交</el-button>
        <el-button type="warning" @click="handle_addUser('cancel')">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      reg: {
        username: '',
        realname: '',
        phone: '',
        pwd: '',
        modeVal: '',
        modeValoptions: [
          {
            value: 1,
            label: '系统管理员',
          },
          {
            value: 2,
            label: '课程管理员',
          },
        ],
      },
    };
  },
  methods: {
    async handle_addUser(mode) {
      if (mode == 'add') {
        const { data: res } = await this.axios({
          url: 'http://localhost:3000/VueHandler/AdminLoginAndRegHandler?action=add',
          method: 'post',
          data: this.$qs.stringify({
            userName: this.reg.username,
            turename: this.reg.realname,
            phone: this.reg.phone,
            password: this.reg.pwd,
            powerCode: this.reg.modeVal,
          }),
        });
        console.log(res);
      } else {
        this.reg = {};
      }
    },
  },
};
</script>
<style lang="less" scoped>
.regTitle {
  width: 35%;
  height: 64px;
  line-height: 64px;
  font-size: 32px;
  text-align: center;
}
.handle {
  width: 35%;
  padding: 19px;
  text-align: center;
}
</style>
