<template>
  <div class="search">
    <van-nav-bar left-arrow fixed @click-left="onClickLeft">
      <template #title>
        <van-search
          autofocus
          v-model="searchVal"
          placeholder="请输入搜索关键词"
          shape="round"
          @focus="searchFocus"
        />
      </template>
      <template #right>
        <van-button
          class="searchButton"
          type="danger"
          v-show="searchFlag"
          @click="getSearchList"
          >搜索</van-button
        >
      </template>
    </van-nav-bar>
    <div class="content" v-if="searchFlag">
      <div class="nearest">
        <p>最近搜索</p>
        <van-icon @click="clearArr" name="delete" size="22" />
      </div>
      <div>
        <van-tag
          color="#ddd"
          v-for="(item, index) in searchArr"
          :key="index"
          @click="getListTag(item)"
          >{{ item }}
        </van-tag>
      </div>
      <div class="nearest">
        <p>热门搜索</p>
        <van-icon name="delete" size="22" />
      </div>
      <div>
        <van-tag color="#ddd">标签</van-tag>

        <van-tag color="#ddd">标签</van-tag>
      </div>
    </div>
    <search-list-com
      :forList="searchList"
      :sval="searchVal"
      :msg="nullDataMsg"
      v-if="!searchFlag"
      @redata="getListPrice"
    >
    </search-list-com>
  </div>
</template>

<script>
import SearchListCom from "../components/SearchList";
export default {
  name: "search",
  components: {
    SearchListCom
  },
  data() {
    return {
      searchVal: "",
      // isShow: true, //是否显示热门搜索和最近搜索
      searchList: [],
      searchArr: [],
      searchFlag: true,
      nullDataMsg: ""
    };
  },
  beforeCreate() {
    // this.$nextTick(() => {
    //   this.isShow = this.tagFlag
    //   console.log("aa", this.isShow, this.tagFlag)
    // })
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    getList(keywords, order) {
      this.axios
        .post(
          "https://api.ymduo.com/search/index",
          this.$qs.stringify({
            keywords: keywords,
            order: order,
            p: 1
          })
        )
        .then(res => {
          if (res.data.code == "201") {
            this.nullDataMsg = res.data.msg;
          } else {
            this.nullDataMsg = "";
            this.searchList = res.data.result.data;
          }
        });
    },
    // 根据价格拍讯
    getListPrice(keywords, order) {
      this.getList(keywords, order);
    },
    // 根据标签展示
    getListTag(item) {
      this.searchVal = item;
      this.getList(item, 1);
      this.searchFlag = false;
    },
    // 搜索方法
    getSearchList() {
      if (this.searchVal != "") {
        this.searchFlag = false;
        var arr = JSON.parse(localStorage.searchArr);
        // 查看本地存储中是否包含该搜索字段
        if (arr.indexOf(this.searchVal) != -1) {
          arr.splice(arr.indexOf(this.searchVal), 1);
        }
        // 存储搜索数据到本地 unshift(向数组开头添加)
        arr.unshift(this.searchVal);
        localStorage.searchArr = JSON.stringify(arr);
        this.getList(this.searchVal, 1);
      } else {
        this.$Toast.fail("请输入需要搜索的商品");
      }
    },
    //清空最近搜索和热门列表
    clearArr() {
      localStorage.searchArr = "[]";
      this.searchArr = JSON.parse(localStorage.searchArr);
    },
    // 鼠标聚焦时触发
    searchFocus() {
      this.searchFlag = true;
    }
  },
  mounted() {
    localStorage.searchArr = localStorage.searchArr
      ? localStorage.searchArr
      : "[]";
    this.searchArr = JSON.parse(localStorage.searchArr);
  },
  updated() {
    var ele = document.getElementsByClassName("van-nav-bar__title")[0];
    ele.style.marginLeft = "30px";
    ele.style.maxWidth = "73%";
    ele.style.height = "45px";
    // 搜索框
    document.getElementsByClassName("van-search")[0].style.padding =
      "6px 0 0 6px";
    // 搜索字
    document.getElementsByClassName("van-button--normal")[0].style.padding =
      "0 0.1rem";
    document.getElementsByClassName("van-button--normal")[0].style.width =
      "50px";
  }
};
</script>
<style lang="less" scoped>
.search {
  .searchButton {
    background-color: red;
    // margin: auto;
    height: 30px;
    line-height: 30px;
    font-size: 16px;
    border-radius: 8px;
    width: 72px;
    .van-button--normal {
      padding: "0 0.1rem";
      width: "50px";
    }
  }
  .van-search {
    background-color: none;
    align-items: 0;
  }
  // }
  .content {
    margin-top: 46px;
    padding: 0 15px;
    .nearest {
      width: 100%;
      height: 40px;
      line-height: 40px;
      display: flex;
      justify-content: space-between;
      box-sizing: border-box;
      font-size: 18px;

      .van-icon {
        line-height: 35px;
      }
    }
    .van-tag {
      margin: 0 10px 10px 0;
    }
  }
}
</style>
