import Vue from 'vue'
import Vuex from 'vuex'

import sLogin from "./login";
import solutionProblem from "./solutionProblem";

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        sLogin,
        solutionProblem,
    },
    state: {
        isAtNav: true,//是否显示导航栏
    },
})
