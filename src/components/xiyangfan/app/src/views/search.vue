<template>
  <div>
    <van-nav-bar
      fixed
      title="标题"
      @click-left="leftclick"
      left-text="返回"
      left-arrow
    >
      <template #title>
        <div>
          <van-search
            shape="round"
            v-model="searchText"
            placeholder="请输入搜索关键词"
          />
        </div>
      </template>
      <template #right>
        <div>
          <van-button @click="getSearch" round type="danger" size="small"
            >搜索</van-button
          >
        </div>
      </template>
    </van-nav-bar>
    <div class="tips" v-if="!ishow">
      <div class="zuijin">
        <span>最近搜索</span>
        <i @click="clearlist"></i>
      </div>
      <van-tag
        color="#666"
        v-for="(item, index) in s_list"
        :key="index"
        @click="getmylist(item)"
        type="primary"
        >{{ item }}</van-tag
      >

      <!-- 热门搜索 -->
      <div class="zuijin">
        <span>热门搜索</span>
        <i></i>
      </div>
      <van-tag type="primary">标签1111111</van-tag>
      <van-tag type="primary">标签1111111</van-tag>
    </div>
    <!-- 搜索子组件 -->
    <search-list
      @redata="getData"
      :keywords="searchText"
      :relist="mylist"
      v-if="ishow"
    ></search-list>
  </div>
</template>

<script>
import searchList from "./searchlist";
export default {
  name: "search",
  components: {
    searchList
  },

  mounted() {
    if (!localStorage.list) {
      localStorage.list = "[]";
    }
    this.s_list = JSON.parse(localStorage.list);
  },
  methods: {
    leftclick() {
      this.$router.go(-1);
    },
    getmylist(item) {
      this.getlist(1, item);
      this.ishow = true;
    },
    getData(order, keywords) {
      console.log(order, keywords);
      this.getlist(order, keywords);
    },
    clearlist() {
      localStorage.list = "[]";
      this.s_list = JSON.parse(localStorage.list);
    },
    getlist(order, searchText) {
      this.axios
        .post(
          "https://api.ymduo.com/search/index",
          this.$qs.stringify({
            keywords: searchText,
            p: 1,
            order: order
          })
        )
        .then(res => {
          console.log(res);
          this.mylist = res.data.result.data;
        });
    },
    getSearch() {
      // 存储最近搜索
      var arr = JSON.parse(localStorage.list);
      arr.push(this.searchText);
      localStorage.list = JSON.stringify(arr);
      this.s_list = JSON.parse(localStorage.list);
      this.ishow = true;
      this.getlist(1, this.searchText);
    }
  },
  data() {
    return {
      searchText: "",
      s_list: [],
      ishow: false,
      mylist: []
    };
  }
};
</script>

<style lang="less" scoped>
.zuijin {
  line-height: 60px;
  display: flex;
  justify-content: space-between;
  padding: 0 15px;
  box-sizing: border-box;
  i {
    margin-top: 20px;
    width: 30px;
    height: 30px;
    background: url(//st.360buyimg.com/so/images/layout/search-sprites.png)
      no-repeat;
  }
}
.van-tag {
  margin-left: 20px;
}
</style>
