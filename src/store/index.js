import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    textStyle: '项目概览',
    deptId: 1031, // 项目id
    schedulePlanId: 576 // 工期计划二类表id

  },
  actions: {
    changeMsg (mss, msg) {
      mss.commit('changeMsg', msg)
    }
  },
  mutations: {
    changeMsg (state, msg) {
      state.textStyle = msg
    },
    SET_DEPTID: (state, id) => {
      state.deptId = id
    },
    SET_schedulePlanId: (state, id) => {
      state.schedulePlanId = id
    },
  }
})

export default store
