<template>
  <div class="layout-container">
    <div class="nave" fixed>
      <template fixed>
        <router-link :to="{ name: 'home' }">
          <van-icon name="arrow-left" size="20" class="navs" />
        </router-link>
        <form action="/">
          <van-search
            v-model="value"
            show-action
            placeholder="请输入搜索关键词"
            @search="onSearch"
            @cancel="onCancel"
          />
        </form>
      </template>
    </div>

    <div class="tips" v-if="!ishow">
      <div class="zuijin">
        <span>最近搜索</span>
        <van-icon size="30" name="delete" @click="clearlist" />
      </div>
      <van-tag
        color="#ccc"
        v-for="(item, index) in loca_list"
        :key="index"
        @click="getmylist(item)"
        type="primary"
      >{{ item }}</van-tag>
      <!-- 热门搜搜 -->
    </div>
    <search-com v-if="ishow" @redata="getData" :keywords="vals" :relist="relists"></search-com>
  </div>
</template>
<script>
import { Notify } from "vant";
import { Toast } from "vant";
import searchCom from "./searchcom";

export default {
  name: "searchlist",
  data() {
    return {
      activeKey: 0,
      relist: [],
      value1: 0,
      value2: "a",
      value3: "a",
      option1: [
        { text: "全部商品", value: 0 },
        { text: "新款商品", value: 1 },
        { text: "活动商品", value: 2 }
      ],
      option2: [
        { text: "默认排序", value: "a" },
        { text: "好评排序", value: "b" },
        { text: "销量排序", value: "c" }
      ],
      option3: [{ text: "销量", value: "a" }],
      value: "",
      vals: "",
      noData: [1],
      relists: [],
      page: 1,
      ishow: false,
      show: false,
      loca_list: []
    };
  },

  mounted() {
    if (!localStorage.list) {
      localStorage.list = "[]";
    }
    this.loca_list = JSON.parse(localStorage.list);
  },
  methods: {
    onChange(index) {
      Notify({ type: "primary", message: index });
    },
    onClickLeft() {},
    onClickRight() {},
    //
    getmylist(item) {
      this.getDatelist(1, item); //根据子组件传来的数据 从新请求
      this.ishow = true; //列表显示
    },
    getData(order, keywords) {
      console.log(order, keywords);
      this.getDatelist(order, keywords); //根据子组件传来的数据 从新请求
    },
    clearlist() {
      localStorage.list = "[]";
      this.loca_list = JSON.parse(localStorage.list);
    },
    onSearch(val) {
      console.log(val); //搜索内容
      // 存储本地搜搜记录
      var arr = JSON.parse(localStorage.list);
      arr.push(val);
      localStorage.list = JSON.stringify(arr);
      this.loca_list = JSON.parse(localStorage.list);
      this.ishow = true;

      this.vals = val;
      var params = new URLSearchParams();
      params.append("keywords", val); //你要传给后台的参数值 key/value
      params.append("order", 1);
      params.append("p", this.page);

      this.axios({
        url: "https://api.ymduo.com/search/index",
        method: "post",
        data: params
      }).then(res => {
        console.log(res.data.result.data);
        this.relist = res.data.result.data;
        for (var a = 0; a < this.relist.length; a++) {
          let self = this;
          self.relists.push(this.relist[a]);
        }
      });
    },
    getDatelist(order, val) {
      console.log(val); //搜索内容
      // 存储本地搜搜记录
      var arr = JSON.parse(localStorage.list);
      arr.push(val);
      localStorage.list = JSON.stringify(arr);
      this.loca_list = JSON.parse(localStorage.list);
      this.ishow = true;

      this.vals = val;
      var params = new URLSearchParams();
      params.append("keywords", val); //你要传给后台的参数值 key/value
      params.append("order", order);
      params.append("p", this.page);

      this.axios({
        url: "https://api.ymduo.com/search/index",
        method: "post",
        data: params
      }).then(res => {
        console.log(res.data.result.data);
        this.relist = res.data.result.data;
        for (var a = 0; a < this.relist.length; a++) {
          let self = this;
          self.relists.push(this.relist[a]);
        }
      });
    },
    // 本地存储搜索记录

    // -------
    onCancel() {
      Toast("取消");
    },
    infinite(done) {
      console.log(this.noData);
      //上拉加载
      if (this.noData) {
        setTimeout(() => {
          this.$refs.my_scroller.finishInfinite(2);
          console.log(this.page);
          this.page++;
          console.log(this.page);
          console.log(241432);
          this.onSearch(this.vals);
          for (var k = 0; k < this.relist.length; k++) {
            self.relists.push(this.relist[k]);
          }
        });
        return;
      }
      let self = this;
      let i = 1;
      let start = this.relists.length;

      setTimeout(() => {
        if (start / i < 10) {
          self.noData = "没有更多数据";
        }
        self.$refs.my_scroller.resize();
        done();
      }, 1500);
    }
    // refresh: function() {
    //   //下拉刷新
    //   console.log("refresh");
    //   this.timeout = setTimeout(() => {
    //     this.$refs.my_scroller.finishPullToRefresh();
    //   }, 1500);
    // }
  },

  components: {
    searchCom
  }
};
</script>
<style lang="less" scoped>
.van-sidebar {
  float: left;
}
.navs {
  display: inline-block;
  float: left;
  text-align: center;
  margin-top: 10px;
}
.nave {
  width: 100%;
  height: 40px;
  margin-bottom: 5px;
}
.list {
  height: auto;
}
.list div {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.list_one {
  background: white;
  margin-top: 10px;
  width: 175px;
  height: 271px;
  border: 1px solid #ccc;
  line-height: 20px;
  img {
    width: 176px;
    height: 176px;
  }
  p {
    width: 175px;
    height: 31px;
    line-height: 16px;
  }
  .price {
    width: 175px;
    height: 34px;
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    box-sizing: border-box;
    font-size: 17px;
    color: red;
    font-weight: bold;
  }
}
.zuijin {
  line-height: 60px;
  display: flex;
  justify-content: space-between;
  padding: 0 15px;
  box-sizing: border-box;
  i {
    margin-top: 20px;
    width: 30px;
    height: 30px;
  }
}
.van-tag {
  margin-left: 20px;
}
</style>