import Vue from 'vue'
import Vuex from 'vuex'

import sLogin from "./login";
Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        sLogin,
    }
})
