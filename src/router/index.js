import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Login from "@/views/Login";
import Body from "@/views/Body";
import ProblemSet from "@/views/ProblemSet";

const router = new VueRouter({
    routes: [
        {
            name:"home",
            path: "/",
            component: Body,
            children: [
            ]
        },
        {
            name:"login",
            path: "/login",
            component: Login,
        },
        {
            name:"problems",
            path: "/problems",
            component: ProblemSet,
        },

    ]
})

export default router
