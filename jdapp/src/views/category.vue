<template>
  <div class="layout-container">
    <div class="nave">
      <router-link :to="{ name: 'home' }">
        <van-icon name="arrow-left" size="20" class="navs" />
      </router-link>
      <form action="/">
        <router-link :to="{ name: 'searchlist' }">
          <van-search
            v-model="value"
            show-action
            placeholder="请输入搜索关键词"
            @search="onSearch"
            @cancel="onCancel"
          />
        </router-link>
      </form>
    </div>
    <div class="w">
      <van-sidebar v-model="activeKey">
        <van-sidebar-item
          v-for="(item, index) in arr"
          :title="item.category_cn"
          @click="getData(item.category_id)"
          :key="index"
        />
        <!-- <van-sidebar-item title="标签名2" />
        <van-sidebar-item title="标签名3" />-->
      </van-sidebar>
      <div class="right">
        <div v-for="(citem,index) in cate_list" class="small" :key="index">
          <img :src="citem.img" alt />
          <p>{{ citem.category_cn }}</p>
        </div>
      </div>
    </div>
    <!-- <y-footer></y-footer> -->
  </div>
</template>
<script>
import { Notify } from "vant";
import { Toast } from "vant";

export default {
  data() {
    return {
      activeKey: 0,
      arr: [],
      cate_list: [],
      value: ""
    };
  },
  methods: {
    onChange(index) {
      Notify({ type: "primary", message: index });
    },
    onClickLeft() {},
    onClickRight() {},
    onSearch(val) {
      Toast(val);
    },
    onCancel() {
      Toast("取消");
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
          this.cate_list = res.data.result.data;
        });
    }
  },
  components: {},
  created() {
    this.axios
      .post("https://api.ymduo.com/category/categoryList", {
        category_id: 0
      })
      .then(res => {
        this.arr = res.data.result.data;
        console.log(this.arr);
        console.log(2141324);
        this.getData(2390);
      });
  }
};
</script>
<style lang="less" scoped>
.van-sidebar {
  float: left;
}
.navs {
  float: left;
  margin-top: 10px;
}
.nave {
  width: 100%;
  height: 40px;
  margin-bottom: 5px;
}
.right {
  width: 77%;
  height: 600px;
  // background-color: bisque;
  float: right;
  display: block;
  border-top: 0px;
  // display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.small {
  width: 29.8%;
  float: left;
  height: 100px;
  img {
    width: 70px;
    height: 70px;
  }
  margin-left: 5px;
  text-align: center;
  p {
    margin-top: 5px;
  }
}
.mysearch .van-icon {
  display: inline-block;
}
.van-search {
  height: 46px;
}
.van-nav-bar {
  background: red;
}
.banner {
  width: 90%;
  margin: 0 auto;
  height: 140px;
}
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;

  img {
    width: 100%;
    height: 140px;
    border-radius: 20px;
  }
}
</style>