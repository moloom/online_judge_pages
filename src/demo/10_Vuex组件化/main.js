import Vue from 'vue'
import App from './App.vue'

// 引入store
import store from './store/index'

Vue.config.productionTip = false



new Vue({
  el: "#app",
  render: h => h(App),
  store:store,//引用store
  
  // 全局总线，第二种写法
  beforeCreate(){
    Vue.prototype.$bus=this;
  },
})