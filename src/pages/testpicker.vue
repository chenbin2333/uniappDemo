<template>
  <view>
    <view v-for="(item, index) in arr" :key="index">
      <view class="uni-list-cell">
        <view class="uni-list-cell-left">
          {{ item.componentName }}
          <view v-if="item.componentType === 'dialog' && chooseIndex === 2">
            <text v-if="item.active" v-for="(item, index) in dateArr" :key="index">
              {{ item.name }}
            </text>
          </view>
          <view v-if="item.componentType === 'dialog' && chooseIndex === 3">
            <text> 每月{{ monthIndex }}号 </text>
          </view>
        </view>

        <view class="uni-list-cell-db">
          <picker
            v-if="item.componentType === 'normal'"
            @change="e => bindPickerChange(e, index)"
            :value="item.index"
            :range="item.componentValue"
          >
            <view class="uni-input"
              >{{ item.index === -1 ? '请选择' : item.componentValue[item.index] }} <text class="text"> > </text>
            </view>
          </picker>
          <picker
            v-if="item.componentType === 'date'"
            mode="date"
            :value="item.date"
            :start="item.startDate"
            :end="item.endDate"
            @change="e => bindDateChange1(e, index)"
          >
            <view class="uni-input">{{ item.index === -1 ? '请选择' : item.date }} <text class="text"> > </text> </view>
          </picker>
          <view v-if="item.componentType === 'switch'" class="uni-list-cell uni-input">
            <switch style="transform: scale(0.7)" @change="e => switch1Change(e, index)" :checked="item.checked" />
          </view>
          <view v-if="item.componentType === 'text'" class="uni-list-cell">
            <input class="uni-input" v-model="item.value" maxlength="10" placeholder="请输入人数，若不限制则无需填写" />
          </view>
          <view v-if="item.componentType === 'dialog'" class="dialog-box">
            <view class="item" @click="popUp(index)"
              >{{ item.index === -1 ? '请选择' : item.componentValue[item.index] }} <text class="text"> > </text>
            </view>
          </view>
        </view>
      </view>
    </view>

    <view v-if="chooseIndex != 0" class="uni-list-cell list">
      持续时间
      <text class="text">请选择 > </text>
    </view>

    <view v-if="chooseIndex != 0" class="uni-list-cell list">
      可填报时间
      <text class="text">请选择 > </text>
    </view>

    <view v-if="chooseIndex != 0" class="uni-list-cell list">
      提醒填报时间
      <text class="text">请选择 > </text>
    </view>

    <uni-popup ref="popup" background-color="#fff">
      <view class="popup-content" style="padding: 10px">
        定时重复上报

        <view class="dscfsb">
          <view
            class="dscfsb-item"
            @click="clickItem(index)"
            :class="{ active: index === currentIndex }"
            v-for="(item, index) in dscfsb"
            :key="index"
          >
            {{ item }}
          </view>
        </view>
        <view>
          <view v-if="currentIndex === 2">
            <view class="week-box-head">
              <view>日期</view>
              <view class="week-box-content">
                <text style="margin-right: 10px" v-if="item.active" v-for="(item, index) in dateArr" :key="index">
                  <text>{{ item.name }}</text>
                </text>
              </view>
            </view>
            <view class="week-arr">
              <view @click="clickWeek(item)" v-for="(item, index) in dateArr" class="week-item" :key="index">
                {{ item.name }}
              </view>
            </view>
          </view>

          <view v-if="currentIndex === 3">
            <view class="month-box-h">
              <text>日期</text>
              <text>每月{{ monthIndex }}号</text>
            </view>
            <view class="month-box-b">
              <view v-for="i in 31" @click="clickMonth(i)" class="month-box-item" :class="{ active: i === monthIndex }">
                {{ i }}
              </view>
            </view>

            <!-- <uni-calendar class="uni-calendar--hook" :selected="info.selected" :showMonth="false" @change="change" @monthSwitch="monthSwitch" /> -->
          </view>

          <button :style="{ display: 'inline-block', width: '160px', marginRight: '20px' }" @click="cancel">
            取消
          </button>
          <button :style="{ display: 'inline-block', width: '160px' }" type="primary" @click="queding">确定</button>
        </view>
      </view>
    </uni-popup>

    <button @click="testPrint" style="margin-top: 20px">测试打印</button>
    <!--    <view class='date-picker'>-->
    <!--      <picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">-->
    <!--        +选择周期-->
    <!--      </picker>-->
    <!--      <view class='date-item' v-for='(item, index) in dates' :key='index'>-->
    <!--        第{{index+1}}期 ({{item.date}}, {{item.day}})-->
    <!--        <uni-icons style='margin-left: 100px' type="trash-filled" size="24"></uni-icons>-->
    <!--      </view>-->
    <!--    </view>-->

    <!--    <Tianbaozhouqi></Tianbaozhouqi>-->
  </view>
</template>

<script>
import dayjs from 'dayjs'
import index from 'vuex'

export default {
  components: {},
  data() {
    const currentDate = this.getDate({
      format: true
    })
    return {
      title: 'picker',
      date: currentDate,
      time: '12:01',
      dscfsb: ['不重复', '每天', '每周', '每月', '自定义'],
      currentIndex: 0,
      arr: [
        {
          index: -1,
          componentType: 'normal',
          componentName: '联合发起人',
          componentCode: 'SETTING_UNION_START_PERSON',
          required: true,
          componentValue: ['张三，李四', '李四，王五'],
          supportValue: null,
          tip: ''
        },
        {
          index: -1,
          componentType: 'normal',
          componentName: '紧急程度',
          componentCode: 'SETTING_PRIORITY',
          required: true,
          componentValue: ['普通', '紧急', '特急', '特提'],
          supportValue: null,
          tip: ''
        },
        {
          index: -1,
          componentType: 'date',
          componentName: '截止时间',
          componentCode: 'SETTING_DEADLINE',
          required: true,
          componentValue: '',
          supportValue: null,
          tip: '',
          startDate: this.getDate('start'),
          endDate: this.getDate('end'),
          date: null
        },
        {
          index: -1,
          componentType: 'date',
          componentName: '发布时间',
          componentCode: 'SETTING_PUBLISH_TIME',
          required: true,
          componentValue: 'IMMEDIATELY',
          supportValue: null,
          tip: '',
          startDate: this.getDate('start'),
          endDate: this.getDate('end'),
          date: null
        },
        {
          index: -1,
          componentType: 'date',
          componentName: '自动提醒时间',
          componentCode: 'SETTING_AUTO_REMIND',
          required: true,
          componentValue: '10',
          supportValue: null,
          tip: '',
          startDate: this.getDate('start'),
          endDate: this.getDate('end'),
          date: null
        },
        {
          index: -1,
          componentType: 'switch',
          componentName: '是否允许补交',
          componentCode: 'SETTING_REPLENISH_ABLE',
          required: true,
          componentValue: 'true',
          supportValue: null,
          tip: '',
          checked: false
        },
        {
          index: -1,
          componentType: 'text',
          componentName: '限制人数',
          componentCode: 'SETTING_LIMIT_NUM',
          required: true,
          componentValue: '',
          supportValue: null,
          tip: '',
          value: ''
        },
        {
          index: -1,
          componentType: 'switch',
          componentName: '是否周期上报',
          componentCode: 'SETTING_PERIOD_ABLE',
          required: true,
          componentValue: 'NONE',
          supportValue: null,
          tip: '',
          checked: true
        },
        {
          index: -1,
          componentType: 'switch',
          componentName: '是否允许多次反馈',
          componentCode: 'SETTING_MULTI_FEEDBACK',
          required: true,
          componentValue: 'true',
          supportValue: null,
          tip: '',
          checked: false
        },
        {
          index: -1,
          componentType: 'switch',
          componentName: '是否允许匿名反馈',
          componentCode: 'SETTING_ANONYMITY',
          required: true,
          componentValue: 'true',
          supportValue: null,
          tip: '',
          checked: true
        },
        {
          index: -1,
          componentType: 'switch',
          componentName: '是否允许相互查看',
          componentCode: 'SETTING_OPEN_ABLE',
          required: true,
          componentValue: 'true',
          supportValue: [
            {
              key: 'true',
              value: '是'
            },
            {
              key: 'false',
              value: '否'
            }
          ],
          checked: true,
          tip: ''
        },
        {
          index: -1,
          componentType: 'switch',
          componentName: '是否允许评论',
          componentCode: 'SETTING_COMMENT_ABLE',
          required: true,
          componentValue: 'true',
          supportValue: [
            {
              key: 'true',
              value: '是'
            },
            {
              key: 'false',
              value: '否'
            }
          ],
          checked: true,
          tip: ''
        },
        {
          index: -1,
          componentType: 'switch',
          componentName: '是否允许点赞',
          componentCode: 'SETTING_LIKE_ABLE',
          required: true,
          componentValue: 'true',
          supportValue: [
            {
              key: 'true',
              value: '是'
            },
            {
              key: 'false',
              value: '否'
            }
          ],
          checked: true,
          tip: ''
        },
        {
          index: -1,
          componentType: 'dialog',
          componentName: '定时重复上报',
          componentCode: 'SETTING_REPEAT_SB',
          required: true,
          componentValue: ['不重复', '每天', '每周', '每月', '自定义'],
          tip: ''
        }
      ],
      cfsbIndex: -1,
      dateArr: [
        {
          name: '周一',
          active: true
        },
        {
          name: '周二',
          active: true
        },
        {
          name: '周三',
          active: true
        },
        {
          name: '周四',
          active: true
        },
        {
          name: '周五',
          active: true
        },
        {
          name: '周六',
          active: false
        },
        {
          name: '周日',
          active: false
        }
      ],
      // 选择重复上报Index
      chooseIndex: 0,
      monthIndex: 1
    }
  },
  computed: {
    index() {
      return index
    },
    startDate() {
      return this.getDate('start')
    },
    endDate() {
      return this.getDate('end')
    }
  },
  methods: {
    clickWeek: function (item) {
      console.log(item)
      item.active = !item.active
    },
    popUp: function (index) {
      this.$refs.popup.open()
      this.cfsbIndex = index
    },
    cancel: function () {
      this.$refs.popup.close()
    },
    bindDateChange: function (e) {
      this.date = e.detail.value
      console.log(dayjs(this.date).day())
      const map = {
        1: '星期一',
        2: '星期二',
        3: '星期三',
        4: '星期四',
        5: '星期五',
        6: '星期六',
        0: '星期日'
      }
      this.dates.push({
        date: this.date,
        day: map[dayjs(this.date).day()]
      })
    },
    bindDateChange1: function (e, index) {
      this.arr[index].index = 1
      this.arr[index].date = e.detail.value
    },
    bindPickerChange: function (e, index) {
      console.log('picker发送选择改变，携带值为', e.detail.value)
      this.arr[index].index = e.detail.value
    },
    bindPickerChange1: function (e) {
      console.log('picker发送选择改变，携带值为', e.detail.value)
      this.index1 = e.detail.value
    },
    getDate(type) {
      const date = new Date()
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let day = date.getDate()

      if (type === 'start') {
        year = year - 60
      } else if (type === 'end') {
        year = year + 2
      }
      month = month > 9 ? month : '0' + month
      day = day > 9 ? day : '0' + day
      return `${year}-${month}-${day}`
    },
    switch1Change(e, index) {
      this.arr[index].checked = e.detail.value
    },
    testPrint() {
      let obj = {}
      for (let item of this.arr) {
        if (item.componentType === 'normal') {
          obj[item.componentCode] = item.componentValue[item.index]
        }
        if (item.componentType === 'date') {
          obj[item.componentCode] = item.date
        }
        if (item.componentType === 'switch') {
          obj[item.componentCode] = item.checked
        }
        if (item.componentType === 'text') {
          obj[item.componentCode] = item.value
        }
      }
      console.log(obj)
    },
    clickItem(index) {
      this.currentIndex = index
    },
    queding() {
      console.log(this.currentIndex)
      this.chooseIndex = this.currentIndex
      this.arr[this.cfsbIndex].index = this.currentIndex
      this.$refs.popup.close()
    },
    clickMonth(i) {
      this.monthIndex = i
    }
  }
}
</script>

<style scoped>
.uni-list-cell-left {
  width: 120px;
  box-sizing: border-box;
}
.uni-input {
  float: right;
}

.uni-input .text,
.dialog-box .item .text {
  font-size: 18px;
  color: #bbb;
  margin-left: 5px;
}
.date-picker {
  padding: 10px;
}
.date-item {
  padding: 10px;
  border-bottom: 1px solid #ccc;
}
.dialog-box .item {
  float: right;
  height: 40px;
  line-height: 40px;
  padding-right: 15px;
  font-size: 14px;
  color: var(--UI-FG-0);
}
.dscfsb {
  display: flex;
  margin: 10px 0;
}
.dscfsb .dscfsb-item {
  width: 60px;
  border: 1px solid #ccc;
  text-align: center;
  margin-right: 5px;
}
.dscfsb .dscfsb-item.active {
  border-color: lightskyblue;
}
.week-arr {
  display: flex;
  margin: 10px 0;
}
.week-arr .week-item {
  width: 40px;
  border: 1px solid #ccc;
  text-align: center;
  margin-right: 10px;
}
.uni-list-cell.list {
  padding: 10px;
  text-indent: 5px;
  font-size: 14px;
  color: var(--UI-FG-0);
}
.uni-list-cell.list .text {
  float: right;
  margin-right: 6px;
  font-size: 14px;
  color: var(--UI-FG-0);
}

.week-box-head {
  display: flex;
  justify-content: space-between;
}

.week-box-content {
  box-sizing: border-box;
  color: #bbb;
  font-size: 12px;
  margin-top: 2px;
}
.month-box-h {
  display: flex;
  justify-content: space-between;
}
.month-box-b {
  display: flex;
  flex-wrap: wrap;
  margin: 10px 0;
}

.month-box-item {
  width: 30px;
  height: 30px;
  box-sizing: border-box;
  line-height: 30px;
  /* border: 1px solid #bbb; */
  margin-right: 24px;
  text-align: center;
}
.month-box-item.active {
  background: skyblue;
}

.month-box-item:nth-child(7n) {
  margin-right: 0;
}
</style>
