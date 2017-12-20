import Vue from 'vue'
import Router from 'vue-router'
import Tabs from './pages/Tabs.vue'
import Markdown from './pages/Markdown.vue'
import TabNote from './pages/TabNote.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', name: 'tabs', component: Tabs},
    {path: '/markdown', name: 'markdown', component: Markdown},
    {path: '/tab-note', name: 'teb-note', component: TabNote}
  ]
})
