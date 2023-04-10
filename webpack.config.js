const path = require('path')
// const webpack = require('webpack')
// var { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
// var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  resolve: {
    alias: {
      '@/components': path.resolve(__dirname, 'src/components'),
      '@/api': path.resolve(__dirname, 'src/api'),
      '@/config': path.resolve(__dirname, 'src/config'),
      '@/pages': path.resolve(__dirname, 'src/pages'),
      '@/static': path.resolve(__dirname, 'src/static'),
      '@/store': path.resolve(__dirname, 'src/store')
    }
  }
}
