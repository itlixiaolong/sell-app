<template>
  <div class="seller">
    <div class="seller_content">
      <div class="overView">
        <h1 class="tittle">{{seller.name}}</h1>
        <div class="desc border_1px">
          <Star :size="36" socre="seller.score"></Star>
          <span class="text">({{seller.ratingCount}})</span>
          <span class="text">月售{{seller.sellCount}}单</span>
        </div>
        <ul class="remark">
          <li class="block">
            <h2>起送价</h2>
            <div class="content">
              <span class="stress">{{seller.minPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>商家配送</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>平均配送时间</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryTime}}</span>分钟
            </div>
          </li>
        </ul>
        <div class="favorite">
          <span class="icon-favorite" :class="{'active':favorite}"></span>
          <span class="text">收藏</span>
        </div>
      </div>
      <Split></Split>
      <div class="bulletin">
        <h1 class="tittle">公告与活动</h1>
        <div class="content_wrapper">
          <p class="content">{{seller.bulletin}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Star from '../Star/Star'
import Split from '../Split/Split'
export default {
  props: {
    seller: {
      type: Object
    }
  },
  components: {
    Star,
    Split
  }
}
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/mixin'
.seller
  position: absolute
  top: 174px
  bottom: 0
  left: 0
  width: 100%
  overflow: hidden
  .overView
    position: relative
    padding: 18px
    .tittle
      margin-bottom: 8px
      line-height: 14px
      color: rgb(7, 17, 27)
      font-size: 14px
    .desc
      padding-bottom: 18px
      border_1px(rgba(7, 17, 27, 0.1))
      font-size: 0
      .star
        display: inline-block
        margin-right: 8px
        vertical-align: top
      .text
        display: inline-block
        margin-right: 12px
        line-height: 18px
        vertical-align: top
        font-size: 10px
        color: rgb(77, 85, 93)
    .remark
      display: flex
      padding-top: 18px
      .block
        flex: 1
        text-align: center
        border-right: 1px solid rgba(7, 17, 27, 0.1)
        &:last-child
          border: none
        h2
          margin-bottom: 4px
          line-height: 10px
          font-size: 10px
          color: rgb(147, 153, 159)
        .content
          line-height: 24px
          font-size: 10px
          color: rgb(7, 17, 27)
          .stress
            font-size: 24px
    .favorite
      position: absolute
      width: 50px
      right: 11px
      top: 18px
      text-align: center
      .icon-favorite
        display: block
        margin-bottom: 4px
        line-height: 24px
        font-size: 24px
        color: #d4d6d9
        &.active
          color: rgb(240, 20, 20)
      .text
        line-height: 10px
        font-size: 10px
        color: rgb(77, 85, 93)
  .bulletin
    padding: 18px 18px 0 18px
    .tittle
      margin-bottom: 8px
      line-height: 14px
      color: rgb(7, 17, 27)
      font-size: 14px
    .content_wrapper
      padding: 0 12px 16px 12px
      border_1px(rgba(7, 17, 27, 0.1))
      .content
        line-height: 24px
        font-size: 12px
        color: rgb(240, 20, 20)
</style>
