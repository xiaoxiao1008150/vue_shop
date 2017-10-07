<template>
<div class="page_wrapper">
  <nav-header></nav-header>
  <div class="container">
    <div class="row">
      <table class="table">
            <thead>
              <tr>
                <th>序号</th>
                <th>商品</th>
                <th>单价</th>
                <th>数量</th>
                <th>合计</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in cartList">
                <td>1</td>
                <td>{{ item.good.name }}</td>
                <td>{{ item.good.price }}</td>
                <td>
                  <span @click='goodNumAdd'>+</span>
                  {{ item.number }}
                  <span @click="goodNumReduce">-</span>
                </td>
                <td>{{  item.good.price * item.number }}</td>
              </tr>
            </tbody>
          </table>
    </div>
  </div>
  </div>
</template>
<script>
  import NavHeader from '@/components/Header'
  import axios from 'axios'
  import {mapActions} from 'vuex'

  export default{
    data () {
      return {
        cartList: []
      }
    },
    computed: {
    },
    methods: {
      _getCart () {
        console.log(1)
        axios.get('/users/addCart')
            .then((res) => {
              let list = res.data.carts
              list.forEach((item) => {
                this.addToCart(item)
              })
            })
            .catch((err) => {
              console.log(err)
            })
      },
      goodNumAdd (num) {
        num++
      },
      goodNumReduce (num) {
        num--
      },
      ...mapActions([
        'addToCart'
      ])

    },
    created () {
      this._getCart()
    },
    components: {
      NavHeader
    }
  }
</script>
<style lang="stylus" scoped>
.page_wrapper
  margin-top: 80px
  .table
    thead tr th
      text-align: center
</style>