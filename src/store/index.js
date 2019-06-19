import Vue from 'vue'
import Vuex from 'vuex'
import SockJS from 'sockjs-client'
import Stomp from 'stompjs'

Vue.use(Vuex)

const state = {
  showLog: false,
  user: {
    name: null
  },
  msgList: [],
  isDotMap: new Map(),
  currentFriend: {},
  stomp: null,
  nfDot: false
}

const getters = {
  isShowLog (state) {
    return state.showLog
  },
  getStomp (state) {
    return state.stomp
  }
}

const mutations = {
  showLog (state) {
    state.showLog = true
  },
  hideLog (state) {
    state.showLog = false
  },
  login (state, name) {
    state.user.name = name
  },
  toggleNFDot (state, newValue) {
    state.nfDot = newValue
  },
  updateMsgList (state, newMsgList) {
    state.msgList = newMsgList
  },
  updateCurrentFriend (state, newFriend) {
    state.currentFriend = newFriend
  },
  addValue2DotMap (state, key) {
    state.isDotMap.set(key, '您有未读消息')
  },
  removeValueDotMap (state, key) {
    state.isDotMap.delete(key)
  }
}

const actions = {
  showLog (context) {
    context.commit('showLog')
  },
  hideLog (context) {
    context.commit('hideLog')
  },
  toggleNFDot (state, newValue) {
    state.nfDot = newValue
  },
  updateMsgList (state, newMsgList) {
    state.msgList = newMsgList
  },
  updateCurrentFriend (state, newFriend) {
    state.currentFriend = newFriend
  },
  addValue2DotMap (state, key) {
    state.isDotMap.set(key, '您有未读消息')
  },
  removeValueDotMap (state, key) {
    state.isDotMap.delete(key)
  },
  connect (context) {
    context.state.stomp = Stomp.over(new SockJS('http://localhost:8080/ws/endpointChat'))
    context.state.stomp.connect({
      username: this.state.user.name
    }, frame => {
      context.state.stomp.subscribe('/user/queue/chat', function (message) {
        // 获取以往聊天记录，添加进新输入的聊天记录
        console.log('订阅测试')

        let msg = JSON.parse(message.body)
        let oldMsg = window.localStorage.getItem(context.state.user.name + '#' + msg.from)
        if (oldMsg == null) {
          oldMsg = []
          oldMsg.push(msg)
          window.localStorage.setItem(context.state.user.name + '#' + msg.from, JSON.stringify(oldMsg))
        } else {
          var oldMsgJson = JSON.parse(oldMsg)
          oldMsgJson.push(msg)
          window.localStorage.setItem(context.state.user.name + '#' + msg.from, JSON.stringify(oldMsgJson))
        }
        if (msg.from !== context.state.currentFriend.name) {
          context.commit('addValue2DotMap', 'isDot#' + context.state.user.name + '#' + msg.from)
        }
        // 更新msgList
        var oldMsg2 = window.localStorage.getItem(context.state.user.name + '#' + context.state.currentFriend.name)
        if (oldMsg2 == null) {
          context.commit('updateMsgList', [])
        } else {
          context.commit('updateMsgList', JSON.parse(oldMsg2))
        }
      }, {})
      context.state.stomp.subscribe('/topic/nf', function (message) {
        console.log(message.body)
      }, {})
    }, failedMsg => {
      alert(failedMsg)
    })
  }
}

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})

export default store
