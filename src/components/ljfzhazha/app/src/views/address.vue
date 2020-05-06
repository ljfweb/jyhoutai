<template>
  <div>
    <van-nav-bar title="收货地址"
                 left-arrow
                 @click-left="back" />
    <van-address-list v-model="chosenAddressId"
                      :list="list"
                      :disabled-list="disabledList"
                      disabled-text="以下地址超出配送范围"
                      default-tag-text="默认"
                      @add="onAdd"
                      @edit="onEdit" />
  </div>
</template>
<script>
import { Toast } from 'vant';
export default {
  name: "addresss",
  data () {
    return {
      chosenAddressId: '1',
      list: [

      ],
      disabledList: [
        {
          id: '3',
          name: '王五',
          tel: '1320000000',
          address: '浙江省杭州市滨江区江南大道 15 号'
        }
      ]
    }
  },
  methods: {
    onAdd () {
      this.$router.push("/newzeng")
    },
    onEdit (item, index) {
      Toast('编辑地址:' + index);
    },
    back () {
      this.$router.push("/shezhi")
    }
  },
  created () {
    this.axios
      .post(
        "https://api.ymduo.com/Address/addresslists",
        this.$qs.stringify({
          uid: 956519
        })
      ).then(res => {
        console.log(res)
        this.list = res.data.result.data.map(dd => {
          return {
            id: dd.id,
            tel: dd.phone,
            address: dd.address,
            name: dd.name,
          };
        })
        console.log(this.list)
      })
  }
}
</script>
<style scoped>
.van-nav-bar {
  background: linear-gradient(#fff, #efefef);
}
</style>

