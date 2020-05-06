<template>
  <div>
    <div class="content">
      <div class="heads">
        <el-input v-model="val"></el-input>
        <div class="rights">
          <el-button type="success" @click="search">查询</el-button>
          <el-button type="primary" @click="addEquipment">添加</el-button>
        </div>
      </div>

      <div class="listes">
        <div>
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="name" label="视频名称" width="180">
              <template slot-scope="scope">
                <!-- <i class="el-icon-time"></i> -->
                <span style="margin-left: 10px">{{ scope.row.Vname }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="number" label="绑定课程" width="180">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.Vmosaic }}</span>
              </template>
            </el-table-column>

            <el-table-column prop="number" label="时长">
              <template slot-scope="scope">{{ scope.row.Vtime }}</template>
            </el-table-column>

            <el-table-column prop="data" label="编辑日期">
              <template slot-scope="scope">{{ scope.row.createAt }}</template>
            </el-table-column>

            <el-table-column prop="name" label="操作" width="290">
              <template slot-scope="scope">
                <el-button size="mini" type="danger" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <el-pagination
        :page-size="3"
        background
        layout="prev, pager, next"
        :total="total"
        @prev-click="prev"
        @next-click="next"
        :current-page="currentpage"
        @current-change="nowpage"
      ></el-pagination>
    </div>
    <div style="height:400px">
      <!-- //弹框 -->
      <el-dialog
        :title="titleMap[dialogStatus]"
        :visible.sync="dialogFormVisible"
        style="height:600px"
      >
        <el-form :model="form">
          <el-form-item label="视频url" width="180">
            <el-input v-model="form.major" auto-complete="off"></el-input>
          </el-form-item>
          <!-- <el-button @click="dialogFormVisible = false">上传</el-button> -->
          <el-button size="small" type="primary">点击上传</el-button>

          <el-form-item label="视频名称">
            <el-input v-model="form.minior" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="视频时长">
            <el-input v-model="form.mac" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
export default {
  name: "vidioList",
  data() {
    return {
      val: "模糊查找视频:名称",
      tableData: [],
      total: 1,
      currentpage: 1,
      // 弹框
      dialogFormVisible: false,
      form: {
        major: "",
        minior: "",
        mac: "",
        date: ""
      },
      //新增or编辑弹框标题(根据点击的新增or编辑按钮显示不同的标题)
      titleMap: {
        addEquipment: "添加视频",
        editEquipment: "编辑视频"
      },
      //新增和编辑弹框标题
      dialogStatus: ""
    };
  },
  methods: {
    getVideo(page, cont) {
      this.axios({
        url: "VueHandler/VideoHandler?action=showlist",
        method: "post",
        data: {
          pageStart: page,
          searchText: cont
        }
      }).then(res => {
        console.log(res);
        // this.$message("这是一条消息提示");

        if (res.data.err) {
          this.$message(res.data.err);
        } else {
          this.tableData = res.data.data.list;
          this.total = res.data.data.count;
        }
      });
    },
    search() {
      console.log(this.val);
      this.getVideo(1, this.val);
      // this.$message("这是一条消息提示");
    },
    addCour() {},
    prev() {},
    next() {},
    nowpage(val) {
      console.log(val);
      this.currentpage = val;
      this.getVideo(this.currentpage, "");
    },
    // 弹框
    //新增
    addEquipment() {
      //显示弹框
      this.dialogFormVisible = true;
      //新增弹框标题
      this.dialogStatus = "addEquipment";
    },
    //编辑
    handelEdit() {
      //显示弹框
      this.dialogFormVisible = true;
      //编辑弹框标题
      this.dialogStatus = "editEquipent";
    }
  },
  created() {
    this.getVideo(this.currentpage, "");
  }
};
</script>
<style lang="less" scoped>
.content {
  padding: 10px;
  background: #f5f5f5;
  min-width: 1100px;
  height: 100%;
  font-size: 16px;
}
.heads {
  width: 96%;
  height: 68px;
  border: 1px solid #cccccc;
  margin-top: 30px;
  display: flex;
  justify-content: space-around;
  line-height: 68px;
  text-align: center;
  .rights {
    width: 70%;
    margin-left: 0px;
    display: flex;
    float: right;
    height: 68px;
    line-height: 68px;
    text-align: center;
  }
  .el-input {
    width: 20%;
    float: left;
  }
  .el-button {
    height: 36px;
    text-align: center;
    margin-top: 25px;
  }
}
</style>