<template>
  <div class="textSearch">
    <!-- 公用头部搜索框 -->
    <van-nav-bar class="border-bottom" left-arrow @click-left="onClickLeft">
      <template #title>
        <van-search
          shape="round"
          v-model="keywords"
          show-action
          placeholder="请输入搜索关键词"
          @input="onInput"
          @search="onSearch"
          @focus="onFocus"
        >
          <template #action>
            <div v-if="hasCon" class="searchBtn" @click="onSearch">
              搜索
            </div>
            <!-- 显示右边按钮 -->
            <more-pup :hascontainer="hasCon"></more-pup>
          </template>
        </van-search>
      </template>
    </van-nav-bar>
    <!-- 动态检索内容 -->
    <ul class="searchCon" v-if="searchCon">
      <router-link
        tag="li"
        class="border-bottom"
        v-for="(item, index) in searchHead"
        :key="index"
        :to="`/details?goods_id=${item.id}`"
      >
        <span class="one-txt-cut">{{ item.name }}</span>
      </router-link>
    </ul>
    <!-- 历史搜索和热门搜索 -->
    <div class="contentWraper" v-if="!searchCon" v-show="hasCon">
      <div class="myhistory">
        <div class="hisHead clearfix">
          <p>最近搜索</p>
          <van-icon name="close" @click="deleteHis" />
        </div>
        <div class="hisTags">
          <span v-for="(item, index) in searchHisArr" :key="index"
            ><a href="javascript:;">{{ item }}</a></span
          >
        </div>
      </div>
      <div class="hotSearch">
        <div class="hotHead clearfix">
          <p>热门搜索</p>
          <i class="hide">隐藏</i>
        </div>
        <div class="hotTags">
          <span><a href="javascript:;">水</a></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MorePup from "components/MorePopup"; //引入右边公共的分享按钮
import Qs from "qs";
export default {
  name: "textSearch",
  components: {
    MorePup
  },
  data() {
    return {
      // show: false, //右上角弹出窗口
      hasCon: true, //是否含有搜索按钮
      searchCon: false, //同步显示搜索内容
      keywords: "",
      order: 1, //排序方式
      pages: 1, //当前页码
      searchHead: "", //搜索头部模糊列表
      searchHisArr: [], //搜索历史记录数组
      searchShopList: [] //搜索商品列表数组
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onFocus() {
      setTimeout(() => {
        this.$toast.clear();
        this.$router.push("/search");
      }, 200);
    },
    onInput() {
      if (this.keywords.replace(/(^\s*)|(\s*$)/g, "") == "") {
        this.searchCon = false;
        return;
      } //值为空，退出
      setTimeout(() => {
        this.searchCon = true;
      }, 200);
      this.getSearchCon().then(res => {
        const data = res.data.result.data;
        if (data) {
          const listdata = data.map(item => {
            return { id: item.goods_id, name: item.goods_name };
          });
          let list = [];
          listdata.forEach(item => {
            // console.log(item);
            let obj = {};
            if (item.name.indexOf(this.keywords) > 0 || this.keywords) {
              obj.name = item.name.split(" ")[0];
              obj.id = item.id;
            }
            list.push(obj);
          });
          // console.log(list);
          this.searchHead = list;
        }
      });
    },
    onSearch() {
      // 点击搜索时存储历史记录
      const arr = JSON.parse(localStorage.searchHistory);
      arr.push(this.keywords);
      localStorage.searchHistory = JSON.stringify(arr);
      this.searchHisArr = JSON.parse(localStorage.searchHistory);
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        loadingType: "spinner"
      });
      setTimeout(() => {
        this.$toast.clear();
        this.getSearchCon().then(res => {
          this.searchShopList = res.data.result.data;
        });
        // this.searchCon = false;
        // this.hasCon = false;
        this.$router.push({
          name: "searchlist",
          query: {
            keywords: this.keywords,
            order: 1,
            p: 1
          }
        });
      }, 500);
    },
    // 点击清空历史搜索
    deleteHis() {
      this.$Dialog
        .confirm({
          title: "确定要清空吗？",
          closeOnClickOverlay: "true", //点击遮罩层关闭窗口
          confirmButtonColor: "#fff", //确认按钮文字颜色
          className: "myDialog" //自定义类名
        })
        .then(() => {
          localStorage.searchHistory = "[]";
          this.searchHisArr = JSON.parse(localStorage.searchHistory);
        })
        .catch(() => {
          // on cancel
        });
    },
    getSearchCon() {
      return this.axios({
        method: "post",
        url: "https://api.ymduo.com/search/index",
        data: Qs.stringify({
          keywords: this.keywords,
          order: this.order,
          p: this.pages
        }),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        timeout: 10000
      });
    }
  },
  mounted() {
    if (localStorage.searchHistory) {
      this.searchHisArr = JSON.parse(localStorage.searchHistory);
    } else {
      localStorage.searchHistory = "[]"; //存放历史搜索
    }
  }
};
</script>

<style lang="less" scoped>
.textSearch {
  width: 100%;
  background-color: #fff;
  .van-nav-bar {
    .van-nav-bar__left {
      .van-icon {
        color: #252525;
        font-size: 22px;
      }
    }
    .van-nav-bar__title {
      max-width: 85%;
      height: 100%;
      margin-left: 50px;
      box-sizing: border-box;
      .van-search {
        padding: 6px 0;
        margin: auto;
        .van-search__action {
          padding: 0;
          line-height: 1.3;
          .searchBtn {
            padding: 6px;
            box-sizing: border-box;
            background-color: #e93b3d;
            color: #fff;
            border-radius: 4px;
            font-size: 14px;
            margin: 0 12px 0 8px;
          }
        }
      }
    }
  }
  .searchCon {
    box-sizing: border-box;
    padding-left: 12px;
    li {
      height: 42px;
      line-height: 42px;
      display: block;
      padding-right: 12px;
      span {
        display: block;
        color: #232326;
        font-size: 13px;
        padding-top: 1px;
        padding-bottom: 1px;
      }
    }
  }
  .contentWraper {
    width: 100%;
    box-sizing: border-box;
    .myhistory,
    .hotSearch {
      padding-left: 13px;
      margin-top: 15px;
      line-height: 1.5;
      .hisHead,
      .hotHead {
        padding: 0 15px 11px 0;
        box-sizing: border-box;
        p {
          font-size: 15px;
          line-height: 15px;
          color: #232326;
          float: left;
          width: 100px;
          padding-left: 1px;
        }
        i {
          float: right;
          font-size: 18px;
          &.hide {
            font-size: 14px;
            color: #999;
          }
        }
      }
      .hisTags,
      .hotTags {
        padding-right: 2px;
        overflow: hidden;
        font-size: 12px;
        text-align: center;
        span {
          display: block;
          max-width: 100%;
          overflow: hidden;
          padding-right: 10px;
          padding-bottom: 10px;
          float: left;
          text-align: center;
          a {
            height: 23px;
            line-height: 24px;
            border-radius: 3px;
            display: block;
            width: 100%;
            color: #686868;
            white-space: nowrap;
            text-overflow: ellipsis;
            background-color: #f0f2f5;
            padding-left: 13px;
            padding-right: 13px;
            overflow: hidden;
            box-sizing: border-box;
          }
        }
      }
    }
  }
}
</style>
