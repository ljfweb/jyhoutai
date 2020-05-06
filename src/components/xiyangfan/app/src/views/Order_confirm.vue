<template>
  <div>    
    <button @click="order_confirm" v-show="show">支付 </button>
    <div v-for="(item,index) in order" :key="index" v-show="show">
    <button @click="shi(item.address.id)" v-show="show">订单号</button>
      <p>ID:{{item.address.id}}</p>
      <p>姓名：{{item.address.consignee}}</p>
      <p>手机号：{{item.address.phone}}</p>
      <p>地址：{{item.address.area}}</p>
    <div v-for="(info,info_index) in item.info[0].shop" :key="info_index" class="info">
      <img :src="info.image" >
      <div>
      <p>商品名称：{{info.goods_name}}</p>
      <p>价格：{{info.price}}</p>
      <p>数量：{{info.goods_num}}</p>
      </div>
    </div>
    </div>
    <div class="weinxin">
      <img :src="weixin.code_url" >
      <p>微信支付单号：{{weixin.order_no}}</p>
      <p>订单号：{{weixin.pay_sn}}</p>
      <p>金额{{weixin.real_fee}}</p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      show:true,
      arr:[],
      order:[],
      pay_sn:'',
      weixin:[]
    }
  },
  methods:{
    data_post(){
      this.axios.post("https://api.ymduo.com/Cart/lists",this.$qs.stringify({ user_id: 956544 }))
      .then(res => {
        console.log(res)
        for(let i=0 ; i<res.data.result.data.info.length; i++){
          for(let j=0 ; j<res.data.result.data.info[i].shop.length; j++){
              if(res.data.result.data.info[i].shop[j].is_checked == 1){
                 this.arr.push(res.data.result.data.info[i].shop[j].id)
              }
          }
        }
      })
      .catch(err => {
        console.error(err); 
      })
    },
  //付款页面
  order_confirm(){
    console.log(this.arr)
    this.axios.post("https://api.ymduo.com/order/order_confirm",
    this.$qs.stringify({
    userid: 956544,
    cart_id:this.arr.join(),
    use_balance: 1,
    use_integral: 1}))
    .then(res => {
      console.log("支付数据",res.data.result.data)
      this.order =this.order.concat(res.data.result.data)
    })
    .catch(err => {
      console.error(err); 
    })
  },
  shi(id){
    this.show = false
    console.log(this.arr)
    this.axios.post("https://api.ymduo.com/order/generate_orders",
    this.$qs.stringify({
          userid: 956544,
     cart_id:this.arr.join(),
      addr_id: id,
      use_balance: 0,
      use_integral: 0,
      is_pei: 0,
      pf: 1,
    }))
    .then(res => {
      console.log("实验",res.data.result.data.pay_sn)
      this.pay_sn = res.data.result.data.pay_sn
      this.guy()
    })
    .catch(err => {
      console.error(err); 
    })
  },
  guy(){
    this.axios.post("https://api.ymduo.com/pay/wxPay",this.$qs.stringify({
      uid: 956544,
      pay_sn: this.pay_sn}))
    .then(res => {
      console.log(res.data.result.data)
      this.weixin = res.data.result.data
    })
    .catch(err => {
      console.error(err); 
    })
  }
  },
  mounted(){
    this.data_post();
  },
}
</script>


<style scoped lang="less">
.info{
  display: flex;
  img{
    width: 500px;
    height: 500px;
  }
}

</style>
