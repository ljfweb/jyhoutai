<template>
  <div class="top" @click="gotop" v-if="flag">↑</div>
</template>

<script>
export default {
  name: "top",
  data() {
    return {
      flag: false
    };
  },
  mounted() {
    // 滚动事件
    window.addEventListener("scroll", this.show);
  },
  methods: {
    gotop() {
      document.documentElement.scrollTop
        ? (document.documentElement.scrollTop = 0)
        : (document.body.scrollTop = 0);
    },
    show() {
      //控制显示隐藏
      var top = document.documentElement.scrollTop || document.body.scrollTop;
      console.log(top);
      if (top > 400) {
        this.flag = true;
      } else {
        this.flag = false;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.top {
  display: block;
  position: fixed;
  bottom: 160px;
  right: 9px;
  width: 38px;
  height: 38px;
  color: white;
  font-size: 20px;
  text-align: center;
  line-height: 38px;
  background-color: rgba(0, 0, 0, 0.5);
  background-size: 38px 38px;
  background-repeat: no-repeat;
  border-radius: 50%;
  background-position: 50%;
  z-index: 20;
}
</style>
