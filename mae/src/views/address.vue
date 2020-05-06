<template>
  <div>
    <van-address-list
      v-model="chosenAddressId"
      :list="list"
      :disabled-list="disabledList"
      disabled-text="以下地址超出配送范围"
      default-tag-text="默认"
      @click="turnorder()"
      @add="onAdd"
      @edit="onEdit"
      @click-item="changeadress"
    />
  </div>
</template>

<script>
export default {
  name: "adress",
  data() {
    return {
      addressData: [],
      chosenAddressId: "1",
      list: [],

      disabledList: [
        {
          id: "3",
          name: "王五",
          tel: "1320000000",
          address: "浙江省杭州市滨江区江南大道 15 号"
        }
      ]
    };
  },
  methods: {
    turnorder() {
      console.log(88888888888);
    },
    onAdd() {
      this.$router.push("/plusaddress");
    },
    onEdit(item) {
      console.log(item);
      // 跳转变修改
      this.$router.push({ name: "plusaddress", params: { raid: item.id } });
    },
    changeadress(item, index) {
      //点击的地址数据
      console.log(this.addressData[index]);
      this.$store.commit("getAddress", this.addressData[index]);
      this.$router.push({ name: "order", params: { flag: true } });
    }
  },
  created() {
    // 获取收货地址的接口
    this.axios
      .post(
        "https://api.ymduo.com/Address/addresslists",
        this.$qs.stringify({
          uid: 956519
        })
      )
      .then(res => {
        console.log(res);
        //phone tel
        var mydata = res.data.result.data;
        this.addressData = res.data.result.data;
        console.log(this.addressData);
        var mylist = mydata.map(item => {
          var isflag = "";
          if (item.def == "1") {
            isflag = true;
          } else {
            isflag = false;
          }
          return {
            id: item.id,
            tel: item.phone,
            address: item.address,
            name: item.name,
            isDefault: isflag
          };
        });
        this.list = mylist;
      });
  }
};
</script>

<style lang="less" scoped>
.add {
  width: 80%;
  position: fixed;
  bottom: 20%;
  left: 50%;
  margin-left: -40%;
}
</style>
