<template>
  <div class="cat">
    <div class="top">
      <div class="top_left">
        <van-icon name="arrow-left" @click="turn" />
      </div>

      <van-search v-model="value" shape="round" placeholder="键盘鼠标套装" @search="onSearch">
        <template #left-icon>
          <van-icon name="search" />
        </template>
      </van-search>
    </div>
    <!-- 左侧列表 -->

    <div class="center">
      <div class="left">
        <van-sidebar v-model="activeKey">
          <van-sidebar-item
            v-for="(item,index) in Catleftgoods"
            :key="index"
            :title="item.title"
            @click="ShowRight(item.cid)"
          />
        </van-sidebar>
      </div>

      <div class="right">
        <ul class="lei"  v-for="(item2,index2) in rightDataList" :key="index2" >
          <li>{{item2.title}}</li>
          <li>
            <div class="right_til" v-for="(ite,ind) in item2.goods" :key="ind" :pid="ite.pid" @click="toInfo(ite.gid)">
              <img :src="ite.image" />
              <span>{{ite.title}}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { Catleft } from "../api/index";
export default {
  name: "category",
  data() {
    return {
      value: "",
      activeKey: 0,
      Catleftgoods: [],
      rightDataList: []
    };
  },

  created() {},
  
  methods: {
    toInfo(id) {
      
      this.$router.push({
        name: "info",
        params: {
          id: id,
        }
      });
    },
    onSearch() {
      this.$Toast.success("没有写呢");
    },
    turn() {
      this.$router.go(-1);
    },
    onClickLeft() {},
    onClickRight() {},
    //左侧列表
    getLeft() {
      Catleft().then(res => {
        console.log(res);
        this.Catleftgoods = res.data;
        console.log(this.Catleftgoods);
      });
    },
    //右侧商品
    ShowRight(id) {
      this.rightDataList = [];
      this.axios
        .get(
          `http://vueshop.glbuys.com/api/home/category/show?cid=${id}&token=1ec949a15fb709370f`
        )
        .then(res => {
          console.log(res);
          this.rightDataList = res.data;
          console.log(this.rightDataList);
        });
    }
  },
  mounted() {
    this.getLeft();
  }
};
</script>

<style lang="less" scope>
.cat {
  position: relative;
  .top {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: white;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 100;
    .top_left {
      width: 10%;
      font-size: 24px;
      height: 100%;
      text-align: center;
      .van-icon {
        height: 100%;
        vertical-align: middle;
        line-height: 50px;
      }
    }

    .van-search {
      width: 80%;
      margin-left: -40px;
    }
  }
  .center {
    width: 100%;
    margin-top: 50px;
    display: flex;
    justify-content: space-around;

    .left {
      width: 20%;
      // box-sizing: border-box;
    }
    .right {
      width: 80%;
      padding-left: 20px;
      box-sizing: border-box;
      .lei {
        width: 100%;

        li:first-child {
          width: 100%;
          height: 30px;
          font-size: 20px;
          font-weight: 600;
        }
        li:last-child {
          width: 100%;
          display: inline-block;
          // height: 90px;
          display: flex;
          flex-flow: row wrap;
          .right_til {
            width: 25%;
            text-align: center;
            img {
              width: 60px;
              height: 60px;
            }
            span {
              display: inline-block;
              width: 90%;
              text-align: center;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
        }
      }
    }
  }
}
</style>
