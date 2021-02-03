import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    textStyle: '项目概览',
    deptId: 1031, // 项目id
    schedulePlanId: 576,
    nodeState: {},
    nodeStateId: '',
    isLeaf: false,
    order: 'second'

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
    CHANGE_NODE: (state, obj) => {
      state.nodeState = Object.assign({}, obj)
    },
    CHANGE_NODE_ID: (state, id) => {
      state.nodeStateId = id
    },
    CHANGE_ISLEAF: (state, status) => {
      state.isLeaf = status
    },
    CHANGE_ORDER: (state, status) => {
      state.order = status
    }
  }
})

export default store
