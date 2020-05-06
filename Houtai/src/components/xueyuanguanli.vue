<template>
  <div>
    <el-card>
      <!-- 面包屑显示 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>学员管理</el-breadcrumb-item>
      </el-breadcrumb>
      <el-row>
        <el-col :span="5">
          <el-input v-model="studentList.username" placeholder="用户名"></el-input>
        </el-col>
        <el-col :span="5">
          <el-input v-model="studentList.email" placeholder="邮箱"></el-input>
        </el-col>
        <el-col :span="5">
          <el-input v-model="studentList.phone" placeholder="手机号"></el-input>
        </el-col>
        <el-col :span="8">
          <el-button type="success" @click="checkedStudentUser">查询</el-button>
          <el-button type="primary" @click="addStudenUser">添加</el-button>
          <span style="margin-left: 6px;">注意：依次写下相关字段进行相关的操作!</span>
        </el-col>
      </el-row>
      <!-- 表格渲染 -->
      <el-row :gutter="20">
        <el-col :span="24"> <i class="el-icon-menu"></i><span>学员列表</span></el-col>
      </el-row>
      <!-- 表格区域 -->
      <el-table :data="tableData" style="width: 100%" border stripe>
        <el-table-column prop="tokenId" label="用户TOKENID" width="150"> </el-table-column>
        <el-table-column prop="userName" label="用户" width="180"> </el-table-column>
        <el-table-column prop="email" label="邮箱" width="180"> </el-table-column>
        <el-table-column prop="phone" label="手机" width="180"> </el-table-column>
        <el-table-column prop="createAt" label="创建日期" width="180"> </el-table-column>
        <el-table-column label="状态" width="180">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.isstate == false" type="danger">冻结</el-tag>
            <el-tag v-if="scope.row.isstate == true" type="success">解冻</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button type="primary" @click="unfreezeMode(scope.row)" v-text="scope.row.isstate ? '冻结' : '解冻'"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="NowPageNum"
          :page-size="showPageSize"
          :page-sizes="[3, 6, 9]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalCount"
        >
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  created() {
    this.getStudentDateList();
  },
  data() {
    return {
      NowPageNum: 1,
      tableData: [],
      studentList: {
        username: '',
        email: '',
        phone: '',
      },
      isCold: false,
      totalCount: 0,
      showPageSize: 0,
    };
  },
  methods: {
    handleSizeChange(val) {
      this.showPageSize = val;
    },
    handleCurrentChange(val) {
      this.NowPageNum = val;
      this.getStudentDateList(); //更新数据
    },
    checkedStudentUser() {
      //查询用户方法
      this.getStudentDateList();
    },
    async getStudentDateList() {
      //获取所有学员数据
      const { data: res } = await this.axios({
        url: '/VueHandler/AdminHandler?action=usershow',
        method: 'post',
        data: {
          pageStart: this.NowPageNum,
          userName: this.studentList.username,
          email: this.studentList.email,
          phone: this.studentList.phone,
        },
      });
      console.log(res);
      this.tableData = res.data.list;
      this.totalCount = res.data.count;
      this.showPageSize = res.data.pageSize;
      this.studentList = {
        username: '',
        email: '',
        phone: '',
      };
    },
    async addStudenUser() {
      // 学员添加方法
      const { data: res } = await this.axios({
        url: '/VueHandler/AdminHandler?action=adduser',
        method: 'post',
        data: {
          addemail: this.studentList.email,
          adduserName: this.studentList.username,
          addphone: this.studentList.phone,
        },
      });
      console.log(res);
      if (res.err) return this.$message.error(res.err);
      if (res.success) {
        this.$message.success(res.success);
        this.isCold = !this.isCold;
        // 清空输入框
        this.studentList = {
          username: '',
          email: '',
          phone: '',
        };
        this.getStudentDateList(); //更新数据
      }
    },
    async unfreezeMode(date) {
      //解冻相关的用户
      console.log(date);
      const { data: res } = await this.axios({
        url: '/VueHandler/AdminHandler?action=lockuser',
        method: 'get',
        params: {
          tokenId: date.tokenId,
        },
      });
      if (res.err) return this.$message.error(res.err);
      if (res.success) {
        this.$message.success(res.success);
        this.isCold = !this.isCold;
        this.getStudentDateList(); //更新数据
      }
    },
  },
};
</script>
<style lang="less" scoped>
.el-breadcrumb {
  margin-bottom: 15px;
}
.el-col {
  margin-right: 4px;
}
.el-row {
  margin: 15px;
}
</style>
