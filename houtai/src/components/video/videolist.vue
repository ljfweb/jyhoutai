<template>
  <div>
     <el-breadcrumb class="tnav" separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">课程管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>视频管理</el-breadcrumb-item>
    </el-breadcrumb>

     <div class="serach">
      <div>
        <el-input v-model="searchText" placeholder="编辑查找视频"></el-input>
        <el-button type="success"  @click="search">视频查询</el-button>
      </div>
      <el-button type="primary" style="background:#260346" @click="add">+添加视频</el-button>
    </div>

    <div class="table_head">
      <i class="el-icon-platform-eleme"></i>
      视频列表
    </div>
    
    <div class="table_wrap">
       <el-table :data="videoData">
          <el-table-column label="名称" width="180">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{scope.row.Vname}}</span>
            </template>
          </el-table-column>
          <el-table-column label="绑定课程" width="400">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{scope.row.Vstate}}</span>
            </template>
          </el-table-column>
          <el-table-column label="时长" width="300">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{scope.row.Vtime}}</span>
            </template>
          </el-table-column>
          <el-table-column label="上传日期" width="300">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{new Date(scope.row.createAt).toLocaleString()}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="180">
            <template slot-scope="scope">
               <el-button size="mini" @click="handleEdit(scope.$index,scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index,scope.row)"
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
export default {
  name:"videolist",
  data(){
    return{
      total:1,
      searchText:"",
       currentpage: 1,
      videoData:[],
      val:""
   
    }
  },
  created(){
    this.getlist(1);
    
  },
  methods:{

    // videopush(){
    //    this.axios({
    //      url:"/VueHandler/UpLoadVideoHandler",
    //      method: "post",
    //     data: {

    //     }
    //    }).then(res=>{
    //      console.log(res)
    //    })
    // },
    getlist(pageStart,searchText){
       this.axios({
         url:"/VueHandler/VideoHandler?action=showlist",
         method: "post",
        data: {
          
          searchText: searchText,
          pageStart: pageStart
        }
       }).then(res=>{
         console.log(res);

          if (!res.data.err) {
          this.total = Math.ceil(res.data.data.count / res.data.data.pageSize);
          this.videoData = res.data.data.list;
        } else {
          this.$message.error(res.data.err);
        }
         console.log(this.videoData)
       })
    },
    nowpage(val) {
      console.log(val);
      this.currentpage = val;
      this.getlist(this.currentpage)
    },
    search(){
      // console.log(111)
       this.getlist(1,this.val);
       this.val="";
    },
    add(){},
    handleDelete(index,row){
      this.axios({
        url:"/VueHandler/VideoHandler?action=delete",
        method:"get",
        params:{
          ID:row.ID
        }
      }).then(res=>{
        console.log(res);
        this.getlist(1);
      })
    },
     
    prev() {
      // console.log(this.currentpage);
      // this.getlist(this.currentpage);
    },
    next() {
      // console.log(this.currentpage);
      // this.getlist(this.currentpage);
    },
  },
  
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
  height: 70px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  margin: 0 auto;
  padding: 13px 20px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  .el-input{
    width: 300px;
  }
  .el-button{
    margin: 0px 20px;
  }
}
.table_head {
  width: 80%;
  margin: 0 auto;
  line-height: 40px;
  border: 1px solid #e5e5e5;
  font-size: 16px;
}
.table_wrap {
  width: 80%;
  margin: 0 auto;
}
</style>