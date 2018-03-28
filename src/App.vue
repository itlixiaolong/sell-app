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
export default {
  data () {
    return {
      seller: { }
    }
  },
  created () {
    this.$http.get('/seller').then((data) => {
      this.seller = data.body.data
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
