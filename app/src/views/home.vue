<template>
  <div class="home"  ref="wrap">
	  <div>
			
	  <header-com></header-com>
	  <index-nav></index-nav>

	  <div class="tui">为你推荐</div>
	  <div class="list">
		  <div>
		<div class="list_one" v-for="(item,index) in relist" :key="index" @click="turninfo(item.goods_id)"> 
		
			<img :src="item.image" alt="">
			<p class="van-multi-ellipsis--l2">{{item.goods_name}}</p>
			<p><span>￥{{item.price}}</span><span>看相似</span></p>
		</div>
	  </div>
	  </div>
   </div>
   </div>
</template>

<script>

import headerCom from '../components/header.vue'
import indexNav from '../components/indexnav.vue'
import Bscroll from "better-scroll"
export default {
  name: "Home",
   data(){
	return{
		relist:[],
		myscroll:"",
		page:1
	}  
  },
  components:{
	  headerCom,
	  indexNav
  },
	methods:{
		turninfo(pid){
			this.$router.push({name:"info",params:{pid:pid}})
		},
		getlist(){
			 var mydata = this.$qs.stringify({
        p: this.page,
        pf: this.page
      });
			this.axios({
				url:"https://api.ymduo.com/Interface/recommendlists",
				method:"post",
				data:mydata
			}).then(res=>{
				console.log("18",res);
				this.relist=this.relist.concat(res.data.result.data);
		  		
				
			})
		}

	},
	 created(){
	  this.getlist()
  },
  mounted(){
		this.$nextTick(()=>{
			this.myscroll=new Bscroll(this.$refs.wrap,{
				 scrollY:true,//y方向滚动开启
				 click:true,//开启点击
				 pullDownRefresh: {//开启下拉刷新
				   threshold: 50,
				   probeType: 3
				 },
				 pullUpLoad: {//开启上拉加载
				   threshold: 744
				 }
				 
			})
			// 监控上拉
			this.myscroll.on('pullingUp', () => {
			
//					  ...发送Ajax从后台拿数据...
				this.page++;
				this.getlist()
				
			  this.$nextTick(() => {
				this.myscroll.refresh() 
			  })
			  this.myscroll.finishPullUp() 
			})
			
		})

	}
};
</script>
<style lang="less" scoped>
		.tui{
			width: 100%;  
			height: 50px;
			font-size: 25px;
			margin-top: 30px;
			color: #0570DB;
			text-align: center;
		}
		.list div{
			display: flex;
			flex-wrap: wrap;
			justify-content: space-around;
		
		}
		.list_one{
			width:48%;
			line-height: 20px;
			float: left;
			
		}
		.list_one img{
			width:100%;
			height: 180px;
		}
		.list_one span:nth-child(1){
			color:red;
			font-size: 20px;
			margin-right: 30px;
		}
		
		.list_one span:nth-child(2){
			display: inline-block;
			border: 1px solid black;
			line-height: 26px;
		}
		
		
</style>
