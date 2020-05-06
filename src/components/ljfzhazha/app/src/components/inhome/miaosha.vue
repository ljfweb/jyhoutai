<template>
  <div>
    <div>
      <div class="bannertu">
        <img v-for="(ite,inde) in arr1 "
             :key="inde"
             :src="ite"
             alt="">
      </div>
      <div class="miao">
        <div class="stou">
          <span class="sha">京东秒杀</span>
          <span class="dian16">{{(shahover.bb/2!=0)?shahover.bb-1:shahover.bb}}点场</span>
          <span class="chang">
            <van-count-down :time="time" />
          </span>
          <a class="msha"
             href="//wqs.jd.com/portal/wx/seckill_m/index.shtml">
            更多秒杀<span>></span>
          </a>
        </div>
        <div class="xtou">
          <ul v-for="(item,index) in arr"
              :key="index">
            <dt>
              <a :href="item.url">
                <img :src="item.image"
                     alt="">
              </a>
            </dt>
            <dd class="d1">¥{{item.price}}</dd>
            <dd class="d2">¥{{item.oldprice}}</dd>
          </ul>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
export default {
  name: "miaosha",
  data () {
    return {
      time: 2 * 60 * 60 * 1000,
      shover: "",
      arr: [
        {
          url: "//wqs.jd.com/portal/wx/seckill_m/index.shtml?wareId=62873938385",
          price: "156",
          oldprice: "456",
          image: "https://wqimg.jd.com/imgproxy/n7/s150x150_jfs/t1/93833/11/17097/125749/5e82bf23E0f24e08d/13473aaffbf243c7.jpg.dpg"
        },
        {
          price: "356",
          oldprice: "566",
          url: "//wqs.jd.com/portal/wx/seckill_m/index.shtml?wareId=100002158762",
          image: "https://wqimg.jd.com/imgproxy/n7/s150x150_jfs/t1/102201/22/16849/183001/5e8154cfEf748a2b5/f7e86da6af34402d.jpg.dpg"
        },
        {
          price: "956",
          oldprice: "1256",
          url: "//wqs.jd.com/portal/wx/seckill_m/index.shtml?wareId=100000141399",
          image: "https://wqimg.jd.com/imgproxy/n7/s150x150_jfs/t30772/158/812539168/171010/b5d8d5cb/5bff4bf7N1cd8bd69.jpg.dpg"
        },
        {
          price: "356",
          oldprice: "856",
          url: "//wqs.jd.com/portal/wx/seckill_m/index.shtml?wareId=40047261868",
          image: "https://wqimg.jd.com/imgproxy/n7/s150x150_jfs/t1/103495/37/16251/144301/5e7ad1bbE21915652/bbc8d2190024822c.jpg.dpg"
        },
        {
          price: "66",
          oldprice: "226",
          url: "//wqs.jd.com/portal/wx/seckill_m/index.shtml?wareId=41355587747",
          image: "https://wqimg.jd.com/imgproxy/n7/s150x150_jfs/t1/101417/19/16018/126303/5e7871b6E164272bb/45af53cdcb8b7c9d.jpg.dpg"
        },
        {
          price: "556",
          oldprice: "966",
          url: "//wqs.jd.com/portal/wx/seckill_m/index.shtml?wareId=20115947",
          image: "https://wqimg.jd.com/imgproxy/n7/s150x150_jfs/t1/68955/31/10736/136069/5d831920Ea504aa91/9a3ff0e2d5b89ab3.jpg.dpg"
        },
        {
          price: "556",
          oldprice: "899",
          url: "//wqs.jd.com/portal/wx/seckill_m/index.shtml?wareId=100011584672",
          image: "https://wqimg.jd.com/imgproxy/n7/s150x150_jfs/t1/96361/21/12969/189291/5e561829E7b260a81/5c72b272aaf0a7e5.jpg.dpg"
        },
        {
          price: "156",
          oldprice: "456",
          url: "//wqs.jd.com/portal/wx/seckill_m/index.shtml?wareId=7646955",
          image: "https://wqimg.jd.com/imgproxy/n7/s150x150_jfs/t1/85076/16/16860/198625/5e83268aEce986487/a9aabee97a67e9c4.jpg.dpg"
        },
        {
          price: "126",
          oldprice: "999",
          url: "//wqs.jd.com/portal/wx/seckill_m/index.shtml?wareId=54533028759",
          image: "https://wqimg.jd.com/imgproxy/n7/s150x150_jfs/t1/102517/32/16220/59058/5e79e433E7409ec05/f09415cd25595e45.jpg.dpg"
        },
        {
          price: "359",
          oldprice: "666",
          url: "//wqs.jd.com/portal/wx/seckill_m/index.shtml?wareId=54359972707",
          image: "https://wqimg.jd.com/imgproxy/n7/s150x150_jfs/t1/87606/40/16524/178642/5e7c124bE684e423b/a1aa66e8a492cd12.jpg.dpg"
        }

      ],
      arr1: [
        "//m.360buyimg.com/mobilecms/s250x200_jfs/t1/93647/9/16972/23702/5e82e984E5bf8afc3/95e4227b14f7c830.png!q70.jpg.dpg",
        "//m.360buyimg.com/mobilecms/s250x200_jfs/t1/108897/30/10825/28584/5e82f2e2E9c9febfc/5f7418bccbd9ec9b.png!q70.jpg.dpg",
        "//m.360buyimg.com/mobilecms/s250x200_jfs/t1/94166/28/17352/115849/5e859c13Ee28c65a5/40e34af4c4b8521b.png!q70.jpg.dpg"
      ]

    }
  },
  computed: {
    shahover () {
      var ti = new Date();
      var bb = ti.getHours();
      return {
        bb
      };
    }
  }


}
</script>
<style lang="less" scoped>
.miao {
  height: 155px;
  width: 355px;
  background: white;
  margin: 10px;
  line-height: 34px;
}
.stou {
  height: 34px;
}
.sha {
  font-size: 19px;
  line-height: 34px;
  font-weight: 700;
  margin-right: 10px;
  margin-left: 10px;
}
.dian16 {
  margin-right: 10px;
  font-weight: 700;
}
.msha {
  float: right;
  color: red;
  margin-right: 10px;
}
.xtou {
  width: 100%;
  display: flex;
  align-items: flex-end;
  overflow: scroll;
}
.xtou ul {
  width: 20%;
  height: 100%;
  margin-left: 2%;
  text-align: center;
  dt {
    height: 66px;
    width: 66px;
    margin-bottom: 6px;
    img {
      height: 100%;
      width: 100%;
    }
  }
  dd {
    height: 22px;
    line-height: 22px;
  }
}
.d1 {
  color: red;
  font-weight: 700;
  font-size: 16px;
}
.d2 {
  color: gray;
}
.bannertu {
  width: 100%;
  height: 100px;
  display: flex;
  align-items: flex-end;
  background: white;
  img {
    height: 100%;
    width: 33.3333%;
  }
}
.van-count-down {
  display: inline-block;
}
</style>


