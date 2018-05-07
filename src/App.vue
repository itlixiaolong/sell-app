<template>
  <div id="app">
    <Header :seller="seller"/>
    <Tab/>
    <router-view :seller="seller"/>
  </div>
</template>

<script>
import Header from './components/Header/Header.vue'
import Tab from './components/Tab/Tab.vue'
import {urlParse} from '../src/common/js/util'
export default {
  data () {
    return {
      seller: {
        id: (() => {
          let queryParam = urlParse()
          return queryParam.id || ''
        })()
      }
    }
  },
  created () {
    this.$http.get('/seller?id=' + this.seller.id).then((data) => {
      this.seller = Object.assign({}, this.seller, data.body.data)
    })
  },
  components: {
    Header,
    Tab
  }
}
</script>

<style>
#app {
 width:100%;
}
</style>
