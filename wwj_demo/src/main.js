// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import './assets/style/reset.css'
import './assets/style/border.css'
import 'swiper/dist/css/swiper.css'
import 'lib-flexible/flexible.js'

import VueRouter from 'vue-router'
import defaultRouter from './router/index'

const router = defaultRouter()
Vue.use(VueRouter)

// 引入vuex
import Vuex from 'vuex'
Vue.use(Vuex)
import creatStore from './store/store'
const store = creatStore()


import FastClick from 'fastclick'
FastClick.attach(document.body)

Vue.config.productionTip = false

// 全局组件
import Text from './components/global-components/Text'

Vue.component('TextComp', Text)

router.beforeEach((to, from, next) => {
  console.log(to)
  console.log(from)
  if (to.fullPath === '/demo/test') {
    next('/demo/1')
  } else {
    next()
  }
  next()
}) 

router.beforeResolve((to, from, next) => {
  next()
})
router.afterEach((to, from) => {

})

/* eslint-disable no-new */
new Vue({
  // el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
}).$mount('#app')
