<template>

        <div class="dizhi">
            {{msg}}
            <p>
              <span class="timeBol"></span>
              <span>
	              <span class="hour"></span>
	              <span class="char">:</span>
	              <span class="minute"></span>
	              <span class="char">:</span>
	              <span class="second"></span>
              </span>
            </p>
        </div>

</template>

<script>
   

   export default {
       name:"dizhi",
       data(){
           return{
               msg:"dizhi",
           }
       },
       mounted() {
       	 this.freshTime()
       },
       methods: {
       	 freshTime (timeStr) {
       	 	var endTime = new Date(timeStr)
       	 	console.log("endTime:",endTime)
       	 	var nowTime = new Date()
       	 	console.log("nowTime:",nowTime)
       	 	var leftTime = parseInt(endTime.getTime()+10*60*60*1000-nowTime.getTime())
       	 	console.log("leftTime:",leftTime) //NAN
       	 	var hm = 60*60*1000;
       	 	console.log("hm:",hm)
       	 	var h = parseInt((leftTime/hm));
       	 	console.log("h:",h)
       	 	var mm = 60*1000;
       	 	console.log("mm:",mm)
       	 	var m = parseInt((leftTime/mm)%60);
       	 	console.log("m:",m)
       	 	var s = parseInt((leftTime/1000)%60)
       	 	console.log("s:",s)
       	 }
       },
       components:{
          
       }
   }

</script>

<style scoped>
 

</style>