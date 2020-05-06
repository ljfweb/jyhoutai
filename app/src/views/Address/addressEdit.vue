<template>
  <div class="address-edit">
    <!-- 头部导航 -->
    <van-sticky>
      <headerBar
        :ishead="showHead"
        :title="myTitle"
        :hascontainer="showMore"
      ></headerBar>
    </van-sticky>
    <!-- 添加新地址 -->
    <van-address-edit
      :area-list="areaList"
      show-postal
      show-delete
      show-set-default
      show-search-result
      :address-info="editAddressInfo"
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
    />
  </div>
</template>

<script>
import Qs from "qs";
import headerBar from "components/headerBar"; //引入头部导航
import areaList from "../../area/area"; //引入js文件
export default {
  name: "address-edit",
  components: {
    headerBar
  },
  data() {
    return {
      uid: 956538, //用户登录携带的id
      showHead: true, //显示哪种头部导航
      myTitle: "修改收货地址", //导航栏标题
      showMore: true, //是否显示三个点---true/不显示
      areaList, //省市联动json数据
      searchResult: [], //详细地址搜索结果
      editAddressInfo: {
        name: "",
        tel: "",
        province: "",
        city: "",
        county: "",
        addressDetail: "",
        areaCode: "",
        postalCode: "",
        isDefault: false
      }, //修改初始化的参数
      pid: "" //地址列表传来的id
    };
  },
  methods: {
    getAddressInfo() {
      if (this.pid) {
        const county = this.areaList.county_list;
        this.axios
          .post(
            "https://api.ymduo.com/Address/updateadd",
            Qs.stringify({
              uid: this.uid,
              raid: this.pid
            })
          )
          .then(res => {
            const info = res.data.result.data;
            Object.entries(county).map(item => {
              if (item[1] == info.address.split(" ")[2]) {
                this.editAddressInfo.areaCode = item[0];
              }
            });
            this.editAddressInfo.name = info.consignee;
            this.editAddressInfo.tel = info.phone;
            this.editAddressInfo.province = info.address.split(" ")[0];
            this.editAddressInfo.city = info.address.split(" ")[1];
            this.editAddressInfo.county = info.address.split(" ")[2];
            this.editAddressInfo.addressDetail = info.address.split(" ")[3];
            this.editAddressInfo.postalCode = info.postalcode;
            this.editAddressInfo.isDefault = info.def == "0" ? false : true;
          });
      }
    },
    onSave(item) {
      item["address"] =
        item.province +
        " " +
        item.city +
        " " +
        item.county +
        " " +
        item.addressDetail;
      const defCode = item.isDefault ? "1" : "0";
      this.axios
        .post(
          "https://api.ymduo.com/Address/editaddress",
          Qs.stringify({
            uid: this.uid,
            consignee: item.name,
            province: item.province,
            city: item.city,
            county: item.county,
            address: item.address,
            phone: item.tel,
            tel: "",
            postalcode: item.postalCode,
            def: defCode,
            raid: this.pid
          })
        )
        .then(res => {
          // console.log(res);
          if (res.data.code == 200) {
            if (item.isDefault) {
              this.axios.post(
                "https://api.ymduo.com/Address/setdefault",
                Qs.stringify({
                  uid: this.uid,
                  raid: this.pid
                })
              );
            }
            //路由跳转回地址列表
            this.$toast.success("修改成功");
            setTimeout(() => {
              this.$toast.clear();
              this.$router.push("/addresslist");
            }, 500);
          }
        });
    },
    onDelete() {
      if (this.pid) {
        this.axios
          .post(
            "https://api.ymduo.com/Address/deladdress",
            Qs.stringify({
              uid: this.uid,
              ids_str: this.pid
            })
          )
          .then(res => {
            if (res.data.code == 200) {
              //路由跳转回地址列表
              this.$toast.success("删除成功");
              setTimeout(() => {
                this.$toast.clear();
                this.$router.push("/addresslist");
              }, 500);
            }
          });
      }
    }
  },
  created() {
    this.pid = this.$route.params.id;
    this.getAddressInfo();
  }
};
</script>

<style lang="less" scoped>
.address-edit {
  width: 100%;
  .van-address-edit {
    padding: 0;
  }
}
</style>
