<template>
<div class="rating_select">
  <div class="rating_type">
    <span class="rating_positive" @click="select(2,$event)" :class="{'active':selectType==2}">{{description.all}}<span class="num">{{ratings.length}}</span></span>
    <span class="rating_positive" @click="select(0,$event)" :class="{'active':selectType==0}">{{description.positive}}<span class="num">{{positive.length}}</span></span>
    <span class="rating_negative" @click="select(1,$event)" :class="{'active':selectType==1}">{{description.negative}}<span class="num">{{negative.length}}</span></span>
  </div>
  <div class="rating_switch">
    <span class="icon-check_circle" :class="{'on':onlyContent}" @click="toggleContent(onlyContent,$event)"></span>
    <span class="text">只看有内容的评价</span>
  </div>
</div>
</template>
<script>
const POSITIVE = 0
const NEGATIVE = 1
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
  },
  methods: {
    select (type, event) {
      if (!event._constructed) {
        return
      }
      // this.selectType = type //不能在子组件直接设置属性值,会弹警告
      this.$emit('select', type)
    },
    toggleContent (bool, event) {
      if (!event._constructed) {
        return
      }
      this.$emit('toggleOnlyContent', bool)
    }
  },
  computed: {
    positive () {
      return this.ratings.filter((item) => {
        return item.rateType === POSITIVE
      })
    },
    negative () {
      return this.ratings.filter((item) => {
        return item.rateType === NEGATIVE
      })
    }
  }

}
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/mixin'
.rating_type{
  padding 18px 0px
  margin 0 18px
  // border_1px(rbga(7,17,27,.1)) 样式加不上
  border-bottom 1px solid rgba(7, 17, 27, 0.1)
  font-size 0px
  >span{
    padding 8px 12px
    font-size 12px
    line-height 32px
    margin-right 8px
    border-radius 1px
    color rgb(7,85,93)
    span{
      margin-left 2px
      font-size 8px
    }
  }
  .rating_positive{
    background-color rgba(0,160,220,.2)
    &.active{
      color #fff
      background-color rgb(0,160,220)
    }
  }
  .rating_negative{
    background-color rgba(77,85,93,.2)
    &.active{
      color #fff
      background-color rgb(77,85,93)
    }
  }
}
.rating_switch{
  padding 12px 18px
  border-bottom: 1px solid rgba(7, 17, 27, 0.1)
  font-size 0
  .icon-check_circle{
    display inline-block
    font-size 24px
    line-height 24px
    color rgb(147,153,169)
    vertical-align: top1
    margin-right 4px
    &.on{
      color #00c850
    }
  }
  .text{
    display inline-block
    line-height 24px
    font-size 12px
    color rgb(147,153,169)
    vertical-align: top
  }
}
</style>
