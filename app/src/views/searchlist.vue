<template>
  <div class="searchlist">
    <!-- <van-search shape="round">
      <template #left>
        <div class="fanhui" @click="fanhui">返回</div>
      </template>
    </van-search> -->
    <ul class="ul">
      <li>
        <van-dropdown-menu active-color="#ee0a24">
          <van-dropdown-item v-model="value1" :options="option1" />
        </van-dropdown-menu>
      </li>
      <li>销量</li>
      <li>
        <van-dropdown-menu active-color="#ee0a24">
          <van-dropdown-item v-model="value2" :options="option2" @change="sendData"/>
        </van-dropdown-menu>
      </li>
      <li>
        <van-button class="shai" @click="showPopup">筛选</van-button>
        <van-popup
          v-model="show"
          position="right"
          :style="{ width: '80%', height: '100%' }"
        >
          <div class="shaixuan">
            <p><span>配送至</span> <span>xx省xx市xx区</span></p>
            <div class="kong"></div>
            <div class="tag">
              <van-tag color="#ccc" text-color="black">标签</van-tag>
              <van-tag color="#ccc" text-color="black">标签</van-tag>
              <van-tag color="#ccc" text-color="black">标签</van-tag>
              <van-tag color="#ccc" text-color="black">标签</van-tag>
              <van-tag color="#ccc" text-color="black">标签</van-tag>
            </div>
            <div class="kong"></div>
            <div>
              <p><span>分类</span><span>全部分类</span></p>
            </div>
            <div class="kong"></div>
            <div>
              <p><span>价格</span></p>
              <van-tag color="#ccc" text-color="black">标签</van-tag>
              <van-tag color="#ccc" text-color="black">标签</van-tag>
              <van-tag color="#ccc" text-color="black">标签</van-tag>
            </div>
            <div class="kong"></div>
            <div>
              <p><span>品牌</span></p>
              <van-tag color="#ccc" text-color="black">标签</van-tag>
              <van-tag color="#ccc" text-color="black">标签</van-tag>
              <van-tag color="#ccc" text-color="black">标签</van-tag>
            </div>

            <div class="btn">
              <van-button type="default" @click="del">取消</van-button>
              <van-button type="danger" @click="sure">确定</van-button>
            </div>
          </div>
        </van-popup>
      </li>
    </ul>
    

    <div class="list_1" v-if="Flag">
      <div class="list_one" v-for="(item ,index) in relist" :key="index">
        <img :src="item.image" alt="" />
        <div><p class="van-multi-ellipsis--l2">{{item.goods_name}}</p>
        <span>￥{{item.price}}</span></div>
      </div>
    </div>
      
     <div class="list_2" v-if="!Flag">
      <div class="list_one" v-for="(item ,index) in relist" :key="index">
        <img :src="item.image" alt="" />
        <div><p class="van-multi-ellipsis--l2">{{item.goods_name}}</p>
        <span>￥{{item.price}}</span></div>
      </div>  
    </div>
    
    <div class="change" @click="change"><van-icon name="apps-o"/></div>
  </div>
</template>
<script>
export default {
  name: "searchlist",
  props: ["relist","keywords"],
  data() {
    return {
      show: false,
      Flag:true,
      value1: 0,
      value2: "a",
      switch1: false,
      switch2: false,
      option1: [
        { text: "综合", value: 0 },
        { text: "最新上架", value: 1 },
        { text: "价格最低", value: 2 },
        { text: "价格最高", value: 3 }
      ],
      option2: [
        { text: "默认排序", value: "a" },
        { text: "好评排序", value: "b" },
        { text: "销量排序", value: "c" }
      ]
    }
  },
  methods: {
    showPopup() {
      this.show = true
    },
    sendData() {
      
      //                    order         搜索关键字
      //  切换排序   keywords 搜索字段    历史记录去调取
      if (this.keywords == "") {
        this.$emit("redata", this.value2, this.historySearch);
      } else {
        this.$emit("redata", this.value2, this.keywords);
      }
    },
    // fanhui() {
    //   this.$router.go(-2)
    // },
    sure() {},
    del() {
      this.show = false
    },
    change(){
      this.Flag=!this.Flag;
    }
  }
}
</script>
<style lang="less" scoped>
.searchlist{
  position: relative;
}
.ul {
  display: flex;
  justify-content: space-around;
  font-size: 15px;
  height: 50px;
  line-height: 50px;
}
.shai{
  width: 80px;
  height: 30px;
  font-size: 16px;
  line-height: 30px;
  border: none;

}
.shaixuan .van-tag {
  margin: 10px;
  padding: 5px 10px;
}
.shaixuan p {
  display: flex;
  justify-content: space-between;
  margin: 5px 10px;
  span:nth-child(1) {
    font-size: 20px;
  }
}
.kong {
  width: 100%;
  height: 15px;
  background: #f5f5f5;
}
.shaixuan {
  position: relative;
  .btn {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    .van-button {
      width: 50%;
    }
  }
}
.list_one  {
  
  img{
width: 120px;
height: 120px;
margin:5px 0px 15px 15px;
}
p{
font-size: 18px;

}
span{color:red;
font-size: 22px;line-height: 30px;}}
.list_1 {
  width:100%;
  img{
    float: left;
  }
  .list_one{ 
width:350px;
height: 130px;
  margin:10px 20px 0px;
 
div{
  width: 50%;margin-left: 20px;
  float: left;
}


}}
.list_2{
  margin: 10px 20px 0px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
 .list_one{
   width: 48%;
   border: 1px solid #ccc;
   margin-bottom: 10px;
  
 }
}
.change{
  width: 35px;
  height: 35px;
  border: 1px solid #ccc;
  border-radius: 50%;
  position: fixed;
  bottom: 25%;
  right: 10%;
  text-align: center;
  padding-top: 5px;
  box-sizing: border-box;
  .van-icon{
    font-size: 25px;
  }
}
</style>
