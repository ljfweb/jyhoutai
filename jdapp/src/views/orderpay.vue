<template>
  <van-button type="primary" text="选择支付方式" @click="show = true" />
</template>
<script>
export default {
  name: "choosePay",
  data() {
    return {
      cartid: "",
      addr_id: "",
      show: false
    };
  }
};
</script>
<style lang="less" scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  width: 120px;
  height: 120px;
  background-color: #fff;
}
</style>