import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import api from './api'
import './mint-ui'


Vue.config.productionTip = false

Vue.use(api)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
