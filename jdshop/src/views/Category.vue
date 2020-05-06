<template>
  <div class="category">
    <van-nav-bar left-arrow
                 fixed
                 @click-left="onClickLeft">
      <template #title>
        <van-search v-model="searchVal"
                    placeholder="请输入搜索关键词"
                    shape="round"
                    @focus="categoryFocus" />
      </template>
      <template #right>
        <van-button class="searchButton"
                    type="danger"
                    @click="getSearchList">搜索</van-button>
      </template>
    </van-nav-bar>
    <div class="sideContent">
      <van-sidebar v-model="activeKey">
        <van-sidebar-item v-for="(item, index) in sidebarList"
                          :key="index"
                          :title="item.category_cn"
                          @click="getTwoCat(item.category_id)" />
      </van-sidebar>
      <div class="sidebarRight">
        <div>
          <ul>
            <li v-for="(item, index) in sidebarRightList"
                :key="index"
                @click="getGoodsList(item.category_id)">
              <img :src="item.img"
                   alt="" />
              <p>{{ item.category_cn }}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "category",
  components: {},
  data () {
    return {
      activeKey: 0,
      sidebarList: [],
      searchVal: "",
      sidebarRightList: []
    };
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1);
    },
    getSearchList () { },
    getTwoCat (id) {
      this.axios
        .post(
          "https://api.ymduo.com/category/categoryList",
          this.$qs.stringify({
            category_id: id
          })
        )
        .then(res => {
          console.log(res.data.result.data);
          this.sidebarRightList = res.data.result.data;
        });
    },
    categoryFocus () {
      this.$router.push("/search");
    },
    getGoodsList (id) {
      this.$router.push({ name: "categoryList", params: { cid: id } });
    }
  },
  created () {
    this.axios
      .post(
        "https://api.ymduo.com/category/categoryList",
        this.$qs.stringify({
          category_id: 0
        })
      )
      .then(res => {
        console.log(res.data.result.data);
        this.sidebarList = res.data.result.data;
      });
  },
  mounted () {
    this.getTwoCat(2390);
  },
  updated () {
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
.searchButton {
  background-color: red;
  // margin: auto;
  height: 30px;
  line-height: 30px;
  font-size: 20px;
  border-radius: 5px;
}
// .van-nav-bar {
.van-nav-bar__title {
  margin-left: 30px;
  max-width: 70%;
}

.sideContent {
  display: flex;
  height: 90vh;
  margin-top: 48px;
  .van-sidebar {
    width: 85px;
  }
  .sidebarRight {
    width: 290px;
    ul {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
    }
    li {
      width: 84px;
      height: 107px;
      text-align: center;

      img {
        width: 70px;
        height: 70px;
      }
      p {
        font-size: 14px;
        line-height: 28px;
      }
    }
  }
}
</style>
