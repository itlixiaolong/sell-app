<template>
  <div class="cart_controll">
    <transition name="move">
      <div class="decrese" v-show="food.count>0" @click.stop="decreaseCount">
        <span class="icon-remove_circle_outline inner"></span>
      </div>
    </transition>
    <div class="count" v-show="food.count>0">{{food.count}}</div>
    <div class="add icon-add_circle" @click.stop="addCount"></div>
  </div>
</template>
<script>
import Vue from 'vue'
export default {
  props: {
    food: {
      type: Object
    }
  },
  computed: {

  },
  methods: {
    addCount (event) {
      if (!event._constructed) {
        return
      }
      if (!this.food.count) {
        Vue.set(this.food, 'count', 1)
      } else {
        this.food.count++
      }
      this.$emit('add', event.target)
    },
    decreaseCount () {
      if (!event._constructed) {
        return
      }
      if (this.food.count) {
        this.food.count--
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
.cart_controll
  font-size 0px
  .decrese
    display inline-block
    padding 6px
    color rgb(0,160,220)
    .inner
      display inline-block
      font-size 24px
      line-height 24px
      transform: rotate(0)
      transition: all .4s linear
    &.move-enter-active,&.move-leave-active
      transition all .4s linear
    &.move-enter,&.move-leave-to
      opacity 0
      transform translate3d(24px, 0, 0)
      .inner
        transform: rotate(180deg)
    &.move-enter-to,&.move-leave
      opacity 1
      transform translate3d(0, 0, 0)
  .count
    display inline-block
    font-size 10px
    line-height 24px
    width 12px
    color rgb(147,153,159)
    text-align center
    padding-top: 6px
    vertical-align top
  .add
    display inline-block
    font-size 24px
    line-height 24px
    padding 6px
    color rgb(0,160,220)
</style>
