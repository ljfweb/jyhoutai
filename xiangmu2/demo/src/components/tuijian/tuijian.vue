<template>
  <transition name="bkcd">
    <div class="bkCountDown" v-show="bkCountDownShow">
    <div class="kbCountDownTitle">
      <img src="http://static.crecgec.com/Kaipiao/countDownTitle.png">
    </div>
    <div id="kbCountDownContent" class="kbCountDownContent" ref="kbCountDownContent">
    </div>
    <!--倒计时结束后提示的信息-->
    <div class="cdEndCon" v-show="cdEndConShow">{{cdEndContent}}</div>
  </div>
  </transition>
</template>

<script>
import $ from 'jquery'

export default {
  name: 'huishou',
  props: {
    // 控制倒计时页面显示、隐藏
    bkCountDownShow: {
      type: Boolean,
      default: true
    },
    // 这个参数：为了实现中途倒计时暂停功能
    // 控制倒计时暂停/开始
    cdStartOrEnd: {
      type: Boolean,
      default: true
    },
    // 倒计时的时间，有父组件传递
    countDownTime: {
      type: String,
      default: '2019/10/29 00:00:00'
    },
    // 倒计时结束后显示的内容
    cdEndContent: {
      type: String,
      default: '倒计时已经结束'
    }
  },
  data () {
    return {
      // 倒计时结束后显示cdEndCon
      cdEndConShow: false,
      timestamp: '', // 倒计时的时间戳
      cdTimer: '', // setTimeOut值
      timeInterval: '', // 倒计时结束时间与当前时间的之间的间隔
      timeIntervalVal: '', // 保存时间间隔的参数
      d: '',
      h: '',
      m: '',
      s: '',
      days: 24 * 60 * 60,
      hours: 60 * 60,
      minutes: 60
    }
  },
  mounted () {
    this.countdown()
  },
  watch: {
    // 监控cdStartOrEnd值
    cdStartOrEnd () {
      if (this.cdStartOrEnd) {
        this.tick()
      } else {
        clearTimeout(this.cdTimer)
      }
    }
  },
  methods: {
    countdown () {
      this.timestamp = new Date(this.countDownTime).getTime()
      this.init('kbCountDownContent')
    },
    // 初始化
    init (ele) {
      $.each(['Hours', 'Minutes', 'Seconds'], function (i) {
        $('<div class="count' + this + '">').html(
          `<div class = "countPos">\
             <span class="digit static">0</span>\
        </div>\
        <div class="countPos">\
          <span class="digit static">0</span>\
        </div>`
        ).appendTo($('#' + ele))
        if (this !== 'Seconds') {
          $('#' + ele).append('<div class="countDiv countDiv' + i + '"></div>')
        }
      })
      this.tick()
    },
    tick () {
//      每次进入这个方法，就重新计算和当前时间的间隔，然后赋值给timeInterval
      this.timeInterval = Math.floor((this.timestamp - (new Date())) / 1000)
      if (this.timeInterval < 0) {
        this.timeInterval = 0
      }
      this.timeIntervalVal = this.timeInterval
//       Number of days left
//      现在是只有时分秒，可以通过调整下面的代码，来确定显示什么
//      this.d = Math.floor(this.timeInterval / this.days)
//      this.updateDuo(0, 1, this.d)
//      this.timeInterval -= this.d * this.days
      // Number of hours left
      this.h = Math.floor(this.timeInterval / this.hours)
      this.updateDuo(0, 1, this.h)
      this.timeInterval -= this.h * this.hours
      // Number of minutes timeInterval
      this.m = Math.floor(this.timeInterval / this.minutes)
      this.updateDuo(2, 3, this.m)
      this.timeInterval -= this.m * this.minutes
      // Number of seconds timeInterval
      this.s = this.timeInterval
      this.updateDuo(4, 5, this.s)
      // timeIntervalVal大于0，就执行setTimeout方法
      if (this.timeIntervalVal > 0) {
        this.cdTimer = setTimeout(this.tick, 1000)
      } else {
        // 倒计时结束
        this.cdEndConShow = true
        // 这块可以添加emit，给父组件传参
        // 通过emit给父组件传参数来操作bkCountDownShow
        //  bkCountDownShow = false
      }
    },
    updateDuo (minor, major, value) {
      this.switchDigit($('#kbCountDownContent').find('.countPos').eq(minor), Math.floor(value / 10) % 10)
      this.switchDigit($('#kbCountDownContent').find('.countPos').eq(major), value % 10)
    },
    switchDigit (position, number) {
      let digit = position.find('.digit')
      if (digit.is(':animated')) {
        return false
      }
      if (position.data('digit') === number) {
        return false
      }
      position.data('digit', number)
      var replacement = $('<span>', {
        'class': 'digit',
        css: {
          top: '-170px',
          opacity: 0
        },
        html: number
      })
      digit
        .before(replacement)
        .removeClass('static')
        .animate({top: '170px', opacity: 0}, 'slow', function () {
          digit.remove()
        })
      replacement
        .delay(100)
        .animate({top: 0, opacity: 1}, 'slow', function () {
          replacement.addClass('static')
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  *{
    margin:0;
    padding:0;
    font-family: 'Microsoft Yahei',Tahoma,'Simsun','宋体' !important;
  }

  .bkCountDown{
    width: 100%;
    height: 980px;
    background:url('http://static.crecgec.com/Kaipiao/background.png') #b0b0b0;
    position: absolute;
    background-size: cover;
    overflow: hidden;
  }
  .kbCountDownTitle{
    width: 1070px;
    height: 120px;
    line-height: 120px;
    font-size: 120px;
    margin: 190px auto 0;
    text-align: center;
    color: #fff;
  }
  .kbCountDownContent{
    width:1070px;
    margin:160px auto 0;
    text-align:center;
    letter-spacing:-3px;
    overflow: hidden;
  }
  .countPos{
    display: inline-block;
    width: 150px;
    height: 170px;
    overflow: hidden;
    position: relative;
    margin-left: 15px;
  }

  .digit{
    position:absolute;
    display:block;
    width:150px;
    height: 170px;
    line-height: 170px;
    text-align:center;
    color:#fff;
    font-size: 80px;
    background: url('http://static.crecgec.com/Kaipiao/countDown.png') 0 0 no-repeat;
  }

  .digit.static{
    background: url('http://static.crecgec.com/Kaipiao/countDown.png') 0 0 no-repeat;
  }
  .countDays,.countHours,.countMinutes,.countSeconds{
    float: left;
    font-size: 0;
  }
  .countDiv{
    display:inline-block;
    width:10px;
    height:50px;
    float: left;
    margin-top: 60px;
    margin-left: 15px;
    background: url('http://static.crecgec.com/Kaipiao/countDown1.png') 0 0 no-repeat;
  }
  .cdEndCon{
    width:1070px;
    margin:20px auto 0;
    text-align: center;
    color: #fff;
    font-size: 20px;
  }
  .bkcd-enter-active, .bkcd-leave-active{
    transition: opacity .5s
  }
  .bkcd-enter, .bkcd-leave-to{
    opacity: 0
  }
</style>