<template>
  <view class="html-box">
    <!--        <rich-text :nodes="html_" />-->
    <div v-html="html_"></div>
  </view>
</template>

<script>
import { SYS_CONFIG } from '@/config/config'
// import parseHtml from "@/common/html-parser"

export default {
  name: 'zm-rich-text',
  props: {
    html: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      html_: ''
    }
  },
  watch: {
    html() {
      this.html_ = this.formatRichText(this.html)
      // //console.log(this.html_ )
    }
  },
  created() {},
  methods: {
    formatRichText(html) {
      html = html
        .replace(/<br \/>/gi, '')
        .replace(/<img/gi, '<img style="max-width:100%;height:auto;display:block;margin-top:0;margin-bottom:0;"')
        .replace(/src="\//gi, 'src="' + SYS_CONFIG.BASE_URL + '/')
      // let canParse = parseHtml(html)
      //console.log(canParse)
      // if (canParse)
      //     return canParse

      return html
    }
  }
}
</script>

<style scoped></style>
