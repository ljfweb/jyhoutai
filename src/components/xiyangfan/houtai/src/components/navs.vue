<template>
  <div v-if="$store.state.flag">
    <van-tabbar v-model="active">
      <van-tabbar-item
        v-for="(item, index) in tabbars"
        :key="index"
        @click="turn(item.name, index)"
        :icon="currIndex == index ? item.active : item.normal"
        :badge="item.name == 'cart' ? $store.getters.cartnum : ''"
      >
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "navs",
  computed: {},
  created() {
    this.$store.commit("getNum");
  },
  methods: {
    turn(name, index) {
      this.currIndex = index;
      this.$router.push({ name: name });
    }
  },
  data() {
    return {
      currIndex: 0,
      active: 0,
      tabbars: [
        {
          name: "home",
          title: "首页",
          normal:
            "https://img11.360buyimg.com/jdphoto/s130x100_jfs/t1/81741/30/12345/4140/5d9c4b13E726f0a1e/82c582e7c375e4b3.png", //普通图标
          active:
            "https://img11.360buyimg.com/jdphoto/s130x100_jfs/t1/67550/26/12426/5094/5d9c4b13Eea435a3f/81328b0609c60a3c.png" //激活图标
        },
        {
          name: "category",
          title: "分类",
          normal:
            "https://img11.360buyimg.com/jdphoto/s130x100_jfs/t1/56507/6/12787/3168/5d9c4b12Ef363dd8d/4af32f42575509d8.png",
          active:
            "https://img11.360buyimg.com/jdphoto/s130x100_jfs/t1/48787/24/12910/3390/5d9c4b12Ee63270e4/4481f5b3dbad979d.png"
        },
        {
          name: "surprise",
          title: "惊喜",
          normal:
            "https://img11.360buyimg.com/jdphoto/s130x100_jfs/t1/70651/38/12417/3194/5d9d3eafE12cde68b/2467c20113c50451.png",
          active:
            "https://img11.360buyimg.com/jdphoto/s130x100_jfs/t1/70651/38/12417/3194/5d9d3eafE12cde68b/2467c20113c50451.png"
        },
        {
          name: "cart",
          title: "购物车",
          normal:
            "https://img11.360buyimg.com/jdphoto/s130x100_jfs/t1/64954/4/12406/3529/5d9c4b12Ee7a82735/f2fe0a88bf344736.png",
          active:
            "https://img11.360buyimg.com/jdphoto/s130x100_jfs/t1/45205/32/12889/3890/5d9c4b12E7bc2c425/dd60fafbde8542ca.png"
        },
        {
          name: "my",
          title: "我的",
          normal:
            "https://img11.360buyimg.com/jdphoto/s130x100_jfs/t1/68400/36/12368/3153/5d9c4b13E0e0d80a8/876c40f17d91ce44.png",
          active:
            "https://img11.360buyimg.com/jdphoto/s130x100_jfs/t1/47480/36/12929/3209/5d9c4b13E97caa63a/4dc0ec8a7e47c2b7.png"
        }
      ]
    };
  }
};
</script>

<style lang="less">
.van-tabbar {
  height: 60px;
}
.van-icon {
  img {
    width: 60px;
    height: 45px;
  }
}
.van-info {
  top: 2px;
  right: 10px;
}
</style>
