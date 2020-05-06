<template>
  <div>
    <div class="nav_wrap">
      <van-swipe :autoplay="400000"
                 indicator-color="green"
                 style="background:#f3f3f3">
        <van-swipe-item v-for="(item,index) in arr"
                        :key="index">
          <ul v-for="(ite,inde) in item "
              :key="inde">
            <dt>
              <a :href="ite.url">
                <img :src="ite.image"
                     alt="">
              </a>
            </dt>
            <dd>
              {{ite.name}}
            </dd>
          </ul>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>
<script>
export default {
  name: "ctnav",
  data () {
    return {
      arr: [
        [
          {
            url: "//h5.m.jd.com/rn/3LmeNuQDfT1nN8qZS4jZoZQMFeV7/index.html",
            image: "//m.360buyimg.com/mobilecms/s120x120_jfs/t1/84753/1/16651/5549/5e7d5f9eE492c3864/4b9963fe16fae211.png.webp",
            name: "京东超市"
          },
          {
            url: "//pro.m.jd.com/mall/active/8tHNdJLcqwqhkLNA8hqwNRaNu5f/index.html",
            name: "数码电器",
            image: "//m.360buyimg.com/mobilecms/s120x120_jfs/t1/95626/6/16650/5992/5e7d5fdeE251a8742/d29fcc84ee0211f7.png.webp"
          },
          {
            url: "//h5.m.jd.com/babelDiy/Zeus/28Lq4LbJDJcuMhNb9tQ6EcbZ8GTu/index.html",
            name: "京东服饰",
            image: "//m.360buyimg.com/mobilecms/s120x120_jfs/t1/105719/14/16594/7294/5e7d605eE007a21e7/63392310fbb001a4.png.webp"
          },
          {
            url: "//pro.m.jd.com/mall/active/4P9a2T9osR9JvtzHVaYTPvsecRtg/index.html?has_native=0",
            name: "京东生鲜",
            image: "//m.360buyimg.com/mobilecms/s120x120_jfs/t1/104104/6/16755/5068/5e7d6202E212fcc22/3fda8f7d8b63b55f.png.webp"
          },
          {
            url: "//daojia.jd.com/html/index.html?channel=jdapp",
            name: "京东到家",
            image: "//m.360buyimg.com/mobilecms/s120x120_jfs/t1/96727/8/16477/5183/5e7d6249E4730c38a/0f70da903eded263.png.webp"
          },
          {
            url: "//newcz.m.jd.com/",
            name: "充值缴费",
            image: "//m.360buyimg.com/mobilecms/s120x120_jfs/t1/96542/9/16707/3569/5e7d62bcE5c4ee6a7/3bf6ac36ac9f17d9.png.webp"
          },
          {
            name: "9.9元拼",
            url: "//wqs.jd.com/portal/wx/tuan/pingouv3.shtml?ptag=138097.1.8&sceneval=2",
            image: "//m.360buyimg.com/mobilecms/s120x120_jfs/t1/86437/25/16675/6585/5e7d62e4E1095d733/d0d685ed0477d268.png.webp"
          },
          {
            name: "领券",
            url: "//coupon.m.jd.com/center/getCouponCenter.action",
            image: "//m.360buyimg.com/mobilecms/s120x120_jfs/t1/110232/17/10270/4813/5e7d6310E79c9cb8d/6786eed1b786c010.png.webp"
          },
          {
            name: "赚钱",
            url: "//m.jr.jd.com/spe/qyy/hzq/index.html?usertype=1176&from=rk",
            image: "//m.360buyimg.com/mobilecms/s120x120_jfs/t1/96795/33/16662/4749/5e7d6385Ec31e4b29/f36c778122286405.png.webp"
          },
          {
            name: "PLUS会员",
            url: "//plus.m.jd.com/index",
            image: "//m.360buyimg.com/mobilecms/s120x120_jfs/t1/97837/22/16281/7606/5e7d6411E0c0a91d6/93e0b359bfdf0239.png.webp"
          }
        ],
        [
          {
            name: "京东国际",
            url: "//pro.m.jd.com/mall/active/3YvKJrc4e4WK7aZ46j3h5UMCvEn4/index.html",
            image: "//m.360buyimg.com/mobilecms/s120x120_jfs/t1/86956/10/16811/5922/5e7cc74dE219a3d8d/e4f7c68febc8b29a.png.webp"
          },
          {
            name: "京东拍卖",
            url: "//zpsy.jd.com",
            image: "//m.360buyimg.com/mobilecms/s120x120_jfs/t1/108499/22/10229/4960/5e7cc7e3Ef0042744/e18bb8a5ee24049d.png.webp"
          },
          {
            name: "唯品会",
            url: "//pro.m.jd.com/mall/active/2aiozXgZK1PUVZA37WNq62KLtjcC/index.html",
            image: "//m.360buyimg.com/mobilecms/s120x120_jfs/t1/108831/16/10402/4901/5e7cc891Ec4a1e209/7ec6358526c83cda.png.webp"
          },
          {
            name: "玩3C",
            url: "//pro.m.jd.com/mall/active/3JAoyewPmdVBMeRWTBiHDdGH5M36/index.html",
            image: "//m.360buyimg.com/mobilecms/s120x120_jfs/t1/87813/33/16566/5552/5e7cc8deEddd6bcb5/9afe008178b12b2b.png.webp"
          },
          {
            name: "沃尔玛",
            url: "//pro.m.jd.com/mall/active/3d34Pm49obpjLEdhhagSZuM5QrwC/index.html",
            image: "//m.360buyimg.com/mobilecms/s120x120_jfs/t1/104372/23/16606/5314/5e7cc980E1b828146/d789952095cd80b9.png.webp"
          },
          {
            name: "美妆馆",
            url: "//pro.m.jd.com/mall/active/2kmaPNrGDNYo1LKwYtRoaSmsgbj6/index.html",
            image: "//m.360buyimg.com/mobilecms/s120x120_jfs/t1/99304/34/16507/5170/5e7ccacaE08d0d35d/ea8a30610a682386.png.webp"
          },
          {
            name: "京东旅行",
            url: "//pro.m.jd.com/mall/active/4Fr34Vshk1ymvv9CBTysFkF36aYM/index.html",
            image: "//m.360buyimg.com/mobilecms/s120x120_jfs/t1/87481/10/16552/5320/5e7ccbc7Eb8454450/c8f70349dc66e093.png.webp"
          },
          {
            name: "拍拍二手",
            url: "//pro.m.jd.com/mall/active/LHGZv1DrGkva1jNpUkKFuNFN6oo/index.html",
            image: "//m.360buyimg.com/mobilecms/s120x120_jfs/t1/88799/13/16665/5240/5e7d6448E42016d3c/77b343418a8a890d.png.webp"
          },
          {
            name: "物流查询",
            url: "//home.m.jd.com/user/userAllOrderList.action",
            image: "//m.360buyimg.com/mobilecms/s120x120_jfs/t1/107817/13/10442/6306/5e7cccc8E7f9d6c59/9e06aa68ba7ba0f0.png.webp"
          },
          {
            name: "全部",
            url: "//m.jd.com/portal/app_center.shtml",
            image: "//m.360buyimg.com/mobilecms/s120x120_jfs/t1/98535/20/16481/5760/5e7d646aE9b72c32e/8e063cfb6bad4654.png.webp"
          }

        ]
      ]
    }
  }
}
</script>

 <style lang="less" >
.nav_wrap {
  box-sizing: border-box;

  .van-swipe-item {
    height: 152px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    ul {
      width: 65px;
      height: 65px;
      text-align: center;

      img {
        width: 40px;
        height: 40px;
      }
      dd {
        font-size: 12px;
        width: 100%;
        text-align: center;
        margin-left: 0px;
        color: #666;
        margin-top: 8px;
      }
    }
  }
}
.nav_wrap .van-swipe__indicators {
  top: 145px;
}
.nav_wrap .van-swipe__indicator {
  width: 12px;
  height: 5px;
  border-radius: 3px;
  background: blue;
}
</style>



