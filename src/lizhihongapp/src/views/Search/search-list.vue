<template>
  <div class="searchList">
    <!-- 头部搜索栏 -->
    <search-nav ref="container"></search-nav>
    <van-sticky>
      <van-dropdown-menu>
        <van-dropdown-item v-model="value1" :options="option1" />
        <van-dropdown-item
          @change="onChange"
          v-model="value2"
          :options="option2"
        />
      </van-dropdown-menu>
    </van-sticky>
    <!-- 列表数据 -->
    <div class="search-contain">
      <van-card
        v-for="(item, index) in shopList"
        :key="index"
        :price="item.price"
        :origin-price="item.old_price"
        :title="item.goods_name"
        :thumb="item.image"
        @click="toDetail(item.goods_id)"
      >
        <template #num> 已售{{ item.pay_num }}件 </template>
        <template #tags>
          <van-tag
            color="#ff3574"
            v-if="item.freight_type == '1' ? true : false"
            >包邮</van-tag
          >
          <van-tag
            color="#ff3574"
            v-if="
              item.is_self == '0' ? (item.is_vip <= '2' ? true : false) : false
            "
            >自营</van-tag
          >
        </template>
      </van-card>
    </div>
    <!-- 分页器 -->
    <van-pagination
      v-model="currentPage"
      :page-count="totalPages"
      mode="simple"
      @change="onPageChange"
    />
  </div>
</template>

<script>
import SearchNav from "./search";
import Qs from "qs";
export default {
  name: "searchList",
  components: {
    SearchNav
  },
  data() {
    return {
      value1: 0,
      value2: "a",
      option1: [
        { text: "全部商品", value: 0 },
        { text: "新款商品", value: 1 },
        { text: "活动商品", value: 2 }
      ],
      option2: [
        { text: "默认排序", value: "a" },
        { text: "价格最低", value: "b" },
        { text: "价格最高", value: "c" },
        { text: "销量最低", value: "d" },
        { text: "销量最高", value: "e" }
      ],
      shopList: [],
      currentPage: 1,
      totalPages: 1,
      cid: "" //分类列表传来的id
    };
  },
  methods: {
    onChange(val) {
      if (val == "b" || val == "d") {
        this.order = 4;
        this.setData();
      } else if (val == "c") {
        this.order = 3;
        this.setData();
      } else if (val == "e") {
        this.getData();
      }
    },
    // 分页器页面改变
    onPageChange(page) {
      this.currentPage = page;
      this.setData();
    },
    toDetail(id) {
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
            goods_id: id
          }
        });
      }, 500);
    },
    setData() {
      //通过传来的数据请求接口
      let obj = this.$route.query;
      let myUrl;
      let params;
      if ("keywords" in obj) {
        myUrl = myUrl = "https://api.ymduo.com/search/index";
        params = Qs.stringify({
          keywords: this.$route.query.keywords,
          order: this.order,
          p: this.currentPage
        });
      } else {
        //否则 "category_id" in obj
        myUrl = myUrl = "https://api.ymduo.com/category/goodsList";
        params = Qs.stringify({
          category_id: this.$route.query.category_id,
          order: this.order,
          p: this.currentPage
        });
      }
      this.axios({
        method: "post",
        url: myUrl,
        data: params,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        timeout: 10000
      }).then(res => {
        console.log(res);
        this.shopList = res.data.result.data;
        this.totalPages = res.data.result.pages;
        // console.log(this.shopList);
      });
    },
    getData() {
      // console.log(this.$route.query);
      let obj = this.$route.query;
      let myUrl;
      if ("keywords" in obj) {
        myUrl = "https://api.ymduo.com/search/index";
      } else {
        myUrl = "https://api.ymduo.com/category/goodsList";
      }
      const params = Qs.stringify(this.$route.query);
      this.axios({
        method: "post",
        url: myUrl,
        data: params,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        timeout: 10000
      }).then(res => {
        this.shopList = res.data.result.data;
        this.totalPages = res.data.result.pages;
        // console.log(this.shopList);
      });
    }
  },
  mounted() {
    // this.setData();
    this.$refs.container._data.hasCon = false;
    this.getData();
  }
};
</script>

<style lang="less" scoped>
.searchList {
  width: 100%;
  background-color: #fff;
  padding-bottom: 20px;
  .van-dropdown-menu {
    .van-dropdown-menu__title--active {
      color: #ff4142;
    }
  }

  .search-contain {
    background-color: #fff;
    .van-tag {
      margin: 5px 10px 0 0;
    }
    .van-card__price {
      color: #e93b3d;
    }
  }
}
</style>
