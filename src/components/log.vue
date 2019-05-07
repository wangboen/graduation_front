<template>
    <div id="log">
      <el-dialog title="登录" :visible.sync="dialogFormVisible" :close-on-click-modal="false" :show-close="false">
        <el-form :model="form">
          <el-form-item label="用户名：" :label-width="formLabelWidth">
            <el-input type="text" v-model="form.name" auto-complete="on"></el-input>
          </el-form-item>
          <el-form-item label="密码：" :label-width="formLabelWidth">
            <el-input type="password" v-model="form.password">
            </el-input>
          </el-form-item>
          <el-checkbox v-model="checked">记住密码</el-checkbox>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="confirm">确 定</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
import CryptoJS from 'crypto-js'

export default {
  name: 'log',
  data () {
    return {
      form: {
        name: '',
        password: ''
      },
      checked: false,
      formLabelWidth: '80px'
    }
  },
  computed: {
    dialogFormVisible: {
      get () {
        return this.$store.getters.isShowLog
      },
      set (val) {
      }
    }
  },
  methods: {
    cancel: function () {
      this.$store.dispatch('hideLog')
    },
    confirm: function () {
      this.$cookie.set('checked', this.checked, 60 * 60 * 24)
      let form = this.form
      this.axios
        .post('http://localhost:8080/login', form)
        .then((response) => {
          if (response.data === 'success') {
            if (this.checked === true) {
              this.$cookie.set('user_name', CryptoJS.AES.encrypt(form.name, 'secret key 123').toString(), 60 * 60 * 24)
              this.$cookie.set('password', CryptoJS.AES.encrypt(form.password, 'secret key 123').toString(), 60 * 60 * 24)
            } else if (this.checked === false) {
              this.form.name = ''
              this.form.password = ''
            }
            this.$cookie.set('isLogin', 'true', 60 * 60 * 24)
            alert('登录成功')
          } else if (response.data === 'failed') {
            this.form.name = ''
            this.form.password = ''
            this.$cookie.delete('isLogin')
            alert('用户名或密码错误')
          }
          this.$cookie.set('checked', this.checked, 60 * 60 * 24)
        }).catch(function (error) {
          console.log(error)
        })
      window.location.reload()
    }
  },
  mounted () {
    if (this.$cookie.get('checked') !== null) {
      if (this.$cookie.get('checked') === 'true') {
        this.checked = true
        if (this.$cookie.get('user_name') !== null && this.$cookie.get('password') !== null) {
          this.form.name = CryptoJS.AES.decrypt(this.$cookie.get('user_name').toString(), 'secret key 123').toString(CryptoJS.enc.Utf8)
          this.form.password = CryptoJS.AES.decrypt(this.$cookie.get('password').toString(), 'secret key 123').toString(CryptoJS.enc.Utf8)
        }
      } else if (this.$cookie.get('checked') === 'false') {
        this.checked = false
      }
    }
  }
}
</script>

<style scoped>

</style>
