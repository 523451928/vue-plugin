import Vue from 'vue'
import Router from 'vue-router'
import Infinite from '@/components/Infinitescroll'
import Lazyload from '@/components/Lazyload'
import Loadmore from '@/components/Loadmore'
import Selectdate from '@/components/Selectdate'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Infinite',
      component: Infinite
    },
    {
      path:'/selectdate',
      name:'Selectdate',
      component:Selectdate
    },
    {
      path: '/lazyload',
      name: 'Lazyload',
      component: Lazyload
    },
    {
      path: '/loadmore',
      name: 'Loadmore',
      component: Loadmore
    },
    {
      path: '/infinite',
      name: 'infinite',
      component: Infinite
    }
  ]
})
