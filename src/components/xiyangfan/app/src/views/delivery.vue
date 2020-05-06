<template>
  <div class="dewrap">
    <van-nav-bar
      title="物流信息"
      @click-left="onClickLeft"
      left-text="返回"
      left-arrow
    >
      <template #right>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar>
    <div class="goods" @click="turninfo">
      <img :src="goods_img" alt="" />
      <p>{{ goods_name }}</p>
    </div>
    <div class="goods_status" v-if="staFlag">
      <div>{{ status.sta }}</div>
      <div>{{ status.time }}</div>
    </div>
    <div class="person">快递员：<span>老王</span></div>
    <div class="mylist">
      <van-steps direction="vertical" :active="0">
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
  name: "delivery",
  data() {
    return {
      deinfo: "",
      staFlag: false,
      goods_name: "",
      goods_id: "",
      goods_img: "",
      nu: ""
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    turninfo() {
      //跳转详情
      this.$router.push({ name: "info", params: { pid: this.goods_id } });
    }
  },
  computed: {
    status() {
      var sta = this.deinfo.data[0].context.substr(
        this.deinfo.data[0].context.indexOf("】") == -1
          ? this.deinfo.data[0].context.indexOf("]") + 1
          : this.deinfo.data[0].context.indexOf("】") + 1,
        3
      );
      var time = this.deinfo.data[0].time;
      return {
        sta: sta,
        time: time + " " + sta
      };
    }
  },
  created() {
    console.log();
    this.goods_name = this.$route.params.item.goods[0].goods_name;
    this.goods_img = this.$route.params.item.goods[0].goods_img;
    this.goods_id = this.$route.params.item.goods[0].goods_id;
    if (this.goods_id == "12435") {
      this.nu = "75345308510646";
    } else {
      this.nu = "9784678414209";
    }
    this.axios({
      url: "https://route.showapi.com/64-19",
      method: "post",
      data: this.$qs.stringify({
        showapi_appid: "192824",
        showapi_sign: "359b9c1086d84e5a87b5ac78ee55cb98",
        com: "auto",
        nu: this.nu
      })
    }).then(res => {
      console.log(res);
      this.deinfo = res.data.showapi_res_body;
      this.staFlag = true;
    });
  }
};
</script>

<style lang="less" scoped>
.dewrap {
  padding-bottom: 60px;
}
.goods {
  height: 200px;
  text-align: center;
  img {
    width: 100px;
    height: 100px;
  }
  p {
    line-height: 30px;
  }
}
.goods_status {
  height: 70px;
  background: red;
  color: white;
  font-size: 18px;
  line-height: 30px;
  padding: 0 20px;
  box-sizing: border-box;
}
.person {
  line-height: 50px;
  padding: 0 20px;
  margin: 10px 0;
}
.list_one {
  width: 100%;
  padding: 0 30px;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
  line-height: 120px;
  line-height: 50px;
}
</style>
