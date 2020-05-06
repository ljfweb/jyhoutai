<template>
  <div>
    <div class="ding">
      <van-row>
        <van-col span="2"
                 @click="back">
          {{woqu}}
        </van-col>
        <van-col span="18">
          <van-search v-model="value"
                      placeholder="请输入搜索关键词" />
        </van-col>
        <van-col span="4">
          <button @click="quye"
                  v-if="fg">搜索</button>
        </van-col>
      </van-row>
    </div>
  </div>
</template>
<script>
export default {
  name: "soutou",
  data () {
    return {
      value: "",
      woqu: "<",
      arrlist: [],
    }
  },
  props: ["fg", "val"],
  methods: {
    back () {
      this.$router.push("/home");
    },
    quye () {
      if (localStorage.arr) {
        this.arrlist = JSON.parse(localStorage.arr);
        if (this.value) {
          this.arrlist.unshift(this.value);
          localStorage.arr = JSON.stringify(this.arrlist);
        }
      } else {
        this.arrlist.unshift(this.value);
        localStorage.arr = JSON.stringify(this.arrlist);
      }
      this.$router.push({ name: "insuo", query: { value: this.value } })
    }

  },
  mounted () {
    this.value = this.val
  }
}
</script>

<style  scoped>
.ding {
  text-align: center;
  height: 46px;
  line-height: 44px;
  font-size: 20px;
  font-weight: 900;
  color: #999;
  border-bottom: solid 1px #ddd;
  background: white;
}
.ding button {
  font-size: 15px;
  background: red;
  padding: 3px;
  color: white;
  margin-top: -3px;
  font-weight: 600;
  margin-right: 10px;
  border-radius: 5px;
}
.ding .van-search {
  padding: 6px 0 4px 0;
}
.ding .van-search__content {
  border-radius: 20px;
}
</style>


