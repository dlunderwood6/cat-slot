import Vue from 'vue'
import Router from 'vue-router'
import glass from '@/components/glass'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Glass',
      component: glass
    }
  ]
})
