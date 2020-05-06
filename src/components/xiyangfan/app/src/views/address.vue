<template>
  <div>
    <div class="nav_wrap">
      <p @click="$router.push('/my')">
        &lt;
      </p>
      <p>---</p>
    </div>
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
      this.$router.push({ name: "plusaddress", params: { raid: item.id } });
    },
    changeadress(item, index) {
      console.log(this.addressData[index]);
      this.$emit("getdata", false, this.addressData[index]);
    }
  },
  created() {
    this.axios
      .post(
        "https://api.ymduo.com/Address/addresslists",
        this.$qs.stringify({
          uid: 956519
        })
      )
      .then(res => {
        console.log(res);
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
.nav_wrap {
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: space-between;
  padding: 0 8px;
  box-sizing: border-box;
  font-family: "黑体";
  background: transparent;
  position: absolute;
  top: 0;
  z-index: 999;
  p {
    width: 30px;
    height: 30px;
    background: rgba(0, 0, 0, 0.7);
    border-radius: 50%;
    text-align: center;
    color: white;
    line-height: 30px;
  }
}
.add {
  width: 80%;
  position: fixed;
  bottom: 20%;
  left: 50%;
  margin-left: -40%;
}
</style>
