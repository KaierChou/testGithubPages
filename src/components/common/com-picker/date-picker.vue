<template>
  <div class="page">
    <div class="overflow" :class="{'overflow-show' : show}"></div>
    <div class="content" :class="{'content-show' : show}">
        <div class="top">
            <span>请选择你要体检的时间</span>
            <i @click="closeSchedule"></i>
        </div>
        <div class="datePicker-content">
        <div class="datePicker-header">
            <i class="prev" @click="prevMonth"></i>
            <span>{{activeYearMonth | datefilter}}</span>
            <i class="next" @click="nextMonth"></i>
        </div>
        <div class="week">
            <span>日</span>
            <span>一</span>
            <span>二</span>
            <span>三</span>
            <span>四</span>
            <span>五</span>
            <span>六</span>
        </div>

        <div class="show-month">
            <div
            class="month-list _clear"
            v-swipeleft="nextMonth"
            v-swiperight="prevMonth"
            :style="{'width': getMonthListWidth, 'transform': 'translate('+ -showMonthIdx * width + 'px' +', 0)'}"
            >
            <div class="list data-paker-list _clear" v-for="(month,index) in datePicker" :key="index">
                <!-- <p>{{ month[20] | datefilter }}</p> -->
                <div
                class="day"
                :class="{ no_quota : !date.remainDate, active: date.isActive }"
                v-for="(date,innerIndex) in month" :key="innerIndex"
                @click="tjTime(index, innerIndex)"
                >
                <!-- <p class="festival" v-if="date.holiday">{{date.holiday}}</p> -->
                <p class="day-num">{{date.num}}</p>
                <p class="remain-per" v-if="date.remainDate">剩余{{date.remainDate}}</p>
                </div>
            </div>
            </div>
        </div>
        </div>
        <div class="botton">
            <Botton
                :type="buttonType"
                @click="toggleDate">
                <span>确定并进入下一步</span>
            </Botton>
        </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import "../../../assets/css/var";
@image: "../../../assets/images/";
.page {
  width: 100%;
  .content{
    bottom: 0;
    position: fixed;
    z-index: 100;
    width: 100%;
    bottom: 0;
    background-color: #fff;
    transition: all .3s;
    transform: translate3d(0, 100vh, 0);
    visibility: hidden;
  }
  .content-show{
      transform: translate3d(0,0,0);
      visibility: visible;
  }
  .datePicker-content,
  .datePicker-loading {
    width: 100%;
    background-color: #fff;
    height: 796/2px;
  }
  .datePicker-content{
    max-height: 70vh;
    overflow-y: auto;
  }
  .botton{
      padding: 0 10px;
      margin: 6px 0 20px 0;
  }
  .top{
      display: flex;
      padding: 0 16px;
      justify-content: space-between;
      align-items: center;
      height: 55px;
      border-bottom: solid 1px #D9DCDE;
      span{
        font-family: @PingFangSC-Medium;
        font-size: 17px;
        color: @black;
        letter-spacing: 0;
      }
      i{
          width: 14px;
          height: 14px;
          background-image: url('@{image}data-picker-close.png');
          background-size: cover;
      }

  }
  .overflow {
    z-index: 99;
    width: 100%;
    height: 100%;
    position: fixed;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.6);
    display: none;
  }
  .overflow-show{
      display: block;
  }
  ._clear:after {
    content: "";
    display: block;
    font-size: 0;
    line-height: 0;
    clear: both;
    margin: 0;
    padding: 0;
  }

  .datePicker-header {
    position: relative;
    text-align: center;
    height: 48/2px;
    line-height: 48/2px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 25px 0;
    line-height: 17px;
    & > span:nth-child(2) {
      color: #2e2e2e;
      font-size: 34/2px;
      margin: 0 126/2px;
      flex: 0 0 190/2px;
      white-space: nowrap;
    }
    i {
      background-size: cover;
      width: 40/2px;
      height: 40/2px;
      border-radius: 50%;
    }
    .next {
    //   background-image: url("@{image}apply/date-right.png");
    }
    .prev {
    //   background-image: url("@{image}apply/date-left.png");
    }
  }

  .week {
    font-size: @PingFangSC-Regular;
    color: #999;
    height: 30/2px;
    line-height: 30/2px;
    margin-bottom: 12/2px;
    span {
      display: inline-block;
      width: 14.2%;
      text-align: center;
      font-size: 22/2px;
    }
  }

  .show-month {
    width: 100%;
    overflow: hidden;
    .month-list {
      transition: transform 0.3s;
      .list {
        width: 375px;
        float: left;
        & > p:nth-child(1) {
          text-align: center;
          font-family: @PingFangSC-Regular;
          color: #2e2e2e;
          font-size: 28/2px;
          line-height: 40/2px;
          margin-bottom: 12/2px;
        }

        .day {
          width: 14.2%;
          text-align: center;
          display: inline-block;
          height: 108/2px;
          float: left;
          position: relative;
          p {
            position: absolute;
            width: 100%;
            text-align: center;
          }
          .festival {
            color: #999;
            top: 8/2px;
            font-size: 20/2px;
            line-height: 28/2px;
          }
          .day-num {
            color: #2e2e2e;
            font-size: 32/2px;
            top: 32/2px;
            line-height: 45/2px;
          }
          .remain-per {
            font-size: 32/2px;
            color: #666;
            top: 81/2px;
            font-size: 20/2px;
            line-height: 28/2px;
          }
        }

        .no_quota {
          .day-num,
          .remain-per,
          .festival {
            color: rgba(46, 46, 46, 0.2);
          }
        }

        .active {
          background-color: @blue;
          .day-num,
          .remain-per,
          .festival {
            color: #fff;
          }
        }
      }
    }
  }
}
</style>
<script>
// import holiday from '@/assets/js/datePicker_holiday'
import Botton from '@/components/common/button'
import { Toast } from 'vant'
export default {
  name: 'dataPicker',
  components: { Botton },
  data() {
    return {
      currentMonth: new Date().getMonth() + 1,
      currentYear: new Date().getFullYear(),
      currentDay: new Date().getDate(),
      datePicker: [],
      dateList: {},
      lastDate: null,
      initData: false,
      activeIndex: null,
      activeDate: null,
      showMonthIdx: 0,
      MonthEach: 0,
      activeYearMonth:
        new Date().getFullYear() +
        '-' +
        (new Date().getMonth() + 1) +
        '-' +
        new Date().getDate(),
      buttonType: 'biggest',
      width: 375
    }
  },

  props: {
    schedule: {
      default: () => {}
    },
    show: {
      default: false
    }
  },
  created: function() {
    // this.schedule = this.dateList
    this.$nextTick(() => {
      this.width = document.body.scrollWidth
    })
  },
  methods: {
    setDateListW() {
      this.$nextTick(() => {
        let list = document.getElementsByClassName('data-paker-list')
        for (let i = 0; i < list.length; i++) {
          list[i].style.width = this.width + 'px'
        }
      })
    },
    initPicker() {
      var arr = [] // 初始化今天的日期
      // this.datePicker = this.getCurrentMonth();
      this.MonthEach = this.getLastMonthNum(this.lastDate)
      var currentMonth = this.currentMonth
      for (var i = 0; i <= this.MonthEach; i++) {
        arr.push(this.getCurrentMonth(currentMonth, i))
        currentMonth++
      }
      this.datePicker = arr
      this.initDataFun()
    },

    initDataFun() {
      this.getDefaultMonth() // 设置默认选中的年月份
    },

    getDefaultMonth() {
      try {
        this.activeYearMonth = this.datePicker[this.showMonthIdx][20].date
      } catch (error) {
        this.activeYearMonth =
          new Date().getFullYear() +
          '-' +
          (new Date().getMonth() + 1) +
          '-' +
          new Date().getDate()
      }
    //   this.toggleDate()// 选中日期
    },

    // 返回本月的所有天数
    getCurrentMonth(Month, idx) {
      var month = Month || this.currentMonth
      var maxDay = this.getMaxDay(month)
      var CurrentDayArr = this.initCurrentDayArr(month) // 初始化数组，主要是对应星期几
      for (var i = 1; i <= maxDay; i++) {
        var date = this.getRealDate(Month, i)
        // var date = new Date(this.currentYear+'/'+Month+'/' + i)

        // var holiday = this.isHoliday(date)// 判断是否节假日；
        var remainDate = this.getRemainDate(date) // 判断剩余体检日期
        var isActive = false
        var parseData = this.parseData(date)
        if (remainDate && !this.initData) {
          // 默认选中最近的体检日期
          this.showMonthIdx = idx || 0 // 得到当前是默认选中日期的第几页
          isActive = true
          this.initData = true
          this.activeDate = {
            date: parseData,
            remainDate: remainDate
          }
        }
        CurrentDayArr.push({
          date: parseData,
          num: i,
          //   holiday: holiday,
          remainDate: remainDate,
          isActive: isActive
        })
      }
      return CurrentDayArr
    },

    // 获取某个月最大天数
    getMaxDay(Month) {
      var mouth = Month || this.currentMonth
      var d = new Date(this.currentYear, mouth, 0)
      return d.getDate()
    },

    // 获取最后一个月的月份并返回需要循环的几个月
    getLastMonthNum(date) {
      var month = Number(date.day.split('-')[1])
      if (date.day.split('-')[0] > this.currentYear) {
        month += 12
      }
      return month - this.currentMonth
    },

    // 对象转为数组
    objConversionArr(obj) {
      if (!this.getType(obj, 'Object')) {
        console.error('objConversionArr type err')
        return false
      }
      var arr = []
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          arr.push(obj[key])
        }
      }
      return arr
    },

    // 判断数据类型
    getType(obj, type) {
      var objType = Object.prototype.toString.call(obj).slice(8, -1)
      return objType === type
    },

    // 判断是否节假日
    // isHoliday(date) {
    //   return false
    //   var time = this.parseData(date)
    //   for (var key in holiday) {
    //     for (var holidaykey in holiday[key]) {
    //       if (time == holidaykey) {
    //         return holiday[key][holidaykey]
    //       }
    //     }
    //   }

    //   return false
    // },
    // 把日期转化成2018-08-08的形式
    parseData(date) {
      var year = date.getFullYear()
      var month =
        date.getMonth() + 1 < 10
          ? '0' + (date.getMonth() + 1)
          : date.getMonth() + 1
      var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
      return year + '-' + month + '-' + day
    },

    // 获取剩下多少体检名额
    getRemainDate(date) {
      var day = this.parseData(date)
      for (var i = 0; i < this.dateList.length; i++) {
        if (day === this.dateList[i].day) {
          if (Number(this.dateList[i].limit_num)) {
            return this.dateList[i].limit_num
          }
        }
      }
      return false
    },

    initCurrentDayArr(Month) {
      // 初始化数组
      var date = this.getRealDate(Month)
      var week = date.getDay() === 0 ? 0 : date.getDay()
      var arr = []
      for (var i = 0; i < week; i++) {
        arr.push({})
      }
      return arr
    },

    getRealDate(Month, i) {
      var index = i || '01'
      var date = new Date(this.currentYear + '/' + Month + '/' + index)
      if (Number(Month) > 12) {
        date = new Date(
          this.currentYear + 1 + '/' + (Number(Month) - 12) + '/' + index
        )
      }
      return date
    },

    tjTime(index, innerIndex) {
      if (!this.datePicker[index][innerIndex].remainDate) {
        return
      }
      for (var i = 0; i < this.datePicker.length; i++) {
        for (var j = 0; j < this.datePicker[i].length; j++) {
          if (this.datePicker[i][j].isActive) {
            this.datePicker[i][j].isActive = false
            break
          }
        }
      }
      this.datePicker[index][innerIndex].isActive = true
      this.activeDate = this.datePicker[index][innerIndex]
    //   this.toggleDate()
    },

    // 选中日期
    toggleDate() {
      if (this.activeDate) {
        this.$emit('toggleDate', this.activeDate)
      } else {
        if (this.schedule && this.schedule.length < 1) {
          Toast('此机构暂无排期')
          return
        }
        Toast('请先选择日期')
      }
    },

    prevMonth() {
      var showMonthIdx = this.showMonthIdx
      showMonthIdx--
      if (showMonthIdx < 0) {
        return
      }
      this.showMonthIdx--
      this.getDefaultMonth()
    },

    nextMonth() {
      var showMonthIdx = this.showMonthIdx
      showMonthIdx++
      if (showMonthIdx > this.MonthEach) {
        return
      }
      this.showMonthIdx++
      this.getDefaultMonth()
    },

    closeSchedule() {
      this.$emit('closeSchedule')
    }
  },

  computed: {
    getMonthListWidth() {
      return this.datePicker.length * 100 + '%'
    }
  },

  watch: {
    schedule: function(newVal, oldVal) {
      this.schedule = newVal // newVal即是chartData
      if (this.schedule.length < 1) {
        Toast('此机构暂无排期')
        return
      }
      this.dateList = this.schedule
      this.dateList = this.objConversionArr(this.dateList)
      this.lastDate = this.dateList[this.dateList.length - 1]
      this.setDateListW()
      this.initPicker()
    }
  },

  filters: {
    datefilter(val) {
      var month = val.split('-')[1]
      return val.split('-')[0] + '年' + month + '月'
    }
  }
}
</script>
