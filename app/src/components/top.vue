<template>
  <div class='top'>
    <div class="topcla"
         @click="toTop"
         v-if="topFlag">
      <van-icon name="upgrade"
                size="40"
                color="#ddd" />
    </div>
  </div>
</template>

<script>

export default {
  name: 'top',
  components: {},
  data () {
    return {
      topFlag: false,
      scrollTop: 0
    };
  },
  methods: {
    toTop () {
      // 返回顶部
      document.documentElement.scrollTop ? document.documentElement.scrollTop = 0 : document.body.scrollTop = 0;
    },
    scroll () {
      this.scrollTop = document.documentElement.scrollTop || document.documentElement.scrollTop
      if (this.scrollTop > 400) {
        this.topFlag = true
      } else {
        this.topFlag = false
      }
    }
  },
  mounted () {
    // 监听滚轮事件
    window.addEventListener("scroll", this.scroll)
  },
  created () {

  }
}
</script>
<style lang='less' scoped>
.topcla {
  position: fixed;
  bottom: 108px;
  right: 18px;
  width: 38px;
  height: 38px;
  background-size: 38px 38px;
  background-repeat: no-repeat;
  background-position: 50%;
  z-index: 20;
}
</style>