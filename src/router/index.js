import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/Home'
import City from '@/pages/city/City'
import Detail from '@/pages/detail/Detail'
import RouteIndex from '@/pages/route/RouteIndex'
import RouteResult from '@/pages/route/RouteResult'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/city',
      name: 'City',
      component: City
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: Detail
    }, {
      path: '/route/index',
      name: 'routeIndex',
      component: RouteIndex
    },
    {
      path: '/route/result',
      name: 'routeResult',
      component: RouteResult
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    return {x: 0, y: 0}
  }
})
