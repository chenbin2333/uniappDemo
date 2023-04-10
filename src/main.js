import Vue from 'vue'
import App from './App'
import { SYS_CONFIG } from 'config/config'

import store from '@/store/app'

Vue.config.productionTip = false

App.mpType = 'app'

Vue.prototype.SYS_CONFIG = SYS_CONFIG

Vue.prototype.$store = store


const app = new Vue({
  ...App
})
app.$mount()
