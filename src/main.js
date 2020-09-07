// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import dataV from '@jiaminghi/data-view'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './common/flexible.js';
import store from './store'
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

Vue.use(dataV);
Vue.use(ElementUI, { size: 'small' });

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
