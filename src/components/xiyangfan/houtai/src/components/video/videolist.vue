<template>
  <div class="video_wrap">
    <el-breadcrumb class="tnav" separator="/">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">课程管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>课程列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="search">
      <div>
        <el-input v-model="val"></el-input>
        <el-button type="success" @click="search">查询</el-button>
      </div>

      <el-button type="primary" @click="turnadd()">添加</el-button>
    </div>
    <div class="table_head">
      <i class="el-icon-platform-eleme"></i>
      课程列表页
    </div>
    <el-table :data="tableData">
      <el-table-column label="名称" width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.Vname }}</span>
        </template>
      </el-table-column>
      <el-table-column label="绑定课程" width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.Vstate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="时长" width="180">
        <template slot-scope="scope">
          {{ scope.row.Vtime }}
        </template>
      </el-table-column>
      <el-table-column label="上传日期" width="180">
        <template slot-scope="scope"
          >{{ new Date(scope.row.createAt).toLocaleString() }}
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="edit(scope.$index, scope.row)">
            编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :page-size="1"
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
  name: "videolist",
  data(){
    return {
      total: 1,
      currentpage: 1,
      tableData: [],
      val: ""
    };
  },
  created(){
    this.getvideolist(1);
  },
  methods: {
    getvideolist(pageStart, searchText) {
      this.axios({
        url: "/VueHandler/VideoHandler?action=showlist",
        method: "post",
        data: {
          searchText: searchText,
          pageStart: pageStart
        }
      }).then(res => {
        console.log(res);
        if (!res.data.err) {
          this.total = Math.ceil(res.data.data.count / res.data.data.pageSize);
          this.tableData = res.data.data.list;
        } else {
          this.$message.error(res.data.err);
        }
      });
    },
    nowpage(val) {
      //分页
      this.currentpage = val;
      this.getvideolist(this.currentpage);
    },
    prev(){},
    next(){},
    search(){
      //搜索
      this.getvideolist(1, this.val);
      this.val = "";
    },
    turnadd(){},
    edit(){},
    handleDelete(index, row) {
      // 删除
      console.log(row.ID);
      this.axios({
        url: "/VueHandler/VideoHandler?action=delete",
        method: "get",
        params: {
          ID: row.ID
        }
      }).then(res => {
        console.log(res);
        this.getvideolist(1);
      });
    }
  }
};
</script>

<style lang="less" scoped>
.video_wrap {
  width: 80%;
  margin: 0 auto;
}
.tnav {
  line-height: 60px;
  font-size: 20px;
}
.search {
  display: flex;
  justify-content: space-between;
  .el-input {
    width: 340px;
  }
}
.table_head {
  width: 100%;
  margin: 20px auto;
  line-height: 40px;
  border: 1px solid #e5e5e5;
}
</style>
