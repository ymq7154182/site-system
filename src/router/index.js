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
}]
const router = new VueRouter({
  mode: "history",
  routes
})

export default router
