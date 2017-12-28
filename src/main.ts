// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import MuseUI from 'muse-ui'
import router from './router.ts'
import './assets/css/common.css'
import 'muse-ui/dist/muse-ui.css'
// import 'muse-ui/dist/theme-carbon.css'
// import 'muse-ui/dist/theme-dark.css'
// import 'muse-ui/dist/theme-light.css'
// import 'muse-ui/dist/theme-default.css'
import 'muse-ui/dist/theme-teal.css'

Vue.use(MuseUI)

Vue.config.productionTip = true
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

