<template>

        <div class="tab">
            <div class="tab-add">
                <router-link tag="div" to="/home"><span class="iconfont">&#xe612;</span></router-link>
                <router-link tag="div" to="/classify"><span class="iconfont">&#xe7f8;</span></router-link>
                <router-link tag="div" to="/shopping"><span class="iconfont">&#xe63a;</span></router-link>
                <router-link tag="div" to="/mei"><span class="iconfont">&#xe617;</span></router-link>
            </div>
            <div class="sliang">{{ getAllCount}}</div>
        </div>

</template>

<script>
   
   import {mapGetters} from 'vuex'
   export default {
       name:"tab",
       data(){
           return{

           }
       },
       components:{
          
       },
       computed:{
             ...mapGetters(['lists']),
            getAllCount(state) {
                var sum = 0; 
                state.lists.forEach(item => {
                    sum += item.num;
                });
                return sum;
            },
       }
   }

</script>

<style scoped>
   
   .tab{
       position: fixed;
       bottom: 0;
       left: 0;
       width: 100%;
       background: white;
   }
   /* .tab div{
       color: gainsboro;
   }
   .tab div:hover{
       color: black;
   } */
    .tab-add{
        padding: 10px 0;
        display: flex;
    }
    .tab-add div{
        display: block;
        flex: 1;
        text-align: center;
    }
    .iconfont[data-v-9c4fe28a]{
        font-size: 18px;
    }
    .router-link-active{
        color:gainsboro;
    }

    @font-face {
        font-family: 'iconfont';  /* project id 1306379 */
        src: url('//at.alicdn.com/t/font_1306379_9rvsfdhuvdg.eot');
        src: url('//at.alicdn.com/t/font_1306379_9rvsfdhuvdg.eot?#iefix') format('embedded-opentype'),
        url('//at.alicdn.com/t/font_1306379_9rvsfdhuvdg.woff2') format('woff2'),
        url('//at.alicdn.com/t/font_1306379_9rvsfdhuvdg.woff') format('woff'),
        url('//at.alicdn.com/t/font_1306379_9rvsfdhuvdg.ttf') format('truetype'),
        url('//at.alicdn.com/t/font_1306379_9rvsfdhuvdg.svg#iconfont') format('svg');
    }

   .iconfont{
        font-family:"iconfont" !important;
        font-size:16px;font-style:normal;
        -webkit-font-smoothing: antialiased;
        -webkit-text-stroke-width: 0.2px;
        -moz-osx-font-smoothing: grayscale;
    }
    .sliang{
        position: absolute;
        top: 0;
        left: 242px;
        width: 8px;
        height:8px;
        line-height: 8px;
        font-size: 11px;
        background: red;
        color: white;
        border: solid 1px;
        text-align: center;
        padding: 5px;
        border-radius:50%; 
    }

</style>