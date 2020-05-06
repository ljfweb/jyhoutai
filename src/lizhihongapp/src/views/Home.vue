<template>
  <div class="home">
    <!-- 头部导航 -->
    <headerBar></headerBar>
    <!-- 轮播图 -->
    <div class="bg-wrap">
      <div class="slider-bg"></div>
    </div>
    <Swiper :images="swiperImgs" :autoplay="3000"></Swiper>
    <!-- 九宫格分类 -->
    <van-swipe class="fenleiSlider" indicator-color="#e93b3d" :loop="false">
      <van-swipe-item>
        <div class="fl-item">
          <van-grid :border="false" :column-num="5" square>
            <van-grid-item
              v-for="item in flListOne"
              :key="item._id"
              :icon="item.imgurl"
              :text="item.title"
            />
          </van-grid>
        </div>
      </van-swipe-item>
      <van-swipe-item>
        <div class="fl-item">
          <van-grid :border="false" :column-num="5" square>
            <van-grid-item
              v-for="item in flListTwo"
              :key="item._id"
              :icon="item.imgurl"
              :text="item.title"
            />
          </van-grid>
        </div>
      </van-swipe-item>
    </van-swipe>
    <!-- 秒杀专区 -->
    <div class="ms-kill">
      <div class="top">
        <span class="sp1"><img :src="require('assets/jdms.png')"/></span>
        <van-count-down :time="time">
          <template v-slot="timeData">
            <p>
              14点场<span class="item">{{    
                timeData.hours &lt; 10 ? "0" + timeData.hours : timeData.hours
              }}</span
              >:<span class="item">{{
                timeData.minutes &lt; 10
                  ? "0" + timeData.minutes
                  : timeData.minutes
              }}</span
              >:<span class="item">{{
                timeData.seconds &lt; 10
                  ? "0" + timeData.seconds
                  : timeData.seconds
              }}</span>
            </p>
          </template>
        </van-count-down>
        <span class="sp2">更多秒杀</span>
        <i>
          <img
            src="https://wq.360buyimg.com/wxsq_project/portal/m_jd_index/images/arrow_rt_2ccb8cd5.png"
          />
        </i>
      </div>
      <div class="goods-list">
        <ul>
          <router-link
            :to="{ name: 'details', query: { goods_id: item.goods_id } }"
            tag="li"
            v-for="(item, index) in killGoodsList"
            :key="index"
          >
            <dl class="goods-item">
              <dt>
                <img :src="item.image" />
              </dt>
              <dd>￥{{ item.price }}</dd>
              <dd>{{ item.old_price }}</dd>
            </dl>
          </router-link>
        </ul>
      </div>
    </div>
    <!-- 图片按钮 -->
    <div class="imgBtn">
      <div class="wraper">
        <div class="imgBtn-item">
          <img
            src="https://m.360buyimg.com/mobilecms/s376x240_jfs/t1/49601/16/12206/115887/5d91b4d5E34709952/aba2bcb4855e6e52.png!q70.jpg.dpg"
          />
          <img
            src="https://m.360buyimg.com/mobilecms/s376x240_jfs/t1/32449/33/15631/174497/5cc2d86bE0289110c/9c53e25651659d43.png!q70.jpg.dpg"
          />
        </div>
      </div>
    </div>
    <!-- 东家小院 -->
    <Floor
      :floortitle="djTitle"
      :imgsrcsm="FloorImgSm"
      :showfloor="false"
      :imgsrcmd="floorImgMd"
    ></Floor>
    <!-- 每日逛 -->
    <Floor
      :floortitle="mrTitle"
      :showfloor="true"
      :imgsrcmd="floorImgMd"
    ></Floor>
    <!-- 为你推荐 -->
    <van-pull-refresh v-model="refreshing">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <Recommend
          :floortitle="tjTitle"
          :recommlist="recommendList"
        ></Recommend>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import headerBar from "components/headerBar";
import Swiper from "components/swiper";
import Floor from "components/spfloor";
import Recommend from "components/recommend";
import Qs from "qs";
export default {
  name: "home",
  components: {
    headerBar,
    Swiper,
    Floor,
    Recommend
  },
  data() {
    return {
      uid: 956538, //用户登录id
      djTitle:
        "https://m.360buyimg.com/mobilecms/s750x80_jfs/t1/104532/40/2146/24646/5dcc2957E83954979/5ec2bb870605dcb3.png!q70.jpg.dpg",
      mrTitle:
        "https://m.360buyimg.com/mobilecms/s750x80_jfs/t1/103080/1/6315/23804/5df25d68E3eae6519/deef719dfdfe2844.png!q70.jpg.dpg",
      tjTitle:
        "https://img11.360buyimg.com/jdphoto/jfs/t1/31601/22/15554/14040/5cc2a86fEbdb1098b/88174b36f85283b6.png",
      swiperImgs: [],
      FloorImgSm: [
        {
          id: 1,
          imgs: [
            "https://m.360buyimg.com/mobilecms/s150x150_jfs/t1/38465/5/6797/211663/5cd3b754E107cd897/e733efdd080cf918.jpg!q70.jpg.dpg",
            "https://m.360buyimg.com/mobilecms/s150x150_jfs/t10978/8/1048112982/219858/7e876fc3/59db62edN0a6f276b.jpg!q70.jpg.dpg"
          ]
        },
        {
          id: 2,
          imgs: [
            "https://m.360buyimg.com/mobilecms/s150x150_jfs/t27550/344/881254104/156138/74c46c10/5bbc0f8aN3ab05bb4.jpg!q70.jpg.dpg",
            "https://m.360buyimg.com/mobilecms/s150x150_jfs/t1/87691/16/14577/180760/5e665430Efe1bf391/5b61f7ed1e422eb1.jpg!q70.jpg.dpg"
          ]
        }
      ],
      floorImgMd: [
        {
          id: 1,
          title: "大胆撞色",
          info: "个性十足",
          bg: "#000",
          img_url:
            "https://m.360buyimg.com/mobilecms/s150x150_jfs/t1/103795/3/13208/305045/5e5353fcEe68f4174/e941b842a8eaca77.jpg!q70.jpg.dpg"
        },
        {
          id: 2,
          title: "木作匠人",
          info: "用木塔搭个家",
          bg: "#000",
          img_url:
            "https://m.360buyimg.com/mobilecms/s150x150_jfs/t1/92910/21/16651/193846/5e7d55e6Ee8075060/b5e58bbce74f69f2.jpg!q70.jpg.dpg"
        },
        {
          id: 3,
          title: "品质生活",
          info: "轻奢家具",
          bg: "#000",
          img_url:
            "https://m.360buyimg.com/mobilecms/s150x150_jfs/t1/106731/22/16894/319613/5e8042c9E82c62c84/ece01e16656b55b5.jpg!q70.jpg.dpg"
        },
        {
          id: 4,
          title: "早春美家",
          info: "清新早春",
          bg: "#000",
          img_url:
            "https://m.360buyimg.com/mobilecms/s150x150_jfs/t1/29264/28/5989/200190/5c457531Eb6870111/6c7992ca388feee5.jpg!q70.jpg.dpg"
        },
        {
          id: 5,
          title: "免息星球",
          info: "白条免息构",
          bg: "linear-gradient(90deg, #FE8537,#F02B2B)",
          img_url:
            "https://m.360buyimg.com/n1/s150x150_jfs/t29566/227/1464891645/10350/a5b133e2/5ce20cdcNd9cdd972.jpg!q70.jpg.dpg"
        },
        {
          id: 6,
          title: "每日特价",
          info: "9块9疯抢",
          bg: "linear-gradient(90deg, #FE8537,#F02B2B)",
          img_url:
            "https://m.360buyimg.com/mobilecms/s150x150_jfs/t1/85072/25/5818/20921/5def3796Eeb18104b/fed4740b6b58d144.jpg!q70.jpg.dpg"
        },
        {
          id: 7,
          title: "品牌闪购",
          info: "汇大牌好价",
          bg: "linear-gradient(90deg, #FF765C,#FF23B3)",
          img_url:
            "https://m.360buyimg.com/mobilecms/s150x150_jfs/t1/88638/33/5675/28468/5def3b04E728e691f/8997a8bf07db66b7.png!q70.jpg.dpg"
        },
        {
          id: 8,
          title: "京东直播",
          info: "好货即可买",
          bg: "linear-gradient(90deg, #FF2A00,#FF00AF)",
          img_url:
            "https://m.360buyimg.com/mobilecms/s150x150_jfs/t1/75300/31/13658/33045/5daeb773Ebbbd91bd/47a1bdf9047ed568.jpg!q70.jpg.dpg"
        },
        {
          id: 9,
          title: "排行榜",
          info: "销量排行推荐",
          bg: "linear-gradient(90deg, #D400FF,#FF320A)",
          img_url:
            "https://m.360buyimg.com/mobilecms/s150x150_jfs/t1/71612/30/758/62076/5cefa5a6E2494c8c2/13aac3e0bb1b4e55.png!q70.jpg.dpg"
        },
        {
          id: 10,
          title: "拍拍好物",
          info: "iphone 5折起",
          bg: "linear-gradient(90deg, #00C2AB,#3E94FF)",
          img_url:
            "https://m.360buyimg.com/mobilecms/s150x150_jfs/t1/76945/35/760/26244/5cef9705E501242ee/c56b89c0946438ef.jpg!q70.jpg.dpg"
        },
        {
          id: 11,
          title: "新品首发",
          info: "京东小魔方",
          bg: "linear-gradient(90deg, #FF765C,#FF23B3)",
          img_url:
            "https://wqimg.jd.com/imgproxy/n7/s150x150_jfs/t1/97706/18/16277/169035/5e7d721dE0dd4180a/ceea57a3b5b16781.jpg.dpg"
        },
        {
          id: 12,
          title: "发现好货",
          info: "发现品质生活",
          bg: "linear-gradient(90deg, #2AD396,#85BB1F)",
          img_url:
            "https://m.360buyimg.com/mobilecms/s150x150_jfs/t1/38988/36/7707/54292/5cefa2b0E1cce5cfa/64e76ed6c67568bf.png!q70.jpg.dpg"
        }
      ],
      time: 2 * 60 * 60 * 1000,
      flListOne: [],
      flListTwo: [],
      killGoodsList: [],
      recommendList: [],
      loading: false,
      finished: false,
      refreshing: false,
      pages: 0 //推荐列表的默认参数
    };
  },
  methods: {
    // 轮播图请求接口地址
    getSwiperImgs() {
      this.axios
        .get(
          "https://www.fastmock.site/mock/474c85cfc60487e74223dd753e5bcf8d/home/banner"
        )
        .then(res => {
          // console.log(res);
          this.swiperImgs = res.data;
        });
    },
    // 分类九宫格请求
    getFlList() {
      this.axios({
        method: "get",
        url:
          "https://www.fastmock.site/mock/474c85cfc60487e74223dd753e5bcf8d/home/msiteclassify"
      }).then(res => {
        // console.log(res);
        if (res.status == 200) {
          let flinfo = res.data;
          flinfo.forEach((item, i, arr) => {
            this.flListOne = arr.slice(0, 10);
            this.flListTwo = arr.slice(10);
          });
        }
      });
    },
    //秒杀专区的商品
    getKillList() {
      this.axios
        .post("https://api.ymduo.com/Home/IndexSep/indexPC")
        .then(res => {
          // console.log(res);
          this.killGoodsList = res.data.result.data.hotgoods;
        });
    },
    // 为你推荐商品专区
    getRecommendList() {
      this.$axios({
        method: "post",
        url: "https://api.ymduo.com/Interface/recommendlists",
        data: Qs.stringify({
          pf: 1,
          p: this.pages
        }),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        timeout: 10000
      }).then(res => {
        this.recommendList = this.recommendList.concat(res.data.result.data);
      });
    },
    // 滚动加载数据
    onLoad() {
      setTimeout(() => {
        if (this.refreshing) {
          this.recommendList = [];
          this.refreshing = false;
        }
        this.pages++;
        this.getRecommendList();
        this.loading = false;
        if (this.recommendList.length + 20 >= 100) {
          this.finished = true;
        }
      }, 1500);
    }
  },
  created() {
    // 轮播图请求接口地址
    this.getSwiperImgs();
    //请求九宫格数据
    this.getFlList();
    //秒杀专区的商品
    this.getKillList();
  }
};
</script>
<style lang="less" scoped>
.home {
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 60px;
  .bg-wrap {
    width: 100%;
    height: 100px;
    position: absolute;
    overflow: hidden;
    .slider-bg {
      background-image: linear-gradient(0deg, #f1503b, #c82519 50%);
      position: absolute;
      overflow: hidden;
      top: 0;
      left: -25%;
      height: 100px;
      width: 150%;
      border-bottom-left-radius: 100%;
      border-bottom-right-radius: 100%;
    }
  }
  .fenleiSlider {
    height: 162px;
    background-color: transparent;
    .van-swipe__track {
      height: 100%;
      .fl-item {
        height: 100%;
        .van-grid {
          height: 100%;
        }
      }
    }
  }
  .ms-kill {
    background-color: #fff;
    margin: 10px;
    .top {
      width: 100%;
      height: 34px;
      display: flex;
      align-items: center;
      .sp1 {
        width: 70px;
        height: 25px;
        margin: 8px 6px 0 9px;
        img {
          width: 100%;
          height: auto;
        }
      }
      .sp2 {
        color: rgba(241, 55, 55, 1);
        font-size: 12px;
        margin-left: auto;
        font-family: PingFangSC-regular;
      }
      p {
        color: rgba(51, 51, 51, 1);
        font-size: 14px;
        font-weight: bold;
        span {
          font-size: 12px;
          text-align: center;
          font-weight: normal;
          padding: 0 5px;
          &:nth-child(1) {
            margin-left: 5px;
          }
        }
      }
      i {
        width: 14px;
        height: 14px;
        padding: 0 5px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .goods-list {
      width: 100%;
      height: 120px;
      box-sizing: border-box;
      overflow: hidden;
      overflow-x: scroll;
      &::-webkit-scrollbar {
        display: none;
      }
      ul {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        background-color: #fff;
        padding-left: 5px;
        li {
          width: 76px;
          float: left;
          margin: 0 3px;
          .goods-item {
            width: 100%;
            padding: 0 5px;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            align-items: center;
            dd {
              color: rgba(241, 55, 55, 1);
              font-size: 15px;
              text-align: center;
              font-weight: bold;
              font-family: JDZhengHT-EN-Bold;
              margin: 10px 0;
            }
            dd:nth-last-child(1) {
              color: #999;
              font-size: 12px;
              font-weight: normal;
              text-decoration: line-through;
              margin: 0;
            }
            dt {
              width: 66px;
              height: 66px;
              vertical-align: middle;
              margin: 0 auto;
              img {
                width: 100%;
                height: 100%;
              }
            }
          }
        }
      }
    }
  }
  .imgBtn {
    width: 100%;
    height: 130px;
    box-sizing: border-box;
    .wraper {
      height: 120px;
      margin: 10px;
      .imgBtn-item {
        width: 100%;
        height: 120px;
        border-radius: 8px;
        position: relative;
        display: flex;
        img {
          width: 50%;
          flex: 1;
          &:first-child {
            border-radius: 8px 0 0 8px;
          }
          &:last-child {
            border-radius: 0 8px 8px 0;
          }
        }
      }
    }
  }
}
</style>
