<template>
  <div class="appMain-container">
    <router-view></router-view>
  </div>
</template>
 
<script>
export default {
  name: "appMain",
  components: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {},
  created() {},
  mounted() {}
};
</script>
 
<style lang="less" scoped>
.el-menu-item .is-active {
  padding-left: 100px;
}
</style>