<template>
  <div>
    <van-row style="border-bottom: 1px solid #e5e5e5;">
      <van-col span="2" @click="JumpWeb">
        <van-nav-bar left-arrow />
      </van-col>
      <van-col span="22">
        <van-search
          v-model="searchvalue"
          placeholder="请输入搜索关键词"
          shape="round"
          @focus="turnSearch"
        />
      </van-col>
    </van-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // vuex搜索渲染
      searchvalue: this.$store.state.searchVal
    };
  },
  mounted() {},
  methods: {
    JumpWeb() {
      //返回上级菜单
      history.go(-1);
    },
    //获取焦点事件触发跳转
    turnSearch() {
      this.$router.push({ name: "search" });
    }
  }
};
</script>
<style scoped></style>
