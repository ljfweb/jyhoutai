<template>
  <div>
    <van-dropdown-menu class="top">
      <van-dropdown-item v-model="value1" :options="option1" />
      <van-dropdown-item v-model="value2" :options="option2" @change="sendData" />
      <van-dropdown-item v-model="value3" :options="option3" />
      <van-button @click="show = true">筛选</van-button>
    </van-dropdown-menu>

    <div class="list">
      <ul class="goods" v-for="(item,index) in relist" :key="index" @click="toInfo(item.gid)">
        <li>
          <img :src="item.image" alt />
        </li>
        <li>{{item.title}}</li>
        <li>
          <span>￥{{item.price}}</span>
          <span>看相似</span>
        </li>
      </ul>
    </div>

    <van-popup v-model="show" round position="right" :style="{ width:'30%',height: '100%' }">你好我是李云龙</van-popup>
  </div>
</template>

<script>
export default {
  name: "searchlist",
  props: ["relist", "keywords"], //接受父组件的数据
  mounted() {
    console.log(this.relist);
  },
  data() {
    return {
      show: false,
      value1: 0,
      value2: "all",
      value3: "a",
      option1: [
        { text: "全部商品", value: 0 },
        { text: "新款商品", value: 1 },
        { text: "活动商品", value: 2 }
      ],
      option2: [
        { text: "默认排序", value: "all" },
        { text: "价格最高", value: "down" },
        { text: "价格最底", value: "up" }
      ],
      option3: [{ text: "销量", value: "a" }]
    };
  },
  methods: {
    toInfo(id) {
      this.$router.push({
        name: "info",
        params: {
          id: id,
        }
      });
    },
    sendData() {
      // 触发父组件的redata自定义事件并传值
      //                      order搜索关键字
      console.log("排序");
     
      this.$emit("redata", this.value2, this.keywords);
    }
  }
};
</script>

<style lang="less" scoped>
.top {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 50px;
  .van-dropdown-menu__item {
    width: 20%;
    font-size: 16px;
  }
  .van-button {
    width: 20%;
    border: none;
  }
}
.list {
  display: flex;
  flex-flow: row wrap;
  margin-top: 100px;
  margin-bottom: 60px;
  width: 100%;
  justify-content: space-between;
  padding: 0 10px;
  box-sizing: border-box;
  .goods {
    width: 48%;

    li:first-child {
      width: 100%;
      height: 172px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    li:nth-child(2) {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      word-break: break-all;
      color: #232326;
      font-size: 11px;
      margin-top: 10px;
      margin-bottom: 3px;
      padding: 0 4px;
    }
    li:last-child {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 5px;
      margin-top: 16px;
      span:first-child {
        color: red;
        font-size: 20px;
      }
      span:last-child {
        display: inline-block;
        width: 40px;
        height: 20px;
        text-align: center;
        line-height: 20px;
        border: 1px solid #ccc;
      }
    }
  }
}
.van-popup {
  text-align: center;
  font-size: 72px;
}
</style>
