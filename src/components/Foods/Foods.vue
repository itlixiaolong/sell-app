<template>
  <div class="goods">
    <div class="menu_wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item,index) in goods" :key="index" class="menu_item" :class="{'current':currentIndex==index}" @click="selectMenu(index,$event)">
          <span class="text border_1px">
            <span class="icon" v-show="item.type>0" :class="classMap[item.type]"></span>
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods_wrapper" ref="foodsWrapper">
       <ul>
          <li v-for="(item,index) in goods" class="food-list" ref="foodList" :key="index">
            <h1 class="title">{{item.name}}</h1>
            <ul>
              <li v-for="(food,index) in item.foods" class="food-item border_1px"  :key="index" @click="chooseThisFood(food)">
                <div class="icon">
                  <img width="57" height="57" :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old"
                          v-show="food.oldPrice"
                    >￥{{food.oldPrice}}
                    </span>
                  </div>
                  <div class="cartcontrol_wrapper">
                    <Cartcontrol :food="food" @add="addFood"></Cartcontrol>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
    </div>
    <Shopcart :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice" :selectFood="selectFood" ref="shopcart"/>
    <FoodDteail :foodDetail="choosedFood" ref="foodDtatil" @add="addFood" />
  </div>
</template>

<script>
import BeScroll from 'better-scroll'
import Shopcart from '../Shopcart/Shopcart'
import Cartcontrol from '../CartControll/CartControll'
import FoodDteail from '../FoodDetail/FoodDetail'
const ERR_NO = 0
export default {
  props: {
    seller: {
      type: Object,
      required: true,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      goods: [],
      listHeight: [],
      scrollY: 0,
      choosedFood: {}
    }
  },
  computed: {
    currentIndex () {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i]
        let height2 = this.listHeight[i + 1]
        if (!height2 || (height1 <= this.scrollY && this.scrollY < height2)) {
          return i
        }
      }
      return 0
    },
    selectFood () {
      let foodsArray = []
      for (let good of this.goods) {
        for (let food of good.foods) {
          if (food.count) {
            foodsArray.push(food)
          }
        }
      }
      return foodsArray
    }
  },
  created () {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    this.$http.get('./goods').then((response) => {
      if (response.body.errnumber === ERR_NO) {
        this.goods = response.body.data
        this.$nextTick(() => {
          this._init_scroll()
          this._calculateHeight()
        })
      }
    })
  },
  methods: {
    chooseThisFood (food) {
      if (!event._constructed) {
        return false
      }
      this.choosedFood = food
      this.$refs.foodDtatil.showFoodDetail()
    },
    _init_scroll () {
      this.menuScroll = new BeScroll(this.$refs.menuWrapper, {
        click: true
      })
      this.foodsScroll = new BeScroll(this.$refs.foodsWrapper, {
        click: true, // 这样在添加商品数量上就可以执行点击事件了
        probeType: 3
      })
      this.foodsScroll.on('scroll', (props) => {
        this.scrollY = Math.abs(Math.round(props.y))
      })
    },
    _calculateHeight () {
      let height = 0
      let foodList = this.$refs.foodList
      this.listHeight.push(height)
      for (let i = 0; i < foodList.length; i++) {
        height += foodList[i].offsetHeight
        this.listHeight.push(height)
      }
    },
    selectMenu (index, evevt) {
      // console.log(event._constructed)
      // if (!event._constructed) {
      //   return
      // }测试结果在浏览器中也是触发一次事件,所以不需要加入此判断
      let selectFood = this.$refs.foodList[index]
      this.foodsScroll.scrollToElement(selectFood, 500)
    },
    addFood (target) {
      this._drop(target)
    },
    _drop (target) {
      // 体验优化,异步执行下落动画
      this.$nextTick(() => {
        this.$refs.shopcart.drop(target)
      })
    }
  },
  components: {
    Shopcart,
    Cartcontrol,
    FoodDteail
  }
}
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/mixin';
.goods
  width 100%
  display flex
  position absolute
  top 174px
  bottom 46px
  overflow hidden
  .menu_wrapper
    flex 0 0 80px
    background #f3f5f7
    .menu_item
      width 56px
      height 54px
      display table
      font-size 0
      padding 0 12px
      &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          font-weight: 700
          .text
            border_none()
      .text
        display table-cell
        vertical-align middle
        border_1px(rgba(7,17,27,.1))
        width 56px
        font-size 12px
        color #333
        line-height 14px
        text-align center
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
          &.decrease
            bg_img('decrease_3')
          &.discount
            bg_img('discount_3')
          &.guarantee
            bg_img('guarantee_3')
          &.invoice
            bg_img('invoice_3')
          &.special
            bg_img('special_3')
  .foods_wrapper
    flex 1
    .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
    .food-item
      display: flex
      margin: 18px
      padding-bottom: 18px
      border_1px(rgba(7, 17, 27, 0.1))
      &:last-child
        border_none()
        margin-bottom: 0
      .icon
        flex: 0 0 57px
        margin-right: 10px
      .content
        flex: 1
        .name
          margin: 2px 0 8px 0
          height: 14px
          line-height: 14px
          font-size: 14px
          color: rgb(7, 17, 27)
        .desc, .extra
          line-height: 10px
          font-size: 10px
          color: rgb(147, 153, 159)
        .desc
          line-height: 12px
          margin-bottom: 8px
        .extra
          .count
            margin-right: 12px
        .price
          font-weight: 700
          line-height: 24px
          .now
            margin-right: 8px
            font-size: 14px
            color: rgb(240, 20, 20)
          .old
            text-decoration: line-through
            font-size: 10px
            color: rgb(147, 153, 159)
        .cartcontrol_wrapper
          position absolute
          bottom 12px
          right 0px
</style>
