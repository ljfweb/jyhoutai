<template>
  <div class="info">
    <div class="nav_wrap">
      <p @click="$router.go(-1)">
        &lt;
      </p>
      <p style="font-weight:bold;font-size:15px;line-height:26px">...</p>
    </div>
    <van-nav-bar
      title="标题"
      @click-left="onClickLeft"
      right-text="按钮"
      left-arrow
      :style="navStyle"
    >
      <template #title>
        <ul class="nav">
          <li v-for="(item,index) in navData" 
          :key="index"
          :class="index==activeIndex?'active':''"
          @click="scrollpage(index)"
          >
            {{item.name}}
          </li>
          
        </ul>
      </template>
    </van-nav-bar>
    <!-- 轮播 -->
    <van-swipe id="model0" class="my-swipe1" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item, index) in bannerlist" :key="index">
        <img :src="item" alt="" @click="yulan(index)" />
      </van-swipe-item>
    </van-swipe>

    <div class="price">
      <span>￥{{ infoData.price }}</span>
      <span>
        <van-icon name="search"></van-icon>
        <a href="">收藏</a>
      </span>
    </div>

    <div class="pname">
      {{ infoData.goods_name }}
    </div>
    <div class="jieshao">
      {{ infoData.goods_subtitle }}
    </div>

<!-- 评论 -->
    <div class="pinglun">
      <p id="model1" style="font-weight:bolder;margin:20px 0px"><span style="font-size:18px;margin-right:10px">评价</span><span>2100+</span></p>
      <van-button>全部(2100+)</van-button>
      <van-button>好评(1234)</van-button>
      <van-button>中评(645)</van-button>
      <van-button>差评(456)</van-button>
      <van-button>其它（100+)</van-button>
    </div>

<!-- 推荐 -->
    <div class="tuijian">
     <p id="model2" style="font-weight:bolder;margin:20px 0px"><span style="font-size:18px;">猜你喜欢</span></p>
      <div class="list">
          <div>
            <div class="list_one" v-for="(item,index) in tuijianlist" :key="index"> 
              <router-link :to="{name:'info',params:{pid:item.goods_id}}">
                <img :src="item.image" alt="">
                <p class="van-multi-ellipsis--l2">{{item.goods_name}}</p>
                <p><span>￥{{item.price}}</span><span>看相似</span></p>
              </router-link>
            </div>
        </div>
	  </div>
    </div>

<!-- 详情 -->
    <div class="xiangqing" >
      <p id="model3" style="font-weight:bolder;margin:20px 0px"><span style="font-size:18px;margin-right:10px">详情</span></p>
      <div>
        <p style="font-size:13px;margin:10px 0px">{{detail.title}}</p>
        <div class="big_img" ref="big_img" v-html="detail.in_detail"></div>
      </div>
    </div>


    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" color="#07c160" />
      <van-goods-action-icon icon="cart-o" text="购物车" />
      <van-goods-action-icon icon="star" text="已收藏" color="#ff5000" />

      <van-goods-action-button
        @click="shouSku"
        type="warning"
        text="加入购物车"
      />
      <van-goods-action-button type="danger" text="立即购买" />
    </van-goods-action>
    <van-sku
      v-model="show"
      :sku="sku"
      :goods="goods"
      :goods-id="goodsId"
      :quota="quota"
      :quota-used="quotaUsed"
      :hide-stock="sku.hide_stock"
      @buy-clicked="onBuyClicked"
      @add-cart="onAddCartClicked"
      @sku-selected="changesku"
      @sku-prop-selected="changepro"
      :custom-stepper-config="customStepperConfig"
    />
  </div>
</template>
<script>
export default {
  name: "info",
  data() {
    return {
      activeIndex:0,
      pid: "",
      bannerlist: [],
      tuijianlist: [],
      detail: "",
      navData:[
        { name:"商品" },
        { name:"评价" },
        { name:"推荐" },
        { name:"详情" },
      ],
      navStyle:{
        opacity:0,//不透明为0
        position:"fixed",
        top:0,
        width:"100%",//nav样式
        
      },
      infoData: "",
      show: false,
      quotaUsed: 0,
      quota: 8,
      goods: {
        picture: "../assets/logo.png",
        name: "箱子"
      },
      goodsId: "19571",
      initialSku: {
        // 键：skuKeyStr（sku 组合列表中当前类目对应的 key 值）
        // 值：skuValueId（规格值 id）
        s0: "10000",
        s1: "10001",
        // 初始选中数量
        selectedNum: 3,
        // 初始选中的商品属性
        // 键：属性id
        // 值：属性值id列表
        selectedProp: {
          123: [1222]
        }
      },
      customStepperConfig: {//计数器
        //计数器数据
        // 自定义限购文案
        quotaText: "",
        // 自定义步进器超过限制时的回调
        handleOverLimit: data => {
          console.log(data);
        },
        // 步进器变化的回调
        handleStepperChange: currentValue => {
          console.log(currentValue);
          this.num = currentValue;
        }
        // 库存
        // stockNum: 1999
        // 格式化库存
        // stockFormatter: stockNum => { }
      },
      sku: {
        // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
        // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
        tree: [],
        // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
        list: [
          {
            id: 2259, // skuId，下单时后端需要
            price: 100, // 价格（单位分）
            s0: "10000", // 规格类目 k_s 为 s1 的对应规格值 id
            s1: "10001", // 规格类目 k_s 为 s2 的对应规格值 id
            // s3: "0", // 最多包含3个规格值，为0表示不存在该规格
            stock_num: 110 // 当前 sku 组合对应的库存
          }
        ],
        price:"1.00", // 默认价格（单位元）
        stock_num: 227, // 商品总库存
        collection_id: 2261, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
        //none_sku: false, // 是否无规格商品
        messages: [
          {
            // 商品留言
            datetime: "0", // 留言类型为 time 时，是否含日期。'1' 表示包含
            multiple: "0", // 留言类型为 text 时，是否多行文本。'1' 表示多行
            name: "留言", // 留言名称
            type: "text", // 留言类型，可选: id_no（身份证）, text, tel, date, time, email
            required: "0", // 是否必填 '1' 表示必填
            placeholder: "" // 可选值，占位文本
          }
        ],
        hide_stock: false // 是否隐藏剩余库存
      }
    }
  },
  created() {
    // 获取列表页传来的 参数
    this.pid = this.$route.params.pid
    console.log(this.pid)
    this.axios({
      url: "https://api.ymduo.com/item/index",
      method: "get",
      params: {
        gid: this.pid
      }
    }).then(res => {
      console.log(res)
      this.bannerlist = res.data.result.data.image
      
      this.tuijianlist = res.data.result.data.recommend; //推荐数据
      this.detail = res.data.result.data.detail; //详情
      this.infoData = res.data.result.data
      const attr = []
      this.goods.picture = res.data.result.data.image[0]
      res.data.result.data.attr.forEach((item, index) => {
        console.log(item)
        var val = item.attr_values.split(",") //[红色,蓝色]
        const myval = val.map((item, index) => {
          return { id: "1000" + index, name: item }
        })
        console.log("val---" + myval)
        attr.push({
          k: item.attr_name,
          v: myval,
          k_s: "s" + index
        })
      })
      console.log(attr)
      this.sku.tree = attr
    })
  },
  methods: {
    changesku(skuValue, selectedSku, selectedSkuComb) {
      console.log(skuValue, selectedSku, selectedSkuComb)
    },
    changepro(propValue, selectedProp, selectedSkuComb) {
      console.log(propValue, selectedProp, selectedSkuComb)
    },
    onClickLeft() {
      this.$router.go(-1);//回退上一页
    },
    shouSku() {
      this.show = true
    },
    yulan(index) {
      this.$ImagePreview({
        images: this.bannerlist,
        startPosition: index,

        onClose() {
          // do something
        }
      })
    },
    onBuyClicked() {},
    onAddCartClicked() {
      this.axios
      .post( "https://api.ymduo.com/cart/add",
          this.$qs.stringify({
            user_id: 956519,
            shop_id: this.infoData.storeInfo.store_id,
            goods_id: this.infoData.goods_id,
            sku_id: "",
            goods_num: this.num,
            active_type: 0
          })
          )
          .then(res=>{
            console.log(res)
          })
    },
    //点击切换效果
    scrollpage(index){
       this.activeIndex=index;
       var ele = document.querySelector("#model" + index);
       ele.scrollIntoView({ behavior: "smooth" });
    },

    //滚动切换效果
      infoScroll(){
        this.scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
        console.log(this.scrollTop);
        
        this.navStyle.opacity = 0.0025 * this.scrollTop;
        var model1Top=document.querySelector("#model1").offsetTop-60;
        var model2Top=document.querySelector("#model2").offsetTop-60;
        var model3Top=document.querySelector("#model3").offsetTop-60;
        console.log(model1Top);
        if(this.scrollTop<model1Top){
           this.activeIndex=0;
        }else if(this.scrollTop>=model1Top&&this.scrollTop<model2Top){
          this.activeIndex=1;
        }else if (this.scrollTop > model2Top && this.scrollTop < model3Top) {
        this.activeIndex = 2;
      } else if (this.scrollTop > model3Top) {
        this.activeIndex = 3;
      }

        
      }

    
      
    
  },
  
  mounted() {
    // 滚动事件
    window.addEventListener("scroll", this.infoScroll);
  },
}

</script>
<style lang="less">
.nav {
  display: flex;
  justify-content: space-around;

  .active{
    border-bottom: 3px solid red;
    height: 40px;
  }
}
.info {
  margin: 10px;
  margin-bottom: 60px;
}
.info .van-nav-bar {
  background: white;
}
.my-swipe1 .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 350px;
  text-align: center;
  background-color: #39a9ed;
}
.my-swipe1 img {
  height: 350px;
}
.price {
  line-height: 30px;

  display: flex;
  justify-content: space-between;
}
.price span:nth-child(1) {
  font-size: 32px;
  color: red;
  font-weight: bolder;
}
.price span:nth-child(2) {
  display: flex;
  flex-direction: column;
  text-align: center;
}
.pname {
  line-height: 35px;
  font-size: 23px;
  font-weight: bolder;
}
.jieshao {
  line-height: 25px;
  color: #bbb;
}
.van-goods-action-button {
  border-radius: 0%;
}
.pinglun{
  height: 100px;
  width: 100%;
 
 .van-button{
   width: 102px;
   height: 28px;
   background:pink;
   border-radius: 20px;
   margin:5px 8px;
   font-size: 12px;
   line-height: 28px;

 }
}
	.list div{
			display: flex;
			flex-wrap: wrap;
			justify-content: space-around;
		}
		.list_one{
			width:48%;
			line-height: 20px;
			float: left;
		}
		.list_one img{
			width:100%;
			height: 180px;
		}
		.list_one span:nth-child(1){
			color:red;
			font-size: 20px;
			margin-right: 30px;
		}
		
		.list_one span:nth-child(2){
			display: inline-block;
			border: 1px solid black;
			line-height: 26px;
    }
    .big_img {
    p {
      img {
        width: 100% !important;
      }
    }
  }
  .nav_wrap {
  width: 96%;
  height: 30px;
  display: flex;
  justify-content: space-between;
  padding: 0 8px;
  box-sizing: border-box;
  font-family: "黑体";
  background: transparent;
  position: absolute;
  top: 0;
  z-index: 999;
  p {
    width: 30px;
    height: 30px;
    background: rgba(0, 0, 0, 0.7);
    border-radius: 50%;
    text-align: center;
    color: white;
    line-height: 30px;
  }
}
</style>
