import Vue from 'vue';
import App from './App.vue';
import './theme/index.css'  //引入主题
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import axios from "axios";

import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

Vue.use(mavonEditor);

import VueHighlightJS from 'vue-highlightjs'
// Tell Vue.js to use vue-highlightjs
Vue.use(VueHighlightJS)

//引入日期格式工具
import dayjs from '@/utils/dayjs.min'

Vue.filter("timer", function (value) {
    return dayjs(value).format("YYYY-MM-DD HH:mm:ss");
})

//引入日期格式化工具
import Moment from 'moment'
Vue.prototype.moment = Moment

Vue.use(ElementUI);
axios.defaults.baseURL = '/api';
// axios.defaults.withCredentials=false;
Vue.config.productionTip = false
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});