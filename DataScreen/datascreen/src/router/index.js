import Vue from 'vue'
import Router from 'vue-router'
import Screen1 from '../pages/Screen1.vue'
import Screen2 from '../pages/Screen2.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/screen1',
      name: 'Screen1',
      component: Screen1
    },
    {
      path: '/screen2',
      name: 'Screen2',
      component: Screen2
    }
  ]
})
