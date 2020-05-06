<template>
  <div class="cart">

    <van-nav-bar title="我的购物车"
                 right-text="···"
                 left-arrow />
    <div class="dizhi">
      <span>
        <van-icon name="location-o" /> 昌平区 </span><span>编辑商品</span>
    </div>
    <van-checkbox-group v-model="checkedlist"
                        class=" goodslist"
                        v-for="(item,index) in shoparr"
                        :key="index"
                        ref="goods">
      <van-checkbox class="dae1"
                    :name="item.shop[0].shop_id"
                    @click="checkshop(item.shop[0].shop_id,index,item.shop)">
        <van-icon name="shop-o"
                  class="biao" />
        {{item.shop[0].shop_name}}
      </van-checkbox>
      <van-checkbox-group v-model="result[index]">
        <van-checkbox v-for="(ite,inde) in item.shop "
                      :key="inde"
                      :name="ite.goods_id"
                      @click="ooo(ite.goods_id,ite.shop_id,index)">
          <dl class="de1">
            <dt><img :src="ite.goods_pic"></dt>
            <dd>{{ite.goods_name}}</dd>
            <dd>
              <span class="pri">${{ite.current_price}}</span>
              <van-stepper v-model="ite.goods_num" />
            </dd>
          </dl>
        </van-checkbox>
      </van-checkbox-group>
    </van-checkbox-group>

    <van-submit-bar :price="3050"
                    button-text="提交订单"
                    @submit="onSubmit">
      <van-checkbox v-model="checked"
                    @click=" checkAll ()">全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>

<script>

export default {
  name: "Cart",
  data () {
    return {
      shoparr: [],
      checkedlist: [],
      result: [],
      zhongarr: [],
      checked: false
    }
  },

  methods: {
    onSubmit () {

    },
    onClickEditAddress () {

    },
    //全选
    checkAll () {
      this.checked = !this.checked;
      if (this.checked) {
        //处理全选,全部复选框都选中
        for (var i = 0; i < this.shoparr.length; i++) {
          //商店复选框全部选中
          this.checkedlist.push(this.shoparr[i].shop[0].shop_id)
          for (var j = 0; j < this.shoparr[i].shop.length; j++) {
            console.log(this.shoparr[i].shop[j])
            //商品复选框全部选中
            this.result[i].push(this.shoparr[i].shop[j].goods_id)
          }
        }
      } else {
        this.checkedlist = [];
        this.result = this.result.map(item => {
          item = []
          return item
        })
      }
    },
    //商店点击
    checkshop (id, index, arr) {
      //点击商店管理商品状态
      if (this.checkedlist.indexOf(id) == -1) {
        this.checkedlist.push(id)
        this.result[index] = arr.map(item => {
          return item.goods_id
        })
      } else {
        this.checkedlist = this.checkedlist.filter(item => {
          return item != id
        })
        this.result[index] = []
      }
      //点击商店管理全选状态
      if (this.checkedlist.length == this.shoparr.length) {
        this.checked = true
      } else {
        this.checked = false
      }
      console.log(this.checkedlist, this.result)
    },
    //单个商品点击
    ooo (id, idd, index) {
      //点击商品管理店状态
      if (this.result[index].indexOf(id) < 0) {
        if (this.result[index].length + 1 == this.shoparr[index].shop.length) {
          this.checkedlist.push(idd)
        }
      } else {
        this.checkedlist = this.checkedlist.filter(item => {
          return item != idd
        })
      }
      //点击商品管理全选状态
      if (this.checkedlist.length == this.shoparr.length) {
        this.checked = true
      } else {
        this.checked = false
      }
      console.log(this.result, id, this.checkedlist)
    }
  },
  created () {
    this.axios.post("https://api.ymduo.com/Cart/lists",
      this.$qs.stringify({
        user_id: 956551
      })
    ).then(res => {
      console.log(res)
      this.shoparr = res.data.result.data.info
      console.log(this.shoparr)
      var that = this
      for (var i = 0; i < that.shoparr.length; i++) {
        var a = [];
        that.result.push(a);
      }
    })
  },

};
</script>
<style lang="less" scoped>
.van-submit-bar {
  bottom: 50px;
  opacity: 0.9;
}
.biao {
  vertical-align: -5px;
  font-size: 22px;
  color: #999;
}
.pri {
  color: red;
  font-size: 16px;
}
.de1 {
  height: 120px;
  width: 100%;
  border-top: 1px solid white;
  dt {
    height: 100%;
    width: 30%;
    float: left;
    padding-top: 20px;
    img {
      height: 100%;
      width: 100%;
    }
  }
  dd {
    margin-left: 120px;
    display: flex;
    margin-top: 30px;
    width: 60%;
    color: #333;
    justify-content: space-between;
  }
}
.car {
  background: #f1f1f1;
  margin-bottom: 150px;
}
.dizhi {
  font-size: 16px;
  color: #999;
  display: flex;
  justify-content: space-around;
  line-height: 40px;
  background: white;
}
.goodslist {
  background: white;
  margin-top: 15px;
  padding: 0 15px;
  border-top: 1px solid white;
}
.dae1 {
  font-size: 16px;
  margin: 15px 0 15px 0;
  font-weight: 600;
}
</style>
