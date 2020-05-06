<template>
  <div class="category">
  <van-nav-bar
  title="标题"
  left-text="返回"
  right-text=""
  left-arrow
  @click-left="onClickLeft"
>
<template #title>
      <van-search shape="round"  v-model="searchText" placeholder="请输入搜索关键词" />
   </template>
	 </van-nav-bar>

	 <div class="main">
		 <van-sidebar v-model="activeKey">
  <van-sidebar-item 
	v-for="(item,index) in oneCategory" 
	:key="index" 
	:title="item.category_cn" 
	@click="getData(item.category_id)"/>
</van-sidebar>
<div class="Cont">
<div class="content" 
  v-for="(titem,index) in twoCategory" 
	:key="index" 
	@click="turnCate(titem.category_id)"
 >
 <img :src="titem.img" alt="">
		<p>{{ titem.category_cn }}</p></div>
		
	
	
	
</div>
	 </div>
	 
  </div>
</template>

<script> 

export default {
	name: "category",
	data(){
		return{
			searchText:"",
			activeKey: 0,
			oneCategory:[],
			twoCategory:[]
		}
	},
  methods: {
		
    onClickLeft(){
			this.$router.go(-1)
		},
		getData(id){
			this.axios
      .post("https://api.ymduo.com/category/categoryList", 
        this.$qs.stringify({
            category_id: id
          })
			)
      .then(res => {
        console.log(res);
        this.twoCategory = res.data.result.data;
      });
		},
		turnCate(cid){
      this.$router.push({ name: "categorylist", params: { cid: cid } });
    
		}
	},
	created() {
    this.axios
      .post("https://api.ymduo.com/category/categoryList", {
        category_id: 1
      })
      .then(res => {
        console.log(res);
        this.oneCategory = res.data.result.data;
      });
	},
	mounted() {
    this.getData(2390);
  },//页面直接加载出来的

}
</script>

<style lang="less" scoped>
.main{

	margin-top: 10px;
display: flex;

	justify-content: space-between;
	flex-wrap: wrap;
.van-slider{
	float: left;
	width: 25%;
	height: auto;
}
.content{

	text-align: center;
	padding:  10px;
	box-sizing: border-box;

	
		img{
			width:70px;
			height: 70px;
		
	}

}
}
.Cont{
	display: flex;
	width: 75%;
	justify-content: space-between;
	flex-wrap: wrap;
}
</style> 

