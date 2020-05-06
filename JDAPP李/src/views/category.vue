<template>
  <div style="background-color: white;">
    <header-com :bannerFlag="true"></header-com>
    <div class="wrap">
      <van-sidebar class="slider" v-model="activeKey">
        <van-sidebar-item
          v-for="(item, index) in oneCategory"
          :key="index"
          :title="item.category_cn"
          @click="getData(item.category_id)"
        />
      </van-sidebar>
      <div class="content">
        <div
          v-for="(twoItem, index) in twoCategory"
          :key="index"
          @click="turnCatelist(twoItem.category_id)"
        >
          <img :src="twoItem.img" alt="" />
          <p>{{ twoItem.category_cn }}</p>
        </div>
      </div>
    </div>
    <div style="padding-bottom: 50px;"></div>
  </div>
</template>

<script>
import headerCom from "../components/header";
export default {
  name: "category",

  data() {
    return {
      activeKey: 0,
      oneCategory: [],
      twoCategory: []
    };
  },
  methods: {
    turnCatelist(cid) {
      //跳转分类列表 并传参
      this.$router.push({ name: "categorylist", params: { cid: cid } });
    },
    getData(id) {
      console.log(id);
      this.axios
        .post(
          "https://api.ymduo.com/category/categoryList",
          this.$qs.stringify({
            category_id: id
          })
        )
        .then(res => {
          console.log(res);
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
        this.oneCategory = this.oneCategory.concat(res.data.result.data);
      });
  },
  mounted() {
    this.getData(2390);
  },
  components: {
    headerCom
  }
};
</script>

<style lang="less" scoped>
.wrap {
  padding-top: 46px;
  display: flex;
}
.slider {
  width: 30%;
}
.content {
  width: 80%;
  display: flex;
  justify-content: space-around;
  width: 100%;
  flex-wrap: wrap;
  div {
    width: 83px;
    height: 107px;
    text-align: center;
    margin-top: 10px;
    img {
      margin-bottom: 5px;
      width: 70px;
      height: 70px;
    }
  }
}
</style>
