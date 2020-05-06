<template>
  <div>
    <van-nav-bar title="京东登录注册"
                 left-text=""
                 left-arrow
                 @click-left="onClickLeft" />
    <div class="pad">
      <div>

        <van-field v-model="value2"
                   clearable
                   label="+86"
                   placeholder="请输入手机号" />
      </div>
      <van-field v-model="sms"
                 clearable
                 center
                 placeholder="请输入短信验证码">
        <template #button>
          <span class="yan">获取验证码</span>
        </template>
      </van-field>

      <button class="bu"
              @click="lod">登录</button>
      <button class="but"
              @click="zhuce">一键注册</button>
      <div class="fff">
        <span>账号密码登录</span>
        <span class="ff">手机快速注册</span>
      </div>
      <div class="ffl">
        <div></div>
        <span>其他登录方式</span>
        <div></div>
      </div>
      <div class="ic">
        <dl>
          <dt>
            <van-icon name="cluster-o" /></dt>
          <dd>QQ</dd>
        </dl>
        <dl>
          <dt>
            <van-icon name="friends-o" /></dt>
          <dd>微信</dd>
        </dl>
        <dl>
          <dt>
            <van-icon name="manager-o" /></dt>
          <dd>苹果</dd>
        </dl>

      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "my",
  data () {
    return {
      value2: "",
      sms: "",
    }
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    lod () {
      this.axios.post("/api/login", { username: this.value2, password: this.sms }).then(res => {
        console.log(res);
        if (res.data.code == 200) {
          this.$Toast.success('登录成功');
          localStorage.token = res.data.token;
          this.$router.push({ name: "loding", params: { id: res.data.info._id } })
        } else {
          this.$Toast.fail('账号或密码错误');
        }
      })
    },
    zhuce () {
      this.axios.post("/api/register", { username: this.value2, password: this.sms }).then(res => {
        if (res.data.code == 200) {
          this.$Toast.success('注册成功');
        } else {
          this.$Toast.fail('注册失败');
        }
      })
    }


  },
  created () {
    if (localStorage.token) {
      this.$router.push("/loding")
    }
  }
}
</script>
<style scoped>
.van-nav-bar .van-ellipsis {
  font-size: 17px;
}
.van-nav-bar .van-icon {
  font-size: 20px;
  color: #333;
}
.van-cell {
  margin-top: 20px;
  font-size: 16px;
  border-bottom: solid 1px #dddddd;
}
.pad {
  width: 90%;
  margin-left: 5%;
}
.yan {
  color: #999;
  padding-left: 30px;
  display: inline-block;
  height: 22px;
  border-left: solid 1px #999;
  line-height: 22px;
}
.bu,
.but {
  width: 100%;
  height: 50px;
  margin-top: 16px;
  border-radius: 50px;
  font-size: 16px;
}
.bu {
  color: white;
  background: #cca;
}
.but {
  background: white;
  border: solid 1px red;
  color: red;
}
.ff {
  float: right;
}
.fff {
  margin: 20px 0 0 0;
  font-size: 14px;
  color: #999;
}
.ffl {
  display: flex;
  justify-content: space-between;
  margin-top: 100px;
  align-items: center;
  color: #bbb;
}
.ffl div {
  border-top: solid 1px #ddd;
  height: 0px;
  width: 30%;
}
.ic {
  font-size: 30px;
  display: flex;
  justify-content: space-around;
  text-align: center;
  margin-top: 30px;
}
.ic dl dd {
  font-size: 20px;
  margin-top: 10px;
}
</style>
