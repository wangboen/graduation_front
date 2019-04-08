<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <router-link to="/Test">页面跳转测试</router-link>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: null
    }
  },
  created () {
    axios
      .get('http://localhost:8080/test')
      .then(response => (this.msg = response))
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
