<template>
  <view>
    <view class="header">
      <view class="header-tag">管理标签</view>
      <view class="header-tips">说明：设置自定义标签可将任务个性化分类，快速筛选</view>
    </view>
    <view class="zdy-tag">
      <view class="tag" @click="clickZdyTag('bottom')"> + 自定义标签</view>
    </view>
    <view class="tags" id="tags">
      <view v-for="(item, index) in tags" :key="index" class="tags-item">
        {{ item.name }}
        <view>
          <uni-icons type="trash-filled" @click='deleteTag(index)' color="#8c8c8c" size="20" style="margin-right: 5px"></uni-icons>
          <uni-icons type="plusempty" color="#8c8c8c" size="20" ></uni-icons>
        </view>
      </view>
    </view>

    <view>
      <button @click="toggle('center')">添加/修改标签</button>
    </view>
    <view>
      <!-- 普通弹窗 -->
      <uni-popup ref="popup" background-color="#fff">
        <view class="popup-content" style="padding: 10px">
          <view class="pop-tag">自定义标签</view>
          <view class="pop-tag-name">标签名称</view>
          <input class="uni-input" focus placeholder="请输入标签名称" v-model="tagname" />
          <view class='btn'>
            <button @click="cancel">
              取消
            </button>
            <button  type="primary" @click="queding">确定</button>
          </view>
        </view>
      </uni-popup>

      <!-- 添加/编辑标签弹窗 -->
      <uni-popup id='tagsPopUp' ref="tagsPopUp" background-color="#fff">
        <view class="popup-content">
          <view class="header">
            <view class="header-tag">
              选择标签
              <text class='text' @click='tomManagerTags'>
                <uni-icons type="gear" size="18" style='margin-right: 2px;' color='#3077eb'></uni-icons>
                <text class='manager-tag'>管理标签</text>
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
            <button @click="cancel1">
              取消
            </button>
            <button type="primary" @click="queding1">确定</button>
          </view>
        </view>
      </uni-popup>
    </view>
  </view>
</template>

<script>
import Sortable from 'sortablejs'
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
  mounted() {
    let tagDom = document.getElementById('tags')
    new Sortable(tagDom, {
      animation: 150,
      ghostClass: 'blue-background-class'
    });
  },
  methods: {
    tomManagerTags() {
      uni.navigateTo({
        url: '/pages/managerTag'
      });
    },
    clickZdyTag(type) {
      this.$refs.tagsPopUp.close()
      this.type = type
      // open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
      this.$refs.popup.open(type)

    },
    cancel1() {
      this.$refs.tagsPopUp.close()
    },
    // 取消弹出框
    cancel() {
      this.$refs.popup.close()
    },
    toggle(type) {
      this.type = type
      // open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
      this.$refs.tagsPopUp.open(type)
    },
    queding1() {
      this.$refs.tagsPopUp.close()
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
    },
    deleteTag(index) {
      console.log(index)
      this.tags.splice(index, 1);
    }
  }
}
</script>

<style scoped>
.header {
  width: 100vw;
  box-sizing: border-box;
  padding: 20px;
  background-color: #ffffff;
  box-shadow: 0px 0px 5px 0px rgba(222, 222, 222, 0.5);
  border-radius: 8px;
}
.header-tag {
  display: flex;
  justify-content: space-between;
  height: 26px;
  font-size: 18px;
  font-weight: bold;
  font-stretch: normal;
  line-height: 26px;
  letter-spacing: 0px;
  color: #262626;
}

.header-tag .manager-tag {
  color: #3077eb;
  font-weight: normal;
  font-size: 14px;
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
.popup-content .btn {
  display: flex;
}
.popup-content .btn button {
  width: 163px;
}

.header {
  padding: 10px;
  background-color: #ffffff;
  box-shadow: 0px 0px 5px 0px rgba(222, 222, 222, 0.5);
  border-radius: 8px;
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

#tagsPopUp .tags {
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
}
#tagsPopUp .tags .zdy-tags {
  color: #3077eb;
  border: solid 1px #3077eb;
}

#tagsPopUp .tags view {
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

</style>
