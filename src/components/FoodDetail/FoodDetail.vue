<template>
<transition name="fade">
  <div class="food_detail" v-show="showflag" ref="foodDetail">
    <div class="food_content">
      <div class="detail_banner">
        <img :src="foodDetail.image" alt="">
        <div class="back" @click="backToFoods">
          <span class="icon-arrow_lift"></span>
        </div>
      </div>
      <div class="detail_content">
        <h3 class="food_name">{{foodDetail.name}}</h3>
        <div class="detail_box">
          <span class="sale_num">月售{{foodDetail.sellCount}}份</span><span class="rating">好评率{{foodDetail.rating}}%</span>
        </div>
        <div class="price_box">
          <span class="new_price">¥{{foodDetail.price}}</span><span class="old_price" v-show="foodDetail.oldPrice">¥{{foodDetail.oldPrice}}</span>
        </div>
       <transition name="fade">
          <div class="join_cart" v-show="!foodDetail.count||foodDetail.count===0" @click="joinCart">加入购物车</div>
        </transition>
        <div class="cart_controll_wrapper">
          <CartControll :food="foodDetail" @add="addFood" />
        </div>
      </div>
      <div class="block_line"></div>
      <div class="food_introduce">
        <h3 class="introduce_tittle">商品介绍</h3>
        <p class="introduce_content">{{foodDetail.info}}</p>
      </div>
    </div>
  </div>
</transition>
</template>
<script>
import BScroll from 'better-scroll'
import Vue from 'vue'
import CartControll from '../CartControll/CartControll'
export default {
  props: {
    foodDetail: {
      type: Object
    }
  },
  data () {
    return {
      showflag: false
    }
  },
  methods: {
    showFoodDetail () {
      this.showflag = true
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.foodDetail, {
            click: true
          })
        } else {
          this.scroll.refresh()
        }
      })
    },
    backToFoods () {
      this.showflag = false
    },
    joinCart (event) {
      if (!event._constructed) {
        return
      }
      Vue.set(this.foodDetail, 'count', 1)
      this.$emit('add', event.target)
    },
    addFood (target) {
      this.$emit('add', target)
    }
  },
  components: {
    CartControll
  }
}
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/mixin'
.food_detail
  width 100%
  position fixed
  left 0
  top 0
  bottom 48px
  background-color #fff
  opacity 1
  &.fade-enter,&.fade-leave-to
    opacity 0
    transform translate3d(100%,0,0)
  &.fade-enter-to,&.fade-leave
    opacity 1
    transform translate3d(0,0,0)
  &.fade-enter-active,&.fade-leave-active
    transition  all ease .5s
  .detail_banner
    position relative
    width 100%
    height 0
    padding-top 100%
    img
      position absolute
      top 0
      left 0
      width 100%
      height 100%
    .back
      position absolute
      top 10px
      left 0px
      .icon-arrow_lift
        font-size 20px
        padding 10px
        color #ffffff
        display block
  .detail_content
    position relative
    padding 18px
    .food_name
      font-size 14px
      line-height 14px
      font-weight 700
      color rgb(7,17,27)
    .detail_box
      font-size 10px
      line-height 10px
      color rgb(147,153,159)
      margin-top 8px
      .sale_num
        margin-right 12px
    .price_box
      margin 18px 0px 0px
      .new_price
        font-size 14px
        font-weight 700
        color rgb(240,20,20)
        line-height 24px
      .old_price
        font-size 10px
        font-weight 700
        color rgb(147,153,159)
        line-height 24px
    .join_cart
      position absolute
      bottom 18px
      right 18px
      z-index 5
      height 24px
      line-height 24px
      box-sizing border-box
      border-radius 12px
      padding 0px 12px
      text-align center
      background rgb(0, 160,220)
      color #ffffff
      font-size 10px
      &.fade-enter,&.fade-leave-to
        opacity 0
      &.fade-enter-active,&.fade-leave-active
        transition all .3s ease
    .cart_controll_wrapper
      position absolute
      bottom 12px
      right 18px
      z-index 4
  .block_line
    width 100%
    height 16px
    background-color #f3f5f7
    border_1px(rgba(7,17,27,.1))
    border-top 1px solid rgba(7,17,27,.1)
  .food_introduce
    width 100%
    padding 18px
    box-sizing border-box
    .introduce_tittle
      line-height: 14px
      margin-bottom: 6px
      font-size: 14px
      color: rgb(7, 17, 27)
    .introduce_content
      font-size 12px
      font-weight 200
      line-height 24px
      color rgb(77,85,93)
</style>
