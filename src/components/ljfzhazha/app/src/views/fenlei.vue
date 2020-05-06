<template>
  <div class="fenlei">
    <van-nav-bar left-arrow
                 @click-left="onClickLeft">
      <template #title>
        <van-search v-model="value"
                    shape="round"
                    placeholder="请输入搜索关键词"
                    @click="onkk" />
      </template>
    </van-nav-bar>
    <div class="dis">
      <div class="dao">
        <div>
          <ul>
            <li v-for="(item,index) in arr"
                :key="index"
                :class="activ==index?actt:mol"
                @click="sho(item.name,index)">
              {{item.name}}
            </li>
          </ul>
        </div>
      </div>
      <div class="showlist">
        <div>
          <dl v-for="(item,index) in ss "
              :key="index">
            <dt><img :src="item.image"
                   alt=""></dt>
            <dd>{{item.names}}</dd>
          </dl>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import arrlist from "../../public/fenleishuju.js"
import BScroll from "better-scroll"
export default {
  name: "fenlei",
  data () {
    return {
      value: "",
      showarr: [],
      ss: [],
      activ: 0,
      mol: "",
      actt: "acti",
      arr: arrlist.arrlist,
      myscroll: ""
    }
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    sho (name, index) {
      var show = name;
      this.showarr = this.arr.filter((ite) => {
        return ite.name == show
      })
      this.ss = this.showarr[0].data
      this.activ = index;
    },
    onkk () {
      this.$router.push("/sousuo")
    }
  },
  created () {
    this.ss = this.arr[0].data
  },
  mounted () {
    this.$nextTick(() => {
      this.myscroll = new BScroll(document.getElementsByClassName("dao")[0], {
        scrollY: true,
        click: true,
        mouseWheel: true,
      });

    }),
      this.$nextTick(() => {
        this.myscroll = new BScroll(document.getElementsByClassName("showlist")[0], {
          scrollY: true,
          click: true,
          mouseWheel: true,
        });

      })
  },


};
</script>
<style scoped>
.fenlei {
  height: 95vh;
  overflow: hidden;
}
.fenlei .van-search {
  padding: 7px 0 6px 0;
}
.fenlei .van-nav-bar__title {
  max-width: 76%;
}
.dao {
  width: 85px;
  height: 95vh;
  background: #f1fafa;
  overflow: hidden;
}
.dao ul li {
  line-height: 46px;
  text-align: center;
  font-size: 15px;
}
.dao ul .acti {
  background: white;
}
.dis {
  display: flex;
}
.showlist {
  width: 289px;
  height: 95vh;
  overflow: hidden;
}
.showlist dl {
  display: inline-block;
  text-align: center;
  width: 30%;
  margin-left: 3%;
  margin-top: 20px;
}
.showlist dl dt img {
  width: 100%;
}
</style>
