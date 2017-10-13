// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Lazyload from './directive/lazyload'
import Infinite from './directive/infinite-scroll'

Vue.use(Lazyload,{
  loadImg:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1505472217827&di=e24cf99c65ded97fae93d98c55f43020&imgtype=0&src=http%3A%2F%2Fwww.tonghua-china.com%2F3d%2Fimg%2Floading.gif",
  threshold:100,
  opa:0.1,
  duration:1000
})
Vue.use(Infinite)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
