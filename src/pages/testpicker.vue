<template>
  <view>
    <view class='union-faqi'>
      <view class="uni-list-cell">
        <view class="uni-list-cell-left">
          联合发起人
        </view>
        <view class="uni-list-cell-db">
          <picker @change="bindPickerChange" :value="index0" :range="array">
            <view class="uni-input">{{array[index0]}} <text class='text'> > </text> </view>
          </picker>
        </view>
      </view>
    </view>
    <view class='jjcontent'>
      <view class="uni-list-cell">
        <view class="uni-list-cell-left">
          紧急程度
        </view>
        <view class="uni-list-cell-db">
          <picker @change="bindPickerChange1" :value="index1" :range="jjcontent">
            <view class="uni-input">{{jjcontent[index1]}} <text class='text'> > </text> </view>
          </picker>
        </view>
      </view>
    </view>

    <view class='date-picker'>
      <picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
        +选择周期
      </picker>
      <view class='date-item' v-for='(item, index) in dates' :key='index'>
        第{{index+1}}期 ({{item.date}}, {{item.day}})
        <uni-icons style='margin-left: 100px' type="trash-filled" size="24"></uni-icons>
      </view>
    </view>

    <Tianbaozhouqi></Tianbaozhouqi>
  </view>
</template>

<script>
import dayjs from 'dayjs'
import Tianbaozhouqi from '@/components/tianbaozhouqi.vue'

export default {
  components: { Tianbaozhouqi },
  data() {
    const currentDate = this.getDate({
      format: true
    })
    return {
      title: 'picker',
      array: ['张三，李四', '李四，王五'],
      jjcontent: ['普通', '紧急', '特急', '特提'],
      index0: 0,
      index1: 0,
      date: currentDate,
      time: '12:01',
      dates: [

      ]
    }
  },
  computed: {
    startDate() {
      return this.getDate('start');
    },
    endDate() {
      return this.getDate('end');
    }
  },
  methods: {
    bindDateChange: function(e) {
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
    bindPickerChange: function(e) {
      console.log('picker发送选择改变，携带值为', e.detail.value)
      this.index0 = e.detail.value
    },
    bindPickerChange1: function(e) {
      console.log('picker发送选择改变，携带值为', e.detail.value)
      this.index1 = e.detail.value
    },
    getDate(type) {
      const date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();

      if (type === 'start') {
        year = year - 60;
      } else if (type === 'end') {
        year = year + 2;
      }
      month = month > 9 ? month : '0' + month;
      day = day > 9 ? day : '0' + day;
      return `${year}-${month}-${day}`;
    }
  }
}
</script>

<style scoped>
.union-faqi .uni-input {
    text-indent: 160px;
  }
.jjcontent .uni-input {
  text-indent: 215px;
}
  .uni-input .text {
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
</style>