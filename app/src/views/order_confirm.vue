<template>
  <div class="order">
    <div v-if="!addressFlag">
    <div class="head">
    <van-nav-bar title="确认订单"
                 left-text="返回"
                 right-text="   "
                 left-arrow
                 @click-left="onClickLeft"
                 @click-right="onClickRight" />
    <div class="address" @click="addressFlag = true"
         style="margin:20px 10px;line-height:25px">
      <p style="font-size:16px;color:red">收货地址</p>
      <p style="font-size:20px"><span>{{addlist.name}}</span><span style="margin:0px 6px">{{addlist.phone}}</span> </p>
      <p class="dizhi" style="font-size:16px"><span>地址：{{addlist.address}}</span></p>
      
    </div>
</div>
<div class="SH">
    <div class="shop"
         v-for="(item,index) in orderData"
         :key="index">
      <p style="font-size:16px;font-weight:bold">{{item.shop[0].shop_name}}</p>
      <div v-for="(item1,index1) in item.shop"
           :key="index1">

        <div class="good">
          <van-card :num="item1.goods_num"
                    :price="item1.price"
                    :desc="item1.shop_name"
                    :title="item1.goods_name"
                    :thumb="item1.image">
          </van-card>
        </div>

      </div>
    </div>
</div>
    <div class="footer">
      <p><span>商品金额</span><span>总计{{ Number(count_price) - Number(count_freight) }}</span></p>
      <p>
        <span> 运费 </span> <span> {{count_freight }}</span>
      </p>
      <p><span>实付金额</span><span>{{ count_price }}</span></p>
      <van-button type="info" @click="turnpay()"
                  round>在线支付</van-button>
    </div>
    </div>
     <address-com @getdata="getaddress" v-if="addressFlag"></address-com>

  </div>
</template>
<script>
import addressCom from "./address";
export default {
  name: "order_confirm",
components: {
    addressCom
  },
  data () {
    return {
      orderData: [],
      cartid: "",
      count_price: 0,
      count_freight: 0,
      addlist:{},
      addressFlag: false
    }
  },
  methods: {
    onClickLeft () {

    },
    onClickRight () {

    },
    getaddress(flag, obj) {
      //子传父
     this.addressFlag = flag;
      this.addlist = obj;
    },
   
    // turnAddress(){
    //   this.$router.push("/address")
    // },
    turnpay(){
      this.$router.push({
        name:"choosepay",
        params:{
           cartid: this.cartid, 
           addressid: this.addlist.id 
         
        }
      })
    }
  },
  created () {
    
    //收货地址
    this.axios
    .post("https://api.ymduo.com/Address/addresslists",
    this.$qs.stringify({
      uid:"956519"
    })
    ).then(res=>{
      console.log(res);
     this.addressData= res.data.result.data;
     console.log(this.addressData);
     this.addressData.forEach(ele=>{
       if(ele.def=="1"){
         this.addlist=ele;
       }
     })

    })

      //结算订单信息
      this.cartid = this.$route.params.cartid;
      this.axios
        .post("https://api.ymduo.com/order/order_confirm",
          this.$qs.stringify({
            userid: 956519,
            use_balance: 0,
            use_integral: 0,
            use_auction_integral: 0,
            is_pei: 0,
            pf: 1,
            cart_id: this.cartid,
            ymVoucher: "",
            address_id: ""
            
          })
        )
        .then(res => {
          console.log(res);
          if (res.data.code == "202") {
            this.$Toast.fail(res.data.msg);
            this.$router.push("/cart");
          }
          this.orderData = res.data.result.data.info;
          
          this.count_price = res.data.result.data.count_price; //总价
          this.count_freight = res.data.result.data.count_freight; 
          
          console.log(this.orderData);

        })
    
  }
}
</script>
<style lang="less" scoped>
.order {
  margin: 0px 15px;
  padding-bottom: 60px;
  .good {
    width: 100%;
  }
.SH{
  padding-top: 150px;
}
  .footer {
    text-align: center;
    .van-button {
      width: 80%;
    }
    p {
      margin: 25px 0px;
      font-size: 15px;
      display: flex;
      justify-content: space-between;
    }
  }
}
.address{
  .dizhi{
display: flex;
justify-content: space-between;
  }
}
.head{
  position: fixed;
  width: 100%;
  top: 0;
  background: white;
  z-index: 999;
  left: 0;
  height: 150px;
}
</style>