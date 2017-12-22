import Vue from 'vue'
import Router from 'vue-router'
import Tabs from './pages/Tabs'
import Markdown from './pages/Markdown'
import TabNote from './pages/TabNote'
import TabChat from './pages/TabChat'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', name: 'tabs', component: Tabs},
    {path: '/markdown', name: 'markdown', component: Markdown},
    {path: '/tab-note', name: 'tab-note', component: TabNote},
    {path: '/tab-chat', name: 'tab-chat', component: TabChat},
  ]
})
