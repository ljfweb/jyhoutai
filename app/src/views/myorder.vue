<template>
  <div> <van-nav-bar title="我的订单" left-text="返回" left-arrow>
      <template #right>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar>
    <van-search
      v-model="value"
      shape="round"
      background="white"
      placeholder="请输入搜索关键词"
    />
    <van-tabs v-model="active" @change="getlist">
      <van-tab :badge="orderNum.all" title="全部订单">
    <van-card 
    v-for="(item, index) in alldata"
          :key="index"
          :num="item.goods[0].goods_num"
          :price="item.goods[0].goods_price"
          :desc="item.goods[0].store_name"
          :title="item.goods[0].goods_name"
          :thumb="item.goods[0].goods_img"
/>

  
  </van-tab>
  <van-tab title="代付款" :badge="orderNum.dfk">
		 <van-card 
    v-for="(item, index) in alldata"
          :key="index"
          :num="item.goods[0].goods_num"
          :price="item.goods[0].goods_price"
          :desc="item.goods[0].store_name"
          :title="item.goods[0].goods_name"
          :thumb="item.goods[0].goods_img"
>
<template #footer>
    <van-button size="mini">取消订单</van-button>
    <van-button size="mini"   @click="turnDeliivery(item.goods[0])">查看物流</van-button>
  </template>
</van-card>
	</van-tab>
  <van-tab :badge="orderNum.dsh" title="待收货" >待收货</van-tab>
  <van-tab :badge="orderNum.wc" title="退货售后">退货售后</van-tab>
  
</van-tabs>
    </div>
</template>
<script>
export default {
  name: "myorder",
   data() {
    return {
      cartid:[],
      value: "",
     active: 0,
     orderNum:"",
     alldata:"",
     type:""
    };
  },
  created(){
    this.axios
			.post("https://api.ymduo.com/ordershow/typenum",
			this.$qs.stringify({ userid: 956519 })
			)
			.then(res=>{
				console.log(res);
        this.orderNum=res.data.result.data;
      }),
       
    this.type = this.$route.params.type;
    this.active = this.type;//从哪个界面切换到那个
    this.getorder(this.type);
     
      
  },
  methods:{
    getlist(){
      this.getorder(this.active);
    },
    getorder(type){
       this.axios
      .post("https://api.ymduo.com/ordershow/index",
      this.$qs.stringify({
        userid:956519,
        page:1,
        type:type
      })
      ).then(res=>{
        console.log(res);
        this.alldata=res.data.result.data;
      })
    },
    turnDeliivery(cartid){
      // this.cartid=[];
      // this.alldata.forEach((item,index)=>{
      //   item.goods.forEach((item1,index1)=>{
      //     this.cartid.push(item1);
      //     console.log(item1)
      //   })
      // })
      this.$router.push({
        name:"delivery",
        params:{cartid:cartid}
      
      }

      );
     
    }
  }
}
</script>
<style lang="less" scoped>
.van-card .van-button{
  width: 90px;
  height: 25px;
  font-size: 12px;
}
</style>