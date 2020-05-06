<template>
    <div class="classify">
        <tab></tab>
         <sousuo></sousuo>
        <div class="classify-cont1">
            <!-- 遍历merchandise，获取merchandise对象里面的name -->
            <div :key="index" v-for="(item,index) in merchandise" class="cont-one"
            :class="{'active' : currentIndex === index }" @click="selectMenu(index)" >
            {{item.name}}

            </div>
        </div>
         
        <div class="classify-cont2">
            <!-- <router-link tag="div" to="/allcommodity"> -->
                <!-- :key="'1'+index" 因为key用的多了可能会重复，就不生效，在key值前面价格1/0就可以了 -->
                <div :key="'1'+index" v-for="(item,index) in merchandise" v-if="currentIndex === index" class="cont-merch">
                    <div class="merch-spin">
                        <!-- item代表的所有数据，现在遍历所有数据中的content就是item.content -->
                        <!-- {{zal}}获取数据 因为content里面没有对象，所以直接遍历数组 -->
                        
                        <li @click="add(zal)" :key="'0'+aa" v-for="(zal,aa) in item.content">{{zal}}</li>
                        
                            <!-- add(nam)中的nam代表的是zal -->
                    </div>
                </div>
            <!-- </router-link> -->
        </div>
    </div>
</template>

<script>
   import tab from '../tab/tab'

   import axios from 'axios';

   import sousuo from '../sousuo/sousuo'
   
   import allcommodity from '../allcommodity/allcommodity'

   export default {
       name:"classify",
       data(){
           return{
               merchandise:[],
               currentIndex:0
               
           }
       },
       components:{
          sousuo,
          tab
       },
       created(){
          let cut = this;
          let url = "http://127.0.0.1:83/getData";
          axios.get(url).then(res=>{
              console.log("resclassify:",res)
               //后台传过来的数据是字符串，用JSON.parse转换成数组，读取merchandise数据
              cut.merchandise = JSON.parse(res.data.data).merchandise
          })
       },
       methods:{
         selectMenu($index){
             this.currentIndex = $index
         },
         add(nam){//nam代表的是zal
             this.$router.push({path:"/allcommodity",query:{lm:nam}})//lm:nam lm是随便起的名字,nam是形参,代表的是zal
         }
       }
   }


</script>

<style scoped>
    .classify{
        padding: 3.4375rem 0 0 0;
        height: 39.125rem;
        display: flex;
    }
    
    .active,
    .cont-merch .merch-spin{
        background: white;
    }

    .classify-cont1{
        width: 30%;
    }
    .classify-cont2{
        width: 70%;
    }
    .cont-one{
        display: block;
        height: 3.6875rem;
        color: #404245;
        font-size: 1rem;
        font-weight: normal;
        line-height: 3.75rem;
        text-align: center;
        box-sizing: border-box;
        border-bottom: #f8f8f8 1px solid;
    }
   
    .cont-merch .merch-spin li{
        list-style: none;
        height: 3.75rem;
        text-align: center;
        line-height: 3.75rem;
        border-bottom:#f8f8f8 solid 1px;
    }
    .merch-spin{
       display: inline-block;
       width: 100%;
       height: 100%;
    }
    .active{
        border: solid 1px goldenrod;
        border-left: solid 3px gray;
    }
</style>