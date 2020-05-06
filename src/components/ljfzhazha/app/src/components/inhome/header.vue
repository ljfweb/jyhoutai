<template>
  <div class="headd">
    <div class="www">

      <div class="banner">
        <img src="https://img.51miz.com/preview/element/00/01/09/73/E-1097315-F25A8FC7.jpg!/quality/90/unsharp/true/compress/true/format/jpg"
             alt="">
      </div>
      <div class="lunbo">
        <van-swipe class="my-swipe"
                   :autoplay="2000"
                   indicator-color="white">
          <van-swipe-item v-for="(item,index) in bannerlist"
                          :key="index">
            <a :href="item.url">
              <img :src="item.image"
                   alt="">
            </a>
          </van-swipe-item>
        </van-swipe>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "headers",
  data () {
    return {

      bannerlist: [
        {
          image: "//m.360buyimg.com/mobilecms/s700x280_jfs/t1/93100/33/16384/143271/5e7c7858E3e2af7bc/6eb3cfb193c0fead.jpg!cr_1125x445_0_171!q70.jpg.dpg",
          url: "//pro.m.jd.com/mall/active/KcfFqWvhb5hHtaQkS4SD1UU6RcQ/index.html"
        },
        {
          image: "//m.360buyimg.com/mobilecms/s700x280_jfs/t1/97388/21/16491/100931/5e7cc95fEabe26d5e/346ce7f598e13ebd.jpg!cr_1125x445_0_171!q70.jpg.dpg",
          url: "//h5.m.jd.com/rn/3LmeNuQDfT1nN8qZS4jZoZQMFeV7/index.html"
        },
        {
          url: "//h5.m.jd.com/babelDiy/Zeus/28Lq4LbJDJcuMhNb9tQ6EcbZ8GTu/index.html",
          image: "//m.360buyimg.com/mobilecms/s700x280_jfs/t1/103143/35/16049/85972/5e7999f9Eff8385e7/3ed837e6f9ce0b04.jpg!cr_1125x445_0_171!q70.jpg.dpg",
        },
        {
          url: "//pro.m.jd.com/mall/active/4FvnQ66bwuwh2eojfw1p8BGA8Ka9/index.html",
          image: "//m.360buyimg.com/mobilecms/s700x280_jfs/t1/102100/25/15081/95843/5e6c67b1E1965eda5/a9fdb6d5f079e30f.jpg!cr_1125x445_0_171!q70.jpg.dpg",
        },
        {
          image: "//imgcps.jd.com/ling4/7651925/55SE6YCJ5aW956S8/55SE6YCJ5aW956S877yM6YCB5pyA54ix55qE5Lq6/p-5d91a4f642dd5b7c7d52cbcc/8125babf/cr/s1125x690/q70.jpg",
          url: "//pro.m.jd.com/mall/active/8tHNdJLcqwqhkLNA8hqwNRaNu5f/index.html"
        },
        {
          url: "//wqs.jd.com/portal/wx/tuan/pingouv3.shtml?ptag=138097.1.8&sceneval=2",
          image: "//m.360buyimg.com/mobilecms/s700x280_jfs/t1/87958/1/15520/147171/5e71e21bE87a3eb70/c30c4201a993c52a.jpg!cr_1125x445_0_171!q70.jpg.dpg",
        },
        {
          image: "//m.360buyimg.com/mobilecms/s700x280_jfs/t1/100740/37/14668/62675/5e674c5cE6e0b4490/b4530fa853d2e7b8.jpg!cr_1125x445_0_171!q70.jpg.dpg",
          url: "//pro.m.jd.com/mall/active/D3d86DsCV2gKbPTZi8EmxB42bZ8/index.html"
        },
        {
          image: "//m.360buyimg.com/mobilecms/s700x280_jfs/t1/84879/39/15634/91880/5e748664Eb2d8a21e/5d459a617e64b872.jpg!cr_1125x445_0_171!q70.jpg.dpg",
          url: "//pro.m.jd.com/mall/active/46xH2FEswob1Eibj3tJMTTfpJvA/index.html?babelChannel=ttt4"
        }
      ]
    }
  },
  methods: {
    onSearch () {
      this.$router.push("/sousuo")
    },
    oo () {
      this.$router.push("/my")
    }

  }
};
</script>

<style lang="less" >
.van-search__label {
  font-size: 20px;
  height: 18px;
  line-height: 18px;
  font-weight: 600;
  color: red;
  margin: 6px 10px 0 0;
  border-right: 1px solid #bbb;
}
.www {
  position: relative;
}
.headd .my-swipe .van-swipe-item {
  color: #fff;
  font-size: 30px;
  line-height: 140x;
  height: 100%;
  text-align: center;
  background-color: #39a9ed;
}
.headd .my-swipe {
  width: 92%;
  margin-left: 4%;
  border-radius: 10px;
  height: 100%;
}
.headd .lunbo {
  width: 100%;
  height: 140px;
  position: absolute;
  top: 0px;
}
.headd .lunbo img {
  height: 100%;
  width: 100%;
}
.headd .banner {
  width: 100%;
  height: 92px;
  overflow: hidden;
}
.headd .lunbo .van-swipe__indicator {
  width: 10px;
  height: 3px;
  border-radius: 0;
  background: #e1e1e1;
}
</style>
