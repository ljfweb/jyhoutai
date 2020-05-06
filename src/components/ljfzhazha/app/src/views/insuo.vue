<template>
  <div class="insuo">
    <div class="qie"
         @click="qiehuan">
      {{yang}}
    </div>
    <div class="zhid"
         @click="zhiding"
         v-if="flag">
      ↑
    </div>
    <div class="scro">
      <div id="zhi">
        <div @click="qusou">
          <sou-tou :fg="false"
                   :val="$route.query.value"></sou-tou>
        </div>

        <div class="sou_2">
          <van-dropdown-menu>
            <van-dropdown-item v-model="value1"
                               :options="option1" />
          </van-dropdown-menu>
          <span>销量</span>
          <van-dropdown-menu>
            <van-dropdown-item v-model="value2"
                               :options="option2" />
          </van-dropdown-menu>
          <van-button is-link
                      @click="showPopup">筛选</van-button>
          <van-popup v-model="show"
                     position="right"
                     :style="{ height: '100%',width:'85%' }"
                     closeable>s
            <h1 class="kk">我想写,但没有接口,我尽力了</h1>
          </van-popup>
        </div>

        <van-card v-for="(item,index) in mylist"
                  :key="index"
                  tag="热销"
                  :price="item.price"
                  desc="非常牛逼的商品"
                  :title="item.goods_name"
                  :thumb="item.image"
                  :origin-price="item.old_price"
                  @click="chuanzhi(item.goods_id)"
                  v-show="qieflag" />

        <div class="shangp"
             v-show="!qieflag">
          <ul v-for="(itemss,indess) in mylist"
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
import souTou from "../components/soutou.vue"
import BScroll from "better-scroll"
export default {
  name: "insuo",
  data () {
    return {
      qieflag: true,
      yang: "单列",
      value1: 0,
      value2: 0,
      scrollY: 0,
      show: false,
      flag: false,
      page: 1,
      mylist: [],
      option1: [
        { text: '综合', value: 0 },
        { text: '最新上架', value: 1 },
        { text: '价格最低', value: 2 },
        { text: '价格最高', value: 3 },
        { text: '评价最高', value: 4 },
      ],
      option2: [
        { text: '有货优先', value: 0 },
        { text: '货到付款', value: 1 },
        { text: '京东国际', value: 2 },
        { text: 'PLUS专享', value: 3 },
        { text: '促销商品', value: 4 },
      ],
    }
  },
  components: {
    souTou
  },
  methods: {
    showPopup () {
      this.show = true;
    },
    zhiding () {
      this.myscroll.scrollTo(0, 0, 500)
    },
    chuanzhi (id) {
      this.$router.push({ name: "goods", query: { goodsid: id } })
    },
    qusou () {
      this.$router.push("/sousuo")
    },
    qiehuan () {
      this.qieflag = !this.qieflag
      if (!this.qieflag) {
        this.yang = "双排"
      } else {
        this.yang = "单排"
      }
    },
    bianlist () {
      this.axios
        .post(
          "https://api.ymduo.com/search/index",
          this.$qs.stringify({
            keywords: this.$route.query.value,
            p: this.page,
            order: 1
          })
        )
        .then(res => {
          console.log(res);
          if (res.data.code == 200) {
            this.mylist = this.mylist.concat(res.data.result.data);
          } else if (res.data.code == 201) {
            this.$Toast.fail("无更多商品")
          }
        });
    }
  },
  created () {
    this.bianlist()
  },
  mounted () {
    this.$nextTick(() => {
      this.myscroll = new BScroll(document.getElementsByClassName("scro")[0], {
        scrollY: true,
        click: true,
        mouseWheel: true,
        probeType: 3,//探针，获取滑动距离必备
        pullUpLoad: {
          threshold: 744
        },
      });
      this.myscroll.on("pullingUp", () => {
        this.page++;
        this.bianlist();
        this.$nextTick(() => {
          this.myscroll.refresh();
        });
        this.myscroll.finishPullUp();
      });
      this.myscroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y));
        this.myscroll.refresh();
        if (this.scrollY > 600) {
          this.flag = true
        } else {
          this.flag = false
        }
      });
    })
  }
}
</script>
 <style scoped>
.insuo {
  background: #f1f1f1;
}
.scro {
  height: 99vh;
  overflow: hidden;
}
.qie {
  height: 30px;
  width: 30px;
  background: black;
  opacity: 0.4;
  line-height: 30px;
  font-size: 14px;
  color: white;
  border-radius: 100%;
  position: fixed;
  right: 20px;
  top: 520px;
  z-index: 100;
}
.zhid {
  height: 30px;
  width: 30px;
  background: black;
  opacity: 0.4;
  line-height: 30px;
  font-size: 22px;
  text-align: center;
  color: white;
  border-radius: 100%;
  position: fixed;
  right: 20px;
  top: 480px;
  z-index: 100;
}
.sou_2 {
  display: flex;
  background: white;
  justify-content: space-around;
  align-items: center;
  border-bottom: solid 1px #ddd;
}
.sou_2 span {
  font-size: 16px;
}
.van-button .van-button__text {
  color: #555;
}
.van-button {
  border: 0;
}
.kk {
  font-size: 50px;
  margin-top: 100px;
}
.shangp {
  width: 100%;
  margin-left: 6px;
}
.shangp ul {
  width: 176px;
  height: 267px;
  overflow: hidden;
  display: inline-block;
  background: white;
  margin-top: 10px;
}
.shangp ul dt {
  width: 100%;
  height: 170px;
}
.shangp ul img {
  width: 100%;
  height: 100%;
}
.shangp ul:nth-child(even) {
  margin-left: 10px;
}
.shangp ul dd {
  width: 94%;
  line-height: 18px;
  margin: 8px 0 0 2%;
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
.van-card {
  background: white;
}
</style>
