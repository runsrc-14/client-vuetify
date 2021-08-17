import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueConfirmDialog from 'vue-confirm-dialog'
import JsonCSV from 'vue-json-csv'
// import Chartkick from 'vue-chartkick'
// import Chart from 'chart.js'
import store from './store';
import Vuex from 'vuex';
import router from './router/index'
import VueApexCharts from 'vue-apexcharts'
Vue.use(VueApexCharts)
// Vue.use(Chartkick.use(Chart))
Vue.use(Vuex)

Vue.component('downloadCsv', JsonCSV)
Vue.use(VueConfirmDialog)
Vue.component('vue-confirm-dialog', VueConfirmDialog.default)
Vue.config.productionTip = false
Vue.component('apexchart', VueApexCharts)
new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')

