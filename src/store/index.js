import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  showLog: false
}

const getters = {
  isShowLog (state) {
    return state.showLog
  }
}

// 同步事务
const mutations = {
  showLog (state) {
    state.showLog = true
  },
  hideLog (state) {
    state.showLog = false
  }
}

// 异步事务
const actions = {
  hideLog (context) {
    context.commit('hideLog')
  },
  showLog (context) {
    context.commit('showLog')
  }
}

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})

export default store
