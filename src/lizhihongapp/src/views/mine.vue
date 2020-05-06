<template>
  <div class="mine">
    <!-- 头部标题跳转 -->
    <headerBar :ishead="showHead" :title="myTitle"></headerBar>
    <!-- 用户头像标题信息 -->
    <div class="myHeader-con">
      <div class="my-head">
        <div class="user-info" v-if="$store.state.userToken">
          <van-uploader :after-read="afterRead">
            <div class="headConf">
              <img :src="userInfo.head" alt="" />
            </div>
          </van-uploader>
          <div class="userData">
            <div class="nickname">
              <span class="one-txt-cut">{{ userInfo.nickname }}</span>
              <van-icon name="edit" @click="showDialog" />
              <!-- 唤醒弹窗 -->
              <van-dialog
                v-model="show"
                width="280px"
                confirm-button-text="保存"
                confirm-button-color="#e93b3d"
                title="编辑京东账号信息"
                show-cancel-button
                :before-close="setMyNickname"
              >
                <template #default>
                  <div class="setInfo">
                    <div class="named">
                      <p>用户名</p>
                      <p>{{ userInfo.name }}</p>
                    </div>
                    <div class="namedMsg">用户名不可修改</div>
                    <div class="setNickname">
                      <p>昵称</p>
                      <van-field v-model="nickValue" />
                    </div>
                    <div class="nickMsg">
                      4-20个字符，可由中英文、数字、"-"、"_" 组成
                    </div>
                  </div>
                </template>
              </van-dialog>
              <!-- 注册会员 -->
              <p class="vip">
                <van-icon name="gem-o" size="16px" />
                <span>{{ userInfo.level_name }}</span>
              </p>
            </div>
            <p class="username one-txt-cut">用户名：{{ userInfo.name }}</p>
          </div>
        </div>
        <div class="nologin" v-else>
          <div class="headConf">
            <img
              src="http://imgsrc.baidu.com/forum/w=580/sign=91799a31324e251fe2f7e4f09786c9c2/2115a9529822720edcbedaf179cb0a46f31fabaf.jpg"
              alt=""
            />
          </div>
          <div class="nologin-text" @click="turnLogin">立即登录</div>
        </div>
        <div class="user-edit" @click="onSet">
          <van-icon name="setting" size="14px" />
          <span>账户设置</span>
        </div>
        <div class="plus-tags">
          <div class="inner">
            <van-icon
              name="https://img11.360buyimg.com/jdphoto/s113x21_jfs/t1/44130/31/4355/2489/5cd2d9bdE7fd63a96/155d2b916c3ede73.png"
              size="60px"
            />
            <p class="plus-title one-txt-cut">办信用卡 送PLUS会员年卡</p>
            <p>立即查看></p>
          </div>
        </div>
      </div>
    </div>
    <!-- 购物以后的订单详情 -->
    <div class="orderdesc">
      <van-grid icon-size="22px">
        <van-grid-item
          icon="card"
          text="待付款"
          :badge="orderNum.dfk > 0 ? orderNum.dfk : ''"
          @click="turnOrder(1)"
        />
        <van-grid-item
          icon="https://img11.360buyimg.com/jdphoto/s40x40_jfs/t14608/2/1636876268/266/b4ebb3f2/5a535791N627c296c.png"
          text="待收货"
          :badge="orderNum.dsh > 0 ? orderNum.dsh : ''"
          @click="turnOrder(3)"
        />
        <van-grid-item
          icon="https://img11.360buyimg.com/jdphoto/s40x40_jfs/t15049/345/1573771240/492/7ef15694/5a5357eaNab882dcb.png"
          text="退换 / 售后"
          :badge="orderNum.wc > 0 ? orderNum.wc : ''"
          @click="turnOrder(4)"
        />
        <van-grid-item
          icon="https://img30.360buyimg.com/jdphoto/jfs/t14953/346/2113764063/185/1a1dcd24/5a6d7b8bN8431ea1a.png"
          text="全部订单"
          :badge="orderNum.all > 0 ? orderNum.all : ''"
          @click="turnOrder(0)"
        />
      </van-grid>
    </div>
    <!-- 优惠卷 -->
    <div class="coupons">
      <van-grid :border="false" :column-num="5">
        <van-grid-item>
          <div>1张</div>
          <span @click="$toast('京东礼券')">京东卷</span>
        </van-grid-item>
        <van-grid-item>
          <van-tag type="danger">立减40元</van-tag>
          <div>开通有礼</div>
          <span @click="$toast('京东白条')">白条</span>
        </van-grid-item>
        <van-grid-item>
          <div>0个</div>
          <span @click="$toast('京豆')">京豆</span>
        </van-grid-item>
        <van-grid-item>
          <div>0元</div>
          <span @click="$toast('红包')">红包</span>
        </van-grid-item>
        <van-grid-item>
          <div>
            <van-icon
              name="https://img11.360buyimg.com/jdphoto/s40x40_jfs/t20329/11/1228908740/243/73a7934c/5b235f37Ne85fdb85.png"
              size="22px"
            />
          </div>
          <span @click="$toast('我的资产')">我的资产</span>
        </van-grid-item>
      </van-grid>
    </div>
    <!-- 关注店铺的信息 -->
    <div class="coupons">
      <van-grid :border="false" :column-num="3">
        <van-grid-item @click="$toast('商品收藏')">
          <div style="font:normal 700 18px/1 'Microsoft YaHei'">0</div>
          <span>商品收藏</span>
        </van-grid-item>
        <van-grid-item @click="$toast('店铺收藏')">
          <div style="font:normal 700 18px/1 'Microsoft YaHei'">1</div>
          <span>店铺收藏</span>
        </van-grid-item>
        <van-grid-item to="/myfootprint">
          <div style="font:normal 700 18px/1 'Microsoft YaHei'">
            {{ $store.state.footprintCount }}
          </div>
          <span>我的足迹</span>
        </van-grid-item>
      </van-grid>
    </div>
    <!-- 京东有关小程序 -->
    <div class="tools">
      <van-grid :border="false" :column-num="4" icon-size="20px">
        <van-grid-item
          icon="//img14.360buyimg.com/jdphoto/jfs/t1/24988/22/12030/2316/5c94d6d4E7cdcf995/c8fe8e84d89685f7.png.webp"
          text="我的预约"
          @click="$toast('我的预约')"
        />
        <van-grid-item
          icon="//img12.360buyimg.com/img/s64x64_jfs/t1/97016/19/15154/2382/5e6b8e86E17a7527c/eeed6fdf78de3847.png.webp"
          text="高价回收"
          @click="$toast('高价回收')"
        />
        <van-grid-item
          icon="//img10.360buyimg.com/jdphoto/jfs/t12931/150/1327543095/1276/e9e67341/5a1e9ee2Nb5baf153.png.webp"
          text="京东火车票"
          @click="$toast('京东火车票')"
        />
        <van-grid-item
          icon="//img30.360buyimg.com/jdphoto/jfs/t13612/121/1346421356/1355/9014e74f/5a1e9f1cNab886864.png.webp"
          text="应用推荐"
          @click="$toast('应用推荐')"
        />
        <van-grid-item
          icon="//img30.360buyimg.com/jdphoto/jfs/t18940/299/476632277/2164/4453d9e4/5a813897N7c80dea2.png.webp"
          text="京东机票"
          @click="$toast('京东机票')"
        />
        <van-grid-item
          icon="//img13.360buyimg.com/jdphoto/jfs/t16390/157/2010422417/341/bb4c68c4/5a8138f2Nfd5de7b7.png.webp"
          text="京东酒店"
          @click="$toast('京东酒店')"
        />
        <van-grid-item
          icon="//img12.360buyimg.com/img/s64x64_jfs/t1/102785/29/14987/2346/5e6b8ed9Ee5ab6266/d6d34952c182fb1b.png.webp"
          text="闲置管家"
          @click="$toast('闲置管家')"
        />
        <van-grid-item
          @click="$toast('客服服务')"
          icon=" my-iconfont iconkefu"
          text="客服服务"
        />
      </van-grid>
    </div>
    <!-- 为你推荐 -->
    <recommend :floortitle="tjTitle" :recommlist="recommendList"></recommend>
    <!-- 一键置顶 -->
    <!-- <backTop></backTop> -->
  </div>
</template>

<script>
import Qs from "qs";
import { Dialog } from "vant";
import headerBar from "components/headerBar"; //引入头部导航
import Recommend from "components/recommend"; //引入推荐列表数据
// import backTop from "components/backTop"; //一键置顶
export default {
  name: "mine",
  components: {
    headerBar,
    Recommend,
    // backTop,
    [Dialog.Component.name]: Dialog.Component
  },
  data() {
    return {
      uid: 956538, //用户登录id
      showHead: true,
      myTitle: "我的京东",
      tjTitle:
        "https://img11.360buyimg.com/jdphoto/jfs/t1/31601/22/15554/14040/5cc2a86fEbdb1098b/88174b36f85283b6.png",
      nickValue: "jd_YgdbREmJnooh", //设置昵称
      recommendList: [],
      userInfo: {}, //用户信息
      show: false, //显示修改的弹窗
      orderNum: "" //订单数量显示
    };
  },
  methods: {
    // 账户设置
    onSet() {
      this.$toast.loading({
        forbidClick: true,
        loadingType: "spinner"
      });
      setTimeout(() => {
        this.$toast.clear();
        this.$router.push("/account");
      }, 200);
    },
    // 弹出修改昵称窗口
    showDialog() {
      this.show = true;
    },
    // 修改我的昵称
    setMyNickname(action, done) {
      if (action === "confirm") {
        this.axios
          .post(
            "https://api.ymduo.com/Member/imchange",
            Qs.stringify({
              uid: this.uid,
              nickname: this.nickValue
            })
          )
          .then(res => {
            if (res.data.code == 200) {
              this.getUserInfo();
            }
          });
        setTimeout(done, 1000);
      } else {
        done();
      }
    },
    // 设置个人头像
    afterRead(file) {
      // console.log(file);
      const formData = new FormData(); //通过设置 new FormData();将文件转二进制
      formData.append("image", file.file);
      this.axios({
        method: "post",
        url: "https://api.ymduo.com/Home/member/uploadImage",
        data: formData
      }).then(res => {
        // console.log(res);
        if (res.data.code == 200) {
          this.axios
            .post(
              "https://api.ymduo.com/Member/imchange",
              Qs.stringify({
                uid: this.uid,
                head: res.data.result.data.url
              })
            )
            .then(res => {
              if (res.data.code == 200) {
                this.getUserInfo();
              }
            });
        }
      });
    },
    // 未登录时跳转登录页面
    turnLogin() {
      this.$router.push("/login");
    },
    // 跳转订单列表
    turnOrder(type) {
      this.$router.push({ name: "orderlist", params: { type: type } });
    },
    // 获取个人信息
    getUserInfo() {
      this.axios
        .post(
          "https://api.ymduo.com/Member/information",
          Qs.stringify({
            uid: this.uid
          })
        )
        .then(res => {
          // console.log(res);
          this.userInfo = res.data.result.data;
          this.nickValue = res.data.result.data.nickname;
        });
    },
    // 获取订单类型个数接口
    getTypeNum() {
      if (this.$store.state.userToken) {
        this.axios
          .post(
            "https://api.ymduo.com/ordershow/typenum",
            Qs.stringify({ userid: this.uid })
          )
          .then(res => {
            // console.log(res);
            this.orderNum = res.data.result.data;
          });
      }
    },
    // 请求为你推荐商品数据
    getRcommendData() {
      this.$axios({
        method: "post",
        url: "https://api.ymduo.com/Interface/recommendlists",
        data: Qs.stringify({
          pf: 1,
          p: 6
        }),
        timeout: 10000
      }).then(res => {
        this.recommendList = res.data.result.data;
      });
      // 另一套数据接口
      // this.axios({
      //   method: "get",
      //   url: "/recommData",
      //   timeout: 20000
      // }).then(res => {
      //   // console.log(res);
      //   this.recommendList = res.data.data;
      // });
    }
  },
  created() {
    this.getUserInfo();
    this.getTypeNum();
    this.getRcommendData();
  }
};
</script>

<style lang="less" scoped>
.mine {
  width: 100%;
  margin-bottom: 50px;
  .van-nav-bar {
    .van-icon {
      font-size: 24px;
      color: #252525;
    }
  }
  .myHeader-con {
    background-color: #f7f7f7;
    .my-head {
      min-height: 110px;
      padding-top: 25px;
      overflow: hidden;
      box-shadow: 0 2px 4px rgba(228, 57, 60, 0.4);
      border-radius: ~"0 0 300px 300px/0 0 20px 20px";
      background: linear-gradient(90deg, #eb3c3c, #ff7459);
      box-sizing: border-box;
      position: relative;
      .user-info,
      .nologin {
        padding: 0 0 10px 15px;
        display: flex;
        align-items: center;
        .headConf {
          flex-shrink: 0;
          width: 60px;
          height: 60px;
          overflow: hidden;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
          border: 1px solid hsla(0, 0%, 100%, 0.4);
          border-radius: 60px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .nologin-text {
          box-sizing: border-box;
          font-size: 18px;
          font-weight: 600;
          margin-left: 10px;
          color: white;
          padding: 10px 5px;
        }
        .userData {
          flex: 1;
          padding-left: 15px;
          line-height: 1.5;
          .nickname {
            font-size: 14px;
            display: flex;
            color: #fff;
            align-items: center;
            .van-icon {
              margin-left: 10px;
              width: 12px;
              height: 12px;
              color: #000;
              vertical-align: middle;
              background-color: #fff;
              border-radius: 50%;
            }
            .vip {
              position: relative;
              flex-shrink: 0;
              margin: 0 5px 0 20px;
              padding: 0 6px 0 10px;
              height: 16px;
              line-height: 16px;
              vertical-align: middle;
              border-radius: 0 12px 12px 0;
              background-color: #c8483f;
              color: #fff;
              font-size: 10px;
              color: #fff;
              .van-icon {
                position: absolute;
                width: 20px;
                height: 20px;
                left: -20px;
                top: 55%;
                margin-top: -10px;
                background-color: transparent;
                color: #ff0;
              }
            }
            .van-dialog {
              .setInfo {
                margin: 10px 15px;
                .named {
                  display: flex;
                  height: 45px;
                  line-height: 45px;
                  font-size: 14px;
                  border: 1px solid #ccc;
                  p:first-child {
                    min-width: 60px;
                    text-align: center;
                    color: #999;
                    border-right: 1px solid #ccc;
                  }
                  p:last-child {
                    padding-left: 16px;
                    color: #999;
                  }
                }
                .namedMsg {
                  margin: 10px 0 15px;
                  font-size: 12px;
                  color: #999;
                }
                .setNickname {
                  display: flex;
                  height: 45px;
                  line-height: 45px;
                  font-size: 14px;
                  border: 1px solid #ccc;
                  p {
                    min-width: 60px;
                    text-align: center;
                    color: #999;
                    border-right: 1px solid #ccc;
                  }
                }
                .nickMsg {
                  margin: 10px 0 15px;
                  font-size: 12px;
                  color: #999;
                }
              }
            }
          }
          .username {
            color: hsla(0, 0%, 100%, 0.7);
          }
        }
      }
      .user-edit {
        position: absolute;
        right: 15px;
        top: 0;
        height: 40px;
        line-height: 40px;
        overflow: hidden;
        color: rgba(76, 0, 0, 0.7);
        padding-left: 5px;
        .van-icon {
          width: 12px;
          height: 12px;
          position: relative;
          top: 2px;
          right: 5px;
        }
      }
      .plus-tags {
        width: 100%;
        height: 37px;
        box-sizing: border-box;
        padding: 0 20px;
        color: #ffe678;
        .inner {
          width: 100%;
          height: 100%;
          box-sizing: border-box;
          padding: 7px 10px 10px;
          background: url(https://img11.360buyimg.com/jdphoto/s710x134_jfs/t1/43463/14/4447/108469/5cd2c002Ee4dcb4c9/445d4efb8eee08e9.png)
            no-repeat 0 0;
          background-size: 100% 67px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
      }
    }
  }
  .orderdesc,
  .coupons,
  .tools {
    line-height: 44px;
    margin: 15px 0;
    background-color: #fff;
    .van-grid {
      height: 72px;
      .van-grid-item {
        height: 100%;
      }
    }
    &.tools {
      height: 130px;
      line-height: 130px;
      .van-grid {
        height: 65px;
      }
    }
  }
  .coupons {
    .van-grid {
      .van-grid-item {
        .van-grid-item__content {
          div {
            font-size: 10px;
            line-height: 18px;
            height: 18px;
            color: #e93b3d;
            white-space: nowrap;
          }
          span:not(.van-tag) {
            width: 100%;
            text-align: center;
            display: block;
            font-size: 12px;
            color: #666;
            line-height: 34px;
          }
          .van-tag {
            position: absolute;
            top: -3%;
            left: 30%;
            height: 16px;
            line-height: 16px;
            font-size: 12px;
            padding: 0 8px;
            border-radius: 8px;
            border-bottom-left-radius: 0;
            transform: scale(0.8);
            transform-origin: left bottom;
            white-space: nowrap;
            color: #fff;
            z-index: 100;
          }
        }
      }
    }
  }
}
</style>
