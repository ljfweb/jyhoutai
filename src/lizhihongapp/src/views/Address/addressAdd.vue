<template>
  <div class="address-add">
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
      show-search-result
      save-button-text="保存并使用改地址"
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @change-area="onChangeArea"
      @save="onSave"
    />
  </div>
</template>

<script>
import Qs from "qs";
import headerBar from "components/headerBar"; //引入头部导航
import areaList from "../../area/area"; //引入js文件
export default {
  name: "address-add",
  components: {
    headerBar
  },
  data() {
    return {
      uid: 956538, //用户登录携带的id
      showHead: true, //显示哪种头部导航
      myTitle: "新建收货地址", //导航栏标题
      showMore: true, //是否显示三个点---true/不显示
      areaList, //省市联动json数据
      searchResult: [], //详细地址搜索结果
      code: 0 //省市需要的数据参数
    };
  },
  methods: {
    onSave(item) {
      // console.log(item);
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
            def: defCode
          })
        )
        .then(res => {
          // console.log(res);
          if (res.data.code == 200) {
            //路由跳转回地址列表
            this.$toast.success("添加成功");
            setTimeout(() => {
              this.$toast.clear();
              this.$router.push("/addresslist");
            }, 500);
          }
        });
    },
    onChangeArea(item) {
      console.log(item);
    },
    // 解析省市联动的格式
    parsingArea(code) {
      this.axios
        .post(
          "https://api.ymduo.com/Address/getaddbycode",
          Qs.stringify({
            // code: this.code
            code: code
          })
        )
        .then(res => {
          console.log(res);
          const provData = res.data.result.data;
          console.log(provData);
        });
    }
  },
  created() {}
};
</script>

<style lang="less" scoped>
.address-add {
  width: 100%;
  .van-address-edit {
    padding: 0;
  }
}
</style>
