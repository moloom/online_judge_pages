import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Login from "@/views/Login";
import Body from "@/views/Body";
import ProblemSet from "@/views/ProblemSet";
import SolutionProblem from "@/views/SolutionProblem";

const router = new VueRouter({
    routes: [
        {
            name: "home",
            path: "/",
            component: Body,
            children: []
        },
        {
            name: "login",
            path: "/login",
            component: Login,
        },
        {
            name: "solution",
            path: "/problems/:id/:statistics",
            component: SolutionProblem,
            props($route) {
                return {
                    id: $route.query.id,
                    statistics: $route.query.statistics,
                }
            },
        },
        {
            name: "problems",
            path: "/problems/list",
            component: ProblemSet,
        },
    ]
})

export default router
