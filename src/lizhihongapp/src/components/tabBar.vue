<template>
  <div class="tabbar">
    <van-tabbar
      class="tab-container"
      v-model="$store.state.active"
      :safe-area-inset-bottom="true"
    >
      <van-tabbar-item
        replace
        v-for="(item, index) in tabbars"
        :key="index"
        @click="turn(item.name, index)"
        :badge="
          item.name == 'cart'
            ? $store.getters.cartnum == 0
              ? ''
              : $store.getters.cartnum
            : ''
        "
        :icon="$store.state.active == index ? item.active : item.normal"
      >
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "tabbar",
  props: ["islogin"],
  data() {
    return {
      // active: 0,
      uid: 956538, //用户登录id
      //cartNum: "", //存储购物车数量
      tabbars: [
        {
          name: "home", //跳转
          title: "首页", //名称
          // 引入assets的图标到数据  要用require()
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
          active: require("assets/surprise-active.png")
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
          name: "mine",
          title: "我的",
          normal: this.islogin
            ? "https://img11.360buyimg.com/jdphoto/s130x100_jfs/t1/56206/13/12652/2957/5d9c4b13E503bcd76/1c8543653685e80e.png"
            : "https://img11.360buyimg.com/jdphoto/s130x100_jfs/t1/68400/36/12368/3153/5d9c4b13E0e0d80a8/876c40f17d91ce44.png",
          active: this.islogin
            ? "https://img11.360buyimg.com/jdphoto/s130x100_jfs/t1/47480/36/12929/3209/5d9c4b13E97caa63a/4dc0ec8a7e47c2b7.png"
            : "https://m.360buyimg.com/mobilecms/jfs/t17950/16/2476630334/3955/36c9ce38/5af43af1N96d4474e.png"
        }
      ]
    };
  },
  methods: {
    turn(name, index) {
      this.$router.push({ name });
      this.$store.dispatch("setNavbarActive", index);
    }
    // 获取购物车数量
    // getCartNum() {
    //   if (this.uid) {
    //     this.axios
    //       .post(
    //         "https://api.ymduo.com/Home/Cart/cartnum",
    //         Qs.stringify({
    //           uid: this.uid
    //         })
    //       )
    //       .then(res => {
    //         // console.log(res);
    //         if (res.data.code == 200) {
    //           this.cartNum = res.data.result.data;
    //         }
    //       });
    //   }
    // }
  },
  created() {
    // 购物车数量
    this.$store.dispatch("setCartNum");
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.tabbar .tab-container {
  width: 100%;
  height: 49px;
  background-color: rgba(255, 255, 255, 1);
  z-index: 100;
}
</style>
