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
          <div class="join_cart" v-show="!foodDetail.count||foodDetail.count===0" @click.stop="joinCart">加入购物车</div>
        </transition>
        <div class="cart_controll_wrapper">
          <CartControll :food="foodDetail" @add="addFood" />
        </div>
      </div>
      <div class="block_line" v-show="foodDetail.info"></div>
      <div class="food_introduce" v-show="foodDetail.info">
        <h3 class="introduce_tittle">商品介绍</h3>
        <p class="introduce_content">{{foodDetail.info}}</p>
      </div>
      <Split v-show="foodDetail.ratings"></Split>
       <div class="food_ratings" v-show="foodDetail.ratings">
        <h3 class="food_ratings_tittle">商品评价</h3>
        <div class="food_ratings_content">
          <RatingSelect @toggleOnlyContent="toggleContent" @select="selectTypeChange" :selectType="selectType" :onlyContent="onlyContent" :description="desc" :ratings="foodDetail.ratings"></RatingSelect>
          <div class="rating_wrapper">
            <ul v-show="foodDetail.ratings&&foodDetail.ratings.length">
              <li class="rating_item" v-for="(item,index) in foodDetail.ratings" :key="index" v-show="needShow(item.rateType,item.text)">
                <div class="user">
                  <span class="userName">{{item.username}}</span>
                  <img :src="item.avatar" alt="" width="12" height="12" class="avatar">
                </div>
                <div class="rating_time">{{item.rateTime|formatDate}}</div>
                <div class="rating_content">
                  <span :class="{'icon-thumb_up':item.rateType===0,'icon-thumb_down':item.rateType===1}"></span>
                  {{item.text}}
                </div>
              </li>
            </ul>
            <div class="no_ratings" v-show="!foodDetail.ratings||foodDetail.ratings.length===0">暂无评价</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</transition>
</template>
<script>
import BScroll from 'better-scroll'
import Vue from 'vue'
import CartControll from '../CartControll/CartControll'
import Split from '../Split/Split'
import RatingSelect from '../RatingSelect/RatingSelect'
import {formatDate} from '../../common/js/date'
// const POSTIVE = 0
// const NAGTIVE = 1
const ALL = 2
export default {
  props: {
    foodDetail: {
      type: Object
    }
  },
  data () {
    return {
      showflag: false,
      selectType: ALL,
      onlyContent: true,
      desc: {
        all: '全部',
        positive: '推荐',
        negative: '吐槽'
      }
    }
  },
  methods: {
    showFoodDetail () {
      this.showflag = true
      this.selectType = ALL
      this.onlyContent = true
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
    },
    selectTypeChange (type) {
      this.selectType = type
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    },
    toggleContent (bool) {
      this.onlyContent = !bool
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    },
    needShow (type, text) {
      if (this.onlyContent && !text) {
        return false
      }
      if (this.selectType === ALL) {
        return true
      } else {
        return type === this.selectType
      }
    }
  },
  filters: {
    formatDate (time) {
      let date = new Date(time)
      return formatDate(date, 'yyyy-mm-dd hh:mm')
    }
  },
  components: {
    CartControll,
    Split,
    RatingSelect
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
        margin-left 12px
        text-decoration line-through
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
  .food_ratings
    width 100%
    padding-top 18px
    box-sizing border-box
    .food_ratings_tittle
      padding-left 18px
      line-height 14px
      margin-bottom 6px
      font-size 14px
      color rgb(7, 17, 27)
    .food_ratings_content
      .rating_wrapper
        padding 0 18px
        .rating_item
          position relative
          padding 16px 0px
          border_1px(rgba(7,17,27,0.1))
          .user
            position absolute
            top 16px
            right 0
            font-size 0
            line-height 12px
            .userName
              display inline-block
              color rgb(147,153,159)
              font-size 10px
              vertical-align top
              margin-right 6px
            .avatar
              border-radius 50%
          .rating_time
            margin-bottom 6px
            font-size 10px
            line-height 12px
            color rgb(147,153,159)
          .rating_content
            line-height 16px
            font-size 12px
            color rgb(7,17,27)
            .icon-thumb_up,.icon-thumb_down
              line-height 16px
              margin-right 4px
              font-size 12px
            .icon-thumb_up
              color rgb(0,160,220)
            .icon-thumb_down
              color rgb(147,153,159)
        .no_ratings
          padding 16px 0
          font-size 12px
          color rgb(147,153,159)
</style>
