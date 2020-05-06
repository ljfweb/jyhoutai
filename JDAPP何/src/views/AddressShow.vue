<template>
  <div>
    <van-nav-bar title="收货地址" left-arrow @click-left="onClickLeft" />
    <van-address-list
      v-model="chosenAddressId"
      :list="list"
      default-tag-text="默认"
      @add="onAdd"
      @edit="onEdit"
    />
  </div>
</template>

<script>
export default {
  name: "my_address",
  created() {
    console.log(this.$route.query.uid);
    this.getAddressList();
  },
  data() {
    return {
      chosenAddressId: "1",
      list: []
    };
  },
  methods: {
    async getAddressList() {
      const { data: res } = await this.$axios.post(
        `https://api.ymduo.com/Address/addresslists`,
        this.$qs.stringify({ uid: 956535 })
      );
      console.log(res);
      //判断后台数据
      if (res.code == 201) return this.$toast.fail("当前没有数据");
      if (res.code == 200) this.$toast.success("获取地址成功");
      if (res.code !== 200) return this.$toast.fail("获取地址失败，请检查网络");
      const myAddress = res.result.data.map(item => {
        // console.log(item);
        let deFaultBoolean;
        if (item.def == "1") {
          deFaultBoolean = true;
        } else {
          deFaultBoolean = false;
        }
        return {
          id: item.id,
          name: item.name,
          tel: item.phone,
          address: item.site + "," + item.address,
          isDefault: deFaultBoolean
        };
      });
      this.list = myAddress;
    },
    onAdd() {
      //添加地址按钮**跳转
      this.$router.push({ name: "change_address", query: { uid: 956535 } });
    },
    onEdit(item) {
      //编辑按钮
      //编辑地址按钮
      this.$router.push({
        name: "change_address",
        query: { uid: 956535, editidds: item.id }
      });
    },
    onClickLeft() {
      ///返回删一页
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="less" scoped></style>
