import Vue from 'vue'
import Router from 'vue-router'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

const requireView = require.context(
    // 其组件目录的相对路径
    './../views',
    // 是否查询其子目录
    true,
    // 匹配基础文件的正则表达式
    /[A-Z]|[a-z]\w+\.(vue)$/
)
var routes=[];
requireView.keys().forEach(fileName => {
  // 获取组件配置
  const viewConfig = requireView(fileName)

  // 获取组件的 PascalCase 命名
  const viewName = upperFirst(
      camelCase(
          // 获取和目录深度无关的文件名
          fileName
              .split('/')
              .pop()
              .replace(/\.\w+$/, '')
      )
  )
  var file= viewConfig.default.__file;
  var name =viewConfig.default.name||'layout';
  var match=file.match(/views(.*?)\.vue/);
  if(match.length!=2||name=='layout'){
    return false;
  }
  var path=match[1];
  if(file.search(/index\.vue/)>=0){
    var match=file.match(/views(.*?)\/index\.vue/);
    if(match.length!=2){
      return false;
    }
    var path=match[1];
    routes.push({path:path,name:name+2,component:viewConfig.default || viewConfig });
  }
  var path=match[1];
  if(file.search(/index\/index\.vue/)>=0){
    var match=file.match(/views(.*?)\/index\/index\.vue/);
    if(match.length!=2){
      return false;
    }
    var path=match[1];
    routes.push({path:path,name:name+1,component:viewConfig.default || viewConfig });
  }
  routes.push({path:path,name:name,component:viewConfig.default || viewConfig });
})

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: routes

})

