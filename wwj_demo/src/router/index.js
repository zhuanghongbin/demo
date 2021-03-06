import Router from 'vue-router'
import routes from './routes'

export default () => {
  return new Router({
    routes,
    mode: 'history', // 不采用hash模式 
    base: '/base/', // 为所有路径前面添加一个基本的文本配置  http://localhost:8080/base/index
    linkActiveClass: 'active-link', // 点击进行路由跳转时那个路由会添加active-link
    linkExactActiveClass: 'exact-active-link', // 路由路径完全匹配是点击的时候会有exact-active-link
    scrollBehavior (to, from, savedPosition) { // 记录路由页面滚动的位置
      if (savedPosition) {
        return savedPosition
      } else {
        return {x: 0, y: 0}
      }
    },
    // parseQuery (query) { // 路由路径中带的参数
    // },
    // stringifyQuery (obj) { // 
    // },
    fallback: true // 如果浏览器不支持history模式，那么自动帮我们改为hash模式
  })
}
