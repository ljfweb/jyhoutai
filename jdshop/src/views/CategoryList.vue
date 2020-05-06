<template>
  <div class="categoryList">
    <search-header-com></search-header-com>
    <search-list-com :forList="goodsList"></search-list-com>
  </div>
</template>

<script>
import SearchHeaderCom from "../components/searchHeader";
import SearchListCom from "../components/SearchList";
export default {
  name: "categoryList",
  components: { SearchHeaderCom, SearchListCom },
  data () {
    return {
      cid: "",
      goodsList: []
    };
  },
  created () {
    this.cid = this.$route.params.cid;
    console.log(this.cid);
    this.axios
      .post(
        "https://api.ymduo.com/category/goodsList",
        this.$qs.stringify({
          category_id: this.cid,
          p: 1,
          order: 1
        })
      )
      .then(res => {
        console.log(res.data.result.data);
        this.goodsList = res.data.result.data;
      });
  },
  methods: {},
  mounted () { },
  updated () {
    console.log("aaabbb", document.getElementsByClassName("van-nav-bar__title"))
    var ele = document.getElementsByClassName("van-nav-bar__title")[0];
    ele.style.marginLeft = "30px";
    ele.style.maxWidth = "73%";
    ele.style.height = "45px";
    // 搜索框
    document.getElementsByClassName("van-search")[0].style.padding =
      "6px 0 0 6px";
    // 搜索字
    document.getElementsByClassName("van-button--normal")[0].style.padding =
      "0 0.1rem";
    document.getElementsByClassName("van-button--normal")[0].style.width =
      "50px";
  }
};
</script>
<style lang="less" scoped></style>
