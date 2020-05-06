<template>
  <div class="spfloor">
    <!-- 公告商品楼层 -->
    <div class="love-moudle">
      <div class="love-title"><img :src="floortitle" alt="" /></div>
      <div class="mask">
        <div class="love-goods-top" :v-if="showfloor">
          <div
            class="love-goods-item border-right border-rightbottom"
            v-for="(item, index) in imgsrcsm"
            :key="index"
          >
            <dl>
              <dd>
                <h3 :style="{ '-webkit-background-clip': 'text' }">
                  {{ item.id == 1 ? "下厨做饭" : "年味厨房" }}
                </h3>
                <p>{{ item.id == 1 ? "尽享鲜美" : "新年厨房美味" }}</p>
              </dd>
              <dt>
                <img :src="item.imgs[0]" alt="" /><img
                  :src="item.imgs[1]"
                  alt=""
                />
              </dt>
            </dl>
          </div>
          <!-- <div class="love-goods-item">
            <dl>
              <dd>
                <h3>年味厨房</h3>
                <p>新年厨房美味</p>
              </dd>
              <dt><img :src="imgSrc" alt="" /><img :src="imgSrc" alt="" /></dt>
            </dl>
          </div> -->
        </div>
        <div class="love-goods-bottom">
          <div
            class="love-goods-item border-right"
            v-for="(item, index) in !showfloor ? imglistOne : imglistTwo"
            :key="index"
          >
            <dl>
              <dd>
                <h3
                  :style="{
                    background: item.bg,
                    '-webkit-background-clip': 'text'
                  }"
                >
                  {{ item.title }}
                </h3>
                <p>{{ item.info }}</p>
              </dd>
              <dt><img :src="item.img_url" alt="" /></dt>
            </dl>
          </div>
          <!-- <div class="love-goods-item">
            <dl>
              <dd>
                <h3>玩3C</h3>
                <p>iPhone6</p>
              </dd>
              <dt><img :src="imgSrc" alt="" /></dt>
            </dl>
          </div>
          <div class="love-goods-item">
            <dl>
              <dd>
                <h3>玩3C</h3>
                <p>iPhone6 16G低至2499元疯抢</p>
              </dd>
              <dt><img :src="imgSrc" alt="" /></dt>
            </dl>
          </div>
          <div class="love-goods-item">
            <dl>
              <dd>
                <h3>玩3C</h3>
                <p>iPhone6 16G低至2499元疯抢</p>
              </dd>
              <dt><img :src="imgSrc" alt="" /></dt>
            </dl>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "spfloor",
  props: ["floortitle", "showfloor", "imgsrcsm", "imgsrcmd", "bgcolor"],
  data() {
    return {
      // imgSrc: "https://m.360buyimg.com/mobilecms/s150x150_jfs/t1/103795/3/13208/305045/5e5353fcEe68f4174/e941b842a8eaca77.jpg!q70.jpg.dpg",
      // showfloor: false
      imglistOne: [],
      imglistTwo: []
    };
  },
  mounted() {
    // console.log(this.imgsrcmd);
    // console.log(this.showfloor);
    if (Array.isArray(this.imgsrcmd)) {
      this.imglistOne = this.imgsrcmd.slice(0, 4);
      this.imglistTwo = this.imgsrcmd.slice(4);
    }
  }
};
</script>

<style lang="less" scoped>
.spfloor {
  width: 100%;
  .love-moudle {
    width: 100%;
    height: 100%;
    margin-bottom: 10px;
    // background-color: rgba(240, 240, 240, 1);
    .love-title {
      width: 100%;
      height: 35px;
      line-height: 35px;
      color: rgba(255, 157, 87, 1);
      font-size: 14px;
      text-align: center;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .mask {
      border-radius: 8px;
      position: relative;
      background-color: #fff;
      margin: 0 10px;
      // z-index: 5;
      .love-goods-item:last-child::before {
        border-right: 0 !important;
      }
      .love-goods-top {
        width: 100%;
        display: flex;
        justify-content: space-between;
        flex-flow: wrap;
        .love-goods-item {
          width: 50%;
          height: 120px;
          padding: 5px 0;
          dl {
            width: 100%;
            height: 100%;
            dd {
              padding-left: 8px;
              h3 {
                background: linear-gradient(90deg, #45caff, #1471fb);
                // -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                font-size: 16px;
                font-weight: 700;
                line-height: 1.5;
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
              }
              p {
                font-size: 12px;
                color: #666771;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
              }
            }
            dt {
              padding: 0 14px;
              display: flex;
              img {
                flex: 1;
                width: 60px;
                height: 60px;
                margin: 8px 7px 0;
              }
            }
          }
        }
      }
      .love-goods-bottom {
        width: 100%;
        display: flex;
        justify-content: space-between;
        flex-flow: wrap;
        .love-goods-item {
          width: 25%;
          height: 120px;
          box-sizing: border-box;
          dl {
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            padding: 6.5px 0 5px 10px;
            dd {
              h3 {
                // -webkit-background-clip: text;
                // background: #000;
                -webkit-text-fill-color: transparent;
                font-size: 16px;
                letter-spacing: 0.58px;
                line-height: 22.5px;
                font-weight: 700;
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
              }
              p {
                font-size: 12px;
                line-height: 1.3;
                color: #666771;
                overflow: hidden;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
              }
            }
            dt {
              width: 60px;
              height: 60px;
              margin: 5.5px 7px 0;
              img {
                width: 100%;
                height: 100%;
              }
            }
          }
        }
      }
    }
  }
}
</style>
