import Vue from 'vue'
import Router from 'vue-router'
import Tabs from '@/components/Tabs'
import Markdown from '@/components/Markdown'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', name: 'tabs', component: Tabs},
    {path: '/markdown', name: 'markdown', component: Markdown}
  ]
})
