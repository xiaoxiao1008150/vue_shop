<template>
    <div>
      <nav-header></nav-header>
      <div class="container" style='margin-top:50px'>
        <div class="filter stopPop clearfix" id="filter">
          <dl class="filter-price clearfix">
            <dt>Price:</dt>
            <dd><a href="" 
                :class="{active: priceLevel=='all'}"
                @click.prevent="getRangeGoods('all')"
                >All</a></dd>
            <dd v-for="(price,index) in priceList">
              <a href="" :class="{active: priceLevel==index}"  @click.prevent="getRangeGoods(index)">{{ price.startPrice }} - {{ price.endPrice}}</a>
            </dd>
          </dl>
          <div class="sort">
            <a href="" 
            class="filterby stopPop" 
            @click.prevent="sortBy"
            ><span v-show="sortFlag">降序</span> <span v-show="!sortFlag">升序</span></a>
          </div>
        </div>
          <!-- search result accessories list -->
        <div class="accessory-list-wrap">
          <div class="row">
            <div class="col-sm-6 col-md-3" v-for='item in goods'>
              <div class="thumbnail">
                <a href="#"><img v-lazy=" 'static/' + item.imgUrl"  alt=""></a>
                <div class="caption">
                  <h3>{{item.name}} </h3>
                  <p>{{item.price}}</p>
                  <p><a href="" class="btn btn--m" @click.prevent="addCart(item._id)">加入购物车</a></p>
                </div>
              </div>
            </div>
          </div>
            <div 
              class='loading'
              v-infinite-scroll="loadMore" 
              infinite-scroll-disabled="busy" 
              infinite-scroll-distance="10"
              infinite-scroll-throttle-delay="400">
              <img v-show="loading" src="../assets/loading-spinning-bubbles.svg">
            </div>
            <div v-show='noResult'>
              没有新内容了
            </div>
          </div>
            <!--  -->
      </div>
  </div>
</template>
<script>
  import NavHeader from '@/components/Header'
  import NavFooter from '@/components/Footer'
  import axios from 'axios'
  // import goodsData from '@/mock/goods.json'
  export default{
    data () {
      return {
        selected: '',
        goods: [],
        priceList: [
          {startPrice: 0, endPrice: 100},
          {startPrice: 100, endPrice: 500},
          {startPrice: 500, endPrice: 1000},
          {startPrice: 1000, endPrice: 5000}
        ],
        page: 1,
        pageSize: 4,
        sortFlag: true,
        busy: false,
        noResult: false,
        priceLevel: 'all',
        loading: false
      }
    },
    methods: {
      _getGoods (flag) {
        this.loading = true
        if (this.noResult) return
        let params = {
          page: this.page,
          pageSize: this.pageSize,
          sort: this.sortFlag ? 1 : -1,
          priceLevel: this.priceLevel
        }
        axios.get('/api/goods', {params: params})
          .then((response) => {
            let goods = response.data
            if (goods.result.count === 0 && this.page === 1) {
              this.busy = true
              this.noResult = true
              this.goods = []
              this.loading = false
              return
            }
            if (goods.result.count === 0 && this.page > 1) {
              this.busy = true
              this.noResult = true
              this.loading = false
              return
            }
            if (goods.status === '0') {
              if (flag) {
                this.goods = this.goods.concat(goods.result.list)
              } else {
                // this.busy = false
                this.goods = goods.result.list
              }
            } else {
              this.goods = []
            }
            this.loading = false
            this.busy = false
          })
          .catch((error) => {
            console.log(error)
          })
      },
      sortBy () {
        this.noResult = false
        this.sortFlag = !this.sortFlag
        this.page = 1
        this._getGoods()
      },
      loadMore () {
        this.busy = true
        if (!this.noResult) {
          this.page++
          // 如果参数是true的话，说明请求数据是要concat上之前的数据的
          this._getGoods(true)
          // this.busy = false
        }
      },
      getRangeGoods (index) {
        // this.loading = true
        this.noResult = false
        this.priceLevel = index
        this.page = 1
        console.log('page===', this.page)
        this._getGoods()
      },
      addCart (id) {
        axios.post('/api/addCart', {
          goodId: id
        })
        .then((res) => {
        // 放入vuex中
        })
        .catch((err) => {
          console.log(err)
        })
      }
    },
    created () {
      this._getGoods()
      // 如果用户是后来再进入网站
      // 获取用户的信息,拿到cookie的信息，发送axios到后台，获取用户
    },
    components: {
      NavHeader,
      NavFooter
    }
  }
</script>
<style lang="stylus">
  .clearfix:after
    content:""
    height:0
    display:block
    visibility:hidden
    clear:both
  .navbar-left-container
    float:left
  .navbar-right-container
    float:right
    margin-right:20px
    .navbar-cart-logo
      width: 30px
      height: 30px
  .accessory-list-wrap
    img
      width: 100px
      height:100px
      max-height:100px
  .nav-breadcrumb-wrap
    height: 30px
    line-height: 30px
    background: #b5cdb6
  .filter
    height:60px
    line-height: 60px
    font-size: 14px
    margin: 15px 0
    .filter-price
      margin: 15px
      float: left
      dt
        float:left
      dd
        float:left
        margin-right: 30px
        a
          color: orange
          font-weight: 700
        a.active
          color:green
    .sort
      float:right
      margin-right: 30px
  .loading
      height: 100px
</style>
