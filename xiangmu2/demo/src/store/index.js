import Vue from 'vue'
import Vuex from 'vuex'

//刷新页面不丢失数据
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)
export default new Vuex.Store({
    state:{//存放数据
        lists:[],//存放购物车数据
        collect:[],//存放收藏数据
        ew:false,//收藏图片切换
    },
    //渲染页面的数据
    mutations:{//修改数据
        addToCart(state,shop){//shop刚刚从详情页面spxiangpingone传过来的数据
            console.log("state:",state)
            state.lists.push(shop)//再将shop添加到lists中,在购物车页面中接收
            console.log("shop:",shop)
            shop.checked = true
            
        },
        //删除
        delet(state,id){//id是shopping传过来的数据
            //some用于检测数组中的元素是否满足指定条件 
            //如果有一个元素满足条件，则表达式返回true , 剩余的元素不会再执行检测。
            //item代表lists中的数据,id代表lists中的id
            state.lists.some((item,id)=>{
                //item是代表的是lists,id代表的是购物车的id
                if(item==id){ //判断item和id的值是否相等,相等就删除  
                    state.lists.splice(id,1)//splice删除一条数据
                }
            })
        },
        //数量加减
        append(state,wt){//wt是shopping传过来的数据
            console.log("wt:",wt)
            //some用于检测数组中的元素是否能满足指定条件
            //如果有一个元素满足,则返回true,剩余的元素不会再执行
            state.lists.some((item,id)=>{//遍历
                console.log("item:",item)
                console.log("wt:",wt)
                //item代表的是lists,wt代表的是shopping页面传过来的this.lists[i]
                if(item == wt){ 
                    //shop中也有num属性
                    //将shopping中的num值(数量)覆给vuex中的num的值(数量),然后跳出函数
                    item.num = wt.num 
                    return
                }
            })
        },
        //收藏
        addCollect(state,shri){
            console.log("index-shri:",shri)
            state.collect.push(shri)
        },
        //收藏删除
        expurgate(state,id){
            state.collect.some((item,id)=>{
                if(item==id){
                    state.collect.splice(id,1)
                }
            })
        },
        //单选
        //state默认,payload代表的就是shopping里面的this.lists[index],用payload名字来接收
        updateCheck(state,payload){
            //用some遍历lists
            state.lists.some(item => {
                //item.checked是lists里面的,payload.checked是shopping传过来的
                if (item.checked == payload.checked) {
                  //点击单选按钮取消的时候,全选按钮去掉
                  item.checked == !payload.checked;

                  return true;
                }
              })
        },
        getew(state,ew){
            state.ew=ew
        }
    },
    actions:{//提交mutaions方法更改state数据状态
        
    },
    getters:{//获取state里面的数据,然后在接收页面接收
        lists(state){
            return state.lists
        },
        collect(state){
            return state.collect
        },
        ew(state){
            return state.ew
        }
    },
    modules:{//模块化Vuex（将store分割成不同的模块）
   
    },
    //导入插件 刷新页面不丢失数据
    plugins: [createPersistedState({
        //将数据存到localStorage中,必须写的
        storage: window.localStorage
    })]
})