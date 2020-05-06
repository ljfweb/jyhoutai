<template>
  <div><van-address-list
  v-model="chosenAddressId"
  :list="list"
  :disabled-list="disabledList"
  disabled-text="以下地址超出配送范围"
  default-tag-text="默认"
  @add="onAdd"
  @edit="onEdit"
   @click-item="changeadress"
/></div>
</template>
<script>

export default {
  name:"addres",
  data() {
    return {
      chosenAddressId: '1',
      list: [
        // {
        //   id: '1',
        //   name: '张三',
        //   tel: '13000000000',
        //   address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室',
        //   isDefault:true
        // },
      ],
      disabledList: [
        {
          id: '3',
          name: '王五',
          tel: '1320000000',
          address: '浙江省杭州市滨江区江南大道 15 号'
        }
      ]
    }
  },
  methods: {
    onAdd() {
      this.$router.push("/plusaddress")
    },
    onEdit(item) {
      console.log(item)
       this.$router.push({name:"plusaddress", params: { raid: item.id }})
    },
     changeadress(item, index) {
      //点击的地址数据
      
      this.$emit("getdata", false, this.mydata[index]); //子传父
    }
  },
  created(){
    this.axios
    .post( "https://api.ymduo.com/Address/addresslists",
        this.$qs.stringify({
          uid: 956519
        })
        )
        .then(res=>{
          console.log(res);
          var mydata=res.data.result.data;
          var mylist=mydata.map(item=>{
            var isflag="";
            if(item.def=="1"){
              isflag=true
            }else{
              isflag=false
            }
            return{
              id: item.id,
              tel: item.phone,
              address: item.address,
              name: item.name,
              isDefault:isflag
            }
          })
          
          this.list=mylist;

        })
  }
}
</script>
<style scoped lang="less">

</style>