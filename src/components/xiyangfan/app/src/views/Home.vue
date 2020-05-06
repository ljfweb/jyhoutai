<template>
  <div class="home" ref="wrap">
    <div>
      <header-com></header-com>
      <index-nav></index-nav>
      <div class="tuijian">
        <div class="t_title">
          为你推荐
        </div>
        <div class="list">
          <div>
            <div class="list_one" v-for="(item, index) in relist" :key="index">
              <router-link
                :to="{ name: 'info', params: { pid: item.goods_id } }"
              >
                <img :src="item.image" alt="" />
                <p class="van-multi-ellipsis--l2">{{ item.goods_name }}</p>
                <div class="price">
                  <span>${{ item.price }}</span>
                  <span>看相似</span>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import headerCom from "../components/header.vue";
import indexNav from "../components/indexnav.vue";
import Bscroll from "better-scroll";
export default {
  name: "Home",
  data() {
    return {
      relist: [],
      myscroll: "",
      page: 1
    };
  },
  methods: {
    getlist() {
      console.log(this.page);
      var mydata = this.$qs.stringify({
        p: this.page,
        pf: this.page
      });
      console.log(mydata);
      this.axios({
        url: "https://api.ymduo.com/Interface/recommendlists",
        method: "post",
        data: mydata
      }).then(res => {
        console.log("188888", res);
        this.relist = this.relist.concat(res.data.result.data);
      });
    }
  },
  created() {
    this.getlist();
  },
  components: {
    headerCom,
    indexNav
  },
  mounted() {
    this.$nextTick(() => {
      this.myscroll = new Bscroll(this.$refs.wrap, {
        scrollY: true,
        click: true,
        pullDownRefresh: {
          //下拉刷新
          threshold: 50,
          probeType: 3
        },
        pullUpLoad: {
          //上拉加载
          threshold: 744
        }
      });
      this.myscroll.on("pullingUp", () => {
        this.page++;
        this.getlist();

        this.$nextTick(() => {
          this.myscroll.refresh();
        });
        this.myscroll.finishPullUp();
      });

      this.myscroll.on("pullingDown", () => {
        this.relist = [];
        this.page++;
        this.getlist(1);

        this.$nextTick(() => {
          this.myscroll.refresh();
        });
        this.myscroll.finishPullDown();
      });
    });
  }
};
</script>
<style lang="less" scoped>
.home {
  height: 90vh;
}
h1 {
  width: 200px;
  height: 200px;
  background: #0570db;
}
.t_title {
  height: 35px;
  text-align: center;
  font-size: 18px;
  color: skyblue;
  word-spacing: 20px;
}
.list {
  height: auto;
}
.list > div {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.list_one {
  background: white;
  margin-top: 10px;
  width: 175px;
  height: 271px;
  border: 1px solid #ccc;
  line-height: 20px;
  text-align: center;
  img {
    width: 176px;
    height: 176px;
  }
  p {
    width: 175px;
    height: 31px;
    line-height: 16px;
  }
  .price {
    width: 175px;
    height: 34px;
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    box-sizing: border-box;
    font-size: 17px;
    color: red;
    font-weight: bold;
  }
}
</style>
