<template>
    <div id="Message">
      <p>私信页面</p>
    </div>
</template>

<script>
export default {
  name: 'Message',
  data() {
    return {
      msg_data: []
    }
  },
  created () {
    this.initWebSocket()
  },
  destroyed: function () {
    this.websocketclose()
  },
  methods: {
    initWebSocket: function () {
      this.websock = new WebSocket('ws://localhost:8080/websocket')
      this.websock.onopen = this.websocketonopen
      this.websock.onerror = this.websocketonerror
      this.websock.onmessage = this.websocketonmessage
      this.websock.onclose = this.websocketclose
    },
    websocketonopen: function () {
      console.log('WebSocket连接成功')
    },
    websocketonerror: function (e) {
      console.log('WebSocket连接发生错误')
    },
    websocketonmessage: function (e) {
      var da = JSON.parse(e.data)
      console.log(da)
      this.msg_data.unshift(da)
    },
    websocketclose: function (e) {
      console.log('connection closed (' + e.code + ')')
    }
  }
}
</script>

<style scoped>

</style>
