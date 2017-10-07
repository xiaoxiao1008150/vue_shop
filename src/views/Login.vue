<template>
  <div>
    <nav-header></nav-header>
     <div class="container">
      <div class="row col-md-4  col-md-offset-4  col-sm-6  col-sm-offset-3">
        <form id="form_login" @submit.prevent="loginSubmit($event)">
          <h2 class="form-signin-heading">登录</h2>
          <div class="form-group">
            <label for="loginUsername" class="sr-only">用户名</label>
           <input type="text" id="loginUsername"  name="loginUsername" class="form-control" placeholder="用户名" autofocus @input="changeUserNameTips"
           v-model.trim="loginUsername"
           >
           <span v-if="usernameTips" class="form-group__message">用户名不能为空</span>
          </div>
          <div class="form-group">
            <label for="loginPassword" class="sr-only">密码</label>
            <input type="password" id="loginPassword" name="loginPassword" class="form-control" placeholder="密码" @input="changePasswordTips"
            v-model="loginPassword">
           <span v-if="passwordTips" class="form-group__message">密码不能为空</span>
          </div>
          <div class="checkbox">
            <label>
              <input type="checkbox" value="remember-me"> Remember me
            </label>
          </div>
          <button class="btn btn-lg btn-success btn-block" type="submit">登录</button>
        </form>
      </div>
    </div>
  </div>

</template>
<script>
import axios from 'axios'
import {mapMutations} from 'vuex'
import NavHeader from '@/components/Header'
export default {
  data () {
    return {
      loginUsername: '',
      loginPassword: '',
      usernameTips: false,
      passwordTips: false
    }
  },
  methods: {
    loginSubmit (e) {
      if (this.loginUsername === '') {
        this.usernameTips = true
        e.preventDefault()
        return false
      }
      if (this.loginPassword === '') {
        this.passwordTips = true
        e.preventDefault()
        return false
      }
      let params = {
        loginUsername: this.loginUsername,
        loginPassword: this.loginPassword
      }
      axios.post('/users/login', params)
          .then((res) => {
            this.setUser(res.data.user.name)
            this.$router.push('/')
            // localStorage.setItem('access_token', res.data.user.name)
          })
          .catch((err) => {
            console.log(err)
          })
    },
    changeUserNameTips () {
      this.usernameTips = false
    },
    changePasswordTips () {
      this.passwordTips = false
    },
    ...mapMutations({
      setUser: 'SET_USER'
    })
  },
  components: {
    NavHeader
  }
}
</script>
<style lang="stylus" scoped>
#form_login
  input.form-control
    margin-top: 15px
  .form-group__message
    color: red
</style>