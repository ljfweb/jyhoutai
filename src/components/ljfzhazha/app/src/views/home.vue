<template>
  <div class="home">
    <van-sticky class="dingwei">
      <div class="tou">
        <van-search v-model="value"
                    background="#f20111"
                    label="JD"
                    show-action
                    placeholder="请输入搜索关键词"
                    shape="round"
                    @click="onSearch">
          <template #action>
            <div @click="oo">登录</div>
          </template>
        </van-search>
      </div>
      <div class="yi">
        三
      </div>
    </van-sticky>
    <div class="zhiding"
         @click="zhiding"
         v-if="flag">
      ↑
    </div>
    <div class="betters">
      <div>
        <header-com></header-com>
        <div class="gekai"></div>
        <ct-nav></ct-nav>
        <miao-sha></miao-sha>
        <div class="tuitupian">
          <img src="//img11.360buyimg.com/jdphoto/jfs/t1/31601/22/15554/14040/5cc2a86fEbdb1098b/88174b36f85283b6.png"
               alt="">
        </div>
        <div class="shangp">
          <ul v-for="(itemss,indess) in xuanlist"
              :key="indess"
              @click="chuanzhi(itemss.goods_id)">
            <dt>
              <img :src="itemss.image"
                   alt="">
            </dt>
            <dd>
              <span class="langh">
                {{itemss.goods_name}}
              </span>
            </dd>
            <dd class="pri">
              <span class="pris">¥{{itemss.price}}</span>
              <span class="xiang">看相似</span>
            </dd>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import headerCom from '../components/inhome/header.vue'
import ctNav from '../components/inhome/ctnav.vue'
import miaoSha from '../components/inhome/miaosha.vue'
import BScroll from "better-scroll"
export default {
  name: "Home",
  data () {
    return {
      page: 1,
      xuanlist: [],
      myscroll: "",
      value: "",
      scrollY: "",
      flag: false
    }
  },
  created () {
    this.getlist()
  },
  methods: {
    getlist () {
      var mydata = this.$qs.stringify({
        p: this.page,
        pf: this.page
      });
      this.axios({
        url: "https://api.ymduo.com/Interface/recommendlists",
        method: "post",
        data: mydata
      }).then(res => {
        console.log(res);
        this.xuanlist = this.xuanlist.concat(res.data.result.data);
      });
    },
    chuanzhi (id) {
      this.$router.push({ name: "goods", query: { goodsid: id } })
    },
    onSearch () {
      this.$router.push("/sousuo")
    },
    oo () {
      this.$router.push("/my")
    },
    //点击置顶
    zhiding () {
      this.myscroll.scrollTo(0, 0, 500)
    }

  },
  mounted () {
    this.$nextTick(() => {
      this.myscroll = new BScroll(document.getElementsByClassName("betters")[0], {
        scrollY: true,//开启纵向拉动
        mouseWheel: true,//开启纵向滚动
        eventPassthrough: " horizontal",//开启拉动元素种的横向滚动
        click: true,
        // pullDownRefresh: {
        //   threshold: 50,
        //   probeType: 3
        // },
        pullUpLoad: {
          threshold: 744
        }
      });
      //上拉增加商品
      this.myscroll.on("pullingUp", () => {
        this.page++;
        this.getlist();
        this.$nextTick(() => {
          this.myscroll.refresh();
        });
        this.myscroll.finishPullUp();
      });
      //拉动获取拉动的位置
      this.myscroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y));
        this.myscroll.refresh();
        //判断拉动位置,显示隐藏置顶
        if (this.scrollY > 600) {
          this.flag = true
        } else {
          this.flag = false
        }
      });
    })
  },
  components: {
    headerCom,
    ctNav,
    miaoSha
  }
};
</script>
<style scoped >
.van-search {
  padding: 4px 10px 8px 50px;
  width: 100%;
}
.van-search__content {
  height: 30px;
  line-height: 30px;
}
.van-search__action {
  font-size: 16px;
  color: white;
}
.yi {
  position: absolute;
  top: 12px;
  left: 15px;
  font-weight: 800;
  color: white;
  font-size: 22px;
}
.betters {
  overflow: hidden;
  height: 90vh;
}
.gekai {
  height: 60px;
  width: 100%;
  background: #f3f3f3;
}
.home {
  background: #f3f3f3;
}
.tuitupian img {
  width: 355px;
  height: 35px;
  margin: 10px 0 0 10px;
}
.shangp {
  width: 355px;
  margin: 0 0 0 10px;
}
.shangp ul {
  width: 176px;
  height: 267px;
  overflow: hidden;
  display: inline-block;
  background: white;
  margin-top: 3px;
}
.shangp ul dt {
  width: 100%;
  height: 176px;
}
.shangp ul img {
  width: 100%;
  height: 100%;
}
.shangp ul:nth-child(even) {
  margin-left: 3px;
}
.shangp ul dd {
  width: 94%;
  line-height: 18px;
  margin: 8px 0 0 2%;
}
.zhiding {
  height: 30px;
  width: 30px;
  background: black;
  opacity: 0.4;
  line-height: 30px;
  color: white;
  border-radius: 100%;
  position: fixed;
  right: 20px;
  font-size: 22px;
  text-align: center;
  top: 480px;
  z-index: 100;
}
.langh {
  height: 36px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.pris {
  color: red;
  font-size: 18px;
  margin-left: 6px;
}
.xiang {
  color: #666;
  font-size: 12px;
  border: 1px solid #666;
  padding: 4px;
}
.pri {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>


