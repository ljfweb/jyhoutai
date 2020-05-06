<template>
  <div>
    <van-nav-bar title="我的京东" left-arrow />
    <!-- 个人中心 -->
    <van-card :thumb="userInfo.head">
      <template #title>用户名：{{ userInfo.nickname }}<br /></template>
      <template #desc>电话号码：{{ userInfo.tel }} </template>
      <template #price>
        <van-tag @click="turnFunction">账户设置</van-tag>
        <van-tag @click="personalSetting">个人中心</van-tag>
      </template>
    </van-card>
  </div>
</template>

<script>
export default {
  created() {
    this.recivedUserInfo();
  },
  components: {},
  data() {
    return {
      userInfo: []
    };
  },
  methods: {
    async recivedUserInfo() {
      const { data: res } = await this.$axios.post(
        "https://api.ymduo.com/Member/information",
        this.$qs.stringify({ uid: 956535 })
      );
      console.log(res.result.data);
      sessionStorage.userData = JSON.stringify(res.result.data);
      this.userInfo = res.result.data;
    },
    turnFunction() {
      this.$router.push({ name: "account" });
    },
    personalSetting() {
      //进入个人设置
      this.$router.push({ name: "personal", query: { uid: 956535 } });
    }
  }
};
</script>
<style lang="less" scoped>
.van-card {
  height: 134px;
  color: white;
  background: linear-gradient(to right, #eb3d3c, #f4574a, #fd6f56);
}
.van-tag {
  margin: 14px;
}
</style>
