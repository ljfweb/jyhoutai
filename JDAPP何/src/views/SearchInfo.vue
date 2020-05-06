<template>
  <div style="background-color: white;">
    <!-- 格式显示和表格显示 -->
    <div class="showRules" @click="changeRuleShow">
      <!-- 显示列和平行块图标 -->
      <van-icon name="qr" color="black" size="24px" v-if="!showRules" />
      <van-icon name="orders-o" color="black" size="24px" v-if="showRules" />
    </div>
    <!-- 引入搜索系统classify页面 -->
    <classify-header></classify-header>
    <!-- tab切换事件change -->
    <van-tabs v-model="active" @click="salesFunction">
      <van-tab>
        <template #title>
          <van-dropdown-menu>
            <van-dropdown-item
              v-model="value1"
              :options="option1"
              @change="changeItem"
            />
          </van-dropdown-menu>
        </template>
        <template #default>
          <!-- 商品显示区域 -->
          <van-row v-if="!showRules">
            <van-col span="24">
              <van-card
                v-for="item in searchValListData"
                :key="item.cid"
                :thumb="item.image"
                :price="item.price"
                :cid="item.cid"
                :gid="item.gid"
                @click="turnDetailFunction(item.gid)"
              >
                <template #title
                  ><div class="van-multi-ellipsis--l2">
                    {{ item.title }}
                  </div></template
                >
                <template #num> 销量:{{ item.sales }}</template>
              </van-card>
            </van-col>
          </van-row>
          <van-row
            type="flex"
            justify="center"
            class="shoppingcon"
            v-if="showRules"
          >
            <div
              class="recommendshopshow"
              v-for="(item, index) in searchValListData"
              :key="index"
              @click="turnDetailFunction(item.gid)"
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
        </template>
      </van-tab>
      <van-tab title="销量">
        <template #default>
          <!-- 商品显示区域 -->
          <van-row v-if="!showRules">
            <van-col span="24">
              <van-card
                v-for="item in searchValListData"
                :key="item.cid"
                :thumb="item.image"
                :price="item.price"
                :cid="item.cid"
                :gid="item.gid"
                @click="turnDetailFunction(item.gid)"
              >
                <template #title
                  ><div class="van-multi-ellipsis--l2">
                    {{ item.title }}
                  </div></template
                >
                <template #num> 销量:{{ item.sales }}</template>
              </van-card>
            </van-col>
          </van-row>
          <van-row
            type="flex"
            justify="center"
            class="shoppingcon"
            v-if="showRules"
          >
            <div
              class="recommendshopshow"
              v-for="(item, index) in searchValListData"
              :key="index"
              @click="turnDetailFunction(item.gid)"
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
        </template>
      </van-tab>
      <van-tab>
        <template #title>
          <van-dropdown-menu>
            <van-dropdown-item>
              <template #title>
                有货优先
              </template>
              <template #default>
                <van-checkbox-group
                  v-model="checkResult"
                  ref="checkboxGroup"
                  @change="addSeclect"
                >
                  <van-checkbox
                    v-for="item in option2"
                    :key="item.value"
                    :name="item.value"
                    >{{ item.text }}</van-checkbox
                  >
                </van-checkbox-group>
              </template>
            </van-dropdown-item>
          </van-dropdown-menu>
        </template>
        <template #default>
          {{ value2 }}
        </template>
      </van-tab>
      <van-tab title="筛选">
        <!-- 商品显示区域 -->
        <van-row v-if="!showRules">
          <van-col span="24">
            <van-card
              v-for="item in searchValListData"
              :key="item.cid"
              :thumb="item.image"
              :price="item.price"
              :cid="item.cid"
              :gid="item.gid"
              @click="turnDetailFunction(item.gid)"
            >
              <template #title
                ><div class="van-multi-ellipsis--l2">
                  {{ item.title }}
                </div></template
              >
              <template #num> 销量:{{ item.sales }}</template>
            </van-card>
          </van-col>
        </van-row>
        <van-row
          type="flex"
          justify="center"
          class="shoppingcon"
          v-if="showRules"
        >
          <div
            class="recommendshopshow"
            v-for="(item, index) in searchValListData"
            :key="index"
            @click="turnDetailFunction(item.gid)"
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
      </van-tab>
    </van-tabs>
    <!-- 分页器 -->
    <van-pagination
      v-model="currentPageNum"
      :page-count="totalPageNum"
      force-ellipses
      @change="changeCurrentPageNums"
    />
    <!-- 遮罩层 -->
    <van-overlay :show="filterShow" @click="filterShow = false">
      <div class="wrapper" @click.stop>
        <div class="block">
          <h1 class="blockTitle">价格</h1>
          <!-- 输入框 -->
          <van-row type="flex" justify="center" align="center">
            <van-col>
              <van-field v-model="LowPricevalue" placeholder="最低价" />
            </van-col>
            <van-col>——</van-col>
            <van-col>
              <van-field v-model="HighPricevalue" placeholder="最高价" />
            </van-col>
          </van-row>
          <!-- 确定取消按钮 -->
          <van-row style="margin-top: 20px;">
            <van-col :span="12">
              <van-button style="width: 100%;" @click="Mysubmit('cancel')"
                >取消</van-button
              >
            </van-col>
            <van-col :span="12">
              <van-button
                type="danger"
                style="width: 100%;"
                @click="Mysubmit('ok')"
                >确定</van-button
              >
            </van-col>
          </van-row>
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
import classifyHeader from "../components/classifyHeader.vue";
export default {
  components: { classifyHeader },
  created() {
    //把上一页传来的值写入后台接口函数**如果传来的字段为搜索字段的话就进行搜索
    if (this.$route.query.searchVal)
      return this.searchFunction(
        this.$route.query.searchVal,
        this.renderRule,
        this.currentPageNum,
        100,
        200
      );
    //如果传来的字段为cid的话就进行下面的操作
    if (this.$route.query.cid)
      return this.hotWordsDate(
        this.$route.query.cid,
        1,
        this.option1[this.value1].rule
      );
  },
  data() {
    return {
      //显示格式**有列表和平行块
      showRules: false,
      //遮罩层显示隐藏
      filterShow: false,
      active: 0,
      value1: 0,
      option1: [
        { text: "综合", value: 0, rule: "all" },
        { text: "价格最低", value: 1, rule: "up" },
        { text: "价格最高", value: 2, rule: "down" }
      ],
      checkResult: [],
      value2: 1,
      option2: [
        { text: "211限时达", value: 0 },
        { text: "有货优先", value: 1 },
        { text: "货到付款", value: 2 },
        { text: "京东国际", value: 3 },
        { text: "PLUS专享", value: 4 },
        { text: "促销全球", value: 5 },
        { text: "配送全球", value: 6 }
      ],
      // 总页数
      totalPageNum: 0,
      // 当前页数
      currentPageNum: 1,
      searchValListData: [],
      //默认全部渲染
      renderRule: "all",
      //最低价和最高价
      LowPricevalue: "",
      HighPricevalue: "",
      //请求总页数旨第一次请求即可
      reqTotal: 1
    };
  },
  mounted() {},
  methods: {
    //下拉框指定值渲染
    changeItem() {
      // console.log(this.value1);
      // console.log(this.option1[this.value1].rule)
      this.searchValListData = [];
      this.searchFunction(
        this.$route.query.searchVal,
        this.option1[this.value1].rule,
        this.currentPageNum,
        100,
        200
      );
      // 下拉更新cid
      if (this.$route.query.cid)
        return this.hotWordsDate(
          this.$route.query.cid,
          1,
          this.option1[this.value1].rule
        );
    },
    //销量函数***监控栏目Tab 标签页****销量函数****筛选
    salesFunction() {
      console.log(this.active);
      if (this.active == 1) {
        this.searchValListData = [];
        this.currentPageNum = 1;
        this.hotWordsDate(this.$route.query.cid, 1, "sales");
        this.searchFunction(
          this.$route.query.searchVal,
          "sales",
          this.currentPageNum,
          100,
          200
        );
      }
      if (this.active == 3) {
        this.filterShow = true;
      }
    },
    addSeclect() {
      console.log(this.checkResult);
    },
    //函数规则函数，第一个参数时搜索字段，第二参数是渲染规则，第三个参数时传入当前页码,第四个参数时最小价格，第五个参数时最高价格***********核心函数
    async searchFunction(text, rules, nowPageNum, low, high) {
      console.log("上一页传来的值==>", text);
      const { data: res } = await this.$axios.get(
        `/goods/search?kwords=${text}&param=${"json"}&page=${nowPageNum}&price1=${low}&price2=${high}&otype=${rules}&cid=${""}&token=1ec949a15fb709370f`
      );
      console.log(res);
      //总页数
      if (this.reqTotal == 1) {
        this.totalPageNum = res.pageinfo.pagesize;
      }
      console.log(res.data);
      // 相关搜索赋值
      this.searchValListData = res.data;
      this.reqTotal++; //第二次则不请求总页数
    },
    //点击分页器触发
    changeCurrentPageNums() {
      this.searchValListData = []; //由于第二页没有数据股因此没有办法进行渲染，只会报total为空
      this.searchFunction(
        this.$route.query.searchVal,
        this.option1[this.value1].rule,
        this.currentPageNum,
        100,
        200
      );
      // cid搜索类别
      this.hotWordsDate(
        this.$route.query.cid,
        this.currentPageNum,
        this.option1[this.value1].rule
      );
    },
    //筛选点击事件进行操作
    Mysubmit(event) {
      //点击取消事件
      if (event == "cancel") {
        console.log(111111);
        //遮罩层显示隐藏
        this.filterShow = false;
      }
      //点击确定事件
      if (event == "ok") {
        //获取值
        console.log(this.LowPricevalue, this.HighPricevalue);
        this.searchValListData = [];
        this.searchFunction(
          this.$route.query.searchVal,
          this.option1[this.value1].rule,
          this.currentPageNum,
          this.LowPricevalue,
          this.HighPricevalue
        );
        this.filterShow = false;
      }
    },
    //跳转到商品详情页
    turnDetailFunction(idds) {
      this.$router.push({ name: "detail", query: { gid: idds } });
    },
    //改变显示样式列表形式和平行块
    changeRuleShow() {
      this.showRules = !this.showRules;
    },
    //搜索相关的cid类性值获得更多的数据
    async hotWordsDate(cid, pageNum, rules) {
      // console.log(cid);
      const { data: res } = await this.$axios.get(
        `/goods/search?page=${pageNum}&cid=${cid}&token=1ec949a15fb709370f&otype=${rules}`
      );
      console.log(res);
      //总页数
      if (this.reqTotal == 1) {
        this.totalPageNum = res.pageinfo.pagesize;
      }
      console.log(res.data);
      // 相关搜索赋值
      this.searchValListData = [];
      this.searchValListData = res.data;
      this.reqTotal++; //第二次则不请求总页数
    }
  }
};
</script>
<style lang="less" scoped>
.showRules {
  position: fixed;
  width: 34px;
  height: 34px;
  bottom: 100px;
  right: 14px;
  border-radius: 50%;
  background-color: white;
  border: 1px solid;
  z-index: 100;
  text-align: center;
  .van-icon {
    margin-top: 5px;
  }
}
.van-checkbox-group {
  padding: 10px;
  .van-checkbox {
    margin-bottom: 6px;
  }
}
/* 遮罩层内部的方块 */
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  width: 80%;
  height: 97%;
  background-color: #fff;
  padding: 10px;
  margin-left: 20%;
  .blockTitle {
    height: 25px;
    max-width: 250px;
    overflow: hidden;
    font-size: 16px;
    color: #333;
    text-overflow: ellipsis;
  }
  .van-field {
    background-color: gainsboro;
  }
}
/* 对遮罩层控制 */
.van-overlay {
  width: 100%;
  margin-top: 100px;
  z-index: 1000;
}
/* 块状显示 */
.shoppingcon {
  display: flex;
  flex-wrap: wrap;
  margin-top: 6px;
}
.recommendshopshow {
  border: 1px solid gainsboro;
  padding: 4px;
  width: 168px;
  height: 270px;
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
