<template>
  <div class="sousuo">
    <sou-tou :fg="true"></sou-tou>
    <div class="wocao">

      <div class="sout">
        <div class="sout1"
             v-if="pp">
          <span>最近搜索</span>
          <van-icon name="calender-o"
                    @click="del" />
        </div>
        <div class="sout2"
             v-if="pp">
          <button v-for="(item,index) in arrlis"
                  :key="index"
                  @click="zouqi(item)">{{item}}</button>
        </div>
        <div class="sout3">
          <span>热门搜索</span>
          <span class="ft"
                @click="yinc">隐藏</span>
        </div>
        <div class="sout4"
             v-if="remy">
          <button v-for="(item,index) in arr"
                  :key="index"
                  :class="index<3?acti:hh"
                  @click="zouqi(item)">{{item}}</button>
        </div>
        <div class="yidong"
             v-if="!remy">
          已经隐藏热门搜索
        </div>

      </div>
    </div>

  </div>
</template>
<script>
import souTou from "../components/soutou.vue"
export default {
  name: "sousuo",
  data () {
    return {
      arr: [
        "京东眼睛节",
        "华为p40发布会",
        "电视柜",
        "打印机",
        "读书记",
        "夫妇及",
        "尿不湿",
        "电脑",
        "家用电器",
        "家具沙发",
        "学生用品",
      ],
      acti: "acti",
      hh: "",
      arrlis: [],
      pp: true,
      remy: true,
    }
  },
  components: {
    souTou
  },
  methods: {
    del () {
      this.$Dialog.confirm({
        message: '确定要清空吗'
      }).then(() => {
        this.pp = false;
        localStorage.arr = [];
      }).catch(() => {
        this.$Toast.fail("你不清空那你瞎点啥")
      });
    },
    yinc () {
      this.remy = !this.remy;
    },
    zouqi (it) {
      this.$router.push({ name: "insuo", query: { value: it } })
    }

  },
  mounted () {
    if (localStorage.arr) {
      this.arrlis = JSON.parse(localStorage.arr)
      this.pp = true;
    } else {
      this.pp = false;
    }
  }
}
</script>
<style scoped>
.yidong {
  height: 120px;
  width: 100%;
  line-height: 120px;
  text-align: center;
}
.wocao {
  width: 100%;
  background: white;
}
.sousuo {
  height: 100vh;
  width: 100vw;
  background: #f3f3f3;
}
.van-icon {
  float: right;
  font-size: 20px;
}
.sout1 {
  width: 100%;
  padding-top: 15px;
}
.sout {
  width: 94%;
  margin-left: 3%;
  color: #555;

  border-top: 1px solid white;
}
.sout1,
.sout3 span {
  font-size: 16px;
}
.sout2 {
  width: 100%;
  margin: 0px 0 10px 0;
}
.sout3 {
  margin-top: 20px;
}
.sout2 button,
.sout4 button {
  margin-right: 12px;
  font-size: 14px;
  padding: 2px 10px;
  margin-top: 10px;
  background: #f3f3f3;
}
.ft {
  color: #999;
  float: right;
}
.sout .sout4 .acti {
  color: red;
}
.sout4 {
  padding-bottom: 20px;
}
</style>


