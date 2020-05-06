<template>
  <div>
    <my-header message="邀请有礼" :showRule="1" :isindex="true" ></my-header>
    <div class="invitation">
      <div class="cont">
        <img src="../../../assets/img/integral/bianzu3.png" alt />
        <img src="../../../assets/img/integral/bianzu4.png" alt />
        <div class="wrap">
          <countZero
            class="count_down"
            ref="countZero"
            :countDownTime="defaulted"
            @countDownEnd="countDownEnd"
          ></countZero>
        </div>
        <img src="../../../assets/img/integral/bianzu5.png" alt />
        <img src="../../../assets/img/integral/bianzu3.png" alt />
        <div class="earned">
          <span class="integral_one">{{totalIntegral}}</span>
          <br />
          <span class="integral_two">已获得积分</span>
        </div>
        <div class="inviteBtn">
          <button class="inviteInvitation" @click="callFor">立即邀请好友</button>
        </div>
      </div>
      <div class="awards">
        <p class="title">已获奖励</p>
        <p class="inviter">已成功邀请{{people}}人,您获得{{totalIntegral}}积分</p>
        <ul class="price">
          <li v-for="(item, index) in newArr" :key="index">
            <img class="head-img" :src="item.headImage" alt />
            <div class="right">
              <p>
                <span>{{item.phone}}</span>
                <span>{{item.createTime}}</span>
              </p>
              <p class="intro">{{item.intro}}</p>
            </div>
          </li>
        </ul>
      </div>
      <div class="frame">
        <div class="regulations">
          <p class="title">活动细则</p>
          <p class="nts">1.推荐的新用户输入手机号，即可获赠3积分；</p>
          <p class="nts">2.您推荐的新用户只要产生消费，您即获得一 张免费得游泳体验券，体验券有效期为1个月；</p>
          <p class="nts">3.您推荐得新用户同一个设备，同一个手机号 码仅可领取一次；</p>
          <p class="nts">4.您邀请好友所获赠的体验券仅限本人使用， 用于商业牟利将有封号风险。</p>
        </div>
      </div>
      <div class="ending">本次活动最终解释权归婴联帮所有</div>
    </div>
  </div>
</template>

<script>
import myHeader from "./components/header";
import countZero from "./components/countDown";
import api from "@/api";
import util from "@/utils";
export default {
  components: {
    countZero,
    myHeader
  },
  data() {
    return {
      
      token: "SEhULVNFQ1RFVDoxNTczMDI4NTA0OmZiOTIyZTQ5NjE1OTQxODNhOWY2N2U3M2FhM2IzY2Qw",
      companyId: "",
      activityId: 'ddd6ed25cebc4fddb9213006a97e9bab',
      title: "【宝贝游吧】送你30元红包",
      content: "新人点击有惊喜奥，大额红包卷免费游泳卷~",
      defaulted: "2019/11/08 23:59:59", // 倒计时时间
      people: "", // 邀请人数
      totalIntegral: "", // 邀请人数获得积分 / 总获得积分
      obj : {
        headImage: "https://www.google.com/search?q=%E5%9B%BE%E7%89%87&tbm=isch&source=iu&ictx=1&fir=vQjlM9KtkGsb_M%253A%252CJeaDEV9l4RQZhM%252C_&vet=1&usg=AI4_-kSA-VL2XZ_8hjhhKJBNbxX7s4O8Kg&sa=X&ved=2ahUKEwj8tqLZ7-HlAhV7yIsBHToaDmwQ9QEwAHoECAcQBA#imgrc=vQjlM9KtkGsb_M:", // 头像
        phone: "",
        createTime: "",
        intro: "成功注册* 送您3积分，一张游泳体验券",
      },
      newArr: [],
      getedPrice: [
        {
          headImage: "https://www.google.com/search?q=%E5%9B%BE%E7%89%87&tbm=isch&source=iu&ictx=1&fir=vQjlM9KtkGsb_M%253A%252CJeaDEV9l4RQZhM%252C_&vet=1&usg=AI4_-kSA-VL2XZ_8hjhhKJBNbxX7s4O8Kg&sa=X&ved=2ahUKEwj8tqLZ7-HlAhV7yIsBHToaDmwQ9QEwAHoECAcQBA#imgrc=vQjlM9KtkGsb_M:", // 头像
          phone: '1234', // 被邀请者手机号
          createTime: '1234567890000', // 邀请日期
          intro: "成功注册* 送您3积分，一张游泳体验券",
        },
        {
          headImage: "https://www.google.com/search?q=%E5%9B%BE%E7%89%87&tbm=isch&source=iu&ictx=1&fir=vQjlM9KtkGsb_M%253A%252CJeaDEV9l4RQZhM%252C_&vet=1&usg=AI4_-kSA-VL2XZ_8hjhhKJBNbxX7s4O8Kg&sa=X&ved=2ahUKEwj8tqLZ7-HlAhV7yIsBHToaDmwQ9QEwAHoECAcQBA#imgrc=vQjlM9KtkGsb_M:", // 头像
          phone: '1324', // 被邀请者手机号
          createTime: '1234567890000', // 邀请日期
          intro: "成功注册* 送您3积分，一张游泳体验券",
        },
        {
          headImage: "https://www.google.com/search?q=%E5%9B%BE%E7%89%87&tbm=isch&source=iu&ictx=1&fir=vQjlM9KtkGsb_M%253A%252CJeaDEV9l4RQZhM%252C_&vet=1&usg=AI4_-kSA-VL2XZ_8hjhhKJBNbxX7s4O8Kg&sa=X&ved=2ahUKEwj8tqLZ7-HlAhV7yIsBHToaDmwQ9QEwAHoECAcQBA#imgrc=vQjlM9KtkGsb_M:", // 头像
          phone: '1324', // 被邀请者手机号
          createTime: '1234567890000', // 邀请日期
          intro: "成功注册* 送您3积分，一张游泳体验券",
        },
      ], // 数据
      headImage: "", // 头像
      phone: '', // 被邀请者手机号
      createTime: '', // 邀请日期
      intro: "成功注册* 送您3积分，一张游泳体验券", 
    };
  },
  created() {
    this.getCountDrow();
    // this.token = util.getQuery('matchId') // 伪装的名称实际是token
    this.companyId = util.getQuery('companyId')
  },
  mounted() {
    //  this.acquisition();
     this.wonAwards()
     this.fn()
     this.reversedMessage()
  },
  computed: {
    },
  methods: {
    // reversedMessage (createTime) {
    //       // uitl.foryear(parseInt(time))
    //   return util.foryear(parseInt(createTime))
    // },
    fn() {
       console.log("obj:",this.obj)
       this.getedPrice.forEach((item,index) =>{
         console.log("item:",item)
        this.obj.phone =item.phone;
        console.log("this.obj.phone:",this.obj.phone)
        this.obj.createTime = util.foryear(item.createTime);
        console.log("this.obj.createTime:",this.obj.createTime)
        this.newArr.push(this.obj);
        console.log("this.newArr:",this.newArr)
      })
    },
    countDownEnd() {
      //倒计时结束
      console.log("倒计时结束了", arguments);
      this.$refs["countZero"].cdEndConShow = true;
    },
    getCountDrow() {
      // 倒计时
      let times = {
        activityId: this.activityId
      }
      console.log("执行了getCountDown");
      this.$ajax.post(api.getBaseMarketActivity, times).then(res => {
           this.defaulted = res.data.data.activityEndTimeStr
         
           console.log("this.defaulted:",this.defaulted)
      })
    },
    callFor() {
      // 立即邀请好友
      let obj = {
        title: this.title,
        content: this.content,
        shareUrl: 'http://test.mumzone.cn:94/#/newGiftBag'
      }
      var u = navigator.userAgent;
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1; //android终端或者uc浏览器
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isAndroid) {
        // goShare方法名称
         window.android.goShare(this.title,this.content,this.shareUrl);
      } else {
         window.webkit.messageHandlers.goShare.postMessage(obj);
      }
     
    },
    // acquisition() {
    //   // 获取token
    //   var u = navigator.userAgent;
    //   var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1; //android终端或者uc浏览器
    //   var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    //   if (isAndroid) {
    //     this.token = window.android.getToken();
    //   } else {
    //     this.token = window.webkit.messageHandlers.getToken.postMessage(""); //getToken安卓中定义好的方法,data字符串数据
    //     window.getTokenMethod = this.getTokenMethod;
    //   }
    // },
    // getTokenMethod(value) {
    //   this.token = "9999";
    //   this.token = value;
    // },
    wonAwards() {
      // 已获奖励
      let user = {
        token: this.token
      };
      console.log("user:",user)
      this.$ajax.post(api.getInvitationList, user).then(res => {
        this.people = res.data.data.num
        this.totalIntegral = res.data.data.totalIntegral
        this.getedPrice = res.data.data.list
        this.getedPrice.forEach((item,index) => {
          this.phone = item.phone
          this.createTime = util.foryear(item.createTime)
        })
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.invitation {
  box-sizing: border-box;
  overflow: hidden;
  margin-top: 110px;
  background: url("../../../assets/img/integral/5d86d0f2ae3ed.png") no-repeat;
  background-size: 100% auto;
  .cont {
    width: 730px;
    margin: auto;
    position: relative;
    img:nth-of-type(1) {
      width: 656px;
      margin-top: 101px;
      margin-left: 37px;
    }
    img:nth-of-type(2) {
      width: 620px;
      margin-top: 40px;
      margin-left: 45px;
    }
    img:nth-of-type(3) {
      width: 730px;
      display: block;
    }
    img:nth-of-type(4) {
      width: 438px;
      position: absolute;
      top: 810px;
      left: 170px;
    }
    .earned {
      position: absolute;
      top: 940px;
      left: 320px;
      .integral_one {
        display: inline-block;
        width: 140px;
        text-align: center;
        font-size: 80px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(234, 114, 0, 1);
      }
      .integral_two {
        margin-left: 10px;
        text-align: center;
        font-size: 24px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(201, 135, 0, 1);
      }
    }
    .wrap {
      margin-top: 50px;
      margin-left: 60px;
      width: 700px;
      .b {
        color: orange;
      }
      span {
        display: inline-block;
        width: 56px;
        height: 78px;
        background: rgba(253, 197, 46, 1);
        border-radius: 10px;
        line-height: 78px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(59, 21, 118, 1);
        text-align: center;
        font-size: 36px;
      }
    }
    .inviteBtn {
      margin: 40px 23px 0;
      button {
        line-height: 50px;
        outline: none;
        border: none;
        padding: 23px 0;
        background: linear-gradient(
          180deg,
          rgba(250, 226, 115, 1) 0%,
          rgba(255, 190, 29, 1) 100%
        );
        box-shadow: 0px 6px 20px 0px rgba(255, 189, 37, 0.64);
        border-radius: 48px;
        font-size: 36px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(120, 18, 0, 1);
        display: block;
        width: 688px;
      }
    }
  }
  .awards {
    margin: 70px auto;
    width: 665px;
    height: 428px;
    background: #fdc52e;
    border-radius: 25px;
    background-size: 100% 100%;
    .title {
      font-size: 36px;
      color: #781200;
      text-align: center;
      padding: 20px 0 28px 0;
      font-weight: 600;
    }
    .inviter {
      font-size: 26px;
      text-align: center;
      color: #ef4d2f;
    }
    .price {
      height: 300px;
      overflow-y: scroll;
      li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 45px;
        margin-top: 24px;
        // margin-bottom: 36px;
      }
      .head-img {
        width: 78px;
        height: 78px;
        border-radius: 50%;
        margin-right: 16px;
      }
      .right {
        width: 494px;
        p {
          margin: 0;
          line-height: 1;
          padding: 0 10px;
          &:first-child {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 8px;
          }
          &:last-child {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
  }
  .frame {
    width: 665px;
    height: 520px;
    border: solid 15px #6a1d7f;
    border-radius: 30px;
    margin: auto;
    .regulations {
      width: 665px;
      height: 520px;
      background: #fdc52e;
      border-radius: 20px;
      background-size: 100% 100%;
      .title {
        font-size: 36px;
        color: #781200;
        text-align: center;
        padding: 20px 0 28px 0;
        font-weight: 600;
      }
      .nts {
        padding: 0 20px 20px 30px;
        color: #781200;
        font-size: 30px;
        font-weight: 400;
        line-height: 40px;
      }
    }
  }
  .ending {
    padding: 25px 0;
    color: #6a1d7f;
    font-size: 28px;
    text-align: center;
  }
}
</style>
<style>
.invitation {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Chrome/Safari/Opera */
  -khtml-user-select: none; /* Konqueror */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently not supported by any browser */
}
</style>