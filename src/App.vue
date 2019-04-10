<template>
  <div id="app">
    <NavMenu @IndexChange="getIndex"/>
    <div :is="currentView"></div>
    <img src="./assets/logo.png">
    <router-view/>
  </div>
</template>

<script>
import NavMenu from '@/components/NavMenu'
import List from '@/components/List'
import Transaction from '@/components/Transaction'
import Authorization from '@/components/Authorization'

export default {
  name: 'App',
  components: {
    NavMenu,
    List,
    Transaction,
    Authorization
  },
  data () {
    return {
      currentView: List
    }
  },
  methods: {
    getIndex (key) {
      if (key === '1') {
        this.currentView = List
      } else if (key === '2') {
        this.currentView = Transaction
      } else if (key === '3') {
        this.currentView = Authorization
      }
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
</style>
