<template>
  <view v-if='obj.zhouqi === "day"'>
    <view class='date-box' v-if='obj.fkDayArr.length <= 15'>
      <view class='date-box-item' v-for='(item, i) in obj.fkDayArr' :key='i'>
        <view class='date-box-item-t' @click='clickItem(i)' :class='[index === i ? "active" : ""]'>
          <uni-icons v-show='item.status === "finished"'
                     class='finished-icon'
                     type='checkbox-filled' size='20'></uni-icons>
          <uni-icons
            v-show='item.status === "wwc"'
            class='wwc-icon'
            type='minus' size='20'></uni-icons>
          <uni-icons
            v-show='item.status === "going"'
            class='going-icon'
            type='refreshempty' size='20'></uni-icons>
          <view>周{{ day(i + 1) }}</view>
        </view>
        <view class='date-box-item-b'>
          {{ obj.month }}月{{ item.day }}日
        </view>
      </view>
    </view>
    <view v-else class='date-box'>

      <view class='date-box-item' v-for='i in num' :key='i'>
        <view class='date-box-item-t'  @click='clickItem(i)' :class='[index === i ? "active" : "",
        obj.fkDayArr[i - 1].status === "wks" ? "wks" : ""]'>
          <uni-icons v-show='obj.fkDayArr[i - 1].status === "finished"'
                     class='finished-icon'
                     type='checkbox-filled' size='20'></uni-icons>
          <uni-icons
            v-show='obj.fkDayArr[i - 1].status === "wwc"'
            class='wwc-icon'
            type='minus' size='20'></uni-icons>
          <uni-icons
            v-show='obj.fkDayArr[i - 1].status === "going"'
            class='going-icon'
            type='refreshempty' size='20'></uni-icons>
          <text style='font-size: 10px' v-show='obj.fkDayArr[i - 1].status === "wks"'>未开始</text>
          <view>周{{ day(i) }}</view>
        </view>
        <view class='date-box-item-b'>
          {{ obj.month }}月{{ obj.fkDayArr[i - 1].day }}日
        </view>
      </view>
      <view class='date-box-item' key='123'>
        <view class='date-box-item-t zhangkai sqactive' @click='zhangkai'>
          {{ zhangkaiflag ? '收起' : '展开' }}
        </view>
      </view>


    </view>
  </view>
  <view v-else>
    <view class='date-box' v-if='obj.fkmonthArr.length <= 15'>
      <view class='date-box-item' v-for='(item, i) in obj.fkmonthArr' :key='i'>
        <view class='date-box-item-t' @click='clickItem(i)' :class='[index === i ? "active" : ""]'>
          <uni-icons v-show='item.status === "finished"'
                     class='finished-icon'
                     type='checkbox-filled' size='20'></uni-icons>
          <uni-icons
            v-show='item.status === "wwc"'
            class='wwc-icon'
            type='minus' size='20'></uni-icons>
          <uni-icons
            v-show='item.status === "going"'
            class='going-icon'
            type='refreshempty' size='20'></uni-icons>
          <view>周{{ day1(i) }}</view>
        </view>
        <view class='date-box-item-b'>
          {{ item.day }}月1日
        </view>
      </view>
    </view>
<!--    <view v-else class='date-box'>-->
<!--      <view class='date-box-item' v-for='i in num'>-->
<!--        <view class='date-box-item-t'>-->
<!--          <uni-icons v-show='obj.fkmonthArr[i].status === "finished"'-->
<!--                     class='finished-icon'-->
<!--                     type='checkbox-filled' size='20'></uni-icons>-->
<!--          <uni-icons-->
<!--            v-show='obj.fkmonthArr[i].status === "wwc"'-->
<!--            class='wwc-icon'-->
<!--            type='minus' size='20'></uni-icons>-->
<!--          <uni-icons-->
<!--            v-show='obj.fkmonthArr[i].status === "going"'-->
<!--            class='going-icon'-->
<!--            type='refreshempty' size='20'></uni-icons>-->
<!--          <view>周{{ day(i + 1) }}</view>-->
<!--        </view>-->
<!--        <view class='date-box-item-b'>-->
<!--          {{ obj.fkmonthArr[i].day }}月1日-->
<!--        </view>-->
<!--      </view>-->
<!--      <view class='date-box-item'>-->
<!--        <view class='date-box-item-t' @click='zhangkai'>-->
<!--          {{ zhangkaiflag ? '收起' : '展开' }}-->
<!--        </view>-->
<!--      </view>-->
<!--    </view>-->

  </view>
</template>

<script>
import dayjs from 'dayjs'

export default {
  name: 'fankui',
  data() {
    return {
      num: 14,
      zhangkaiflag: false,
      index: 0,
    }
  },
  props: {
    obj: {
      type: Object,
      default: {}
    }
  },
  methods: {
    day(i) {
      const map = {
        1: '一',
        2: '二',
        3: '三',
        4: '四',
        5: '五',
        6: '六',
        0: '日'
      }
      return map[dayjs(`2023-${this.obj.month}-${this.obj.fkDayArr[i - 1].day}`).day()]
    },
    day1(i) {
      const map = {
        1: '一',
        2: '二',
        3: '三',
        4: '四',
        5: '五',
        6: '六',
        0: '日'
      }
      return map[dayjs(`2023-${this.obj.fkmonthArr[i].day}-01`).day()]
    },
    zhangkai() {
      if (!this.zhangkaiflag) {
        this.num = this.obj.fkDayArr.length
      } else {
        this.num = 14
      }
      this.zhangkaiflag = !this.zhangkaiflag
    },
    clickItem(i) {
      console.log(i)
      this.index = i
    }
  }
}
</script>

<style scoped>
.date-box {
  display: flex;
  flex-wrap: wrap;
  margin-top: 15px;
  transition: all .4s;
}

.date-box-item {
  width: 60px;
  margin-right: 7px;
  margin-bottom: 5px;
  transition: all .5s;
}

.date-box-item .date-box-item-t {
  width: 51px;
  height: 51px;
  /*line-height: 51px;*/
  border-radius: 4px;
  border: solid 1px rgba(48, 119, 235, 0.5);
  text-align: center;
  font-size: 14px;
  padding: 5px;
  box-sizing: border-box;
}

.zhangkai {
  line-height: 40px;
}

.date-box-item .date-box-item-b {
  font-size: 10px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 20px;
  letter-spacing: 0px;
  color: #8c8c8c;
  text-indent: 4px;
}

.finished-icon {
  color: #09bb07 !important;
}

.wwc-icon {
  color: red !important;
}

.going-icon {
  color: #3077eb !important;
}

.active {
  background: #3077eb;
  color: #fff;
}

.active .finished-icon,
.active .wwc-icon,
.active .going-icon {
  color: #fff !important;
}

.sqactive {
  color: rgba(48, 119, 235, 0.5);
}

.wks {
  border-color: #ccc!important;
  color: #ccc;
}

</style>