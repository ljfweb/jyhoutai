<template>
  <div>
    <el-card>
      <!-- 面包屑显示 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>课程管理</el-breadcrumb-item>
        <el-breadcrumb-item>课程列表</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 搜索显示和注册添加 -->
      <el-row :gutter="24" type="flex" align="middle">
        <el-col :span="4"
          ><div class="grid-content ">
            <el-input v-model="searchValForm.val" placeholder="课程名称搜索"></el-input></div
        ></el-col>
        <el-col :span="3"
          ><div class="grid-content " style="font-size: 20px;">
            专业选择：
          </div></el-col
        >
        <el-col :span="4"
          ><div class="grid-content">
            <!-- 级部选择 -->
            <el-select v-model="classNameCheck" placeholder="请选择">
              <el-option v-for="item in className" :key="item.value" :label="item.label" :value="item.value"> </el-option>
            </el-select></div
        ></el-col>
        <el-col :span="4"
          ><div class="grid-content ">
            <!-- 专业选择 -->
            <el-select v-model="classClassifyChecked" placeholder="请选择">
              <el-option v-for="item in classifyName" :key="item.value" :label="item.label" :value="item.value"> </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content ">
            <!-- 班级选择 -->
            <el-select v-model="classNum" placeholder="请选择">
              <el-option v-for="item in classNumItem" :key="item.value" :label="item.label" :value="item.value"> </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="4"
          ><div class="grid-content">
            <el-button type="primary" icon="el-icon-search" @click="searchText">查询</el-button>
            <el-button type="success" @click="addClassDateWeb">+添加</el-button>
          </div></el-col
        >
      </el-row>
      <!-- 表头 -->
      <el-row :gutter="20">
        <el-col :span="24"> <i class="el-icon-menu"></i><span>课程列表</span> </el-col>
      </el-row>
      <!-- 相关渲染列表 -->
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column label="课程名称" prop="Cname"> </el-table-column>
        <el-table-column label="课程代号" prop="Cnumber"> </el-table-column>
        <el-table-column label="在学人数" prop="onlineUser"> </el-table-column>
        <el-table-column label="所属分类">
          <template slot-scope="scope">
            <el-tag effect="plain">{{ scope.row.CategoryOne }}</el-tag>
            <el-tag effect="plain">{{ scope.row.CategoryTwo }}</el-tag>
            <el-tag effect="plain">{{ scope.row.CategoryThree }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="编辑日期" prop="upDateAt"> </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag type="warning" effect="dark" v-if="scope.row.isState == '1'">草稿</el-tag>
            <el-tag type="success" effect="dark" v-if="scope.row.isState == '2'">上架</el-tag>
            <el-tag type="danger" effect="dark" v-if="scope.row.isState == '3'">下架</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="360px">
          <template slot-scope="scope">
            <el-button
              size="small"
              @click="isLoadingFunction(scope.row.ID)"
              v-text="scope.row.isState == '2' ? '已上架' : '未上架'"
              :type="scope.row.isState == '2' ? 'success' : 'danger'"
            ></el-button>
            <el-button size="small" type="info">编辑</el-button>
            <el-button size="small" @click="isDeleteDateClass(scope.row)" type="primary">删除</el-button>
            <el-button size="small" @click="onTopFunction(scope.row.ID)" v-text="scope.row.isTop == true ? '已置顶' : '未置顶'" :type="scope.row.isTop == true ? 'success' : 'warning'"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分液器 -->
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[3, 6, 9]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageTotal"
        >
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  created() {
    this.getDate(); //获取列表数据
  },
  data() {
    return {
      searchValForm: {
        val: '',
        checkOne: '',
        checkTwo: '',
        checkThree: '',
      },
      currentPage: 1, //当前页
      pageSize: 1, //每页显示
      pageTotal: 1, //总页数
      courseNameSearch: '',
      classNameCheck: '级部选择',
      className: [
        {
          value: 1,
          label: '大学部',
        },
        {
          value: 2,
          label: '高中部',
        },
        {
          value: 3,
          label: '初中部',
        },
      ],
      classClassifyChecked: '专业选择',
      classifyName: [
        {
          value: 1,
          label: '前端开发',
        },
        {
          value: 2,
          label: '后端开发',
        },
        {
          value: 3,
          label: '运维',
        },
        {
          value: 4,
          label: '测试',
        },
        {
          value: 5,
          label: '大数据',
        },
      ],
      classNum: '班级选择',
      classNumItem: [
        {
          value: 1,
          label: '1班',
        },
        {
          value: 2,
          label: '2班',
        },
        {
          value: 3,
          label: '3班',
        },
      ],
      tableData: [],
    };
  },
  methods: {
    handleSizeChange(val) {
      //处理每页显示页数
      console.log(val);
    },
    handleCurrentChange(val) {
      //条转页数
      console.log(val);
      this.currentPage = val;
      this.getDate();
    },
    addClassDateWeb() {
      //网站跳转数据
      this.$router.push({
        name: 'kechengbianji',
      });
    },
    async onTopFunction(idds) {
      console.log(idds);
      //一键置顶函数
      const { data: res } = await this.axios({
        url: '/VueHandler/CourseHandler?action=top',
        method: 'post',
        data: {
          ID: idds,
        },
      });
      if (res.err) return this.$message.error(res.err);
      if (res.success) {
        this.$message.success(res.success);
        this.getDate(); //更新数据
      }
    },
    //上下架函数
    async isLoadingFunction(idds) {
      const { data: res } = await this.axios({
        url: '/VueHandler/CourseHandler?action=state',
        method: 'post',
        data: {
          ID: idds,
        },
      });
      if (res.err) return this.$message.error(res.err);
      if (res.success) {
        this.$message.success(res.success);
        this.getDate(); //更新数据
      }
    },
    //删除函数课程
    isDeleteDateClass(val) {
      console.log(val);
      this.$confirm(`是否删除《${val.Cname}》的课程？`)
        .then(async () => {
          const { data: res } = await this.axios({
            url: '/VueHandler/CourseHandler?action=delete',
            method: 'post',
            data: {
              ID: val.ID,
              _id: val._id,
            },
          });
          if (res.err) return this.$message.error(res.err);
          if (res.success) {
            this.$message.success('该条数据已经删除成功！！！');
            this.getDate(); //更新数据
          }
        })
        .catch(() => this.$message.warning(`已经取消对《${val.Cname}》删除`));
    },
    async getDate() {
      //获取所有的数据进行添加
      const { data: res } = await this.axios({
        url: '/VueHandler/CourseHandler?action=show',
        method: 'post',
        data: {
          searchText: this.searchValForm.val,
          CategoryOne: '',
          CategoryTwo: '',
          CategoryThree: '',
          pageStart: this.currentPage,
        },
      });
      console.log(res);
      this.pageSize = res.data.pageSize;
      this.pageTotal = res.data.count;
      this.tableData = res.data.list;
      this.getClassifyDate();
    },
    async searchText() {
      //搜索方法
      this.getDate(); //调用渲染
      this.searchValForm = {}; //清空搜索对象
    },
    async getClassifyDate() {
      //获取专业分类数据
      let { data: res } = await this.axios({
        url: '/VueHandler/CourseHandler?action=getcategory',
        method: 'get',
      });
      console.log(res);
    },
  },
};
</script>
<style lang="less" scoped>
.el-row {
  margin: 20px 0;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
