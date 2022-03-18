//该文件用于创建vuex中最为核心的store

import Vue from 'vue'

Vue.use(Vuex);
import Vuex from 'vuex'
import countOptions from './count'
import personOptions from './person'


export default new Vuex.Store({
    modules: {
        counts: countOptions,
        persons: personOptions,
    }
})
