<template>
  <div class="test">
    <van-nav-bar title="标题" left-text="返回" right-text="按钮" left-arrow />
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  data() {
    return { active: 1 };
  },
  methods: {},
  mounted() {}
};
</script>
<style lang="less" scoped>
[class*="van-hairline"]::after {
  border: 0;
}
</style>
