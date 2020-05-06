<template>
  <div class="searchList">
    <van-popup
      v-model="show"
      position="right"
      :style="{ height: '100%', width: '70%' }"
    >
      <van-tag>分类</van-tag><br />
      <van-tag>价格</van-tag><br />
      <van-tag>品牌</van-tag><br />
      <van-tag>规格</van-tag>
    </van-popup>
    <div>
      <van-dropdown-menu>
        <van-dropdown-item
          v-model="value1"
          :options="option1"
          @change="tagPrice"
        />
        <van-dropdown-item v-model="value2" :options="option2" />
        <van-dropdown-item v-model="value3" :options="option3" />
        <van-button type="default" @click="show = true">筛选</van-button>
      </van-dropdown-menu>
    </div>

    <div class="list" ref="wrap" v-if="!msg">
      <div class="listFirst" v-if="styleFlag">
        <div
          class="list-one"
          v-for="(item, index) in forList"
          :key="index"
          @click="toInfo(item.goods_id)"
        >
          <!-- <router-link :to="{name:'info',params:{pid:item.goods_id}}"> -->
          <img :src="item.image" alt="" />
          <p>{{ item.goods_name }}</p>
          <div class="for-price">
            <span>￥{{ item.price }}</span>
            <span>看相似</span>
          </div>
          <!-- </router-link> -->
        </div>
      </div>
      <div class="listSecond" v-if="!styleFlag">
        <van-card
          v-for="(item, index) in forList"
          :key="index"
          @click="toInfo(item.goods_id)"
          :price="item.price"
          :desc="item.goods_name"
          :thumb="item.image"
        >
          <template #num>
            <span>看相似</span>
          </template>
        </van-card>
      </div>
    </div>
    <div class="icon" @click="changeStyle" v-if="!msg">
      <van-icon size="32" :name="iconStyle" color="#ccc" />
    </div>
    <div v-if="msg" class="nullDataCla">{{ msg }}</div>
  </div>
</template>

<script>
export default {
  name: "searchList",
  components: {},
  props: ["forList", "sval", "msg"],
  data() {
    return {
      styleFlag: true,
      iconStyle: "orders-o",
      show: false,
      value1: 0,
      value2: "a1",
      value3: "a",
      option1: [
        { text: "综合", value: 0 },
        { text: "最新上架", value: 1 },
        { text: "价格最低", value: 4 },
        { text: "价格最高", value: 3 },
        { text: "评价最多", value: 2 }
      ],
      option2: [{ text: "销量", value: "a1" }],

      option3: [
        { text: "有货优先", value: "a" },
        { text: "货到付款", value: "b" },
        { text: "京东国际", value: "c" },
        { text: "PLUS专享", value: "c" },
        { text: "促销商品", value: "c" },
        { text: "配送全球", value: "c" }
      ]
    };
  },
  methods: {
    // 切换展示样式
    changeStyle() {
      this.styleFlag = !this.styleFlag;
      this.iconStyle = this.iconStyle == "apps-o" ? "orders-o" : "apps-o";
    },
    tagPrice(value) {
      this.$emit("redata", this.sval, value);
    },
    toInfo(pid) {
      this.$router.push({ name: "info", params: { pid: pid } });
    }
  },
  mounted() {}
};
</script>
<style lang="less" scoped>
.van-button {
  width: 70px;
  margin: auto 0;
  height: 40px;
}
.searchList {
  margin-top: 46px;
  padding: 0 5px;
  box-sizing: border-box;
  .list {
    height: 60vh;
  }
  .list .listFirst {
    padding: 0 5px 60px;
    box-sizing: border-box;
    width: 375px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    .list-one {
      width: 177px;
      height: 271px;
      border: 1px solid #ccc;
      margin: 2px 0;
      img {
        width: 176px;
        height: 176px;
      }
      p {
        width: 100%;
        height: 32px;
        line-height: 16px;
        font-size: 12px;
        padding: 0 3px;
        box-sizing: border-box;
        word-wrap: break-word;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
      .for-price {
        margin-top: 10px;
        display: flex;
        padding: 0 3px;
        box-sizing: border-box;
        justify-content: space-between;
        :nth-of-type(1) {
          color: red;
          font-size: 16px;
        }
        :nth-of-type(2) {
          display: inline-block;
          width: 50px;
          height: 24px;
          line-height: 24px;
          text-align: center;
          border: 1px solid #ccc;
          margin-right: 10px;
        }
      }
    }
  }
}
.list .listSecond {
  padding-bottom: 60px;
  .van-card {
    background-color: white;
    .van-card__num {
      width: 50px;
      height: 24px;
      line-height: 24px;
      text-align: center;
      border: 1px solid #ccc;
    }
    .van-card__desc {
      font-size: 15px;
      height: 40px;
      line-height: 20px;
      overflow: hidden;
      max-height: 40px;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      white-space: pre-wrap;
    }
  }
}
.icon {
  width: 40px;
  height: 40px;
  background-color: white;
  position: fixed;
  bottom: 10%;
  right: 4%;
  border-radius: 50%;
  .van-icon {
    top: 5px;
    left: 5px;
  }
}
.nullDataCla {
  height: 300px;
  text-align: center;
  line-height: 300px;
  font-size: 16px;
}
</style>
