
<template>
  <div>
      <!-- Card 卡片 -->
    <el-card class="box-card">
        <!-- lay布局 -->
      <el-row :gutter="20">
        <el-col :span="7">
            <!-- 输入框 -->
          <el-input placeholder="请输入内容" v-model="queryInfo.searchText" class="input-with-select" :clearable="true" @clear="getwekcom">
            <el-button slot="append" icon="el-icon-search" @click="getwekcom"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
            <el-button type="danger">添加管理员</el-button>
        </el-col>
      </el-row>
    <!-- 表格 -->
    <el-table :data="welcomlist" border stripe>
        <el-table-column label="#"   type="index"/>
        <el-table-column label="用户名"   prop="userName"/>
        <el-table-column label="姓名"   prop="turename"/>
        <el-table-column label="用户id"   prop="tokenId"/>
        <el-table-column label="手机号" prop="phone"/>
        <el-table-column label="后台权限名"   prop="power"/>
        <el-table-column label="权限编码"   prop="powerCode"/>
        <el-table-column label="创建日期"   prop="createAt"/>
        <el-table-column label="编辑日期"   prop="upDateAt"/>
        <el-table-column label="状态"   prop="isdelete">
            <template slot-scope="scope" >
                <el-switch v-model="scope.row.isdelete" active-color="#13ce66" inactive-color="#ff4949"/>
            </template>
        </el-table-column>
        <el-table-column label="操作" width="170px" >
            <template slot-scope="scope" >
                <!-- 修改 -->
                <el-tooltip class="item" effect="dark" content="修改" placement="top" :enterable=false>
                <el-button type="primary" icon="el-icon-edit"  size="mini"  @click="isdialogVisible" ></el-button>
                </el-tooltip>
                <!-- 删除 -->
                <el-tooltip class="item" effect="dark" content="删除" placement="top" :enterable=false >
                <el-button type="danger" icon="el-icon-delete" size="mini" @click="del(scope.row.tokenId)" ></el-button>
                </el-tooltip>
            </template>
        </el-table-column>
    </el-table>
      <!-- 分页区域 -->
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pageStart"
      :page-sizes="[1, 2]"
      :page-size="0"
      :total="total"
      layout="total, sizes, prev, pager, next, jumper"
      > 
    </el-pagination>
    </el-card>
    <!-- 对话框 -->
    <el-dialog
  title="修改"
  :visible.sync="dialogVisible"
  width="30%">
  <span>
      <el-form  label-width="100px">
  <el-form-item label="活动名称" prop="name">
    <el-input ></el-input>
  </el-form-item>
  </el-form>
  </span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog>
  </div>
</template>

<script>
export default{
    data () {
        return {
            queryInfo:{
                searchText:'',
                // 当前页数
                pageStart:1,
            },
            welcomlist:[],
            total:0,
            dialogVisible: false
        }
    },
    created(){this.getwekcom()},
    methods:{
        del(tokenId){
            console.log(tokenId)
            this.axios.get("/VueHandler/AdminHandler?action=delete",{params:{tokenId:tokenId}})
            .then(res => {
                console.log(res)
                this.getwekcom()
            })
            
        },
        isdialogVisible(){
            console.log(123)
            this.dialogVisible = !this.dialogVisible
        },
        getwekcom(){
            this.axios.get("/VueHandler/AdminHandler?action=show",{params:this.queryInfo})
            .then(res => {
                console.log(res)
                if(res.status !== 200) {
                    this.$message.error("获取用户列表失败")
                }
                this.welcomlist =res.data.data.list
                this.total = res.data.data.count-0
            })
            .catch(err => {
                console.error(err); 
            })
        },
        // 监听
        handleSizeChange(newSize){
            // console.log(newSize)
            this.queryInfo.pageStart = newSize
            this.getwekcom()
        },
        // 监听
        handleCurrentChange(newPage){
            // console.log(newPage)
            this.queryInfo.pageStart = newPage
            this.getwekcom()
        }
    }
}
</script>
<style lang="less" scoped>
.el-breadcrumb {
    padding: 20px 20px;
}
.el-card{
    box-shadow: 0 1px 1px rgb(0 ,0 ,0 ,0.5);
    margin-left:15px;
    margin-right:25px;

}
</style>