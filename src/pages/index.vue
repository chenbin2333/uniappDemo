<template>
  <view>
    <view class="header">
      <view class="header-tag">管理标签</view>
      <view class="header-tips">说明：设置自定义标签可将任务个性化分类，快速筛选</view>
    </view>
    <view class="zdy-tag">
      <view class="tag" @click="clickZdyTag('bottom')"> + 自定义标签</view>
    </view>
    <view class="tags">
      <view v-for="(item, index) in tags" :key="index" class="tags-item">
        {{ item.name }}
        <view>
          <uni-icons type="trash-filled" color="#8c8c8c" size="20" style="margin-right: 5px"></uni-icons>
          <uni-icons type="plusempty" color="#8c8c8c" size="20"></uni-icons>
        </view>
      </view>
    </view>

    <view>
      <!-- 普通弹窗 -->
      <uni-popup ref="popup" background-color="#fff">
        <view class="popup-content" style="padding: 10px">
          <view class="pop-tag">自定义标签</view>
          <view class="pop-tag-name">标签名称</view>
          <input class="uni-input" focus placeholder="请输入标签名称" v-model="tagname" />
          <button :style="{ display: 'inline-block', width: '160px', marginRight: '20px' }" @click="cancel">
            取消
          </button>
          <button :style="{ display: 'inline-block', width: '160px' }" type="primary" @click="queding">确定</button>
        </view>
      </uni-popup>
    </view>
  </view>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {
      type: 'center',
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
  width: 100vw;
  padding: 20px;
  background-color: #ffffff;
  box-shadow: 0px 0px 5px 0px rgba(222, 222, 222, 0.5);
  border-radius: 8px;
}
.header-tag {
  width: 72px;
  height: 26px;
  font-size: 18px;
  font-weight: bold;
  font-stretch: normal;
  line-height: 26px;
  letter-spacing: 0px;
  color: #262626;
}

.header-tips {
  width: 336px;
  height: 24px;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 24px;
  letter-spacing: 0px;
  color: #6f6f6f;
}

.zdy-tag {
  padding-top: 10px;
  padding-left: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.zdy-tag .tag {
  width: 104px;
  height: 28px;
  line-height: 28px;
  border-radius: 4px;
  border: 1px solid #3077eb;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #3077eb;
  text-align: center;
}

.tags .tags-item {
  display: flex;
  justify-content: space-between;
  padding: 15px;
  border-bottom: 1px solid #eee;
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
