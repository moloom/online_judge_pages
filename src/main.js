
import Vue from 'vue';
import App from './App.vue';
import './theme/index.css'  //引入主题
import router from './router'
import store from './store'
import ElementUI from 'element-ui';

Vue.use(ElementUI);

Vue.config.productionTip = false
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});