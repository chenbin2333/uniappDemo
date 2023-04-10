const WebpackAreaConfigUse = require('./my_node_modules/webpack-area-config-use')

// const WebpackAliyunOss = require('./my_node_modules/webpack-aliyun-oss')

const VUE_CONFIG = {
  useOSS: process.env.APP_BUILD_USE_OSS === 'true'
}

console.log('process.env.APP_BUILD_USE_OSS = ' + VUE_CONFIG.useOSS)

// 会先于configureWebpack注入，否则output相关变量还是旧的

new WebpackAreaConfigUse({})

const path = require('path')

module.exports = {
  // #ifdef H5
  filenameHashing: !VUE_CONFIG.useOSS,
  configureWebpack: config => {
    if (process.env.NODE_ENV !== 'production' || VUE_CONFIG.useOSS) {
      config.devtool = 'source-map'
    }
  },
  // #endif
  parallel: false,
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        //             // 全局变量路径，不能使用路径别名
        // path.resolve(__dirname, './packages/form/src/assets/theme.less')
      ]
    }
  }

  // css: {
  //     loaderOptions: {
  //         less: {
  //             lessOptions: {
  //                 modifyVars: {
  //                     // 直接覆盖变量
  //                     'text-color': '#111',
  //                     'border-color': '#eee',
  //                     // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
  //                     hack: `true; @import "./packages/form/src/assets/theme.less";`,
  //                 },
  //             },
  //         },
  //     },
  // },
}
