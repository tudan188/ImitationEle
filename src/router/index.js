import Vue from 'vue'
import Router from 'vue-router'
import goods from 'components/goods/goods'
import ratings from 'components/ratings/ratings'
import seller from 'components/seller/seller'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/goods', component: goods},
    {path: '/ratings', component: ratings},
    {path: '/seller', component: seller}
  ]
})