<template>
  <div class="student_wrap">
    <el-breadcrumb class="tnav" separator="/">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">用户管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>学员管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="search_wrap">
      <div>
        <el-input v-model="s_username" placeholder="用户名"></el-input>
        <el-input v-model="s_email" placeholder="邮箱"></el-input>
        <el-input v-model="s_phone" placeholder="手机号"></el-input>
        <el-button type="success" @click="search">查询</el-button>
      </div>
      <div>
        <el-input v-model="add_username" placeholder="用户名"></el-input>
        <el-input v-model="add_email" placeholder="邮箱"></el-input>
        <el-input v-model="add_phone" placeholder="手机号"></el-input>
        <el-button type="primary" @click="addstudent">添加</el-button>
      </div>
    </div>
    <div class="table_head">
      <i class="el-icon-platform-eleme"></i>
      系统人员管理
    </div>
    <el-table :data="tableData">
      <el-table-column label="用户名" width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.userName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="邮箱" width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.email }}</span>
        </template>
      </el-table-column>
      <el-table-column label="手机号" width="180">
        <template slot-scope="scope">
          {{ scope.row.phone }}
        </template>
      </el-table-column>
      <el-table-column label="注册日期" width="180">
        <template slot-scope="scope">{{ scope.row.createAt }} </template>
      </el-table-column>
      <el-table-column label="状态" width="180">
        <template slot-scope="scope"
          >{{ scope.row.isstate ? "冻结" : "可用" }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="freeze(scope.$index, scope.row)">{{
            scope.row.isstate ? "解冻" : "冻结"
          }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :page-size="3"
      background
      layout="prev, pager, next"
      :total="total"
      @prev-click="prev"
      @next-click="next"
      :current-page="currentpage"
      @current-change="nowpage"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "studentTbale",
  data() {
    return {
      tableData: [],
      total: 1,
      currentpage: 1,
      s_username: "",
      s_email: "",
      s_phone: "",
      add_username: "",
      add_email: "",
      add_phone: ""
    };
  },
  created() {
    this.getStudentList(1);
  },
  methods: {
    search() {
      //搜索
      this.getStudentList(1, this.s_username, this.s_phone, this.s_email);
      this.s_username = "";
      this.s_phone = "";
      this.s_email = "";
    },
    nowpage(val) {
      console.log(val);
      this.currentpage = val;
      this.getStudentList(this.currentpage);
    },
    getStudentList(pageStart, userName, phone, email) {
      this.axios({
        url: "/VueHandler/AdminHandler?action=usershow",
        method: "post",
        data: {
          pageStart: pageStart,
          userName: userName,
          phone: phone,
          email: email
        }
      }).then(res => {
        console.log(res);
        this.total = res.data.data.count;
        this.tableData = res.data.data.list;
      });
    },
    freeze(index, row) {
      //冻结操作
      console.log(index);
      this.axios({
        url: "/VueHandler/AdminHandler?action=lockuser",
        method: "get",
        params: {
          tokenId: row.tokenId
        }
      }).then(res => {
        console.log(res);
        this.getStudentList(this.currentpage);
      });
    },
    prev() {},
    next() {},
    addstudent() {
      //添加学员
      console.log(this.add_email, this.add_username, this.add_phone);
      this.axios({
        url: "/VueHandler/AdminHandler?action=adduser",
        method: "post",
        data: {
          addemail: this.add_email,
          adduserName: this.add_username,
          addphone: this.add_phone
        }
      }).then(res => {
        console.log(res);
        this.getStudentList(this.currentpage);
        this.add_phone = "";
        this.add_email = "";
        this.adduserName = "";
      });
    }
  }
};
</script>

<style lang="less" scoped>
.student_wrap {
  width: 80%;
  margin: 0 auto;
}
.search_wrap {
  margin-bottom: 20px;
  > div {
    display: flex;
    margin-top: 20px;
    justify-content: space-around;
    .el-input {
      width: 259px;
    }
    .el-button {
      height: 40px;
      // margin-top: 20px;
    }
  }
}

.table_head {
  width: 100%;
  margin: 0 auto;
  line-height: 40px;
  display: flex;
  border: 1px solid #e5e5e5;
  justify-content: flex-start !important;
  i {
    line-height: 40px;
    margin: 0 20px;
  }
}
.tnav {
  width: 80%;
  margin: 0 auto;
  line-height: 50px;
  font-size: 20px;
  margin-left: 20px;
}
</style>
