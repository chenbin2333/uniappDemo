<template>
  <view>
    <view class="header">
      <view class="header-tag">
        选择标签
        <text class='text' @click='tomManagerTags'>
          <uni-icons type="gear" size="18" style='margin-right: 2px;' color='#3077eb'></uni-icons>
          管理标签
        </text>
      </view>
      <view class="header-tips">已选择1个标签</view>
    </view>
    <view class='tips'>
      说明：设置自定义标签可将任务个性化分类，快速筛选
    </view>
    <view class='tags'>
      <view class='zdy-tags' @click="clickZdyTag('bottom')"> + 自定义标签</view>
      <view v-for='(item, index) in tags' :key='index'
            @click='item.choosed = !item.choosed'
            :class='[item.choosed ? "choosed" : ""]'>{{item.name}}</view>
    </view>
    <view class='btn'>
      <button @click="cancel">
        取消
      </button>
      <button type="primary" @click="queding">确定</button>
    </view>

    <!-- 普通弹窗 -->
    <uni-popup ref="popup" background-color="#fff">
      <view class="popup-content" style="padding: 10px">
        <view class="pop-tag">自定义标签</view>
        <view class="pop-tag-name">标签名称</view>
        <input class="uni-input" focus placeholder="请输入标签名称" v-model='tagname'/>
        <button :style="{ display: 'inline-block', width: '160px', marginRight: '20px' }" @click="cancel">
          取消
        </button>
        <button :style="{ display: 'inline-block', width: '160px' }" type="primary" @click="queding">确定</button>
      </view>
    </uni-popup>
  </view>
</template>

<script>
export default {
  data() {
    return {
      tags: [{
        name: '学习知识',
        choosed: true
      }, {
        name: '年度工作周期上报',
        choosed: false,
      }, {
        name: '财务工作',
        choosed: false,
      }, {
        name: '人事',
        choosed: false
      }],
      tagname: ''
    }
  },
  onShow() {
    if (uni.getStorageSync("tags")) {
      let arr = JSON.parse(uni.getStorageSync("tags"));
      this.tags = arr;
    }
  },
  methods: {
    tomManagerTags() {
      uni.navigateTo({
        url: '/pages/managerTag'
      });
    },
    clickZdyTag(type) {
      this.type = type
      // open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
      this.$refs.popup.open(type)
    },
    // 取消弹出框
    cancel() {
      this.$refs.popup.close()
    },
    queding() {
      if (this.tagname === '') {
        uni.showToast({
          title: "请输入标签名！！",
          icon: "none"
        })
        return;
      }
      this.tags.push({
        name: this.tagname,
        choosed: false
      })
      uni.setStorageSync("tags", JSON.stringify(this.tags));
      this.$refs.popup.close()
    }
  }
}
</script>

<style scoped>
.header {
  padding: 10px;
  background-color: #ffffff;
  box-shadow: 0px 0px 5px 0px rgba(222, 222, 222, 0.5);
  border-radius: 8px;
}
.header-tag {
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  font-weight: bold;
  font-stretch: normal;
  line-height: 26px;
  color: #262626;
}
.header-tag .text {
  font-size: 16px;
  font-weight: normal;
  color: #3077eb;
}

.header-tips {
  margin-top: 5px;
  width: 336px;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #6f6f6f;
}

.tips {
  padding-left: 10px;
  margin-top: 15px;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 20px;
  letter-spacing: 0px;
  color: #999999;
}
.tags {
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
}
.tags .zdy-tags {
  color: #3077eb;
  border: solid 1px #3077eb;
}

.tags view {
  height: 40px;
  margin-right: 20px;
  margin-bottom: 10px;
  line-height: 40px;
  padding: 0 10px;
  border-radius: 4px;
  border: solid 1px #cccccc;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
}

.choosed {
  background-color: #eaf2fd;
  color: #3077eb;
}

.btn {
  display: flex;
  margin-top: 50px;
}
.btn button {
  width: 162px;
}

.pop-tag {
  font-size: 18px;
  font-weight: bold;
  font-stretch: normal;
  line-height: 26px;
  letter-spacing: 0px;
  color: #262626;
  margin-bottom: 10px;
}

.pop-tag-name {
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 26px;
  letter-spacing: 0px;
  color: #262626;
}

.uni-input {
  border: 1px solid #eee;
  padding: 5px;
  margin: 10px 0 40px 0;
}
</style>