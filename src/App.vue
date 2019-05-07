<template>
  <div id="app">
    <NavMenu/>
    <router-view/>
    <Footer/>
    <Log/>
  </div>
</template>

<script>
import NavMenu from '@/components/NavMenu'
import Log from '@/components/log'
import Footer from '@/components/Footer'

export default {
  name: 'App',
  components: {
    Footer,
    NavMenu,
    Log
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
  margin-top: 0;
  margin-bottom: 0;
}
</style>
