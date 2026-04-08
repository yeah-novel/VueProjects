import Vue from 'vue'
import Router from 'vue-router'
import Login from '../pages/Login.vue'
import Dashboard from '../pages/Dashboard.vue'
import HomeView from '../components/Home.vue'
import BaseTable from '../pages/BaseTable.vue'
import BaseUpload from '../pages/BaseUpload.vue'
import Databoard from '../pages/Databoard.vue'
import Register  from "../pages/Register.vue"
import MapEchart from "../components/Echart/MapEchart.vue"
import Home from "../pages/home/Home.vue"
import screen1 from "../pages/dataScreen/Screen1.vue"
import AsyncDemo from '../pages/AsyncDemo.vue' 

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/',
      component: HomeView,
      meta: { title: '自述文件' },
      children: [
        {
          path: '/dashboard',
          component: Dashboard,
          meta: {title: '系统首页'}
        },
        {
          path: '/table',
          component: BaseTable,
          meta: { title: '基础表格' }
        },
        {
          path: '/upload',
          component: BaseUpload,
          meta: { title: '上传文件' }
        },
        {
          path: '/data',
          component: Databoard,
          meta: { title: '数据图表' }
        },
        {
          path: '/map',
          component: MapEchart,
          meta: { title: '中国地图'}
        },
        {
          path: '/async',
          component: AsyncDemo,
          meta: { title: '异步组件示例' }
        }
      ]
    },
    {
      path: '/screen1',
      name: 'Screen1',
      component: screen1
    }
  ]
})
