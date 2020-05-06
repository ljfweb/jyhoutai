<template>
    <div>
        <jy-head></jy-head>
        <el-breadcrumb class="tnav" separator="/">
          <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item><a href="/">课程管理</a></el-breadcrumb-item>
          <el-breadcrumb-item>视频管理</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="serach">
          <div>
            <el-input v-model="searchText" placeholder="请输入内容"></el-input>
            <el-button type="success" >查询</el-button>
          </div>
          <el-button type="primary" >添加</el-button>
        </div>
        <div class="table_head">
          <i class="el-icon-platform-eleme"></i>
          视频管理
        </div>
        <div class="table_wrap">
          <el-table :data="tableData">
            <el-table-column label="名称" width="225">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.Vname }}</span>
              </template>
            </el-table-column>
            <el-table-column label="绑定课程" width="225">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.Vstate }}</span>
              </template>
            </el-table-column>
            <el-table-column label="时常" width="225">
              <template slot-scope="scope">
                {{ scope.row.Vtime }}
              </template>
            </el-table-column>
            <el-table-column label="上传日期" width="225">
              <template slot-scope="scope">{{ scope.row.updateAt }} </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
                  >编辑</el-button
                >
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
    </div>
</template>

<script>
    import jyHead from "../jyhead.vue";
    export default{
        name:"video",
        data(){
            return{
                msg:"",
                total:1,
                tableData:[]
            }
        },
        components:{
            jyHead
        },
        methods:{
            nowpage(){
                
            },
            currentpage(){
                
            },
            next(){
                
            },
            prev(){
                
            },
            handleDelete(){
                
            },
            handleEdit(){
                
            },
            getList(){
                this.axios({
                    url:"/VueHandler/VideoHandler?action=showlist",
                    method:"post",
                    data:{
                        searchText:"",
                        pageStart:1
                    }
                }).then(res=>{
                    console.log(res);
                    this.tableData=res.data.data.list
                })
            }
        },
        created() {
            this.getList();
        }
    }
</script>

<style lang="less" scoped>
    .tnav {
      width: 80%;
      margin: 0 auto;
      line-height: 50px;
      font-size: 20px;
      margin-left: 20px;
    }
    .serach {
      width: 80%;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      padding: 0 40px;
      div {
        display: flex;
      }
    }
    .table_head {
      width: 80%;
      margin: 0 auto;
      line-height: 40px;
      border: 1px solid #e5e5e5;
    }
    .table_wrap {
      width: 80%;
      margin: 0 auto;
    }
</style>
