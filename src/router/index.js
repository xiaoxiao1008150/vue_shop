import Vue from 'vue'
import Router from 'vue-router'
import Goodslist from '@/views/Goodslist'
import Cart from '@/views/Cart'
import Register from '@/views/Register'
import Login from '@/views/Login'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Goodslist',
      component: Goodslist
    },
    {
      path: '/addCart',
      name: 'Cart',
      component: Cart
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/cart',
      // name: 'Cart',
      component: Cart
    }
  ]
})
