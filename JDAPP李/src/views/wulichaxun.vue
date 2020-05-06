<template>
  <div>
    <van-nav-bar title="物流查询" left-arrow @click-left="$router.go(-1)" />
    <van-notice-bar
      :text="warningMessage"
      left-icon="volume-o"
      v-if="warningMessage ? true : false"
    />
    <van-cell-group>
      <van-field
        v-model="wuliSearch.wuliuname"
        placeholder="请输入物流名称(如：zhongtong)"
      />
      <van-field
        v-model="wuliSearch.wuliudanhao"
        placeholder="请输入物流单号"
      />
      <van-field
        v-model="wuliSearch.fajiapnoe"
        placeholder="请输入发件手机号"
      />
      <van-field
        v-model="wuliSearch.jieshouphone"
        placeholder="请输入收件手机号"
      />
    </van-cell-group>
    <van-row type="flex" justify="center" style="margin-top: 5px;">
      <van-col :span="24">
        <van-button
          type="primary"
          round
          style="width: 100%;"
          @click="recivedInfoMations"
          >查询</van-button
        >
      </van-col>
    </van-row>
    <!-- 查询数据 -->
    <van-card
      v-if="warningMessage ? true : false"
      :price="'客服电话：' + recivedMailMessage.kefuPhone"
      :desc="'物流单号：' + recivedMailMessage.mailNum"
      title="物流公司详情"
      :thumb="recivedMailMessage.logo"
    />
    <van-steps direction="vertical" :active="0" style="padding-top: 20px;">
      <van-step v-for="(item, index) in showInfo" :key="index">
        <h3>{{ item.context }}</h3>
        <p>{{ item.time }}</p>
      </van-step>
    </van-steps>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      wuliSearch: {
        wuliuname: "",
        wuliudanhao: "",
        fajiapnoe: "",
        jieshouphone: ""
      },
      showInfo: [],
      warningMessage: "",
      recivedMailMessage: {
        logo: "",
        mailNum: "",
        kefuPhone: ""
      }
    };
  },
  methods: {
    formatterDateTime() {
      var date = new Date();
      var month = date.getMonth() + 1;
      var datetime =
        date.getFullYear() +
        "" + // "年"
        (month >= 10 ? month : "0" + month) +
        "" + // "月"
        (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) +
        "" +
        (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) +
        "" +
        (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
        "" +
        (date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds());
      return datetime;
    },
    async recivedInfoMations() {
      //查询按钮
      console.log(this.formatterDateTime());
      const { data: res } = await this.axios({
        url: "http://route.showapi.com/64-19",
        method: "post",
        data: this.$qs.stringify({
          showapi_timestamp: this.formatterDateTime(),
          showapi_appid: "195157", //这里需要改成自己的appid
          showapi_sign: "b490397d79a740759921f525dae61067", //这里需要改成自己的应用的密钥secret
          com: this.wuliSearch.wuliuname ? this.wuliSearch.wuliuname : "auto",
          nu: this.wuliSearch.wuliudanhao
            ? this.wuliuSearch.wuliuname
            : "75344767021063",
          senderPhone: this.wuliSearch.fajiapnoe,
          receiverPhone: this.wuliSearch.jieshouphone
        })
      });
      console.log(res);
      this.showInfo = res.showapi_res_body.data;
      this.warningMessage = res.showapi_res_body.upgrade_info;
      this.recivedMailMessage.logo = res.showapi_res_body.logo;
      this.recivedMailMessage.mailNum = res.showapi_res_body.mailNo;
      this.recivedMailMessage.kefuPhone = res.showapi_res_body.tel;
    }
  }
};
</script>
<style scoped></style>
