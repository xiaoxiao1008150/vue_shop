<template>
  <div>
    <nav-header></nav-header>
     <div class="container">
      <div class="row col-md-4  col-md-offset-4  col-sm-6  col-sm-offset-3">
        <form id="form_register" @submit="registerFrom($event)" method="post" action="/users/register">
          <h2 class="form-signin-heading">注册</h2>
          <div class="form-group">
            <label for="username" class="sr-only">用户名</label>
            <input type="text" id="username" name="username" class="form-control" placeholder="用户名"  autofocus v-model.trim="username" @input="$v.username.$touch()">
            <span class="form-group__message" v-if="!$v.username.minLength"
            ref="username"
            >用户名{{$v.username.$params.minLength.min}} letters.</span>
          </div>
        <div class="form-group">
          <label for="password" class="sr-only">密码</label>
          <input type="password" id="password" name="password" class="form-control" placeholder="密码"  v-model.trim="password" @input="$v.password.$touch()">
          <!-- <span class="form-group__message" v-if="!$v.password.required">Password is required.</span> -->
           <span class="form-group__message" v-if="!$v.password.minLength" 
            ref="password"
           > 密码至少有{{ $v.password.$params.minLength.min }} 位</span>
        </div>
        <div class="form-group">
          <label for="comfirmPassword" class="sr-only">确认密码</label>
          <input type="password" id="comfirmPassword" name="comfirmPassword" class="form-control" placeholder="确认密码"  v-model.trim="comfirmPassword"
          @blur="$v.comfirmPassword.$touch()"
          @input="changeTips"
          >
          <span class="form-group__message" 
          ref="comfirmPassword"
          v-if="!$v.comfirmPassword.sameAsPassword && showTips">两次输入密码不一致</span>
        </div>
        <div class="form-group">
          <label for="captcha" class="sr-only">验证码</label>
          <input  id="captcha" class="form-control" name="captcha" placeholder="验证码"  v-model.trim="captcha"
          @input="changeCaptchaShow"
          >
           <span class="form-group__message" 
           ref="captcha"
           v-if="showCaptcha">验证码不正确</span>
          <div class="captcha">
            <span>看不清，点击图片重新换一张</span>
            <!-- <img src="/users/captcha"  @click="changeCaptcha" ref="captchaImg" /> -->
            <span style="display: none">{{captchaObj.captchaText}}</span>
            <span class="capImg" v-html="captchaObj.captchaData" @click="changeCaptcha"></span>
          </div>
        </div>
          <div class="checkbox">
            <label>
              <input type="checkbox" value="remember-me"> Remember me
            </label>
          </div>
          <input class="btn btn-lg btn-success btn-block" type="submit" value=" 提交"></input>
        </form>
      </div>
    </div>
  </div>

</template>
<script>
  // import uuid from 'uuid'
  import { required, minLength, sameAs } from 'vuelidate/lib/validators'
  import axios from 'axios'
  import NavHeader from '@/components/Header'
  export default{
    data () {
      return {
        captchaObj: {},
        username: '',
        password: '',
        comfirmPassword: '',
        captcha: '',
        showTips: false,
        showCaptcha: false
      }
    },
    validations: {
      username: {
        required,
        minLength: minLength(4)
      },
      password: {
        required,
        minLength: minLength(6)
      },
      comfirmPassword: {
        sameAsPassword: sameAs('password')
      }
    },
    methods: {
      changeCaptchaShow () {
        // this.showCaptcha = true
        let a = this.captcha.toLocaleLowerCase()
        let b = this.captchaObj.captchaText.toLocaleLowerCase()
        if (a === b) {
          this.showCaptcha = false
        } else {
          this.showCaptcha = true
        }
      },
      changeTips () {
        this.showTips = true
      },
      changeCaptcha () {
        axios.get('/users/captcha')
            .then((res) => {
              this.captchaObj = res.data
            })
            .catch((err) => {
              console.log(err)
            })
      },
      registerFrom (event) {
        let username = this.$refs.username
        let password = this.$refs.password
        let comfirmPassword = this.$refs.comfirmPassword
        let captcha = this.$refs.captcha
        if (username || password || comfirmPassword || captcha) {
          event.preventDefault()
          return false
        }
      }
    },
    created () {
      this.changeCaptcha()
    },
    components: {
      NavHeader
    }
  }
</script>
<style lang="stylus" scoped>
#form_register
  text-align: left
  input.form-control
    margin-top: 15px
.captcha
  height: 30px
  line-height: 30px
  margin: 15px 0
  text-align: justify
  span
    vertical-align: middle;
    color: #c1c1c1
    display: inline-block
.form-group__message
  color: red
  height: 20px
  line-height: 20px
  display: block
  margin-top: 15px
</style>