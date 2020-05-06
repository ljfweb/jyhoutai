<template>
  <div class="category">
    <headerBar ref="container"></headerBar>
    <!-- 分类树型列表 -->
    <div class="category-wraper">
      <van-sidebar v-model="activeKey">
        <van-sidebar-item
          v-for="(item1, index) in oneCategory"
          :key="index"
          :title="item1.category_cn"
          @click="getCategoryData(item1.category_id)"
        >
        </van-sidebar-item>
      </van-sidebar>
      <div class="content">
        <van-grid :border="false" :column-num="3">
          <van-grid-item
            v-for="(item2, index) in twoCategory"
            :key="index"
            @click="turnSearchList(item2.category_id)"
          >
            <van-image :src="item2.img" lazy-load />
            <span class="one-txt-cut">{{ item2.category_cn }}</span>
          </van-grid-item>
        </van-grid>
      </div>
    </div>
  </div>
</template>

<script>
import headerBar from "./Search/search";
import Qs from "qs";
export default {
  name: "category",
  components: {
    headerBar
  },
  data() {
    return {
      activeKey: 0,
      oneCategory: [],
      twoCategory: []
    };
  },
  methods: {
    turnSearchList(id) {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        loadingType: "spinner"
      });
      setTimeout(() => {
        this.$toast.clear();
        this.$router.push({
          name: "searchlist",
          query: {
            category_id: id,
            p: 1,
            order: 1
          }
        });
      });
    },
    getCategoryData(id) {
      this.axios
        .post(
          "https://api.ymduo.com/category/categoryList",
          Qs.stringify({
            category_id: id
          })
        )
        .then(res => {
          // console.log(res);
          this.twoCategory = res.data.result.data;
        });
    }
  },
  created() {
    this.axios
      .post("https://api.ymduo.com/category/categoryList", {
        category_id: 0
      })
      .then(res => {
        console.log(res);
        this.oneCategory = res.data.result.data;
      });
  },
  mounted() {
    this.$refs.container._data.hasCon = false;
    this.getCategoryData(2390); //默认加载第一栏
  }
};
</script>

<style lang="less" scoped>
.category {
  width: 100%;
  .category-wraper {
    display: flex;
    .van-sidebar {
      width: 85px;
      .van-sidebar-item {
        width: 85px;
        height: 46px;
        line-height: 46px;
        text-align: center;
        background: #f8f8f8;
        padding: 0;
        .van-sidebar-item__text {
          width: 100%;
          font-size: 14px;
          width: 100%;
          height: 46px;
          line-height: 46px;
        }
      }
      .van-sidebar-item--select {
        background-color: #fff;
        color: #e93b3d;
      }
    }
    .content {
      flex: 3.3;
      overflow: hidden;
      padding-bottom: 10px;
      background-color: #fff;
      .van-grid {
        box-sizing: border-box;
        margin: 32px 7px 0;
        position: relative;
        h3 {
          position: absolute;
          top: -16px;
          font-size: 14px;
          color: #333;
          z-index: 10;
          line-height: 1em;
          font-weight: 700;
        }
        .van-grid-item {
          .van-image {
            width: 70px;
            height: 70px;
          }
          span {
            width: 100%;
            text-align: center;
            color: #333;
            height: 35px;
            margin-top: 2px;
            -webkit-box-pack: start;
          }
        }
      }
    }
  }
}
</style>
