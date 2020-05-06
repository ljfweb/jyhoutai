<template>
  <div class="cart">
    <div>
    <van-nav-bar
  title="购物车"
  left-text="返回"
  right-text="  "
  left-arrow
  @click-left="onClickLeft"
  @click-right="onClickRight"
/>
</div>
<div class="shop" v-for="(item,index) in cartData" :key="index">
  <van-checkbox class="dm" v-model="item.storeChecked" @click="check($event,item,'store')">{{item.shop[0].shop_name}}</van-checkbox>
  <div v-for="(item1,index1) in item.shop" :key="index1">
  <div class="good">
     <van-checkbox v-model="item1.is_checked" @click="check($event,item1,'goods')"></van-checkbox>


<van-card 

:price="item1.current_price"
  :desc="item1.shop_name"
  :title="item1.goods_name"
  :thumb="item1.goods_pic"
>
<template #num>

<van-button type="default"  @click="jian(item1.goods_id,item1.goods_num,item1.shop_id)">-</van-button>
<span>{{item1.goods_num}}</span>
<van-button type="default" @click="jia(item1.goods_id,item1.goods_num,item1.shop_id)">+</van-button>

</template>
<template #footer> <van-button class="del" @click="del(item1.goods_id,item1.shop_id)" style="width:60px;margin:0px" size="mini">删除</van-button></template>
</van-card >

</div>
</div>
</div>

<div class="foot">
<div class="quanxuan">
<van-checkbox v-model="checkedAll" 
     @click="check($event,checkedAll,'all')"></van-checkbox>
<span>全选</span>
</div>
<div class="zj">
<span>总计：￥{{zjData.total_price}}</span>
<van-button class="confirm" round color="red" @click="confirm">去结算({{zjData.total_num}}件)</van-button>
</div>
</div>

  </div>
</template>
<script>
export default {
  name:"cart",
data(){
  return{
cartData:[],
checkedAll:true,
zjData:[],
value: 1,
 cartid: [],
 total_price: 0,
      total_num: 0,
  }
},
 methods: {
    onClickLeft() {
     
    },
    onClickRight() {
      
    },
    del(id,shop){
      this.axios
  .post("https://api.ymduo.com/cart/del",
  this.$qs.stringify({
    user_id:956519,
    shop_id:shop,
    goods_id:id,
   
    sku_id:0,
  }))
  .then(res=>{
    this.list()
  })
    },

jia(id,num,shop){
  num++
  this.axios
  .post("https://api.ymduo.com/Cart/update",
  this.$qs.stringify({
    user_id:956519,
    shop_id:shop,
    goods_id:id,
    goods_num:num,
    sku_id:0,
  }))
  .then(res=>{
    this.list()
  })

},
confirm(){
  this.cartid=[];
  console.log(this.cartData);
  this.cartData.forEach(ele => {
        ele.shop.forEach(element => {
          if (element.is_checked) {
            this.cartid.push(element.id);
          }
        });
      });
      console.log(this.cartid.join());


   this.$router.push({
        name: "order_confirm",
        params: { cartid: this.cartid.join() }
      });

},
jian(id,num,shop){
  if(num>1){
    num--
  }else{
    num=1
  }
  this.axios
  .post("https://api.ymduo.com/Cart/update",
  this.$qs.stringify({
    user_id:956519,
    shop_id:shop,
    goods_id:id,
    goods_num:num,
    sku_id:0,
  }))
  .then(res=>{
    this.list()
  })

},
    list(){
      this.axios
      .post("https://api.ymduo.com/Cart/lists",
this.$qs.stringify({
  user_id:956519
})
)
.then(res=>{
  var info=res.data.result.data.info;
  info.forEach((item,index)=>{
    let Allcheck=true;
    item.shop.forEach((items,indexs)=>{
      items.is_checked=items.is_checked=="0"?false:true;
      if(!items.is_checked){
        Allcheck=false;
      }

    })
    item.storeChecked=Allcheck;
  }),
  console.log(res);
  this.cartData=res.data.result.data.info;
  console.log(this.cartData);
  this.changeAll()
})
    },
   
   
    check(event,item,checkwho){
      var params;

if(checkwho=="goods"){
  params={
    user_id: 956519,
    shop_id: item.shop_id,
    goods_id: item.goods_id,
    sku_id: item.sku_id,
  is_checked:Number(!item.is_checked),
  pmid:item.pmid

  }
}else if(checkwho=="store"){
  params={
  user_id: 956519,
    shop_id: item.shop[0].shop_id,
    shop_all:1,
    is_checked:Number(!item.storeChecked),
  }
}else{
  params={
    user_id: 956519,
    check_all:1,
    is_checked:Number(!item),
  }
}
   this.axios
      .post("https://api.ymduo.com/cart/is_checked",
this.$qs.stringify(params)
)
.then((res)=>{
  var info=res.data.result.data.info;
  info.forEach((item,index)=>{
    let Allcheck=true;
    item.shop.forEach((items,indexs)=>{
      items.is_checked=items.is_checked=="0"?false:true;
      if(!items.is_checked){
        Allcheck=false;
      }

    })
    item.storeChecked=Allcheck;
  }),
  
  this.cartData=res.data.result.data.info;
  this.zjData=res.data.result.data;
  console.log(this.zjData);
  this.changeAll()
})
    },
    changeAll(){
      let sum=0;
      let Allcheck=true;
      this.cartData.forEach(item=>{
        item.shop.forEach((item1,index1)=>{
          if(item1.is_checked){
          sum+=Number(item1.goods_num);

        }else{
          Allcheck=false;
        }
        })
      })
      this.checkedAll=Allcheck;
    }
    
    
  
  },
    created(){
      this.list();
    }
}
</script>
<style lang="less" scoped>
.cart{
  
  padding-bottom: 120px;
  position: relative;
  .dm{
    margin: 10px 5px;
    font-size: 15px;
    font-weight: bold;
  }
  .good{
    padding-left:5px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-around;
    background: #f8f8f8;

    .van-card{
      width: 90%;
      
      .van-button{
        width: 25px;
        height: 25px;
        padding: 0px;
        line-height: 20px;
        font-size: 12px;
      }
      span{
        margin: 0px 5px;
      }
    }
  }
  .foot{
    width: 100%;
    display: flex;
    justify-content: space-between;
    background: white;
    position: fixed;
    bottom: 59px;
    left: 0px;
    margin-left: 5px;
   .quanxuan{
     padding-top: 10px;
     line-height: 30px;

   }
    .van-button{
    width:120px;
    height: 40px;
    margin: 10px;
    text-align: center;
    font-size: 12px;
  }
    
  }
}
</style>