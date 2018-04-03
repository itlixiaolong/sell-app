<template>
<transition name="fade">
  <div class="food_detail" v-show="showflag">
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
      <div class="join_cart">加入购物车</div>
    </div>
  </div>
</transition>
</template>
<script>
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
    },
    backToFoods () {
      this.showflag = false
    }
  }
}
</script>

<style lang="stylus" scoped>
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
      margin 18px 0px
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
      bottom 30px
      right 18px
      height 24px
      line-height 24px
      box-sizing border-box
      border-radius 12px
      padding 0px 12px
      text-align center
      background rgb(0, 160,220)
      color #ffffff
      font-size 10px
</style>
