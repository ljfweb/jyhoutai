<template>
  <div class="tabList">
    <!-- 首页/用户管理/系统人员 -->
    <div class="center_top_nav">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>学员列表</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="cha">
        <div class="cha_top">
          <input v-model="searchUser" type="text" placeholder="用户名" />
          <input v-model="searchEmail" type="text" placeholder="邮箱" />
          <input v-model="searchPhone" type="text" placeholder="手机号" />
          <el-button @click="search" type="success" size="small">查询</el-button>
        </div>
        <div class="cha_bottom">
          <input v-model="addUser" type="text" placeholder="用户名" />
          <input v-model="addEmail" type="text" placeholder="邮箱" />
          <input v-model="addPhone" type="text" placeholder="手机号" />
          <el-button @click="add" type="primary" size="small">+添加</el-button>
        </div>
      </div>

      <!-- 表格 -->
      <div class="center">
        <div class="center_top">
          <i class="el-icon-s-grid"></i>
          <div class="dan">学员列表</div>
        </div>

        <el-table :data="tableData" border style="wiscopedth: 100%">
          <el-table-column fixed="left" prop="userName" label="用户名" width="120"></el-table-column>

          <el-table-column prop="phone" label="电话" width="120"></el-table-column>
          <el-table-column prop="email" label="邮箱" width="120"></el-table-column>

          <el-table-column label="创建时间" width="300">
            <template slot-scope="scope">{{ scope.row.createAt }}</template>
          </el-table-column>
          <el-table-column label="状态" width="100">
            <template slot-scope="scope">
              <el-button
                ref="normal"
                :type="scope.row.isstate==false?'info':'primary'"
                size="mini"
                v-text="scope.row.isstate==false ? '冻结' : '正常'"
              ></el-button>
            </template>
          </el-table-column>

          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <el-button
                ref="frost"
                :type="scope.row.isstate==false?'success':'danger'"
                size="mini"
                @click="dongjie(scope.row.tokenId)"
                v-text="scope.row.isstate==false ? '解冻' : '冻结'"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 分页 -->
      <el-pagination
        :page-size="1"
        background
        layout="prev, pager, next"
        :total="total"
        @current-change="nowpage"
      ></el-pagination>
      <!-- 弹出 -->
      <!-- <admin-alert
        :formLabelAlign="formLabelAlign"
        :dialogFormVisible="dialogFormVisible"
        :title="title"
        :status="status"
        :tokenid="tokenId"
      ></admin-alert>-->
    </div>
  </div>
</template>
<script>
// import adminAlert from "./adminAlert";
export default {
  name: "systemStudent",
  data() {
    return {
      tableData: [],
      total: 0,
      currentpage: 1,
      searchText: "",
      status: "add",
      tokenId: "",
      dialogFormVisible: false,

      state: "正常",
      dong: true,

      pageStart: 1,
      pageSize: 5,
      
      searchUser:"",
      searchEmail:"",
      searchPhone:"",
        
      addUser: "",
      addEmail: "",
      addPhone: ""
    };
  },
  components: {
    // adminAlert
  },
  mounted() {
    this.getData(1);
  },
  methods: {
    nowpage(val) {
      this.currentpage = val;
      this.getData(val);
    },
    //冻结学员
    dongjie(id) {
      console.log(id);
      this.axios({
        url: "/VueHandler/AdminHandler?action=lockuser",
        method: "get",
        params: {
          tokenId: id
        }
      }).then(res => {
        console.log(res);
        this.getData(this.pageStart);
      });
    },
    //搜索学员

    search() {
      //搜索
      this.getData(1, this.searchUser, this.searchPhone,this.searchEmail);
      this.searchUser = "";
      this.searchEmail = "";
      this.searchPhone = "";
    },
    //添加学员
    add() {
      this.axios({
        url: "/VueHandler/AdminHandler?action=adduser",
        method: "post",
        data: {
          addemail: this.addEmail,
          adduserName: this.addUser,
          addphone: this.addPhone
        }
      }).then(res => {
        console.log(res);
        this.getData(this.pageStart, this.pageSize);
      });
    },
     
     //获取学员
    getData(pageStart,userName, phone, email) {
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
        console.log(res.data.data.list);
        this.tableData = res.data.data.list;
        

        this.total = Math.ceil(res.data.data.count / res.data.data.pageSize);
        console.log(this.tableData);
      });
    }
  }
};
</script>

<style lang="less" scoped>
.center_top_nav {
  width: 100%;
  height: 46px;

  .el-breadcrumb {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .cha {
    width: 100%;
    height: 80px;
    border: 1px solid #ccc;
    background-color: white;
    display: flex;
    flex-flow: row wrap;
    // padding: 0 20px;
    box-sizing: border-box;
    .cha_top {
      width: 100%;
      height: 50%;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      padding-right: 40%;
      box-sizing: border-box;
      input {
        width: 25%;
        height: 50%;
      }
      // .el-button {
      //   width: 20%;
      //   height: 60%;
      //   font-size: 14px;
      // }
    }
    .cha_bottom {
      width: 100%;
      height: 50%;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      padding-right: 40%;
      box-sizing: border-box;
      input {
        width: 25%;
        height: 50%;
      }
    }
  }

  //学员人员名单
  .center {
    width: 100%;
    margin-top: 20px;
    background-color: white;

    .center_top {
      width: 100%;
      height: 30px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      border: 1px solid;
      box-sizing: border-box;
      .el-icon-s-grid {
        width: 30px;
        height: 100%;
        text-align: center;
        line-height: 30px;
        border-right: 1px solid;
        background-color: #ccc;
      }
      .dan {
        width: 90%;
        height: 100%;
        line-height: 30px;
        padding-left: 30px;
        box-sizing: border-box;
      }
    }

    .el-table {
      width: 100%;
      .el-table_header-wrapper {
        width: 100%;
        .el-table_header {
          width: 100%;
        }
      }
    }
  }
}

</style>