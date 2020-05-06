<template>
  <div>
    <div class="top">
      <div class="top_left">
        <van-icon name="arrow-left" @click="turn" />
      </div>
      <van-search
        class="top_center"
        v-model="searchText"
        shape="round"
        placeholder="请输入关键词"
        @search="onSearch"
      >
        <template #left-icon>
          <van-icon name="search" />
        </template>
      </van-search>
      <div class="top_right">
        <div>
          <van-button @click="getSearch" round type="danger" size="small">搜索</van-button>
        </div>
      </div>
    </div>

    <div class="tips" v-if="!ishow">
      <!-- 最近搜索 -->
      <div class="zuijin">
        <div class="zuijin_top">
          <span>最近搜索</span>
          <van-icon name="cross" @click="clearlist" />
        </div>
        <div class="zuijin_center" v-if="!ishow">
          <span v-for="(item, index) in s_list" :key="index">{{item}}</span>
        </div>
      </div>
      <!-- 热门搜索 -->
      <div class="hotSearch" v-if="hiden">
        <div class="hotSearch_top">
          <span>热门搜索</span>
          <span class="yincang" @click="hide">隐藏</span>
        </div>
        <div class="hotSearch_center">
          <span v-for="(item,index) in hot" :key="index" @click="hotClickSearch(item)">{{item}}</span>
        </div>
      </div>
    </div>
    <!-- <div class="tips" v-if="!ishow">
      <div class="zuijin">
        <span>最近搜索</span>
        <i @click="clearlist"></i>
      </div>
      <van-tag color="#666" v-for="(item, index) in s_list" :key="index" type="primary">{{ item }}</van-tag>

      
      <div class="zuijin">
        <span>热门搜索</span>
        <i></i>
      </div>
      <van-tag type="primary">标签1111111</van-tag>
      <van-tag type="primary">标签1111111</van-tag>
    </div>-->

    <search-list :keywords="searchText" @redata="getData" :relist="mylist" v-if="ishow"></search-list>
  </div>
</template>

<script>
import searchList from "./searchlist";
import { searchDateList } from "../api/index";
export default {
  name: "search",
  data() {
    return {
      searchText: "",
      s_list: [],
      ishow: false,
      mylist: [],
      hiden: true,
      hot: ["大春", "夏洛", "秋雅", "马冬梅", "袁华"]
    };
  },
  components: {
    searchList
  },

  mounted() {
    if (!localStorage.list) {
      localStorage.list = "[]"; //为了存放 最近搜索
    }
    this.s_list = JSON.parse(localStorage.list);
  },
  methods: {
    getData(order, keywords) {
      console.log(order, keywords);
      this.getlist(order, keywords); //根据子组件传来的数据 从新请求
    },
    //重新请求获取
    getlist(order, keywords) {
      console.log(order, keywords);
      this.mylist = [];
      searchDateList(order, keywords).then(res => {
        console.log(res);

        this.mylist = res.data;
      });
    },

    //回退到上一页
    turn() {
      this.$router.go(-1);
    },
    //隐藏热门搜索数据
    hide() {
      console.log(this.hiden);
      this.hiden = false;
    },
    //清除历史搜索痕迹
    clearlist() {
      localStorage.list = "[]";
      this.s_list = JSON.parse(localStorage.list);
    },
    //点击热搜中关键词搜索
    hotClickSearch(item) {
      var arr = JSON.parse(localStorage.list);
      arr.push(item);
      console.log(item);
      localStorage.list = JSON.stringify(arr);
      this.s_list = JSON.parse(localStorage.list);
      this.searchText = item;
      this.ishow = true;
    },
    // 搜索框回车搜索
    getSearch() {
      var arr = JSON.parse(localStorage.list);
      arr.push(this.searchText);
      console.log(this.searchText);
      localStorage.list = JSON.stringify(arr);
      this.s_list = JSON.parse(localStorage.list);
      this.ishow = true;
      this.$Toast("别说话");
      this.axios
        .get(
          `http://vueshop.glbuys.com/api/home/goods/search?kwords=${this.searchText}&page=1&price1=100&price2=200&otype=all&token=1ec949a15fb709370f`
        )
        .then(res => {
          if (res.status == 0) {
            this.$Toast("没有相关信息");
          } else {
            this.mylist = res.data;
          }
        });
    },
    onSearch() {
      // 存储最近搜索
      var arr = JSON.parse(localStorage.list);
      arr.push(this.searchText);
      console.log(this.searchText);
      localStorage.list = JSON.stringify(arr);
      this.s_list = JSON.parse(localStorage.list);
      this.ishow = true;
      this.$Toast("别说话");

      this.axios
        .get(
          `http://vueshop.glbuys.com/api/home/goods/search?kwords=${this.searchText}&page=1&price1=100&price2=200&otype=all&token=1ec949a15fb709370f`
        )
        .then(res => {
          console.log(res);
          if (res.status == 0) {
            this.$Toast("没有相关信息");
          } else {
            this.mylist = res.data;
          }
        });
    }
  }
};
</script>

<style lang="less" scope>
.top {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: white;
  position: fixed;
  left: 0;
  top: 0;
  border-bottom: 1px solid #ccc;
  z-index: 100;
  .top_left {
    width: 10%;
    font-size: 24px;
    height: 100%;
    text-align: center;
    .van-icon {
      height: 100%;
      vertical-align: middle;
      line-height: 50px;
    }
  }

  .top_center {
    width: 70%;
  }
  .top_right {
    width: 20%;
  }
}
//最近搜索
.zuijin {
  width: 100%;
  margin-top: 50px;
  background-color: white;
  padding: 10px 10px;
  box-sizing: border-box;
  .zuijin_top {
    width: 96%;
    height: 26px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;

    align-items: center;

    font-size: 18px;
    span {
      font-weight: 600;
    }
    .van-icon {
      line-height: 30px;
      width: 30px;
      vertical-align: middle;
    }
  }
  .zuijin_center {
    width: 96%;
    display: flex;
    justify-content: flex-start;
    flex-flow: row wrap;

    margin: 10px auto;
    span {
      margin-left: 10px;
      background-color: #f0f2f5;
      color: #686868;
      font-size: 12px;
      text-align: center;
      padding: 5px;
      box-sizing: border-box;
    }
  }
}
//热门搜索

.hotSearch {
  width: 100%;
  background-color: white;
  padding: 10px 10px;
  box-sizing: border-box;
  .hotSearch_top {
    width: 96%;
    height: 26px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;

    span:first-child {
      font-weight: 600;
      font-size: 18px;
    }
    span:last-child {
      color: #ccc;
      font-size: 16px;
    }
  }
  .hotSearch_center {
    width: 96%;
    display: flex;
    justify-content: flex-start;
    flex-flow: row wrap;

    margin: 10px auto;
    span {
      margin-left: 10px;
      background-color: #f0f2f5;
      color: #686868;
      font-size: 12px;
      text-align: center;
      padding: 5px;
      box-sizing: border-box;
    }
  }
}
</style>
