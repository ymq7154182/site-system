import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    textStyle: '项目概览'
  },
  actions: {
    changeMsg (mss, msg) {
      mss.commit('changeMsg', msg)
    }
  },
  mutations: {
    changeMsg (state, msg) {
      state.textStyle = msg
    }
  }
})

export default store
