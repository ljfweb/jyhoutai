<template>
  <div>
    <van-nav-bar title="增加收货地址" left-arrow @click-left="onClickLeft" />
    <van-address-edit
      :area-list="areaList"
      show-postal
      show-delete
      show-set-default
      show-search-result
      :address-info="AddressInfo"
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
      @change-detail="onChangeDetail"
    />
  </div>
</template>

<script>
import AreaList from "../assets/Area.js";
export default {
  created() {
    console.log(this.$route.query.uid);
    console.log(this.$route.query.editidds);
    //相关数值的赋值
    this.adminUser = this.$route.query.uid;
    this.editUserId = this.$route.query.editidds;
    //如果edit用户的raid存在就执行修改任务
    if (this.$route.query.editidds) return this.editUserFunction();
  },
  data() {
    return {
      uid: "",
      areaList: AreaList,
      searchResult: [],
      //数据列表默认值
      AddressInfo: {
        name: "",
        tel: "",
        province: "",
        city: "",
        county: "",
        addressDetail: "",
        postalCode: "",
        isDefault: false
      },
      //编辑用户的id
      adminUser: "",
      editUserId: ""
    };
  },
  methods: {
    async onSave(content) {
      //提交数据新增的数据
      console.log(content, content.isDefault ? true : false);
      const handle_myAddress = {
        uid: this.adminUser,
        consignee: content.name,
        phone: content.tel,
        province: content.province,
        city: content.city,
        county: content.county,
        address: content.addressDetail,
        postalcode: content.postalCode,
        def: content.isDefault ? "1" : "0",
        raid: this.editUserId
      };
      const { data: res } = await this.$axios.post(
        `https://api.ymduo.com/Address/editaddress`,
        this.$qs.stringify(handle_myAddress)
      );
      if (content.isDefault) {
        const { data: setDef } = await this.$axios.post(
          `https://api.ymduo.com/Address/setdefault`,
          this.$qs.stringify({ uid: this.adminUser, raid: this.editUserId })
        );
        console.log(setDef);
        if (setDef.code == 200) return this.$toast.success("修改默认成功");
        if (setDef.code !== 200) return this.$toast.fail("修改默认失败");
      }
      //判断后台状态
      if (res.code == 200) this.$toast.success("添加地址成功");
      if (res.code !== 200) this.$toast.fail("获取地址失败");
      //回退
      this.$router.go(-1);
    }, //修改用户数据地址
    async editUserFunction() {
      const { data: res } = await this.$axios.post(
        `https://api.ymduo.com/Address/updateadd`,
        this.$qs.stringify({ uid: this.adminUser, raid: this.editUserId })
      );
      //判断后台状态
      if (res.code == 200) this.$toast.success("获取成功");
      if (res.code !== 200) this.$toast.fail("获取成功失败");
      //将数值默认赋值到页面上
      const resultDate = res.result.data;
      console.log(resultDate);
      this.AddressInfo.name = resultDate.consignee;
      this.AddressInfo.tel = resultDate.phone;
      this.AddressInfo.province = resultDate.province;
      this.AddressInfo.city = resultDate.city;
      this.AddressInfo.county = resultDate.county;
      this.AddressInfo.addressDetail = resultDate.address;
      this.AddressInfo.postalCode = resultDate.postalcode;
      this.AddressInfo.isDefault = resultDate.def == "1" ? true : false;
    },
    async onDelete(content) {
      console.log(content);
      const { data: res } = await this.$axios.post(
        `https://api.ymduo.com/Address/deladdress`,
        this.$qs.stringify({ uid: this.adminUser, ids_str: this.editUserId })
      );
      console.log(res);
      //判断后台状态
      if (res.code !== 200) return this.$toast.fail("删除地址失败");
      //回退
      this.$router.go(-1);
    },
    onChangeDetail(val) {
      console.log(val);
    },
    onClickLeft() {
      ///返回删一页
      this.$router.go(-1);
    }
  }
};
</script>
<style scoped></style>
