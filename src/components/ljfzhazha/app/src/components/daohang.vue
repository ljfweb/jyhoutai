<template>
  <div>
    <div class="pp">
      <div :class="'myBorder'">
        多个复选框<br />
        1908和1909最可爱的人<br />
        <label>
          许学东<input type="checkbox"
                 value="1"
                 v-model="myCheckboxS"
                 @change="myIsCheck" />
        </label>
        <label>
          宋国帅<input type="checkbox"
                 value="2"
                 v-model="myCheckboxS"
                 @change="myIsCheck" />
        </label>
        <label>
          李浩<input type="checkbox"
                 value="3"
                 v-model="myCheckboxS"
                 @change="myIsCheck" />
        </label>
        <label>
          王一博<input type="checkbox"
                 value="4"
                 v-model="myCheckboxS"
                 @change="myIsCheck" />
        </label>
        <label>
          张智博<input type="checkbox"
                 value="5"
                 v-model="myCheckboxS"
                 @change="myIsCheck" />
        </label>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "daohang",
  data () {
    return {
      sms: "",
      myCheckboxS: ["3", "1"]
    }
  },
  methods: {
    diaow () {
      this.sms = "我去去去"
      console.log(this.sms)
    },
    myIsCheck () {

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
    })
  }
};
</script>
<style lang="less">
.pp {
  width: 100%;
  height: 15px;
  background: red;
}
.van-field {
  width: 100%;
}
</style>


