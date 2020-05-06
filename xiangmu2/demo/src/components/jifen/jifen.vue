<template>

        <div class="jifen">
            <button @click="authCode">
                <span class="auth" v-show="showOne">发送验证码</span>
                <span class="miao" v-show="showTwo">{{time}}</span>
            </button>
                    
        </div>

</template>

<script>
   

   export default {
       name:"jifen",
       data(){
           return{
               msg:"jifen",
               showOne:true,
               showTwo:false,
               time:60,
               
           }
       },
       components:{
    
       },
       methods:{
       	 authCode(){
       	 	this.showOne = false;
       	 	this.showTwo = true;
       	 	let timer = setInterval(()=> {
       	 		var js = this.time--
       	 		if(js == 0){
       	 			this.showOne = true
       	 			this.showTwo = false
       	 			clearInterval(timer)
       	 		}
       	 	},1000)
       	 	
       	 }
       }
   }
   // 计时器每秒加1，72小时转换成秒数，把72小时减去计时器每秒加1，的出来的就是每秒减1，拿变量接收渲染，
    // 判断，如果等于0，再将72小时赋值，从头再来计时，

</script>

<style scoped>
button{
	width: 100px;
}
 .auth{
 	width: 100px;
 }
 .miao{
 	width: 100px;
 }
</style>