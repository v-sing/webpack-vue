// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import '../static/assets/js/backend.js';
import '../static/assets/css/backend.css'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

Vue.config.productionTip = false
const requireComponent = require.context(
    // 其组件目录的相对路径
    './components',
    // 是否查询其子目录
    true,
    // 匹配基础组件文件名的正则表达式
    /[A-Z]\w+\.(vue|js)$/
)

requireComponent.keys().forEach(fileName => {
  // 获取组件配置
  const componentConfig = requireComponent(fileName)

  // 获取组件的 PascalCase 命名
  const componentName = upperFirst(
      camelCase(
          // 获取和目录深度无关的文件名
          fileName
              .split('/')
              .pop()
              .replace(/\.\w+$/, '')
      )
  )
  // 全局注册组件
  Vue.component(
      componentName,
      // 如果这个组件选项是通过 `export default` 导出的，
      // 那么就会优先使用 `.default`，
      // 否则回退到使用模块的根。
      componentConfig.default || componentConfig
  )
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  mounted () {
    window.testFun = this.testFun;    // 方法赋值给window
  },
 methods: {
   // vue内部方法
   testFun () {
     console.log('testFun')
   },
 }
})