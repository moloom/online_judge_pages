import Vue from 'vue'
import App from './App.vue'

// 引入store
import store from './store/index'
import VueRouter from "vue-router";
import router from "@/router";

Vue.config.productionTip = false;
Vue.use(VueRouter);


new Vue({
  el: "#app",
  render: h => h(App),
  store:store,//引用store
  router,
  
  // 全局总线，第二种写法
  beforeCreate(){
    Vue.prototype.$bus=this;
  },
})