<template>
  <div class="addressInsert">
    <van-address-edit
      :area-list="areaList"
      show-postal
      show-delete
      show-set-default
      show-search-result
      :address-info="addressInfo"
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
      @change-detail="onChangeDetail"
    />
  </div>
</template>

<script>
import area from "../components/area.js";
export default {
  name: "addressInsert",
  components: {},
  data() {
    return {
      areaList: area,
      searchResult: [],
      raid: "",
      addressInfo: {
        name: ""
      }
    };
  },
  methods: {
    // 添加地址
    onSave(item) {
      this.axios
        .post(
          "https://api.ymduo.com/Address/editaddress",
          this.$qs.stringify({
            uid: 956532,
            consignee: item.name,
            province: item.province,
            city: item.city,
            county: item.county,
            address: item.addressDetail,
            phone: item.tel,
            tel: "",
            postalcode: item.postalcode,
            def: item.isDefault ? "1" : "0",
            raid: this.raid //存在是修改
          })
        )
        .then(res => {
          console.log(res);
          console.log("raid", this.raid);
          if (item.isDefault) {
            this.axios
              .post(
                "https://api.ymduo.com/Address/setdefault",
                this.$qs.stringify({
                  uid: 956532,
                  raid: this.raid
                })
              )
              .then(res => {
                console.log(res);
              });
          }
          this.$router.push("/myAddress");
        });
    },
    onDelete() {
      // Toast('delete');
    },
    onChangeDetail(val) {
      if (val) {
        this.searchResult = [
          {
            name: "黄龙万科中心",
            address: "杭州市西湖区"
          }
        ];
      } else {
        this.searchResult = [];
      }
    },
    getMyAddress() {
      this.axios
        .post(
          "https://api.ymduo.com/Address/updateadd",
          this.$qs.stringify({
            uid: 956532,
            raid: this.raid
          })
        )
        .then(res => {
          // console.log(res.data.result.data)
          var addressObj = res.data.result.data;
          this.addressInfo.name = addressObj.consignee;
          this.addressInfo.tel = addressObj.phone;
          this.addressInfo.city = addressObj.city;
          this.addressInfo.county = addressObj.county;
          this.addressInfo.addressDetail = addressObj.address;
          this.addressInfo.postalCode = addressObj.postalcode;
          console.log(this.addressInfo);
        });
    }
  },
  created() {
    this.raid = this.$route.params.raid;
    console.log(this.raid);
    if (this.raid) {
      this.getMyAddress();
    }
  }
};
</script>
<style lang="less" scoped></style>
