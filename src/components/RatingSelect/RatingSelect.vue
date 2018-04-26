<template>
<div class="rating_select">
  <div class="rating_type">
    <span class="rating_positive" :class="{'active':selectType==2}">{{description.all}}<span class="num">{{ratings.length}}</span></span>
    <span class="rating_positive" :class="{'active':selectType==0}">{{description.positive}}</span>
    <span class="rating_negative" :class="{'active':selectType==1}">{{description.negative}}</span>
  </div>
  <div class="rating_switch">
    <span class="icon-check_circle"></span>
    <span>只看有内容的评价</span>
  </div>
</div>
</template>
<script>
// const POSITIVE = 0
// const NAGTIVE = 1
const ALL = 2
export default {
  props: {
    ratings: {
      type: Array,
      default () {
        return []
      }
    },
    selectType: {
      type: Number,
      default: ALL
    },
    onlyContent: {
      type: Boolean,
      default: false
    },
    description: {
      type: Object,
      default () {
        return {
          'all': '全部',
          'positive': '满意',
          'negative': '不满意'
        }
      }
    }
  }

}
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/mixin'
.rating_type{
  padding 18px 0px
  margin 0 18px
  border_1px(rbga(7,17,27,.1))
  font-size 0px
  >span{
    padding 8px 12px
    font-size 12px
    line-height 32px
    margin-right 8px
    border-radius 1px
    color rgb(7,85,93)
    &.active{
        color #fff
        background-color rgb(0,160,220)
      }
    span{
      margin-left 2px
      font-size 8px

    }
  }
  // .rating_all{
  //   background-color rgb(0,160,220)
  // }
  .rating_positive{
    background-color rgba(0,160,220,.2)
  }
  .rating_negative{
    background-color rgba(77,85,93,.2)
  }
}
</style>
