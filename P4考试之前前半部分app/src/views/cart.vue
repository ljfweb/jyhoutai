<template>
  <h1>我是购物车组件</h1>
</template>

<script>
export default {
  name: "cart",
  data() {
    return {};
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      console.log(123);
     this.axios
        .get(
          `http://vueshop.glbuys.com/api/user/fav/index?uid=696443691&token=1ec949a15fb709370f&page=1`
        )
        .then(res => {
          console.log(res);
        });
    }
  }
};
</script>

<style>
</style>
