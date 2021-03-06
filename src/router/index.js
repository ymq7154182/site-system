import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../layout/index'

Vue.use(VueRouter)

const routes = [
  // {
  //   path:'/',
  //   redirect:'/home'
  // },
  {
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
      },
      {
        path: '/deviceHistory',
        name: 'deviceHistory',
        component: () => import('@/views/device/deviceHistory')
      }
    ]
  },{
    path: '/qualityControl',
    component: Layout,
    name: 'Quality Control',
    children: [
      {
        path: '/qualityControl',
        component: () => import('@/views/qualityControl/index'),
      },
      {
        path: '/checkRecord',
        name: 'Check Record',
        component: () => import('@/views/qualityControl/checkRecord')
      }
    ]
  },
  {
    path: '/safeRecord',
    component: Layout,
    name: 'safeRecord',
    children: [
      {
        path: '/safeRecord',
        component: () => import('@/views/safeRecord/safeRecord'),
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
      },
      {
        path: '/greenHistory',
        name: 'greenHistory',
        component: () => import('@/views/greenConstruction/greenHistory')
      }
    ]
  },
  {
    path: '/progressController',
    component: Layout,
    name: 'progressController',
    children: [
      {
        path: '/progressController',
        component: () => import('@/views/progressManager/index'),
      }
    ]
  },
  { // 信息记录
    path: '/infoRecord',
    component: Layout,
    name: 'infoRecord',
    children: [
      {
        path: '/infoRecord',
        component: () => import('@/views/scheduleManage/infoRecord'),
      }
    ]
  },
  {
    path: '/dataManage',
    component: Layout,
    name: 'dataManage',
    children: [
      {
        path: '/dataManage',
        component: () => import('@/views/dataManage/index'),
      }
    ]
  },
  {
    path: '/deviceOne',
    component: Layout,
    
    children: [
      {
        path: '/deviceOne',
        name: 'deviceOne',
        component: () => import('@/views/deviceDetail/deviceOne'),
      }
    ]
  },
  {
    path: '/historyData',
    component: Layout,
    name: 'historyData',
    children: [
      {
        path: '/historyData',
        component: () => import('@/views/deviceDetail/historyData'),
      }
    ]
  },
  {
    path: '/historySJ',
    component: Layout,
    name: 'historySJ',
    children: [
      {
        path: '/historySJ',
        component: () => import('@/views/deviceDetail/historySJ'),
      }
    ]
  }
]
const router = new VueRouter({
  mode: "history",
  routes
})

export default router
