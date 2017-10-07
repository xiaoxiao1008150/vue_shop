<template>
<nav class="navbar navbar-inverse navbar-fixed-top">
      <div class="container">
        <div class="navbar-header">
          <a class="navbar-brand" href="#">首页</a>
        </div>
        <div id="navbar" class="">
          <ul class="nav navbar-nav navbar-right">
            <li class="active">
              <a href="/cart">
                购物车
              </a></li>
            <li v-show="!user"><a href="/register">注册</a></li>
            <li v-show="!user"><a href="/login">登录</a></li>
            <li v-show="user"><a href="">{{ user }}</a></li>
            <li v-show="user" @click="logout"><a href="/">退出</a></li>
          </ul>
        </div><!--/.nav-collapse -->
      </div>
    </nav>
</template>
<script>
  import {mapGetters, mapMutations} from 'vuex'
  export default{
    data () {
      return {
      }
    },
    methods: {
      logout () {
        this.setUser('')
      },
      ...mapMutations([
        'setUser'
      ])
    },
    computed: {
      ...mapGetters([
        'user'
      ])
    }
  }
</script>
<style lang="stylus" scoped>
  .container
    display:flex
    .navbar-header
      width:200px
    #navbar
      flex: 1
      li
        float:left

</style>