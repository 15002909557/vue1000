// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en'
import "babel-polyfill"
import Api from './api/index'
import router from './router'
import Vant from 'vant'
import 'vant/lib/index.css'

Vue.use(Vant);
Vue.use(ElementUI, { locale });
Vue.prototype.$api = Api;
Vue.use(ElementUI);


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  components: { App },
  template: '<App/>'
})
