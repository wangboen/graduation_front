<template>
    <div id="Message">
      <el-container>
        <el-aside width="160px">
          <div class="friendListDiv" v-for="(user) in users" :key="user.id" @click="toggleFriend(user)"
               v-bind:class="{currentChatFriend:currentFriend.id===user.id}">
            <el-badge :is-dot="isDotMap.get('isDot#'+currentUser.username+'#'+user.name)!=null">{{user.name}}</el-badge>
          </div>
        </el-aside>

        <el-main>
          <div class="chatDiv" ref="chatDiv" id="chatDiv">
            <!--显示与谁正在聊天-->
            <p v-show="currentFriend.name">
              与
              <el-tag type="primary" size="small" style="margin-left: 5px;margin-right: 5px">{{currentFriend.name}}</el-tag>
              聊天中
            </p>

            <template v-for="msg in msgList">
              <!--发送来的消息-->
              <div v-if="msg.from===currentFriend.name"
                style="display: flex;justify-content: flex-start;align-items: center;box-sizing: border-box;"
                v-bind:key="msg.id">
                <div
                  style="display: inline-flex;border-style: solid;border-width: 1px;border-color: #20a0ff;border-radius: 5px;padding: 5px 8px 5px 8px">
                  {{msg.msg}}
                </div>
              </div>

              <!--发出去的消息-->
              <div v-if="msg.from!==currentFriend.name"
                   style="display: flex;justify-content: flex-end;align-items: center;box-sizing: border-box;"
                v-bind:key="msg.id">
                <div
                  style="display: inline-flex;border-style: solid;border-width: 1px;border-color: #20a0ff;border-radius: 5px;padding: 5px 8px 5px 8px;margin-right: 3px;background-color: #9eea6a">
                  {{msg.msg}}
                </div>
              </div>
            </template>

          </div>

          <div style="text-align: left;margin-top: 10px">
            <el-input v-model="msg" placeholder="请输入内容" size="mini" style="width: 600px;" type="textarea" autosize></el-input>
            <el-button :disabled="!currentFriend.id" size="small" type="primary" class="sendBtn" @click="sendMsg">
              <i class="fa fa-send" style="margin-right: 15px"></i>
              发送
            </el-button>
          </div>

        </el-main>
      </el-container>
    </div>
</template>

<script>
export default{
  data () {
    return {
      users: [],
      msg: '',
      currentUser: {
        name: this.$store.state.user.name
      },
      currentFriend: {}
    }
  },
  computed: {
    msgList: {
      get: function () {
        return this.$store.state.msgList
      }
    },
    isDotMap: {
      get: function () {
        return this.$store.state.isDotMap
      }
    }
  },
  watch: {
    msgList () {
      document.getElementById('chatDiv').scrollTop = document.getElementById('chatDiv').scrollHeight
    }
  },
  methods: {
    sendMsg () {
      let oldMsg = window.localStorage.getItem(this.currentUser.name + '#' + this.currentFriend.name)
      if (oldMsg == null) {
        oldMsg = []
        oldMsg.push({msg: this.msg, from: this.currentUser.name, to: this.currentFriend.name})
        window.localStorage.setItem(this.currentUser.name + '#' + this.currentFriend.name, JSON.stringify(oldMsg))
      } else {
        let oldMsgJson = JSON.parse(oldMsg)
        oldMsgJson.push({msg: this.msg, from: this.currentUser.name, to: this.currentFriend.name})
        window.localStorage.setItem(this.currentUser.name + '#' + this.currentFriend.name, JSON.stringify(oldMsgJson))
      }
      this.$store.getters.getStomp.send('/ws/chat', {}, this.currentUser.name + ';' + this.msg + ';' + this.currentFriend.name)
      this.msg = ''
      this.updateChatDiv()
    },
    updateChatDiv () {
      var oldMsg = window.localStorage.getItem(this.currentUser.name + '#' + this.currentFriend.name)
      if (oldMsg == null) {
        this.$store.commit('updateMsgList', [])
      } else {
        this.$store.commit('updateMsgList', JSON.parse(oldMsg))
      }
    },
    toggleFriend (user) {
      // 切换数据
      // eslint-disable-next-line eqeqeq
      if (user === this.currentFriend) {
        return
      }
      this.currentFriend = user
      this.$store.commit('updateCurrentFriend', user)
      this.updateChatDiv()
      this.$store.commit('removeValueDotMap', 'isDot#' + this.currentUser.name + '#' + user.name)
      document.getElementById('chatDiv').scrollTop = document.getElementById('chatDiv').scrollHeight
    },
    loadUsers () {
      this.axios
        .get('http://localhost:8080/getOther')
        .then((response) => {
          this.users = response.data
        })
    }
  },
  mounted: function () {
    this.loadUsers()
    this.$store.dispatch('connect')
  }
}
</script>

<style scoped>
  #Message{
    margin: 0 15% 40px;
    border-left: 3px #f5f6f7 solid;
    border-right: 3px #f5f6f7 solid;
    padding: 20px;
    min-height: 840px;
  }
  .friendListDiv {
    display: flex;
    justify-content: flex-start;
    box-sizing: border-box;
    text-align: center;
    width: 160px;
    height: 40px;
    border-color: #20a0ff;
    border-style: solid;
    border-width: 1px;
    cursor: pointer
  }
  .chatDiv {
    border-color: #dcdfe6;
    border-style: solid;
    border-radius: 5px;
    border-width: 1px;
    box-sizing: border-box;
    width: 700px;
    height: 450px;
    overflow-y: auto;
    padding-bottom: 50px;
  }
  .sendBtn {
    padding-left: 25px;
    padding-right: 25px
  }
  .currentChatFriend {
    background-color: #dcdfe6;
  }
</style>
