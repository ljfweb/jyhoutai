<template>
  <div>
    <el-card>
      <!-- 卡片显示区域 -->
      <!-- 面包屑显示 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>系统人员</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 查询 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="姓名查询" v-model="searchVal"></el-input>
        </el-col>
        <el-col :span="2"><div></div></el-col>
        <el-col :span="2"> <el-button type="primary" @click="searchUserFunction">查询</el-button></el-col>
        <el-col :span="4"> <el-button type="success" @click="addUserAdmin">增加管理员</el-button></el-col>
      </el-row>
      <!-- 表头 -->
      <el-row :gutter="20">
        <el-col :span="24"> <i class="el-icon-menu"></i><span>系统人员列表</span> </el-col>
      </el-row>
      <!-- 表格 -->
      <template>
        <el-table :data="tableData" style="width: 100%" border stripe>
          <el-table-column type="index" width="50" label="序号"> </el-table-column>
          <!-- <el-table-column prop="_id" label="ID" width="180"> </el-table-column> -->
          <el-table-column prop="createAt" label="创建时间" width="180"> </el-table-column>
          <el-table-column prop="userName" label="用户名" width="180"> </el-table-column>
          <el-table-column prop="turename" label="真实姓名"> </el-table-column>
          <el-table-column prop="phone" label="电话"> </el-table-column>
          <el-table-column label="权限">
            <template slot-scope="scope">
              <!-- {{scope.row.powerCode}} -->
              <el-tag v-if="scope.row.powerCode == 1" effect="dark">系统管理员</el-tag>
              <el-tag type="success" v-if="scope.row.powerCode == 2" effect="dark">课程管理员</el-tag>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button @click="handle_DeleteList(scope.row)" type="text" size="small">删除</el-button>
              <el-button type="text" size="small" @click="handle_update(scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <!-- 分页 -->
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[3, 6, 9]"
          :current-page.sync="currentPage"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalCount"
        >
        </el-pagination>
      </div>
    </el-card>
    <dialog-com :addEditdialog="addEditdialog" :title="title" :tokenIdds="tokenIdds" :changeMode="changeMode" :userForm="userForm"></dialog-com>
  </div>
</template>

<script>
import dialogCom from './addEditDialog.vue';
export default {
  data() {
    return {
      userList: [],
      tableData: [],
      searchVal: '', //搜索字段
      //总计数据
      totalCount: 0,
      // 当前页码
      currentPage: 1,
      //每页显示多少数据
      everyPageShowList: 1,
      //显示添加
      addEditdialog: false,
      //添加弹出标题
      title: '',
      //传指定值
      changeMode: '',
      tokenIdds: '', //制定修改id
      //增加数据相关的表单
      userForm: {
        username: '',
        realname: '',
        phone: '',
        powerCode: '',
        options: [
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
  components: {
    dialogCom,
  },
  created() {
    this.getUserListDate();
  },
  methods: {
    addUserAdmin() {
      //添加用户管理员数据
      //显示隐藏显示
      this.addEditdialog = true;
      this.changeMode = 'add';
      this.title = '增加用户';
    },
    handle_update(date) {
      //显示隐藏显示
      this.addEditdialog = true;
      this.userForm.username = date.userName;
      this.userForm.realname = date.turename;
      this.userForm.phone = date.phone;
      this.userForm.powerCode = date.powerCode;
      this.changeMode = 'update';
      this.title = '编辑用户';
      this.tokenIdds = date.tokenId;
    },
    handle_DeleteList(row) {
      //删除方法
      console.log(row.tokenId);
      this.$confirm(`确定删除${row.userName}此条数据？？？`)
        .then(async () => {
          const { data: res } = await this.axios({
            url: '/VueHandler/AdminHandler?action=delete',
            method: 'get',
            params: {
              tokenId: row.tokenId,
            },
          });
          console.log(res);
          if (res.err) return this.$message.error(res.err);
          if (res.success) this.$message.success(res.success);
          this.getUserListDate(); //更新列表
        })
        .catch(() => {
          this.$message.warning('取消删除！！！');
        });
    },
    handleSizeChange(val) {
      this.everyPageShowList = val; //每页显示多少数据
    },
    handleCurrentChange(val) {
      this.currentPage = val; //当前页
      this.getUserListDate(); //更新列表
    },
    async getUserListDate() {
      //获取系统用户数据
      const { data: res } = await this.axios({
        url: '/VueHandler/AdminHandler?action=show',
        method: 'get',
        params: {
          searchText: this.searchVal,
          pageStart: this.currentPage,
          pageSize: this.everyPageShowList,
        },
      });
      console.log(res);
      this.tableData = [];
      this.tableData = res.data.list;
      // this.totalCount = Math.ceil(res.data.count / res.data.pageSize);
      this.totalCount = res.data.count;
      // this.getPowerName();
    },
    async getPowerName() {
      //获取权限
      const { data: res } = await this.axios({
        url: '/VueHandler/CourseHandler?action=getpower',
        method: 'get',
        params: {
          powerCode: 2,
        },
      });
      console.log(res);
    },
    searchUserFunction() {
      //搜索方法
      this.getUserListDate(); //调用方法搜索
    },
  },
};
</script>
<style lang="less" scoped>
.el-row {
  margin: 15px;
}
</style>
