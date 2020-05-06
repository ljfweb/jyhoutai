<template>
  <div><van-address-edit
  :area-list="areaList"
  show-postal
  show-delete
  :address-info="AddressInfo"
  show-set-default
  show-search-result
  :search-result="searchResult"
  :area-columns-placeholder="['请选择', '请选择', '请选择']"
  @save="onSave"
  @delete="onDelete"
  @change-detail="onChangeDetail"
/></div>
</template>
<script>

import areaList from "./area.js";
export default {
  name:"plusaddress",
   data() {
    return {
     areaList: areaList,
      searchResult: [],
      AddressInfo:{
        name:"lilu",
        tel:18388888888
      },
      
    }
  },
  methods: {
    onSave(item) {
      console.log(item);
      var defcode=item.isDefault?"1":"0";
      this.axios.post("https://api.ymduo.com/Address/editaddress",
      this.$qs.stringify({
       uid: 956519,
       consignee: item.name,
       province: item.province,
            city: item.city,
            address: item.addressDetail,
            phone: item.tel,
            tel:"",
            postalcode: item.postalCode,
            def: defcode,
            raid:this.raid//raid 存在是修改 否则是添加
      })
      ).then(res=>{
        console.log(res);
       
        if(item.isDefault){
          this.axios
          .post(
            "https://api.ymduo.com/Address/setdefault",
                this.$qs.stringify({
                  uid: 956519,
                  raid: this.raid
                })
          ).then(res=>{
            console.log(res)
          })
        }
         this.$router.push("/address");
      })
    },
    onDelete() {
     
    },
    onChangeDetail(val) {
     console.log(val)
    }
  },
  created(){
    this.raid = this.$route.params.raid;
    if(this.raid){
      console.log("修改");
      this.axios.post(
        "https://api.ymduo.com/Address/updateadd",
          this.$qs.stringify({
            uid: 956519,
            raid: this.raid
          })
      ).then(res=>{
        console.log(res);
        var info = res.data.result.data;
          this.AddressInfo.name = info.consignee;
          this.AddressInfo.addressDetail = info.address;
          this.AddressInfo.tel = info.phone;
      })
    }
    // this.axios
    // .post("https://api.ymduo.com/Address/getaddbycode").then(res=>{
    //   console.log(res)
    // })

  }
}
</script>
<style scoped lang="less">

</style>