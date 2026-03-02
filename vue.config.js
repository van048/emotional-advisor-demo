// vue.config.js - 修复后
const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: './',
  
  // 不需要 chainWebpack 手动配置 CSS loader！
  // Vue CLI 会自动处理：style-loader -> css-loader -> postcss-loader
  
  css: {
    loaderOptions: {
      postcss: {
        postcssOptions: {
          plugins: [
            require('tailwindcss'),
            require('autoprefixer')
          ]
        }
      }
    }
  }
})