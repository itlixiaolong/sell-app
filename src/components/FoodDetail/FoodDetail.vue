<template>
<div class="food_detail">
  <div class="detail_banner">
    <img :src="foodDetail.image" alt="">
  </div>
</div>
</template>
<script>
export default {
  props: {
    foodDetail: {
      type: Object
    }
  }
}
</script>

<style lang="stylus" scoped>
.food_detail
  position fixed
  left 0
  top 0
  bottom 48px
  background-color #fff
  .detail_banner
    width 100%
    height 375px
    img
      width 100%
      height 100%
</style>
