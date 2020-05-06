<template>
  <div class="myAddress">
    <van-nav-bar title="收获地址" left-arrow @click-left="onClickLeft" />
    <van-address-list
      v-model="chosenAddressId"
      :list="list"
      default-tag-text="默认"
      @add="onAdd"
      @edit="onEdit"
      @select="onSelect"
    />
  </div>
</template>

<script>
export default {
  name: "myAddress",
  components: {},
  data() {
    return {
      chosenAddressId: "1",
      list: []
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onAdd() {
      this.$router.push("/addressInsert");
    },
    onEdit(item) {
      this.$router.push({ name: "addressInsert", params: { raid: item.id } });
    },
    getMyAddress() {
      this.axios
        .post(
          "https://api.ymduo.com/Address/addresslists",
          this.$qs.stringify({
            uid: 956532
          })
        )
        .then(res => {
          this.list = res.data.result.data.map(item => {
            var isFlag = null;
            if (item.def == "1") {
              isFlag = true;
              this.chosenAddressId = item.id;
            } else {
              isFlag = false;
            }
            return {
              id: item.id,
              address: item.site + item.address,
              name: item.name,
              tel: item.phone,
              isDefault: isFlag
            };
          });
        });
    },
    // 更换地址
    onSelect(item, index) {
      console.log(item, index);
      this.$emit("getMyaddress", item);
      // this.$router.push({ name: "orderConfirm", params: item })
    }
  },
  mounted() {
    this.getMyAddress();
  }
};
</script>
<style lang="less" scoped>
.van-nav-bar {
  background-color: #ddd;
}
</style>
