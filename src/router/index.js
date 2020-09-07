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
  path: '/test',
  component: Layout,
  name: 'index',
  children: [
    {
      path: '/test',
      component: () => import('@/views/index'),
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
}]
const router = new VueRouter({
  mode: "history",
  routes
})

export default router
