<template>
  <div class="logistics">
    <!-- 物流信息 -->
    <!-- 头部导航 -->
    <van-sticky>
      <headerBar :ishead="showHead" :title="myTitle"></headerBar>
    </van-sticky>
    <!-- 物品缩略图 -->
    <div class="content-top">
      <div class="top-wrap">
        <div class="thumbnail">
          <img :src="myItemInfo.goods[0].goods_img" alt="" />
        </div>
        <h2 class="one-txt-cut">{{ myItemInfo.goods[0].goods_name }}</h2>
        <div class="state">
          <h3>
            {{
              logisticsInfo.status == 1
                ? "暂无记录"
                : logisticsInfo.status == 2
                ? "在途中"
                : logisticsInfo.status == 3
                ? "派送中"
                : logisticsInfo.status == 4
                ? "已签收"
                : "待查询"
            }}
          </h3>
          <p>{{ logisticsInfo.status == 4 ? lastDate + "签收" : "" }}</p>
        </div>
      </div>
    </div>
    <!-- 快递员评价 -->
    <div class="content-middle">
      <div class="middle-wrap">
        <h4>评价快递员 东站</h4>
        <div class="evaluate">
          <div class="pic">
            <img src="" alt="" />
          </div>
          <van-rate v-model="value" size="16px" />
          <div class="contact">
            <van-icon name="chat-o" size="18px" />
            <p>联系Ta</p>
          </div>
        </div>
        <span
          ><img :src="logisticsInfo.logo" alt="" />{{
            logisticsInfo.expTextName
          }}
          {{ logisticsInfo.mailNo }}</span
        >
      </div>
    </div>
    <!-- 物流跟踪 -->
    <div class="content-bottom">
      <div class="bottom-wrap">
        <h3>
          <i class="my-iconfont iconbirdxiaoniao"></i>
          <span>本数据由菜鸟裹裹提供</span>
        </h3>
        <div class="step-wrap">
          <van-steps direction="vertical" :active="0">
            <van-step v-for="(item, index) in logisticsInfo.data" :key="index">
              <h3>{{ item.context }}</h3>
              <p>{{ item.time }}</p>
              <div class="datetime">
                <span>{{ item.ntime1 }}</span
                ><span>{{ item.ntime2 }}</span>
              </div>
              <template #active-icon>
                <van-icon name="checked" color="#e4363e" size="18px" />
              </template>
            </van-step>
          </van-steps>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import headerBar from "components/headerBar"; //引入头部导航
export default {
  name: "logistics",
  components: {
    headerBar
  },
  data() {
    return {
      uid: 956538,
      showHead: true,
      myTitle: "物流信息",
      value: 0, //评分激活个数
      myItemInfo: {}, //物品信息
      logisticsInfo: {}, //物流信息
      lastDate: "" //显示签收日期
    };
  },
  methods: {
    // 获取物流信息
    getLogisticsInfo() {
      // e2334584bfd5450a9c198c735523fe3b
      this.axios
        .post(
          "http://route.showapi.com/64-19?com=auto&nu=75330862263906&showapi_appid=192957&showapi_sign=e2334584bfd5450a9c198c735523fe3b"
        )
        .then(res => {
          // console.log(res);
          this.logisticsInfo = res.data.showapi_res_body;
          let logisticsData = res.data.showapi_res_body.data;
          logisticsData.forEach(element => {
            let timeArr = element.time.split(" ");
            let dstr = timeArr[0].split("-");
            let tstr = timeArr[1].split(":");
            let nDstr = dstr[1] + "-" + dstr[2];
            let nTstr = tstr[0] + ":" + tstr[1];
            element.ntime1 = nDstr;
            element.ntime2 = nTstr;
          });
          this.logisticsInfo.data = logisticsData;
          let nDate = logisticsData[0].ntime1.split("-");
          this.lastDate = `${nDate[0]}月${nDate[1]}日`;
        });
    }
  },
  created() {
    // 获取订单信息
    this.myItemInfo = this.$route.params.item;
    // console.log(this.myItemInfo);
    this.getLogisticsInfo();
  },
  mounted() {
    // let str = "快件已在 【忻州代县】 签收, 签收人: 家人, 如有疑问请电联:";
    // console.log(str.substr(str.search(/\]|】/) + 1, 3));
  }
};
</script>

<style lang="less" scoped>
.logistics {
  width: 100%;
  .content-top {
    box-sizing: border-box;
    line-height: 1.5;
    font-size: 14px;
    margin: 12px 0;
    .top-wrap {
      background-color: #fff;
      margin: 0 10px;
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .thumbnail {
        width: 75px;
        height: 75px;
        margin-top: 25px;
        box-shadow: 4px 4px 7px #463c47;
        img {
          width: 100%;
          height: 100%;
        }
      }
      h2 {
        max-width: 180px;
        line-height: 28px;
        color: #999;
        font-weight: bold;
        margin-bottom: 5px;
      }
      .state {
        width: 100%;
        height: 60px;
        background: linear-gradient(to right, #ec4767, #e8343f);
        border-radius: 0 0 8px 8px;
        color: #fff;
        h3 {
          margin: 12px 0 0 16px;
          font-weight: bold;
        }
        p {
          font-size: 12px;
          margin-left: 16px;
        }
      }
    }
  }
  .content-middle {
    box-sizing: border-box;
    line-height: 1.5;
    font-size: 14px;
    margin: 12px 0;
    .middle-wrap {
      display: flex;
      flex-direction: column;
      margin: 0 10px;
      background-color: #fff;
      padding: 0 15px;
      border-radius: 8px;
      h4 {
        line-height: 30px;
        color: #aaa;
      }
      .evaluate {
        display: flex;
        align-items: center;
        margin-bottom: 15px;
        .pic {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: lightblue;
          margin-right: 20px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .contact {
          margin-left: auto;
          text-align: center;
          color: #a1a1a1;
          p {
            font-size: 10px;
          }
        }
      }
      span {
        line-height: 30px;
        font-size: 12px;
        color: #333;
        font-weight: bold;
        display: flex;
        align-items: center;
        img {
          width: 40px;
          height: 15px;
          margin-right: 8px;
        }
      }
    }
  }
  .content-bottom {
    box-sizing: border-box;
    line-height: 1.5;
    font-size: 14px;
    margin: 12px 0;
    .bottom-wrap {
      display: flex;
      flex-direction: column;
      margin: 0 10px;
      background-color: #fff;
      border-radius: 8px;
      h3 {
        display: flex;
        align-items: center;
        border-bottom: 1px solid #eee;
        i {
          border: 1px solid #f1f0f0;
          color: #2970fb;
          border-radius: 50%;
          margin-left: 12px;
          padding: 0 5px;
        }
        span {
          box-sizing: border-box;
          padding: 12px 8px;
          color: #7d7d7d;
          font-size: 12px;
        }
      }
      .step-wrap {
        margin: 5px 0;
        .van-steps {
          padding: 0 0 0 70px;
          position: relative;
          .datetime {
            text-align: right;
            width: 35px;
            position: absolute;
            top: 13px;
            left: -62px;
            font-size: 12px;
            color: #333;
            display: flex;
            flex-direction: column;
            line-height: 1;
            span:last-child {
              font-size: 10px;
              color: #909090;
              margin-top: 5px;
            }
          }
        }
      }
    }
  }
}
</style>
