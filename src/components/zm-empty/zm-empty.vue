<template>
  <view class="empty">
    <image src="./img/ic_kbsj.jpg" mode="scaleToFill" class="empty-img" />
    <text>{{ text }}</text>
    <slot></slot>
  </view>
</template>

<script>
export default {
  name: 'Empty',
  props: {
    text: {
      type: String,
      default: '暂无数据'
    }
  }
}
</script>

<style lang="scss" scoped>
.empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 200rpx;

  .empty-img {
    width: 318rpx;
    height: 217rpx;
    margin-bottom: 30rpx;
    opacity: 0.6;
  }

  text {
    font-size: 28rpx;
    color: #6f6f6f;
  }
}
</style>
