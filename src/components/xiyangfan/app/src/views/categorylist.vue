<template>
  <div>
    <header-com :bannerFlag="true"></header-com>
    <search-list :relist="list"></search-list>
  </div>
</template>

<script>
import headerCom from "../components/header";
import searchList from "./searchlist";
export default {
  name: "categorylist",
  data() {
    return {
      cid: "",
      list: []
    };
  },
  created() {
    this.cid = this.$store.state.categoryId;
  },
  mounted() {
    this.axios
      .post(
        "https://api.ymduo.com/category/goodsList",
        this.$qs.stringify({
          category_id: this.cid,
          order: 1
        })
      )
      .then(res => {
        this.list = res.data.result.data;
      });
  },
  components: {
    headerCom,
    searchList
  }
};
</script>

<style></style>
