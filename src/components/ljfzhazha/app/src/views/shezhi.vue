<template>
  <div class="shezhi">
    <van-nav-bar title="账户设置"
                 left-arrow
                 right-text="···"
                 @click-left="onkkone" />
    <div class="shezhi_max2">
      <p class="shezhi_max2"><span>管理我的账户</span></p>
      <div class="shezhi_max3">
        <div class="shezhi_max3_ch">
          <p>
            <span>当前登录</span>
            <van-radio-group v-model="radio">
              <van-radio name="1"></van-radio>
            </van-radio-group>
          </p>
          <dl>
            <dt><img src="//img11.360buyimg.com/jdphoto/s120x120_jfs/t21160/90/706848746/2813/d1060df5/5b163ef9N4a3d7aa6.png"></dt>
            <dd>jd_1236655556</dd>
            <dd>用户名:jd_565dsdsdd</dd>
          </dl>
        </div>
      </div>
      <p @click="qudizhi"
         class="wodetian">
        <span>收货地址管理</span>
        <span class="fff">{{xiao}}</span>
        <span class="ff">创建第一个收货地址</span>
      </p>
      <p class="wodetian"
         v-for="(item,index) in arr"
         :key="index">
        <span>{{item.neirong}}</span>
        <span class="fff">{{xiao}}</span>
        <span class="ff">{{item.nei}}</span>
      </p>
      <ul class="shezhi_min">
        <li>意见反馈</li>
        <li>京东客户端</li>
        <li @click=" bak">退出登录</li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "shezhi",
  data () {
    return {
      xiao: "›",
      radio: "",
      arr: [

        {
          neirong: " 账户与安全 ",
          nei: " 密码/实名认证等管理 "
        },
        {
          neirong: " 京东支付密码 ",
          nei: "去设置"
        },
        {
          neirong: " 联系客服   ",
          nei: "即时解答用户疑难"
        },
        {
          neirong: "切换站点",
          nei: ""
        }
      ]
    }
  },
  methods: {
    bak () {
      localStorage.token = "";
      this.$router.push("my")
    },
    onkkone () {
      this.$router.push("/loding")
    },
    qudizhi () {
      this.$router.push("/address")
    }
  }

}
</script>
<style scoped>
.shezhi_min {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
  color: #666;
}
.fff {
  font-size: 30px;
  color: #999;
}
.ff,
.fff {
  float: right;
  margin-right: 15px;
}
.wodetian {
  margin: 15px 0 0 0;
}
.shezhi .shezhi_max3 {
  height: 120px;
  width: 100%;
  background: white;
}
.shezhi_max3_ch {
  width: 96%;
  margin-left: 2%;
  background: #fafafa;
  height: 100px;
  border-radius: 20px;
}
.shezhi_max3 p {
  display: flex;
  font-size: 12px;
  color: red;
  height: 34px;
  margin-bottom: 10px;
  width: 95%;
  line-height: 20px;
  background: transparent;
  justify-content: space-between;
  align-items: center;
}
.shezhi_max3 p span {
  display: inline-block;
  height: 20px;
  line-height: 20px;
  padding: 5px;
  border-top-left-radius: 10px;
  border-bottom-right-radius: 10px;
  background: #eee;
}
.van-nav-bar__text {
  font-size: 24px;
}
p {
  height: 44px;
  line-height: 44px;
  font-size: 16px;
  background: white;
}
p span {
  margin-left: 10px;
}
.shezhi {
  height: 100vh;
  background: #fafaea;
}
.shezhi_max3_ch dl {
  width: 70%;
  height: 50%;
  float: left;
  margin-left: 10px;
}
.shezhi_max3_ch dl dt img {
  height: 100%;
}
.shezhi_max3_ch dl dt {
  height: 100%;
  float: left;
  margin-right: 20px;
}
.shezhi_max3_ch dd {
  line-height: 28px;
}
</style>
