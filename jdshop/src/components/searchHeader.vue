<template>
  <div class="searchHeader">
    <van-nav-bar left-arrow
                 fixed
                 @click-left="onClickLeft">
      <template #title>
        <van-search v-model="searchVal"
                    placeholder="请输入搜索关键词"
                    shape="round" />
      </template>
      <template #right>
        <van-button class="searchButton"
                    type="danger"
                    @click="getSearchList">搜索</van-button>
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  data () {
    return {
      searchVal: ""
    };
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1);
    },
    getSearchList () { }
  },
  mounted () { }
};
</script>
<style lang="less" scoped>
.searchButton {
  background-color: red;
  // margin: auto;
  height: 30px;
  line-height: 30px;
  font-size: 20px;
  border-radius: 5px;
}
// .van-nav-bar {
.van-nav-bar__title {
  margin-left: 30px;
  max-width: 70%;
}
</style>
