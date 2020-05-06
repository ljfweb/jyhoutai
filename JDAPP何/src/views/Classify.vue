<template>
  <div class="classifyBg">
    <classify-header-com></classify-header-com>
    <!-- /分册次的导航 -->
    <van-row>
      <van-col span="6">
        <van-sidebar v-model="activeKey">
          <van-sidebar-item
            v-for="(item, index) in leftText"
            :key="index"
            :title="item.title"
            @click="shopCidFunction(item.cid)"
            :cid="item.cid"
          />
        </van-sidebar>
      </van-col>
      <van-col span="18" style="padding: 10px 0;">
        <div v-for="(item, index) in rightContainer" :key="index">
          <div style="font-size: 16px;font-weight: bold;">{{ item.title }}</div>
          <!-- 九宫格导航 -->
          <van-grid :column-num="3" class="icons" icon-size="60px" border>
            <van-grid-item
              v-for="(ite, ind) in item.goods"
              :key="ind"
              :icon="ite.image"
              @click="detailsFunction(ite.gid)"
            >
              <template #text>
                <div class="van-multi-ellipsis--l2">{{ ite.title }}</div>
              </template>
            </van-grid-item>
          </van-grid>
        </div>
      </van-col>
    </van-row>
    <div style="padding-top: 92px;"></div>
  </div>
</template>

<script>
//引入本页特有头部
import classifyHeaderCom from "../components/classifyHeader";
export default {
  components: { classifyHeaderCom },
  created() {
    //获取左边的文字
    this.getFullLeftTitle();
    //默认渲染右边第一个数据
    this.shopCidFunction(492);
  },
  data() {
    return {
      activeKey: 0,
      leftText: [],
      rightContainer: []
    };
  },
  methods: {
    //获取数据相关的右边cid数据
    async shopCidFunction(index) {
      this.rightContainer = [];
      //监听事件
      console.log(index);
      const { data: res } = await this.$axios.get(
        `/category/show?cid=${index}&token=1ec949a15fb709370f`
      );
      console.log(res);
      this.rightContainer = res.data;
      console.log("rightData", res.data);
    },
    // 获取左边的值
    async getFullLeftTitle() {
      const { data: res } = await this.$axios.get(
        `/category/menu?token=1ec949a15fb709370f`
      );
      console.log(res.data);
      this.leftText = res.data;
    },
    //跳转到详情页
    detailsFunction(idds) {
      this.$router.push({ name: "detail", query: { gid: idds } });
    }
  }
};
</script>
<style lang="less" scoped>
.classifyBg {
  background-color: white;
}
.icons {
  .van-grid-item__icon {
    .van-icon__image {
      width: 2em;
      height: 2em;
    }
  }
}
</style>
