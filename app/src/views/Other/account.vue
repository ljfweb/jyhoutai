<template>
  <div class="account">
    <!-- 账户设置 -->
    <!-- 头部导航 -->
    <van-sticky>
      <headerBar :ishead="showHead" :title="myTitle"></headerBar>
    </van-sticky>
    <!-- 设置头部的标签 -->
    <div class="account-top">
      <div class="account-main">
        <div>管理我的账户</div>
        <div class="account-user">
          <div class="user-one">
            <div class="user-info">
              <img
                src="//img11.360buyimg.com/jdphoto/s120x120_jfs/t21160/90/706848746/2813/d1060df5/5b163ef9N4a3d7aa6.png"
                alt=""
              />
              <div class="user-detail">
                <p>{{ userInfo.nickname }}</p>
                <p>用户名: {{ userInfo.name }}</p>
              </div>
            </div>
            <span>当前登录</span><i></i><i></i>
          </div>
        </div>
      </div>
    </div>
    <!-- 中间功能模块 -->
    <div class="account-manage">
      <div class="item">
        <van-cell
          title="收货地址管理"
          value="管理我的地址"
          is-link
          @click="turnAddressList"
        />
      </div>
    </div>
    <div class="account-manage">
      <div class="item">
        <van-cell
          @click="$toast('密码/实名认证等管理')"
          title="账户与安全"
          value="密码/实名认证等管理"
          is-link
        />
        <van-cell
          @click="$toast('京东支付密码设置')"
          title="京东支付密码"
          value="去设置"
          is-link
        />
      </div>
    </div>
    <div class="account-manage">
      <div class="item">
        <van-cell
          @click="$toast('联系客服')"
          title="联系客服"
          value="即时解答用户疑惑"
          is-link
        />
        <van-cell @click="$toast('站点切换')" title="站点切换" is-link />
        <van-cell
          @click="$toast('京东APP 版本 V8.0.0')"
          title="关于京东APP"
          value="当前版本 V8.0.0"
          is-link
        />
        <van-switch-cell
          v-model="newschecked"
          title="消息推送"
          @change="changNews"
        />
      </div>
    </div>
    <!-- 底部退出登录按钮 -->
    <div class="account-bottom">
      <van-grid column-num="3" icon-size="18px">
        <van-grid-item
          icon="//img13.360buyimg.com/jdphoto/jfs/t9715/362/323851365/1279/81de6d72/59cc5903N7d14ca0e.png"
          text="意见反馈"
          @click="$toast('意见反馈')"
        />
        <van-grid-item
          icon="//img12.360buyimg.com/jdphoto/jfs/t9196/304/2362310772/2730/775aea35/59cc5931Nd495934f.png"
          text="京东客户端"
          @click="$toast('京东客户端')"
        />
        <van-grid-item
          icon="//img10.360buyimg.com/jdphoto/jfs/t9052/339/2338090052/1443/912da0a4/59cc5951N10f8f9b3.png"
          text="退出登录"
          @click="onQuit"
        />
      </van-grid>
    </div>
    <!-- 顶部logo -->
    <van-divider
      dashed
      :style="{ color: '#e51d1a', borderColor: '#1989fa', padding: '0 16px' }"
    >
      <i class="my-iconfont iconzhifu-jingdong"></i>
      <i class="my-iconfont iconjingdong"></i>
    </van-divider>
  </div>
</template>

<script>
import Qs from "qs";
import headerBar from "components/headerBar"; //引入头部导航
import { mapMutations } from "vuex";
export default {
  name: "account",
  components: {
    headerBar
  },
  data() {
    return {
      uid: 956538, //用户登录id
      userInfo: {}, //用户信息
      showHead: true,
      myTitle: "账户设置",
      newschecked: true //消息推送
    };
  },
  methods: {
    // 退出登录
    ...mapMutations(["singOut"]),
    turnAddressList() {
      this.$toast.loading({
        message: "请求加载中...",
        forbidClick: true,
        loadingType: "spinner"
      });
      setTimeout(() => {
        this.$toast.clear();
        this.$router.push("/addresslist");
      }, 200);
    },
    changNews() {
      if (this.newschecked) {
        this.$toast("已开启信息推送");
      } else {
        this.$toast("已关闭信息推送");
      }
    },
    // 退出登录
    onQuit() {
      this.$dialog
        .confirm({
          title: "确定要退出登录么?"
        })
        .then(() => {
          this.$toast("退出成功");
          this.singOut();
          this.$store.dispatch("setMyIsLogin", "");
          this.$store.dispatch("setUserToken", "");
          sessionStorage.clear();
          this.$router.back();
        })
        .catch(() => {
          // on cancel
        });
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
          this.userInfo = res.data.result.data;
        });
    }
  },
  created() {
    this.getUserInfo();
  }
};
</script>

<style lang="less" scoped>
.account {
  width: 100%;
  line-height: 1.5;
  font-size: 14px;
  .account-top {
    color: #666;
    .account-main {
      background: #fff;
      padding: 12px 10px 0;
      margin-bottom: 15px;
      border-radius: 0 0 10px 10px;
      div:first-child {
        font-size: 16px;
        color: #333;
      }
      .account-user {
        margin: 0;
        padding: 2px 0 15px;
        .user-one {
          position: relative;
          background: #fff9f9;
          height: 95px;
          padding: 35px 15px 15px;
          border-radius: 10px;
          margin-top: 10px;
          box-sizing: border-box;
          overflow: hidden;
          font-size: 12px;
          color: #999;
          line-height: 1.8em;
          .user-info {
            display: flex;
            img {
              width: 45px;
              height: 45px;
              margin-right: 10px;
              border-radius: 100%;
              vertical-align: top;
            }
            .user-detail {
              font-size: 12px;
              p:first-child {
                padding: 4px 0 1px;
                color: #333;
                margin-right: 5px;
                margin-bottom: 2px;
              }
              p:last-child {
                margin-top: -2px;
                opacity: 0.7;
              }
            }
          }
          span {
            position: absolute;
            left: 0;
            top: 0;
            padding: 1px 10px;
            background-color: #ffe4e4;
            color: #e2231a;
            border-top-left-radius: 10px;
            border-bottom-right-radius: 10px;
          }
          i:first-of-type {
            display: block;
            position: absolute;
            width: 52px;
            height: 52px;
            top: -25px;
            right: -23px;
            border-radius: 100%;
            background-color: #ffa9a9;
            opacity: 0.3;
          }
          i:last-of-type {
            display: block;
            position: absolute;
            top: 6px;
            right: 16px;
            width: 13px;
            height: 13px;
            background: transparent;
            border-radius: 100%;
            border: 2px solid #ffa9a9;
            opacity: 0.3;
          }
        }
      }
    }
  }
  .account-manage {
    margin-bottom: 15px;
    box-sizing: border-box;
    .item {
      border-radius: 10px;
      background: #fff;
      .van-cell {
        border-radius: 20%;
        height: 44px;
        line-height: 44px;
        margin-left: 10px;
        padding: 0 30px 0 0;
        font-size: 16px;
        color: #333;
        .van-cell__value {
          font-size: 12px;
          color: #999;
        }
        .van-icon-arrow {
          position: absolute;
          right: 15px;
          top: 50%;
          color: #999;
          transform: translateY(-50%);
        }
      }
    }
  }
  .account-bottom {
    margin-top: 10px;
  }
  .van-divider {
    margin-top: 30px;
    i {
      font-size: 40px;
    }
  }
}
</style>
