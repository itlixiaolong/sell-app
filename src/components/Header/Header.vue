<template>
  <div class="header">
    <div class="top">
      <div class="left">
        <img :src="seller.avatar" alt="">
      </div>
      <div class="right">
        <div class="first_row">
          <span class="brand"></span>
          <span class="text">{{seller.name}}</span>
        </div>
        <div class="second_row">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div class="third_row" v-if="seller.supports">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
          <div class="numberBox" @click="handlePopShow">
          <span class="number">{{seller.supports.length}}个</span>
          <i class="icon-keyboard_arrow_right"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom" @click="handlePopShow">
      <span class="tittle"></span><span class="text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" alt="" width="100%" height="100%">
    </div>
    <transition name="fade">
      <div class="pop" v-show="popShow">
        <div class="content_wrapper clearfix">
          <div class="content">
            <h1 class="tittle">{{seller.name}}</h1>
            <div class="star_box">
              <Star :size="48" :score="seller.score"/>
            </div>
            <LineTextLine :name="discount"/>
            <ul class="discount_itemBox">
                <li class="discount_item" v-if="seller.supports" v-for="(item,index) in classMap" :key="index">
                  <span class="icon" :class="item"></span>
                  <span class="text">{{seller.supports[index].description}}</span>
                </li>
            </ul>
            <LineTextLine :name="sellerInfo"/>
            <div class="sellerInfo">
              {{seller.bulletin}}
            </div>
          </div>
        </div>
        <div class="close_btn">
          <span class="icon-close" @click="handlePopHide"></span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Star from '../Star/Star'
import LineTextLine from '../line-text-line/line-text-line'

export default {
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
      popShow: false,
      discount: '优惠信息',
      sellerInfo: '商家公告'
    }
  },
  methods: {
    handlePopShow: function () {
      this.popShow = true
    },
    handlePopHide: function () {
      this.popShow = false
    }
  },
  components: {
    Star,
    LineTextLine
  },
  name: 'Header'
}
</script>

<style scoped lang="stylus">
@import '../../common/stylus/mixin';
// @import '../../common/stylus/icon';局部引用不行
.header
  width 100%
  height 134px
  position relative
  overflow hidden
  .top
    width 100%
    height 106px
    box-sizing  border-box
    padding 24px 12px 18px 24px
    background-color rgba(7,17,27,.5)
    font-size 0
    position relative
    .left
      float left
      img
        width 64px
        height 64px
        display inline-block
        border-radius 2px
    .right
      float left
      margin-left 16px
      .first_row
        span.brand
          width 30px
          height 18px
          display inline-block
          vertical-align top
          bg_img('brand')
          background-size 100% 100%
          background-repeat no-repeat
        span.text
          font-size 16px
          display inline-block
          color #ffffff
          font-weight bold
          line-height 18px
          height 18px
          margin-left 6px
      .second_row
        margin 8px 0 10px
        height 12px
        line-height 12px
        font-size 12px
        font-weight 200
        color #fff
      .third_row
        font-size 0px
        line-height 12px
        font-weight 200
        color #fff
        .icon
          display inline-block
          width 12px
          height 12px
          vertical-align top
          background-size 100% 100%
          background-repeat no-repeat
          &.decrease
            bg_img('decrease_1')
          &.discount
            bg_img('discount_1')
          &.guarantee
            bg_img('guarantee_1')
          &.invoice
            bg_img('invoice_1')
          &.special
            bg_img('special_1')
        .text
          margin-left 4px
          display inline-block
          height 12px
          line-height 10px
          font-size 10px
          vertical-align top
          margin-top 1px
    .numberBox
          position absolute
          vertical-align middle
          right 12px
          bottom 14px
          height 12px
          padding 7px 8px
          font-size 10px
          color #ffffff
          line-height 12px
          background-color rgba(0,0,0,.2)
          border-radius 14px
          .number
            vertical-align top
          .icon-keyboard_arrow_right
            font-size 10px
            line-height 12px
            margin-left 4px
  .bottom
    width 100%
    height 28px
    line-height 28px
    box-sizing border-box
    padding 0px 22px 0px 12px
    background-color rgba(7,17,27,.6)
    white-space nowrap
    overflow hidden
    text-overflow ellipsis
    position relative
    color #ffffff
    .tittle
      display inline-block
      width 22px
      height 12px
      bg_img('bulletin')
      background-size 100% 100%
      background-repeat no-repeat
      vertical-align top
      margin-top 8px
    .text
      font-size 10px
      margin-left 4px
    .icon-keyboard_arrow_right
      font-size 10px
      position absolute
      top 8px
      right 12px
  .background
    position absolute
    top 0
    left 0
    width 100%
    height 100%
    z-index -1
    filter:blur(10px)
  .pop
    position fixed
    top 0
    left 0
    z-index 100
    width 100%
    height 100%
    overflow auto
    background rgba(7,17,27,0.8)
    -webkit-backdrop-filter blur(10px)
    &.fade-enter-active, &.fade-leave-active
      transition: all .5s
    &.fade-enter, &.fade-leave-to
      opacity: 0
    &.fade-enter-to, &.fade-leave
      opacity: 1
    .content_wrapper
      height auto
      min-height 100%
      width 100%
      .content
        margin-top 64px
        padding-bottom 64px
        color #ffffff
        .tittle
          font-size 16px
          line-height 16px
          font-weight 700
          text-align center
        .star_box
          margin-top 18px
          padding 2px 0
          text-align center
          margin-bottom 28px
        .discount_itemBox
          width 80%
          margin 24px auto 28px
          .discount_item
            padding 0 12px
            font-size 0px
            font-weight 200
            color #fff
            margin-top 12px
            .icon
              display inline-block
              width 16px
              height 16px
              vertical-align top
              background-size 100% 100%
              background-repeat no-repeat
              &.decrease
                bg_img('decrease_2')
              &.discount
                bg_img('discount_2')
              &.guarantee
                bg_img('guarantee_2')
              &.invoice
                bg_img('invoice_2')
              &.special
                bg_img('special_2')
            .text
              margin-left 6px
              display inline-block
              height 12px
              line-height 12px
              font-size 12px
              margin-top 2px
        .sellerInfo
          width 80%
          margin 0 auto
          padding 24px 12px 0
          font-size 12px
          font-weight 200
          line-height 24px
    .close_btn
      position relative
      width 32px
      height 32px
      margin 0 auto
      margin-top -64px
      clear both
      font-size 32px
      color rgba(255,255,255,.5)
</style>
