const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']
const webpack = require('webpack')

module.exports = {
  devServer: {
    // 开发环境下的服务器配置
    host: 'localhost',
    port: 8080, // 端口号
    proxy: {
      // 代理配置
      '^/api': {
        // 拦截携带 /api 的接口
        target: 'http://152.136.185.210:5000', // 代理到的目标地址
        changeOrigin: true, // 是否开启跨域
        pathRewrite: {
          // 路径重写
          '^/api': '' // 将 /api 转换为 空
        }
      }
    }
  },
  configureWebpack: {
    devtool: 'none',
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      }),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      // 压缩成 gz 格式
      new CompressionWebpackPlugin({
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
        threshold: 10240, // 压缩超过 10k 的资源
        minRatio: 0.8,
        deleteOriginalAssets: false // 删除原文件
      }),
      // 压缩成 br 格式
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 5,
        minChunkSize: 100
      })
    ]
  }
}
