<template>
    <div id="NavMenu">
      <el-menu :default-active="this.$route.path" router mode="horizontal" class="Nav"
               background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
        <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name">
          {{ item.navItem }}
        </el-menu-item>
        <el-menu-item @click="showLog" style="float: right">{{log}}</el-menu-item>
      </el-menu>
    </div>
</template>

<script>
import CryptoJS from 'crypto-js'

export default {
  name: 'NavMenu',
  data () {
    return {
      navList: [
        {name: '/list', navItem: '专利列表'},
        {name: '/transaction', navItem: '专利交易'},
        {name: '/authorization', navItem: '专利授权'},
        {name: '/information', navItem: '专利详情'},
        {name: '/message', navItem: '私信消息'}
      ],
      log: ''
    }
  },
  methods: {
    showLog () {
      if (this.$cookie.get('isLogin') !== null) {
        this.$cookie.delete('isLogin')
        window.location.reload()
        alert('退出成功')
      } else {
        this.$store.dispatch('showLog')
      }
    }
  },
  created () {
    if (this.$cookie.get('isLogin') !== null) {
      this.log = '退出'
      let form = {
        name: CryptoJS.AES.decrypt(this.$cookie.get('user_name').toString(), 'secret key 123').toString(CryptoJS.enc.Utf8),
        password: CryptoJS.AES.decrypt(this.$cookie.get('password').toString(), 'secret key 123').toString(CryptoJS.enc.Utf8)
      }
      this.axios
        .post('http://localhost:8080/login', form)
        .then((response) => {
          if (response.data === 'success') {
            if (this.checked === true) {
              this.$cookie.set('user_name', CryptoJS.AES.encrypt(form.name, 'secret key 123').toString(), 60 * 60 * 24)
              this.$cookie.set('password', CryptoJS.AES.encrypt(form.password, 'secret key 123').toString(), 60 * 60 * 24)
            }
            this.$cookie.set('isLogin', 'true', 60 * 60 * 24)
            alert('自动登录成功')
            this.$store.commit('login', form.name)
          } else if (response.data === 'failed') {
            this.form.name = ''
            this.form.password = ''
            this.$cookie.delete('isLogin')
            alert('用户名或密码错误')
          }
        }).catch(function (error) {
          console.log(error)
        })
    } else {
      this.log = '登录'
    }
  }
}
</script>

<style scoped>
  .Nav{
    padding-left: 15%;
    padding-right: 15%;
  }
</style>
