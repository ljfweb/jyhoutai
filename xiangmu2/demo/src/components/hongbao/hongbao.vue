en<template>
  <div style="width:50%">
      <p>{{hour}}:{{min}}:{{sec}}</p>
  </div>
  
</template>

<script>
  import axios from "axios";
export default {
  data(){
    return {
       b:1573401600000,
       hour:"",//时
       min:"",//分
       sec:"",//秒
      }
  },
  mounted(){
  	  this.times()
  },
  methods: {
  
      time(){
        let timer = setInterval(()=> {//定时器每秒从新计算
	        let stopTime = this.b;  //将当前时间戳赋值给stopTime
	        let nowTime = new Date().getTime(); //当前时间
	        let jianGe = (stopTime-nowTime)/1000; //相减转为秒数
//	        let year = 
	        let hour = Math.floor(jianGe/60/60%24);//计算时
	        console.log("hour:",hour)
	        let min = Math.floor(jianGe/60%60);//计算分
	        console.log("min:",min)
	        let sec = Math.floor(jianGe%60);//计算
	        console.log("sec:",sec)
	        if(hour<10){ //如果剩下的时间小于十个小时，就在前面拼接0，比如09
	        	this.hour="0"+hour
	        }else{
	            this.hour=hour;
	        }
	        if(min<10){
	        	this.min="0"+min
	        }else{
	            this.min=min;
	        }
	        if(sec<10){
	        	this.sec="0"+sec
	        }else{
	            this.sec=sec;
	        }
        },1000)
      },
      
  },
  created() {
    this.time();
  },
}
</script>

<style scoped>

</style>
