<template>
  <div>
    <van-address-edit
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
      @change-area="getarea"
    />
  </div>
</template>

<script>
import arealist from "../aear.js";
export default {
  name: "plusaddress",
  data() {
    return {
      areaList: arealist,
      searchResult: [],
      province_list: [],
      AddressInfo: {
        name: "li",
        tel: 18888888888
      },
      raid: ""
    };
  },
  created() {
    this.raid = this.$route.params.raid;
    if (this.raid) {
      console.log("修改");
      this.axios
        .post(
          "https://api.ymduo.com/Address/updateadd",
          this.$qs.stringify({
            uid: 956519,
            raid: this.raid
          })
        )
        .then(res => {
          console.log(res);
          var info = res.data.result.data;
          this.AddressInfo.name = info.consignee;
          this.AddressInfo.addressDetail = info.address;
          this.AddressInfo.tel = info.phone;
        });
    }
  },
  methods: {
    getarea() {},
    onSave(item) {
      console.log(item);
      var defcode = item.isDefault ? "1" : "0";
      this.axios
        .post(
          "https://api.ymduo.com/Address/editaddress",
          this.$qs.stringify({
            uid: 956519,
            consignee: item.name,
            province: item.province,
            city: item.city,
            county: item.county,
            address: item.addressDetail,
            phone: item.tel,
            tel: "",
            postalcode: item.postalCode,
            def: defcode,
            raid: this.raid
          })
        )
        .then(res => {
          if (item.isDefault) {
            // 设置默认发货地址
            this.axios
              .post(
                "https://api.ymduo.com/Address/setdefault",
                this.$qs.stringify({
                  uid: 956519,
                  raid: this.raid
                })
              )
              .then(res => {
                console.log(res);
              });
          }
          console.log(res);
          this.$router.push("/address");
        });
    },
    onDelete() {},
    onChangeDetail(val) {
      console.log(val);
    }
  }
};
</script>

<style></style>
