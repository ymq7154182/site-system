import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../layout/index'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  component: Layout,
  name: 'index',
  children: [
    {
      path: '/',
      component: () => import('@/views/homePage'),
    }
  ]
},{
  path: '/peopleManager',
  component: Layout,
  name: 'People Manager',
  children: [
    {
      path: '/peopleManager',
      component: () => import('@/views/peopleManager/index'),
    }
  ]
},
  {
    path: '/device',
    component: Layout,
    name: 'deviceManage',
    children: [
      {
        path: '/device',
        component: () => import('@/views/deviceManage'),
      }
    ]
  },{
    path: '/qualityControl',
    component: Layout,
    name: 'index',
    children: [
      {
        path: '/qualityControl',
        component: () => import('@/views/qualityControl/index'),
      }
    ]
  },
  {
    path: '/videoManager',
    component: Layout,
    name: 'videoManager',
    children: [
      {
        path: '/videoManager',
        component: () => import('@/views/videoManager/index'),
      }
    ]
  },
  {
    path: '/greenConstruction',
    component: Layout,
    name: 'greenConstruction',
    children: [
      {
        path: '/greenConstruction',
        component: () => import('@/views/greenConstruction/index'),
      }
    ]
  }
]
const router = new VueRouter({
  mode: "history",
  routes
})

export default router
