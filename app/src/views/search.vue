<template>
  <div class="search">
   <van-nav-bar
  title="标题"
  left-text="返回"
  right-text="按钮"
  left-arrow
  @click-left="onClickLeft"
  
>
   <template #title>
      <van-search shape="round"  v-model="searchText" placeholder="请输入搜索关键词" />
   </template>
   <template #right>
     
    <van-button color="red" @click="getSearch">搜索</van-button>
    
  </template>
 </van-nav-bar>

<div class="zuijin" v-if="!ishow">
  <p><span>最近搜素</span><span><van-icon name="delete" @click="clear"/></span></p>
  <van-tag  
    color="#c5c5c5"
    v-for="(item,index) in s_list"
    :key="index">
    {{item}}
    </van-tag>
</div>

<div class="zuijin" v-if="!ishow">
  <p><span>热门搜素</span><span><van-icon name="close" /></span></p>
  <van-tag>标签</van-tag>
</div>
<search-list :relist="mylist" v-if="ishow"  @redata="getData"
      :keywords="searchText"></search-list>
</div>
</template>
<script>
import searchList from "./searchlist";
export default {
  name:"search",
  data(){
    return{
      
      searchText: "",
      s_list: [],
      ishow: false,
      mylist: []

    }
  },
  components:{
    searchList
  },
  mounted() {
    if (!localStorage.list) {
      localStorage.list = "[]"; //为了存放 最近搜索
    }
    this.s_list = JSON.parse(localStorage.list);
  },
  methods:{
    
    onClickLeft() {
      this.$router.go(-1);//回退上一页
    },
    clear(){
      localStorage.list="[]";
      this.s_list=JSON.parse(localStorage.list);
    },
    getData(order, keywords) {
      //子传父调用的方法
      console.log(order, keywords);
      this.getSearch(order, keywords);
       //根据子组件传来的数据 重新请求
    },
    getSearch(){
  var arr = JSON.parse(localStorage.list);
  if(this.searchText){
arr.push(this.searchText);
      localStorage.list = JSON.stringify(arr);
      this.s_list = JSON.parse(localStorage.list);
  }
      
      this.ishow = true;
      this.axios
        .post(
          "https://api.ymduo.com/search/index",
          this.$qs.stringify({
            keywords: this.searchText,
            p: 1,
            order: 1
          })
        )
        .then(res => {
          console.log(res);
          this.mylist = res.data.result.data;
        });
    }

}

}
</script>
<style lang="less" scoped>
.search .van-nav-bar{
  background: white;
}
.search .van-button{
  height: 30px;
  font-size: 16px;
  line-height: 25px;
  border-radius: 20px;
  
}
.zuijin p{
  display: flex;
  justify-content: space-between;
  font-size: 16px;
} 
.zuijin{
  margin:20px;
  line-height: 25px;
}

</style>