import Vue from 'vue'
import Router from 'vue-router'
import Screen1 from '../pages/Screen1.vue'
import Screen2 from '../pages/Screen2.vue'
import Screen3 from '../pages/Screen3.vue'
import Screen4 from '../pages/Screen4.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/screen2'
    },
    {
      path: '/screen1',
      name: 'Screen1',
      component: Screen1
    },
    {
      path: '/screen2',
      name: 'Screen2',
      component: Screen2
    },
    {
      path: '/screen3',
      name: 'Screen3',
      component: Screen3
    },
    {
      path: '/screen4',
      name: 'Screen4',
      component: Screen4
    }
  ]
})
