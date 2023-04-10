<template>
  <view class='box'>
    <view class='title-box'>
      <text class='title1'>填报周期</text>
      <text class='title2'>（已进行{{ obj.yjxzq }}/{{ obj.totalzq }}期）</text>
    </view>


    <view class='tianbao-shiduan' v-show='obj.zhouqi !== "month"'>
      <picker @change='bindPickerChange' :value='index' :range='pickerrange'>
        {{ pickerrange[index] }}
      </picker>
      <uni-icons class='left' @click='pre' type='left' size='30' color='#d2d2d2'></uni-icons>
      <uni-icons class='right' @click='next' type='right' size='30' color='#3077eb'></uni-icons>
    </view>

    <faqi v-show='obj.type === "faqi"' :obj='obj'></faqi>
    <fankui v-show='obj.type === "fankui"' :obj='obj'></fankui>
  </view>
</template>

<script>
import dayjs from 'dayjs'
import Faqi from '@/components/faqi.vue'
import Fankui from '@/components/fankui.vue'

export default {
  name: 'tianbaozhouqi',
  components: { Fankui, Faqi },
  data() {
    return {
      pickerrange: ['第1次填报时段（08:00 - 10:00）', '第2次填报时段（17:00 - 18:00）',
        '第3次填报时段（20:00 - 21:00）'],
      index: 0,
      obj: {
        type: 'fankui',
        zhouqi: 'day',
        totalzq: 22,
        yjxzq: 6,
        month: 4,
        toalCount: 14,
        dayArr: [
          {
            day: 1,
            yfknum: 9
          },
          {
            day: 2,
            yfknum: 8
          },
          {
            day: 3,
            yfknum: 10
          },
          {
            day: 4,
            yfknum: 11
          },
          {
            day: 5,
            yfknum: 1
          },
          {
            day: 6,
            yfknum: 2
          },
          {
            day: 7,
            yfknum: 3
          },
          {
            day: 8,
            yfknum: 2
          },
          {
            day: 9,
            yfknum: 10
          },
          {
            day: 10,
            yfknum: 11
          },
          {
            day: 11,
            yfknum: 11
          },
          {
            day: 12,
            yfknum: 12
          },
          {
            day: 13,
            yfknum: 2
          },
          {
            day: 14,
            yfknum: 2
          },
          {
            day: 15,
            yfknum: 5
          },
          {
            day: 16,
            yfknum: 4
          },
          {
            day: 17,
            yfknum: 2
          }
        ],
        monthArr: [{ month: 1, yfknum: 2 }, { month: 2, yfknum: 9 }, { month: 3, yfknum: 4 }
        ],
        fkmonthArr: [
          {
            day: 1,
            status: 'finished'
          },
          {
            day: 2,
            status: 'finished'
          },
          {
            day: 3,
            status: 'wwc'
          },
          {
            day: 4,
            status: 'finished'
          },
          {
            day: 5,
            status: 'wwc'
          },
          {
            day: 6,
            status: 'wwc'
          },
          {
            day: 7,
            status: 'going'
          },
          {
            day: 8,
            status: 'going'
          },
          {
            day: 9,
            status: 'going'
          },
          {
            day: 10,
            status: 'going'
          },
          {
            day: 11,
            status: 'going'
          },
          {
            day: 12,
            status: 'going'
          }
        ],
        fkDayArr: [
          {
            day: 1,
            status: 'finished'
          },
          {
            day: 2,
            status: 'finished'
          },
          {
            day: 3,
            status: 'wwc'
          },
          {
            day: 4,
            status: 'finished'
          },
          {
            day: 5,
            status: 'wwc'
          },
          {
            day: 6,
            status: 'wwc'
          },
          {
            day: 7,
            status: 'going'
          },
          {
            day: 8,
            status: 'going'
          },
          {
            day: 9,
            status: 'going'
          },
          {
            day: 10,
            status: 'going'
          },
          {
            day: 11,
            status: 'going'
          },
          {
            day: 12,
            status: 'going'
          },
          {
            day: 13,
            status: 'going'
          },
          {
            day: 14,
            status: 'going'
          },
          {
            day: 15,
            status: 'wks'
          },
          {
            day: 16,
            status: 'wks'
          }

        ]
      }
    }
  },
  computed: {},
  props: {},
  created() {

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
      return map[dayjs(`2023-${this.obj.month}-${this.obj.dayArr[i - 1]}`).day()]
    },
    bindPickerChange(e) {
      console.log(e.detail.value)
      this.index = e.detail.value
    },
    next() {
      this.index++
      if (this.index > 2) {
        this.index = 0
      }
    },
    pre() {
      this.index--
      if (this.index < 0) {
        this.index = 2
      }
    }
  }
}
</script>

<style scoped>
.box {
  padding: 15px 16px 0 24px;
}

.title-box::before {
  display: inline-block;
  content: '';
  width: 5px;
  height: 16px;
  background-color: #3077eb;
  margin-right: 10px;
  margin-top: 5px;
}

.box .title1 {
  font-size: 18px;
  font-weight: bold;
  font-stretch: normal;
  line-height: 26px;
  letter-spacing: 0px;
  color: #262626;
}

.box .title2 {
  font-size: 16px;
  font-weight: bold;
  font-stretch: normal;
  line-height: 26px;
  letter-spacing: 0px;
  color: #262626;
}


.tianbao-shiduan {
  position: relative;
  padding: 10px;
  margin-top: 15px;
  background-color: rgba(244, 248, 254);
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;
  font-stretch: normal;
  line-height: 36px;
  letter-spacing: 0px;
  color: #262626;
  text-align: center;
}

.tianbao-shiduan .left {
  position: absolute;
  top: 10px;
  left: 10px;
}

.tianbao-shiduan .right {
  position: absolute;
  top: 10px;
  right: 10px;
}

</style>