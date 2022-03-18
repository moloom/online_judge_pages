import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

//全局总线，第一种写法
// const Demo=Vue.extend({});
// const d=new Demo();
// Vue.prototype.x=d;

new Vue({
  el: "#app",
  render: h => h(App),
  // 全局总线，第二种写法
  beforeCreate(){
    Vue.prototype.$bus=this;
  },
})