<template>
  <div>
    <van-nav-bar
      title="查询物流"
      left-text="返回"
      right-text="按钮"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    >
      <template #right>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar>
    <van-field v-model="text" label="物流" placeholder="请输入物流名称" />
    <van-field v-model="nu" label="订单编号" placeholder="请输入编号" />

    <van-field v-model="reqtel" type="tel" label="手机号" placeholder="请输入发件人手机号" />
    <van-field v-model="restel" type="tel" label="手机号" placeholder="请输入收件人手机号" />
    <br />
    <br />
    <div style="padding:0 10px">
      <van-button type="primary" block @click="getOrderAddress">查询</van-button>
    </div>
    <div class="mylist">
      <van-steps direction="vertical" :active="active">
        <van-step v-for="(item, index) in deinfo.data" :key="index">
          <h3>{{ item.context }}</h3>
          <p>{{ item.time }}</p>
        </van-step>
      </van-steps>
    </div>
  </div>
</template>
<script>
export default {
  name: "orderAddress",
  data() {
    return {
      deinfo: "",
      text: "",
      reqtel: "",
      restel: "",
      active: 0,
      nu: ""
    };
  },
  created() {},
  mounted() {
    this.getOrderAddress();
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight() {
      console.log("啥也没有");
    },
    getOrderAddress() {
      console.log(this.nu);
      this.axios({
        url: "https://route.showapi.com/64-19",
        method: "post",
        data: this.$qs.stringify({
          showapi_appid: "197135", //应用id
          showapi_sign: "5ab61a19f81c47e287e55fc9b3597f40", //秘钥
          com: "auto", //物流代号  zhongtong
          nu: this.nu //订单号
        })
      }).then(res => {
        console.log(res);
        this.deinfo = res.data.showapi_res_body;
        this.staFlag = true;
      });
    }
  }
};
</script>

<style lang="less" scoped>
</style>