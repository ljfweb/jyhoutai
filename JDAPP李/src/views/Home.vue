<template>
  <div class="home" ref="wrap">
    <div>
      <header-com></header-com>
      <index-nav></index-nav>
      <dao-ji-shi></dao-ji-shi>
      <div class="tuijian">
        <div class="t_title">
          为你推荐
        </div>
        <!-- 商品显示 -->
        <van-row style="padding: 6px;">
          <van-col :span="12" v-for="(item, index) in relist" :key="index">
            <router-link :to="{ name: 'info', params: { pid: item.goods_id } }">
              <div class="recommendshopshow">
                <dt>
                  <img :src="item.image" />
                </dt>
                <dd class="van-multi-ellipsis--l2" style="margin-bottom: 3px;">
                  {{ item.goods_name }}
                </dd>
                <dd class="recBottom">
                  <span style="color: red;"
                    >￥<span class="redPrice">{{ item.price }}</span> </span
                  ><span class="looklike">看相似</span>
                </dd>
              </div>
            </router-link>
          </van-col>
        </van-row>
      </div>
    </div>
    <div style="padding-top: 20px;"></div>
  </div>
</template>

<script>
//引入倒计时组件
import daoJiShi from "../components/countdown.vue";
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
    indexNav,
    daoJiShi
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
<style lang="less" scoped>
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
/* 商品格子 */
.recommendshopshow {
  border: 1px solid gainsboro;
  padding: 4px;
  width: 168px;
  height: 270px;
  margin-right: 4px;
  background-color: white;
  margin-bottom: 4px;
  dt {
    img {
      width: 100%;
      padding-bottom: 4px;
    }
  }
  dd {
    font-size: 13px;
    .redPrice {
      font-size: 16px;
    }
    .looklike {
      content: "";
      padding: 4px;
      border: 1px solid #bfbfbf;
      border-radius: 4px;
      transform-origin: top left;
    }
  }
  .recBottom {
    display: flex;
    justify-content: space-between;
  }
}
</style>
