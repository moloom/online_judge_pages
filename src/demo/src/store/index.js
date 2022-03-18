//该文件用于创建vuex中最为核心的store

import Vue from 'vue'


import Vuex from 'vuex'
import countOptions from './count'
import personOptions from './person'
Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        counts: countOptions,
        persons: personOptions,
    }
})
