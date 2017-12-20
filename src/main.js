// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify, {VuetifyTheme} from 'vuetify'
import App from './App.vue'
import router from './router'
import 'vuetify/dist/vuetify.min.css';
// import 'vuetify/es5/util/colors'

Vue.use(Vuetify)

Vue.config.productionTip = true
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

