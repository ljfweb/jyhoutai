<template>
	<div class="my">
		<van-nav-bar
  title="我的京东"
  left-text="返回"
  right-text="按钮"
  left-arrow
  @click-left="onClickLeft"
  @click-right="onClickRight"
>
 <template #right>
    <van-icon name="ellipsis" size="18" /> 
  </template>
</van-nav-bar>
<van-card 
  :desc="'昵称：' + userData.nickname"
	:title="'手机 ：' + userData.tel"
	:thumb="userData.head"
/>
<van-grid>
	<van-grid-item icon="more" @click="turnorder(0)" :badge="orderNum.all" text="全部订单" />
  <van-grid-item icon="card" :badge="orderNum.dfk" @click="turnorder(1)" text="代付款" />
  <van-grid-item icon="bag" :badge="orderNum.dsh" text="待收货" />
  <van-grid-item icon="gold-coin" :badge="orderNum.wc" text="退货售后" />
  
</van-grid>
<div style="margin-top:10px;">
    <van-cell title="我的收货地址" is-link to="/address" />
    <van-cell title="我的资产" is-link to="index" />
  </div>
</div>
</template>

<script>
	export default{
		name:"my",
		data(){
			 return{
					
					userData: "",
					orderNum:""
		   }
		},
		methods:{
			onClickLeft(){},
			onClickRight(){},
			turnorder(type){
         this.$router.push({name:"myorder",params:{type:type}})

			}
		},
		created(){
			this.axios
			.post("https://api.ymduo.com/Member/information",
			this.$qs.stringify({ uid: 956519 })
			).then(res=>{
				console.log(res);
        this.userData = res.data.result.data;
			}),
			this.axios
			.post("https://api.ymduo.com/ordershow/typenum",
			this.$qs.stringify({ userid: 956519 })
			)
			.then(res=>{
				console.log(res);
        this.orderNum=res.data.result.data;
			})
		}
	}
</script>

<style scoped lang="less">
.my{
	position: relative;
}
.my .tab{
	position: absolute;
	top:100%;
	left: 0;
}
</style>
