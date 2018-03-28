<template>
  <div class="shopcart">
    <div class="left">
      <div class="logo_wrapper">
        <div class="logo" :class="{'hignLight':totalNum>0}">
          <span class="icon-shopping_cart"></span>
        </div>
        <span class="total_num" v-show="totalNum>0">{{totalNum}}</span>
      </div>
      <div class="price" :class="{'hignLight':totalNum>0}">¥{{totalPrice}}</div>
      <div class="cost">另需配送费¥{{deliveryPrice}}元</div>
    </div>
    <div class="right" :class="{'hignLight':this.totalPrice>=this.minPrice}">
      {{payDescription}}
    </div>
     <div class="ball-container">
        <div v-for="(ball,index) in balls" :key="index">
          <transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
            <div class="ball" v-show="ball.show">
              <div class="inner inner-hook"></div>
            </div>
          </transition>
        </div>
      </div>
  </div>
</template>
<script>
export default {
  props: {
    selectFood: {
      type: Array,
      default () {
        return [ {
          count: 30,
          price: 1
        }]
      }
    },
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      balls: [
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        }
      ],
      dropBalls: []
    }
  },
  methods: {
    drop (targetEle) {
      for (let ball of this.balls) {
        if (!ball.show) {
          ball.show = true
          ball.ele = targetEle
          this.dropBalls.push(ball)
          return false
        }
      }
    },
    beforeDrop (targetEle) {
      for (let ball of this.balls) {
        if (ball.show) {
          let react = ball.ele.getBoundingClientRect()
          let x = react.left - 32
          let y = -(window.innerHeight - react.top - 22)
          targetEle.style.display = ''
          targetEle.style.webkitTransform = `translate3d(0,${y}px,0)`
          targetEle.style.transform = `translate3d(0,${y}px,0)`
          let inner = targetEle.getElementsByClassName('inner-hook')[0]
          inner.style.webkitTransform = `translate3d(${x}px,0,0)`
          inner.style.transform = `translate3d(${x}px,0,0)`
        }
      }
    },
    dropping (el, done) {
      /* eslint-disable no-unused-vars */
      let rf = el.offsetHeight
      this.$nextTick(() => {
        el.style.webkitTransform = 'translate3d(0,0,0)'
        el.style.transform = 'translate3d(0,0,0)'
        let inner = el.getElementsByClassName('inner-hook')[0]
        inner.style.webkitTransform = 'translate3d(0,0,0)'
        inner.style.transform = 'translate3d(0,0,0)'
        el.addEventListener('transitionend', done)
      })
    },
    afterDrop (el) {
      let ball = this.dropBalls.shift()
      if (ball) {
        ball.show = false
        el.style.display = 'none'
      }
    }
  },
  computed: {
    totalNum () {
      let totalNum = 0
      for (let item of this.selectFood) {
        totalNum += item.count
      }
      return totalNum
    },
    totalPrice () {
      let totalPrice = 0
      for (let item of this.selectFood) {
        totalPrice += item.count * item.price
      }
      return totalPrice
    },
    payDescription () {
      if (this.totalPrice === 0) {
        return `¥${this.minPrice}元起送`
      } else if (this.totalPrice < this.minPrice) {
        let diff = this.minPrice - this.totalPrice
        return `还差¥${diff}云起送`
      } else {
        return `去结算`
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.shopcart
  position fixed
  bottom 0
  left 0
  width 100%
  height 48px
  display flex
  background #141d27
  .left
    flex 1
    font-size 0
    .logo_wrapper
      display inline-block
      width 56px
      height 56px
      border-radius 50%
      background-color #141d27
      margin-top -10px
      margin-left 12px
      position relative
      .logo
        width 44px
        height 44px
        line-height 53px
        text-align center
        border-radius 50%
        background #2b343c
        position absolute
        top 6px
        left 6px
        display flex
        align-items center
        justify-content center
        &.hignLight
          background: rgb(0, 160, 220)
          .icon-shopping_cart
            color #fff
        .icon-shopping_cart
            font-size 24px
            line-height  24px
            color rgba(255,255,255,.4)
      .total_num
        position: absolute
        top: 0
        right: 0
        width: 24px
        height: 16px
        line-height: 16px
        text-align: center
        border-radius: 16px
        font-size: 9px
        font-weight: 700
        color: #fff
        background: rgb(240, 20, 20)
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)
    .price
      display inline-block
      vertical-align: top
      margin 12px 0
      padding 0 12px
      font-size 16px
      line-height 24px
      color rgba(255,255,255,.4)
      font-weight 700
      letter-spacing 2px
      border-right 1px solid rgba(255,255,255,.1)
      &.hignLight
        color #fff
    .cost
      display inline-block
      font-size 10px
      font-weight 700
      color rgba(255,255,255,.4)
      line-height 24px
      padding 12px
      vertical-align: top
  .right
    flex 0 0 105px
    background #2b343c
    padding 8px 12px
    font-size 12px
    color rgba(255,255,255,.4)
    line-height 32px
    font-weight 700
    text-align center
    &.hignLight
      background: #00b43c
      color: #fff
  .ball-container
      .ball
        position: fixed
        left: 32px
        bottom: 22px
        z-index: 200
        transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
        .inner
          width: 16px
          height: 16px
          border-radius: 50%
          background: rgb(0, 160, 220)
          transition: all 0.4s linear
</style>
