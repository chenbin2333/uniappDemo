<template>
  <div>
    <button @click='toTags'>选择标签</button>
    <button @click='toSetting'>更多设置</button>
    <button @click='toTianBao'>填报周期组件</button>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  methods: {
    toTags() {
      uni.navigateTo({
        url: "/pages/managerTag"
      })
    },
    toSetting() {
      uni.navigateTo({
        url: "/pages/testpicker"
      })
    },
    toTianBao() {
      uni.navigateTo({
        url: "/pages/tianbaozhouqi"
      })
    }
  }
}
</script>

<style lang='scss' scoped>

</style>