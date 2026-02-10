import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

// Register toast plugin
Vue.use(Toast)

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
