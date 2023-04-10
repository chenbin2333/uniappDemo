<template>
  <view v-if='obj.zhouqi === "day"'>
    <view class='date-box' v-if='obj.dayArr.length <= 15'>
      <view class='date-box-item' v-for='(item, index) in obj.dayArr' :key='index'>
        <view class='date-box-item-t'  @click='clickItem(index)' :class='[index === index ? "active" : ""]'>
          <text class='yfnum'>{{ obj.dayArr[index].yfknum }}</text>/
          <text class='totalCount'>{{ obj.toalCount }}</text>
          <view>周{{ day(index + 1) }}</view>
        </view>
        <view class='date-box-item-b'>
          {{ obj.month }}月{{ item }}日
        </view>
      </view>
    </view>
    <view v-else class='date-box'>
      <view class='date-box-item' v-for='i in num'>
        <view class='date-box-item-t' @click='clickItem(i)' :class='[index === i ? "active" : ""]'>
          <text class='yfnum'>{{ obj.dayArr[i - 1].yfknum }}</text>/
          <text class='totalCount'>{{ obj.toalCount }}</text>
          <view>周{{ day(i) }}</view>
        </view>
        <view class='date-box-item-b'>
          {{ obj.month }}月{{ obj.dayArr[i - 1].day >= 10 ? obj.dayArr[i - 1].day : '0' + obj.dayArr[i - 1].day}}日
        </view>
      </view>
      <view class='date-box-item'>
        <view class='date-box-item-t zhangkai sqactive' @click='zhangkai'>
          {{ zhangkaiflag ? '收起' : '展开' }}
        </view>
      </view>
    </view>
  </view>
  <view v-else>
    <view class='date-box' v-if='obj.monthArr.length <= 15'>
      <view class='date-box-item' v-for='(item, i) in obj.monthArr' :key='i'>
        <view class='date-box-item-t'  @click='clickItem(i)' :class='[index === i ? "active" : ""]'>
          <text class='yfknum'>{{ obj.dayArr[i].yfknum }}</text>/
          <text class='totalCount'>{{ obj.toalCount }}</text>
          <view>周{{ day1(i) }}</view>
        </view>
        <view class='date-box-item-b'>
          {{ item.month }}月1日
        </view>
      </view>
    </view>
    <!--    <view v-else class='date-box'>-->
    <!--      <view class='date-box-item' v-for='i in num'>-->
    <!--        <view class='date-box-item-t'>-->
    <!--          123-->
    <!--        </view>-->
    <!--        <view class='date-box-item-b'>-->
    <!--          {{ obj.month[i] }}月1日-->
    <!--        </view>-->
    <!--      </view>-->
    <!--      <view class='date-box-item'>-->
    <!--        <view class='date-box-item-t' @click='zhangkai'>-->
    <!--          {{ zhangkaiflag ? '收起' : '展开' }}-->
    <!--        </view>-->
    <!--      </view>-->
  </view>

</template>

<script>
import dayjs from 'dayjs'

export default {
  name: 'faqi',
  data() {
    return {
      num: 14,
      zhangkaiflag: false,
      index: 0
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
      return map[dayjs(`2023-${this.obj.month}-${this.obj.dayArr[i - 1].day}`).day()]
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
      // console.log(this.obj.monthArr[i].month)
      return map[dayjs(`2023-${this.obj.monthArr[i].month}-01`).day()]
    },
    zhangkai() {
      if (!this.zhangkaiflag) {
        this.num = this.obj.dayArr.length
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
}

.date-box-item {
  width: 60px;
  margin-right: 7px;
  margin-bottom: 5px;
}

.date-box-item .date-box-item-t {
  width: 51px;
  height: 51px;
  border-radius: 4px;
  border: solid 1px rgba(48, 119, 235, 0.5);
  text-align: center;
  font-size: 14px;
  padding: 5px;
  box-sizing: border-box;
}
.date-box-item .date-box-item-t .totalCount {
  font-size: 12px;
  color: #8c8c8c;
}

.date-box-item .date-box-item-b {
  font-size: 6px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 20px;
  letter-spacing: 0px;
  color: #8c8c8c;
  text-indent: 3px;
}

.zhangkai {
  line-height: 40px;
}

.active {
  background: #3077eb;
  color: #fff;
}

.active .totalCount {
  color: #fff!important;
}

.sqactive {
  color: rgba(48, 119, 235, 0.5);
}

</style>