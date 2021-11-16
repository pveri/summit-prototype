import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import '@/assets/css/project.css'
import { httpInstance } from '@/utils/auth'
import { ConfigHelper } from '@/utils'
Vue.config.productionTip = false
Vue.use(Vuetify)

async function start() {
  // TODO: Move this to state REV1
  const config = new ConfigHelper();
  const configData = await config.GetConfig();
  httpInstance.defaults.baseURL = configData["SUMMIT_API"];

  new Vue({
    router,
    store,
    vuetify: new Vuetify({ iconfont: 'mdi' }),
    render: h => h(App)
  }).$mount('#app')  
}

start();
