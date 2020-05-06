<template>
  <div>
    <van-nav-bar
      title="京东收银台"
      left-text="返回"
      right-text="按钮"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <van-cell title="支付宝" is-link url="/vant/mobile.html" />
    <van-cell title="微信" is-link to="index" />
    <van-cell title="银联" is-link to="index" />
  </div>
</template>

<script>
export default {
  name: "choosePay",
  methods: {
    onClickLeft() {},
    onClickRight() {}
  }
};
</script>

<style></style>
