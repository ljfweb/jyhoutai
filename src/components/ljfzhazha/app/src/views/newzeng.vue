<template>
  <div>
    <van-address-edit :area-list="areaList"
                      show-postal
                      show-delete
                      show-set-default
                      show-search-result
                      :search-result="searchResult"
                      :area-columns-placeholder="['请选择', '请选择', '请选择']"
                      @save="onSave"
                      @delete="onDelete"
                      @change-detail="onChangeDetail" />
  </div>
</template>
<script>
import { Toast } from 'vant';
import lis from "../../public/area.js"
export default {
  name: "newzeng",
  data () {
    return {
      areaList: lis,
      searchResult: []
    }
  },
  created () {
    console.log(this.areaList)
  },
  methods: {
    onSave () {
      this.axios.post("https://api.ymduo.com/Address/editaddress",
        this.$qs.stringify({
          uid: 956519,
          consignee: "",
          province: "",
          city: "",
          county: "",
          address: "",
          phone: "",
          tel: "",
          postalcode: "",
          def: 0,
          raid: "",
        })
      )
      this.$router.push("/address")
    },
    onDelete () {
      Toast('delete');
    },
    onChangeDetail (val) {
      if (val) {
        this.searchResult = [{
          name: '黄龙万科中心',
          address: '杭州市西湖区'
        }];
      } else {
        this.searchResult = [];
      }
    }
  }
}
</script>
