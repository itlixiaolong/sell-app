<template>
   <div class="discount_tittle">
      <span class="line"></span>
      <span class="text">{{name}}</span>
      <span class="line"></span>
    </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/mixin'
.discount_tittle
  padding 0px 36px
  display flex
  justify-content space-between
  align-items center
  .line
    height 10px
    border_1px(rgba(255,255,255,.2))
    flex 1
    position relative
    top -6px
  .text
    padding 0 12px
    fonr-size 14px
    font-weight 700
</style>
