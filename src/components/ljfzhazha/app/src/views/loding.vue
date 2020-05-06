<template>
  <div class="lodi">
    <van-nav-bar title="我的京东"
                 left-arrow
                 left-text=""
                 right-text="···"
                 @click-left="onClickLeft" />

    <div class="lodingtop_max2">
      <dl>
        <dt @click="zouqi">
          <img src="//img11.360buyimg.com/jdphoto/s120x120_jfs/t21160/90/706848746/2813/d1060df5/5b163ef9N4a3d7aa6.png"
               alt="">

        </dt>
        <dd>jd_123155ffjk</dd>
        <dd class="hei">用户名: {{ $route.params.id}}</dd>
        <dd><span>京享值266</span><span>小白信誉 64.8</span></dd>
      </dl>
      <p @click="zouqi"><img src="//img11.360buyimg.com/jdphoto/s26x26_jfs/t14701/329/1603887827/338/bdda401f/5a53570bN44d2baad.png"
             alt="">
        <span>账户设置</span></p>
    </div>
    <van-grid v-for="(item,index) in 6"
              :key="index">
      <van-grid-item icon="photo-o"
                     text="文字" />
      <van-grid-item icon="photo-o"
                     text="文字" />
      <van-grid-item icon="photo-o"
                     text="文字" />
      <van-grid-item icon="photo-o"
                     text="文字" />
    </van-grid>

  </div>
</template>
<script>
export default {
  name: "loding",
  data () {
    return {
    }
  },
  methods: {
    zouqi () {
      this.$router.push("/shezhi")
    },
    onClickLeft () {
      this.$router.go(-1)
    }
  },
}
</script>
<style scoped>
.van-grid {
  margin-top: 15px;
}
.lodingtop_max2 p {
  margin-top: 15px;
  line-height: 12px;
}
.lodingtop_max2 p img {
  height: 12px;
  margin-right: 2px;
  margin-top: -3px;
}
.lodi {
  background: #eee;
  height: 95vh;
}
.van-nav-bar__text {
  font-size: 24px;
}
.hei {
  overflow: scroll;
  white-space: nowrap;
}
.lodingtop_max2 {
  height: 140px;
  width: 100%;
  background: linear-gradient(90deg, #eb3c3c, #ff7459);
  border-radius: 0 0 300px 300px/0 0 20px 20px;
  overflow: hidden;
}
.lodingtop_max2 dl {
  width: 70%;
  height: 50%;
  margin: 30px 10px 0 20px;
  float: left;
}
.lodingtop_max2 dl dt img {
  height: 100%;
}
.lodingtop_max2 dl dt {
  height: 100%;
  float: left;
  margin-right: 20px;
}
.lodingtop_max2 dd {
  line-height: 24px;
  color: white;
}
</style>
