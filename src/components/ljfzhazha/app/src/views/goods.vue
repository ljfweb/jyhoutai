<template>
  <div>
    <div>
      <span class="fanhui"
            @click="chele">{{fan}}</span>
      <van-swipe class="my-swipe"
                 @change="onChange">
        <van-swipe-item v-for="(item,index) in imglist "
                        :key="index">
          <img :src="item"
               alt="">
        </van-swipe-item>
        <template #indicator>
          <div class="custom-indicator">
            {{ current + 1 }}/{{len}}
          </div>
        </template>
      </van-swipe>
      <span class="fanhui"
            @click="chele">{{fan}}</span>
      <h1 class="hh">
        <span class="sp1">¥{{pri}}</span>
        <span class="sp2">¥{{oldpri}}</span>
      </h1>
      <p>{{kk}}</p>
      <p>{{subtitle}}</p>
      <van-goods-action>
        <van-goods-action-icon icon="chat-o"
                               text="客服" />
        <van-goods-action-icon icon="shop-o"
                               text="店铺" />
        <van-goods-action-icon icon="cart-o"
                               text="购物车"
                               :badge="$store.state.num"
                               url="/car" />
        <van-goods-action-button type="warning"
                                 text="加入购物车"
                                 @click="chulai" />
        <van-goods-action-button type="danger"
                                 text="立即购买" />
      </van-goods-action>
      <h3>详情</h3>
      <div class="goods_a2"
           v-html="xiang">

      </div>
      <van-popup v-model="show"
                 position="bottom"
                 :style="{ height: '70%' }">
        <dl class="ddl">
          <dt>
            <img :src="imga">
          </dt>
          <dd>
            ¥<span class="hoo">{{pri}}</span>
          </dd>
          <dd>
            已选:
          </dd>
        </dl>
        <p>规格</p>
        <p>无</p>
        <div class="numm">
          <span>数量</span>
          <van-stepper v-model="value" />
        </div>
        <p>服务保障无</p>
        <button @click="addcar"
                class="que">确认</button>
        <van-icon name="close"
                  class="ding"
                  @click="quxiao" />
      </van-popup>
    </div>
  </div>
</template>
<script>
export default {
  name: "goodsss",
  data () {
    return {
      fan: "‹",
      current: 0,
      imglist: "",
      len: "",
      pri: "",
      oldpri: "",
      kk: "",
      subtitle: "",
      show: false,
      imga: "",
      value: 1,
      goodsid: "",
      shopid: "",
      xiang: "",

    }
  },
  methods: {
    onChange (index) {
      this.current = index;
    },

    chele () {
      this.$router.go(-1)
    },
    chulai () {
      this.show = true;
    },
    addcar () {
      console.log(this.shopid, this.goodsid, this.value)
      this.axios.post("https://api.ymduo.com/cart/add", this.$qs.stringify({
        user_id: "956551",
        shop_id: this.shopid,
        goods_id: this.goodsid,
        sku_id: "",
        goods_num: this.value,
        active_type: 0,
      })
      ).then(res => {
        console.log(res)
        this.$store.commit("dibu");
      })
      this.$Toast.success('加入购车成功');
      this.show = false;
    },
    quxiao () {
      this.show = false;
    }
  },

  created () {
    this.axios({
      url: "https://api.ymduo.com/item/index",
      method: "get",
      params: {
        gid: this.$route.query.goodsid
      }
    }).then(res => {
      console.log(res.data)
      this.imglist = res.data.result.data.image
      this.len = res.data.result.data.image.length
      this.pri = res.data.result.data.price
      this.oldpri = res.data.result.data.old_price
      this.kk = res.data.result.data.goods_name
      this.subtitle = res.data.result.data.goods_subtitle
      this.imga = res.data.result.data.image[0]
      this.goodsid = res.data.result.data.goods_id
      this.shopid = res.data.result.data.storeInfo.store_id
      this.xiang = res.data.result.data.detail.in_detail
      console.log(this.imglist)

    })
    this.$store.commit("dibu");
  }
}
</script>
<style scoped lang="less">
.ding {
  font-size: 24px;
  position: absolute;
  top: 20px;
  right: 20px;
  background: #eee;
  border-radius: 100%;
  color: #bbbbbb;
}
.goods_a2 {
  p {
    height: 30px;
    width: 35px;
    overflow: hidden;
    img {
      height: 300px;
      width: 100%;
    }
  }
}
h3 {
  line-height: 40px;
  font-size: 18px;
  text-align: center;
  margin-top: 20px;
}
.goods_a1 {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 20;
  line-height: 45px;
  display: flex;
  justify-content: space-around;
  font-size: 18px;
}
.que {
  width: 90%;
  margin: 15px 0 20px 5%;
  height: 40px;
  background: red;
  color: white;
  font-size: 16px;
  border-radius: 30px;
}

.numm {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  margin: 15px 0 20px 5%;
}
.ddl {
  width: 90%;
  margin-left: 5%;
  margin-top: 15px;
  height: 100px;
}
.ddl dt {
  height: 100%;
  width: 100px;
  float: left;
}
.ddl dt img {
  height: 100%;
  width: 100%;
}
.ddl .hoo {
  color: red;
  font-size: 24px;
}
.ddl dd {
  margin-top: 30px;
  font-size: 14px;
  line-height: 30px;
}

p {
  line-height: 30px;
  font-size: 14px;
  margin-left: 20px;
}
.hh {
  line-height: 40px;
}
.custom-indicator {
  position: absolute;
  right: 5px;
  bottom: 5px;
  padding: 2px 5px;
  font-size: 12px;
  color: red;
  background: rgba(0, 0, 0, 0.1);
}
.my-swipe .van-swipe-item {
  font-size: 20px;
  width: 375px;
  height: 425px;
  line-height: 150px;
  text-align: center;
}
.fanhui {
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 30px;
  display: inline-block;
  height: 30px;
  width: 30px;
  text-align: center;
  color: white;
  border-radius: 100%;
  background: #000;
  opacity: 0.6;
}
.van-swipe-item img {
  width: 100%;
  height: 100%;
}
.sp1 {
  font-size: 30px;
  margin-left: 20px;
  color: red;
}
.sp2 {
  color: #666;
  margin-left: 10px;
  font-size: 14px;
}
</style>
