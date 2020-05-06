<template>
  <div>
    <van-popup
      :style="{ width: '70%', height: '100%' }"
      position="right"
      v-model="show"
    >
      <van-tag>新加坡</van-tag>
      <van-tag>美国</van-tag>
      <van-tag>中国</van-tag>
    </van-popup>
    <van-dropdown-menu style="position:fixed;top:46px;width:100%;">
      <van-dropdown-item v-model="value1" :options="option1" />
      <van-dropdown-item
        @change="sendData"
        v-model="value2"
        :options="option2"
      />
      <van-dropdown-item v-model="value3" :options="option3" />
      <van-button @click="show = true">筛选</van-button>
    </van-dropdown-menu>
    <div class="list" v-if="layoutFlag">
      <div>
        <div class="list_one" v-for="(item, index) in relist" :key="index">
          <router-link :to="{ name: 'info', params: { pid: item.goods_id } }">
            <img :src="item.image" alt="" />
            <p class="van-multi-ellipsis--l2">{{ item.goods_name }}</p>
            <div class="price">
              <span>${{ item.price }}</span>
              <span>看相似</span>
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <div class="list_12" v-if="!layoutFlag">
      <div>
        <div class="list_one" v-for="(item, index) in relist" :key="index">
          <router-link :to="{ name: 'info', params: { pid: item.goods_id } }">
            <img :src="item.image" alt="" />
            <div>
              <p class="van-multi-ellipsis--l2">{{ item.goods_name }}</p>
              <div class="price">
                <span>${{ item.price }}</span>
                <span>看相似</span>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <div class="changeLayout" @click="changeLay"></div>
  </div>
</template>

<script>
export default {
  name: "searchlist",
  props: ["relist", "keywords"], //接受父组件的数据
  mounted() {},
  beforeUpdate() {
    console.log(this.relist);
  },
  updated() {
    // console.log(this.relist);
  },
  methods: {
    sendData() {
      // 触发父组件的redata自定义事件并传值
      //                      order         搜索关键字
      this.$emit("redata", this.value2, this.keywords);
    },
    changeLay() {
      this.layoutFlag = !this.layoutFlag;
    }
  },
  data() {
    return {
      show: false,
      layoutFlag: true,
      value1: 0,
      value2: 1,
      value3: "a",
      option1: [
        { text: "全部商品", value: 0 },
        { text: "新款商品", value: 1 },
        { text: "活动商品", value: 2 }
      ],
      option2: [
        { text: "价格最高", value: 3 },
        { text: "价格最低", value: 4 },
        { text: "默认价格", value: 1 }
      ],
      option3: [{ text: "销量", value: "g" }]
    };
  }
};
</script>

<style lang="less" scoped>
.list {
  padding-top: 96px;
  height: auto;
}
.list div {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.list_one {
  background: white;
  margin-top: 10px;
  width: 175px;
  height: 271px;
  border: 1px solid #ccc;
  line-height: 20px;
  img {
    width: 176px;
    height: 176px;
  }
  p {
    width: 175px;
    height: 31px;
    line-height: 16px;
  }
  .price {
    width: 175px;
    height: 34px;
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    box-sizing: border-box;
    font-size: 17px;
    color: red;
    font-weight: bold;
  }
}
.list_12 {
  padding-top: 95px;
  .list_one {
    width: 100%;
    height: 135px;
    a {
      display: flex;
      img {
        width: 120px;
        height: 120px;
        margin-top: 10px;
        margin-left: 15px;
      }
      div {
        margin-left: 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        line-height: 25px;
      }
    }
  }
}
.changeLayout {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  position: fixed;
  bottom: 20%;
  right: 30px;

  background: url(https://img11.360buyimg.com/jdphoto/s170x170_jfs/t1/38805/26/9375/7083/5d0af669E1d9c6613/4c6552283a38acef.jpg);
  background-size: cover;
}
</style>
