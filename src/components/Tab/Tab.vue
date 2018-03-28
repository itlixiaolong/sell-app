<template>
  <div class="tab border_1px">
    <div class="tab_item">
      <router-link to="/foods">商品</router-link>
    </div>
    <div class="tab_item">
      <router-link to="/ratings">评价</router-link>
    </div>
    <div class="tab_item">
      <router-link to="/sellers">商家</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tab'
}
</script>

<style lang="stylus" scoped>
 @import '../../common/stylus/mixin'
.tab
  width 100%
  height 40px
  display flex
  border_1px(rgba(7,17,27,.1))
  .tab_item
    flex 1
    text-align center
    line-height 40px
    &>a
      display block
      font-size 14px
      color rgb(77,85,93)
      &.active
        color rgb(240,20,20)
</style>
