<template>
  <div class="addresslist">
    <!-- 头部导航 -->
    <van-sticky>
      <headerBar
        :ishead="showHead"
        :title="myTitle"
        :hascontainer="showMore"
      ></headerBar>
    </van-sticky>
    <!-- 地址列表区域 -->
    <van-address-list
      v-model="chosenAddressId"
      :list="list"
      :disabled-list="disabledList"
      :switchable="false"
      disabled-text="以下地址超出配送范围"
      default-tag-text="默认"
      add-button-text="新增收货地址"
      @add="onAdd"
      @edit="onEdit"
      @click-item="onSelect"
    />
  </div>
</template>

<script>
import Qs from "qs";
import headerBar from "components/headerBar"; //引入头部导航
export default {
  name: "addresslist",
  components: {
    headerBar
  },
  data() {
    return {
      uid: 956538, //用户登录携带的id
      showHead: true, //显示哪种头部导航
      myTitle: "收货地址", //导航栏标题
      showMore: true, //是否显示三个点
      chosenAddressId: "1",
      cartId: 0, //购物车商品id
      list: [
        {
          id: "1",
          name: "张三",
          tel: "13000000000",
          address: "浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室"
        }
      ],
      disabledList: [
        {
          id: "3",
          name: "王五",
          tel: "1320000000",
          address: "浙江省杭州市滨江区江南大道 15 号"
        }
      ]
    };
  },
  methods: {
    onAdd() {
      this.$router.push("/addressadd");
    },
    onEdit(item) {
      // console.log(item);
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true
      });
      //路由跳转到编辑页面
      setTimeout(() => {
        this.$toast.clear();
        this.$router.push({ name: "addressedit", params: { id: item.id } });
      }, 500);
    },
    // 选中地址添加进提交订单页面
    onSelect(item) {
      this.$toast.loading({
        forbidClick: true
      });
      //路由跳转到编辑页面
      setTimeout(() => {
        this.$toast.clear();
        this.$store.dispatch("setAddressInfo", item);
        this.$router.push({ name: "submitorder", query: { id: this.cartId } });
      }, 300);
    },
    // 获取地址列表
    getAddressList() {
      this.axios
        .post(
          "https://api.ymduo.com/Address/addresslists",
          Qs.stringify({
            uid: this.uid
          })
        )
        .then(res => {
          // console.log(res);
          const myData = res.data.result.data;
          this.list = myData.map(item => {
            let isFlag = "";
            if (item.def == "1") {
              isFlag = true;
            } else {
              isFlag = false;
            }
            let Address = item.site + item.address;
            return {
              id: item.id,
              name: item.name,
              tel: item.phone,
              address: Address,
              site: item.site,
              isDefault: isFlag
            };
          });
        });
    }
  },
  created() {
    // 接受传来的id
    this.cartId = this.$route.query.id;
    this.getAddressList();
  }
};
</script>

<style lang="less" scoped>
.addresslist {
  width: 100%;
  .van-address-item__name {
    font-weight: bold;
  }
  .van-button__text {
    font-size: 16px;
    letter-spacing: 3px;
    font-weight: 600;
  }
}
</style>
