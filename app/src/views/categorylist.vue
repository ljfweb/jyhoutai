<template>
  <div>
    <van-nav-bar
  title="标题"
  left-text="返回"
  right-text=""
  left-arrow
  @click-left="onClickLeft"
>
<template #title>
      <van-search shape="round" placeholder="请输入搜索关键词" />
   </template>
	 </van-nav-bar>
   <search-list :relist="list_1"></search-list>
  </div>
</template>
<script>
import searchList from "./searchlist";
export default {
  name:"categorylist",
  data(){
    return{
cid:"",
list_1:[]
    }
  },
  methods:{
    onClickLeft(){this.$router.go(-1)}
  },
  created(){
   
    this.cid=this.$route.params.cid
  },
  mounted(){ this.axios
    .post("https://api.ymduo.com/category/goodsList",
    this.$qs.stringify({
      category_id:this.cid,
      order:1
    })
    )
    .then(res=>{
      this.list_1=res.data.result.data;
      console.log(res)
    })},
  components:{
    searchList
  }
}
</script>
<style scoped lang="less">

</style>