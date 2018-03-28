import Vue from 'vue'
import Router from 'vue-router'
import Foods from '@/components/Foods/Foods'
import Ratings from '@/components/Ratings/Ratings'
import Sellers from '@/components/Sellers/Sellers'
import vueResource from 'vue-resource'

Vue.use(Router)
Vue.use(vueResource)

export default new Router({
  routes: [
    { path: '/', redirect: '/foods' },
    { path: '/foods', component: Foods },
    { path: '/ratings', component: Ratings },
    { path: '/sellers', component: Sellers }
  ],
  linkActiveClass: 'active'
})
