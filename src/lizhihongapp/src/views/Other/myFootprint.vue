<template>
  <div class="myfootprint">
    <!-- 头部导航 -->
    <van-sticky>
      <headerBar :ishead="showHead" :title="myTitle"></headerBar>
    </van-sticky>
    <!-- 足迹编辑 -->
    <div class="footprint-title">
      <div>共{{ footprintNum }}条记录</div>
    </div>
    <!-- 足迹列表 -->
    <div class="footprint-list">
      <div
        class="list-warp"
        v-for="(fitem, findex) in footprintList"
        :key="findex"
      >
        <div class="show-title">日期:&nbsp;{{ fitem.date }}</div>
        <div class="show-goods">
          <van-grid :border="false" :column-num="2" :gutter="5">
            <van-grid-item
              v-for="(item, index) in fitem.data"
              :key="index"
              @click="goDetail(item.goods_id)"
            >
              <div class="show-goods-item">
                <dl>
                  <dt>
                    <img :src="item.goods_image" alt />
                  </dt>
                  <dd class="txt-cut">{{ item.goods_name }}</dd>
                  <dd>
                    <p>
                      ￥<span>{{ item.goods_price }}</span>
                    </p>
                    <a href="##" @click.stop="onDelete(item.id)">删除</a>
                  </dd>
                </dl>
              </div>
            </van-grid-item>
          </van-grid>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Qs from "qs";
import headerBar from "components/headerBar";
export default {
  name: "myfootprint",
  components: {
    headerBar
  },
  data() {
    return {
      uid: 956538, //用户登录携带的id
      showHead: true, //显示哪种头部导航
      myTitle: "我的足迹", //导航栏标题
      footprintList: [], //足迹列表
      footprintNum: 0 //足迹总记录条数
    };
  },
  methods: {
    // 获取足迹列表
    getMyFootprint() {
      this.axios
        .post(
          "https://api.ymduo.com/Member/history",
          Qs.stringify({
            uid: this.uid,
            pf: 1
          })
        )
        .then(res => {
          // console.log(res);
          this.footprintList = res.data.result.data;
          let arr = [];
          res.data.result.data.forEach(ele => {
            arr.push(ele.count);
          });
          this.footprintNum = arr.reduce((total, curval) => total + curval);
          this.$store.dispatch("setFootprintCount", this.footprintNum);
        });
    },
    // 跳转详情页
    goDetail(id) {
      const goods_id = id;
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        loadingType: "spinner"
      });
      setTimeout(() => {
        this.$toast.clear();
        this.$router.push({
          name: "details",
          query: {
            goods_id
          }
        });
      }, 500);
    },
    // 删除记录
    onDelete(id) {
      this.axios
        .post(
          "https://api.ymduo.com/Member/delhistory",
          Qs.stringify({
            uid: this.uid,
            ids_str: id
          })
        )
        .then(res => {
          if (res.data.code == 200) {
            this.$toast.success("足迹删除成功");
            this.getMyFootprint();
          }
        });
    }
  },
  created() {
    // 调用列表方法
    this.getMyFootprint();
  }
};
</script>

<style lang="less" scoped>
.myfootprint {
  width: 100%;
  margin-bottom: 10px;
  .footprint-title {
    height: 44px;
    line-height: 44px;
    background: #fff;
    color: #666;
    font-size: 14px;
    position: relative;
    div {
      padding-left: 10px;
    }
  }
  .footprint-list {
    .show-title {
      height: 35px;
      line-height: 35px;
      color: #333;
      font-size: 14px;
      text-align: center;
      background: #c8dff1;
      font-size: 18px;
      margin: 10px 5px 0;
      border-radius: 8px 8px 0 0;
    }
    .show-goods {
      width: 100%;
      display: flex;
      justify-content: space-between;
      flex-flow: wrap;
      .van-grid {
        width: 100%;
        // margin: 0 5px;
        .show-goods-item {
          width: 100%;
          height: 250px;
          background-color: rgba(255, 255, 255, 1);
          dl {
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            dt {
              height: 176px;
              img {
                width: 100%;
                height: 100%;
              }
            }
            dd:first-of-type {
              box-sizing: border-box;
              height: 31px;
              font-size: 13px;
              -webkit-line-clamp: 2;
              word-break: break-all;
              color: #232326;
              margin-top: 5px;
              line-height: 16px;
              margin-bottom: 5px;
              padding: 0 5px;
            }
            dd:last-of-type {
              height: 26px;
              box-sizing: border-box;
              font-size: 13px;
              text-align: left;
              overflow: hidden;
              position: relative;
              p {
                color: #f23030;
                display: inline-block;
                padding: 0 5px;
                height: 25px;
                line-height: 25px;
                span {
                  font-size: 18px;
                }
              }
              a {
                display: block;
                position: absolute;
                top: 0;
                right: 8px;
                text-align: center;
                color: #e93b3d;
                font-size: 12px;
                width: 49px;
                height: 24px;
                line-height: 25px;
                border: 1px solid #e93b3d;
                border-radius: 4px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
