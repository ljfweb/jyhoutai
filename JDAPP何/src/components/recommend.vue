<template>
  <div>
    <!-- 为你推荐头部 -->
    <van-row>
      <van-col class="recommendTitle">
        <img
          src="http://img11.360buyimg.com/jdphoto/jfs/t1/31601/22/15554/14040/5cc2a86fEbdb1098b/88174b36f85283b6.png"
        />
      </van-col>
    </van-row>
    <!-- 为你推荐数据渲染 -->
    <van-row type="flex" justify="center" class="shoppingcon">
      <div
        class="recommendshopshow"
        v-for="(item, index) in recommendList"
        :key="index"
        @click="details(item.gid)"
      >
        <dt>
          <img :src="item.image" />
        </dt>
        <dd class="van-multi-ellipsis--l2" style="margin-bottom: 3px;">
          {{ item.title }}
        </dd>
        <dd class="recBottom">
          <span style="color: red;"
            >￥<span class="redPrice">{{ item.price }}</span> </span
          ><span class="looklike">看相似</span>
        </dd>
      </div>
    </van-row>
  </div>
</template>

<script>
export default {
  created() {
    this.getFullRecommend();
  },
  data() {
    return {
      recommendList: []
    };
  },
  methods: {
    async getFullRecommend() {
      const { data: res } = await this.$axios.get(
        "/index/recom?token=1ec949a15fb709370f"
      );
      console.log(res.data);
      this.recommendList = res.data;
    },
    //跳转详情页
    details(gid) {
      console.log(gid);
      this.$router.push({ name: "detail", query: { gid: gid } });
    }
  }
};
</script>

<style lang="less" scoped>
.recommendTitle {
  height: 34px;
  box-sizing: border-box;
  img {
    width: 100%;
    height: 100%;
    opacity: 0.5;
  }
}
.shoppingcon {
  display: flex;
  flex-wrap: wrap;
}
.recommendshopshow {
  width: 168px;
  height: 259px;
  margin-right: 4px;
  background-color: white;
  margin-bottom: 4px;
  dt {
    img {
      width: 100%;
      padding-bottom: 4px;
    }
  }
  dd {
    font-size: 13px;
    .redPrice {
      font-size: 16px;
    }
    .looklike {
      content: "";
      padding: 4px;
      border: 1px solid #bfbfbf;
      border-radius: 4px;
      transform-origin: top left;
    }
  }
  .recBottom {
    display: flex;
    justify-content: space-between;
  }
}
</style>
