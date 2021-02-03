// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import dataV from '@jiaminghi/data-view'
import ElementUI from 'element-ui'
import 'xe-utils'
import VXETable from 'vxe-table'
import wlGantt from 'wl-gantt'
import "wl-gantt/lib/wl-gantt.css"
import 'vxe-table/lib/style.css'
import 'element-ui/lib/theme-chalk/index.css'
import './common/flexible.js';
import store from './store'
import echarts from 'echarts'
import { parseTime, resetForm, addDateRange, selectDictLabel, selectDictLabels, download, handleTree } from "@/utils/dealCommon";

Vue.prototype.$echarts = echarts
Vue.prototype.parseTime = parseTime
Vue.prototype.resetForm = resetForm
Vue.prototype.addDateRange = addDateRange
Vue.prototype.selectDictLabel = selectDictLabel
Vue.prototype.selectDictLabels = selectDictLabels
Vue.prototype.download = download
Vue.prototype.handleTree = handleTree

Vue.use(dataV);
Vue.use(VXETable)
Vue.use(wlGantt)
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
