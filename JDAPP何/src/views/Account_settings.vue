<template>
  <div style="background-color: gainsboro;">
    <van-nav-bar title="账户设置" left-arrow @click-left="onClickLeft" />
    <van-row>
      <van-col class="personalTitle">管理我的账户</van-col>
    </van-row>
    <!-- 个人信息界面 -->
    <van-row class="personInfo" type="flex" align="center">
      <van-col :span="4">
        <van-image
          round
          width="45px"
          height="45px"
          src="https://img.yzcdn.cn/vant/cat.jpeg"
        />
      </van-col>
      <van-col :span="10">
        <div>用户姓名：{{ user }}</div>
        <div>手机号 ：{{ phone }}</div>
      </van-col>
    </van-row>
    <!-- 显示地址栏搜索 -->
    <van-list>
      <div @click="addAddress" class="ceilLeft">收货地址管理</div>
    </van-list>
  </div> </template
>s

<script>
export default {
  name: "account",
  created() {
    this.user = JSON.parse(sessionStorage.getItem("userData")).nickname;
    this.phone = JSON.parse(sessionStorage.getItem("userData")).tel;
  },
  data() {
    return {
      user: "",
      phone: ""
    };
  },
  methods: {
    addAddress() {
      this.$router.push({
        name: "my_address",
        query: { uid: JSON.parse(sessionStorage.getItem("userData")).uid }
      });
    },
    onClickLeft() {
      ///返回删一页
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="less" scoped>
.personalTitle {
  font-size: 16px;
  padding: 10px;
}
.personInfo {
  width: 100%;
  height: 96px;
  line-height: 26px;
  padding: 10px;
  background-color: #fff9f9;
  font-size: 14px;
}
.van-list {
  margin-top: 10px;
  padding: 10px;
  height: 22px;
  line-height: 22px;
  font-size: 16px;
  background-color: white;
}
</style>
