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
    turninfo() {
      // this.$router.push({name:"info",params:{pid:pid}})
    },
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
    // 初始化
    this.$nextTick(() => {
      this.myscroll = new Bscroll(this.$refs.wrap, {
        scrollY: true, //y方向滚动开启
        click: true, //开启点击
        pullDownRefresh: {
          //开启下拉刷新
          threshold: 50,
          probeType: 3
        },
        pullUpLoad: {
          //开启上拉加载
          threshold: 744
        }
      });
      // 监控上拉
      this.myscroll.on("pullingUp", () => {
        //					  ...发送Ajax从后台拿数据...
        this.page++;
        this.getlist();

        this.$nextTick(() => {
          this.myscroll.refresh(); // DOM 结构发生变化后，重新初始化BScroll
        });
        this.myscroll.finishPullUp(); // 上拉加载动作完成后调用此方法告诉BScroll完成一次上拉动作
      });

      //监控下拉
    });
  }
};
</script>
<style lang="less">
.home {
  height: 90vh;
}
h1 {
  /* 200px    750 
			 100px       375*/
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
.list div {
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
