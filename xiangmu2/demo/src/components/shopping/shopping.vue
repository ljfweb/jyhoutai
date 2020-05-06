<template>
     <div class="shopping">
          <div class="shopping-head">
              购物车({{getAllCount}})
          </div>
          <div :key="index" v-for="(item,index) in lists" class="shangpin">
                <!-- 选框 -->
                <input  type="checkbox" :checked="item.checked" class="xkuang" @change="changeCheck(index)">

                <img class="pic1" :src= "item.img" >
                <div class="cont">

                <span>{{item.mingcheng}}</span><br>
                <span>尺寸:{{item.chicun}}:1500mm*2000mm储物</span><br>
                <span>￥:{{item.jiage}}</span><br>
      
                <div class="shuliang">
                    <button type="button" @click="minuts(index)" >-</button>
                    <input type="text" v-model="item.num" style="width:30px;text-align:center" />
                    <button type="button" @click.stop="add(index)" >+</button>
                </div>
             </div>
                <img class="pic2" @click="del(item.id,index)" src="../../../static/img/ch1.png" alt="">
          </div>

          <div class="shopping-content" v-if="lists.length==0">
              <div class="content">
                <img src="../../../static/img/g1.png" alt="">
                <p>您的购物车是空的</p>
                <router-link tag="div" to="/home"><button>随便逛逛</button></router-link>
              </div>
          </div>
          
            <div class="account" v-else>
                <!-- 选框 -->
                <input type="checkbox" :checked="changeCheckAll"  @click="selAll">全选

                <span>&yen;{{totalPrice}}</span>
                <button>结算({{getAllCount}})</button>
            </div>
          <tab></tab>

</div>

</template>

<script>
   
   import {mapGetters} from 'vuex'
   import axios from 'axios'
   import tab from '../tab/tab'
   import { Toast } from 'mint-ui'
   
   export default {
       name:"shopping",
       data(){
           return{
              msg:"shopping"
           }
       },
       created(){
          
       },
       methods:{
        //删除
        del(id){
             this.lists.splice(id,1)//用splice删除一个,根据索引删除,
             this.$store.commit("delet",id)//将id传入到vuex中将sessionStorage中的数据也删除
        },
        //商品减减
        minuts(i){
            if (this.lists[i].num == 1) {//判断lists的num等于0的时候就跳出函数结束执行
                Toast("亲亲,不能再少了!")
                return 
            }
            this.lists[i].num--;//不到0可以继续减
            this.$store.commit("append", this.lists[i])

        },
        //商品加加
        add(i){
            this.lists[i].num++;
            // console.log(1232)
            console.log(this.lists[i].num)
            //将this.lists[i]传到vuex里面的append函数
            this.$store.commit('append',this.lists[i])
            console.log("this.lists[i]",this.lists[i])
        },
        //单选
        changeCheck(index) {
            //取反,默认值是true选中的,!的时候不选中
            this.lists[index].checked = !this.lists[index].checked;
            //将this.lists[index]这个对象传到vuex里面updateCheck函数
            this.$store.commit("updateCheck", this.lists[index]);
        },
        //全选点击事件
        selAll() { 
            console.log("12345678:",54321324)
            console.log("000",this.totalPrice)
            if (this.changeCheckAll) {//当全选框checked=true是选中状态的时候 点击全选 全选框取消
                this.lists.forEach(item => (item.checked = false));
            } else {
                this.lists.forEach(item => (item.checked = true));
            
            }
         },
       },
       components:{
          tab
       },
       computed:{//计算属性
         ...mapGetters(['lists']), //vuex接收数据
         getAllCount(state) {
            var sum = 0; //给一个
            state.lists.forEach(item => {//用forEach遍历lists
                sum += item.num; 
            });
            return sum;
         },
        //全选
        changeCheckAll() {
        //判断lists的长度是0的时候全选按钮为false
            if (this.lists.length == 0) {
                return false;
            }
            //遍历lists
            for (var i in this.lists) {
                if (!this.lists[i].checked) {
                  return false;
                }
            }
            return true;
        },
         totalPrice() {
             console.log("///",this.lists)
             //返回一个值
             //用filter遍历lists     item代表的是值
            return this.lists.filter(item => { 
                //返回这个被点击的checked
               return item.checked;
               //v1代表的是上一次数量的价格
               //item代表的是lists的参数
            }).reduce((v1, item) => {
                //用上一次的价格+商品在添加的价格+数量=总价
               return v1 + item.jiage * item.num ;
            }, 0);//0代表初始值
        },
      }
   }

</script>

<style scoped>
    .shopping{
        
        height: 39.8125rem;
        background: #f2f2f2;
    }
    .shopping-head{
        background: white;
        text-align: center;
        padding: .9375rem 0;
    }
    .content{
        margin-left: 30%;
        margin-top: 10.3125rem;
    }
    .shopping-content img{
        width: 5rem;
        height: 5rem;
        margin-left: 1.875rem;
    }
     .shopping-content p{
        margin-left: .9375rem;
     }
     .shopping-content button{
         width: 10rem;
         height: 2.5rem;
         background: #404245;
         border: solid .0625rem #404245;
         color: white;
     }
     .account{
         box-sizing: border-box;
         overflow: hidden;
         position: fixed;
         top: 590px;
         left: 0;
     }
    .account input{
        display: inline-block;
        margin-left: 20px;
    }
    .account span{
        margin-left:75px;
    }
    .account button{
        margin-left: 10px;
        padding: 5px 38px;
    }
    .shangpin{
        margin: 10px 0 0 0;
        /* margin-top: 20px; */
        border-bottom: solid 1px gainsboro;
        position: relative;
        padding: 10px 0;
        background: white;
        box-sizing: border-box;
        overflow: hidden;
        display: flex;
        /* border: solid 1px; */
    }
    .shangpin img{
        padding: 0 10px 0 0;
        width: 90px;
    }
   
    .shangpin .pic2{
        padding: 0 20px;
        width: 15px;
        height: 20px;
    }
    .pic1{
        height: 100%;
        width: 100%;
    }
    .cont span{
        font-size: 14px;

    }
    .cont span:nth-of-type(2){
        font-size: 12px;
        color: gray;
    }
    .cont span:nth-of-type(3){
        font-size: 14px;

    }
    .xkuang{
        margin: 0 10px;
        display: inline-block;
        margin-top: 40px;
    }
    .shuliang{
        position: absolute;
        top:80px;
        left: 270px;
    }
    .shuliang button{
        background: white;
        border: solid 1px white;
    }
</style>



