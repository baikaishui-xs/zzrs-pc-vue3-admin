const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

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
    devtool: 'source-map',
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
  }
}
