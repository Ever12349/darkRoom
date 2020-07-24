import Vue from 'vue'
import './cube-ui-prod'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import api from './api'
import './mint-ui'
import Vtap from 'v-tap'
import ebus from './api/bus'

Vue.config.productionTip = false


Vue.prototype.$ebus = ebus;

import mixinObj from './mixin'
Vue.mixin(mixinObj)

Vue.use(api)
Vue.use(Vtap)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
