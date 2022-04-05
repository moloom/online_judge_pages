import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Login from "@/views/Login";
import Body from "@/views/Body";
import ProblemSet from "@/views/problem/ProblemSet";
import SolutionProblem from "@/views/problem/SolutionProblem";
import ProblemStatistics from "@/views/problem/ProblemStatistics";
import ProblemComment from "@/views/problem/ProblemComment";
import ProblemSubmission from "@/views/problem/ProblemSubmission";
import ProblemStem from "@/views/problem/ProblemStem";
import SubmissionMain from "@/views/submission/SubmissionMain";
import submissionDetail from "@/views/submission/SubmissionDetail";
import submissionSet from "@/views/submission/SubmissionSet";
import CommentMain from "@/views/comment/CommentMain";
import CommentSet from "@/views/comment/CommentSet";
import CommentDetail from "@/views/comment/CommentDetail";

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
            name: "problems",
            path: "/problem/list",
            component: ProblemSet,
        },
        {
            name: "solution",
            path: "/problems/:id/",
            redirect: "/problems/:id/stem",
            component: SolutionProblem,
            children: [
                {
                    name: "stem",
                    path: "stem",
                    component: ProblemStem,
                },
                {
                    name: "statistics",
                    path: "statistics",
                    component: ProblemStatistics,
                },
                {
                    name: "comment",
                    path: "comment",
                    component: ProblemComment,
                },
                {
                    name: "problemSubmission",
                    path: "submission",
                    component: ProblemSubmission,
                },
            ],
        },
        {
            name: "submission",
            path: "/submission",
            redirect: "/submission/set",
            component: SubmissionMain,
            children: [
                {
                    name: "submissionSet",
                    path: "set",
                    component: submissionSet,
                },
                {
                    name: "submissionDetail",
                    path: "detail/:id/",
                    component: submissionDetail,
                }
            ]
        },
        {
            name: "comments",
            path: "/comment",
            redirect: "/comment/set",
            component: CommentMain,
            children: [
                {
                    name: "commentSet",
                    path: "set",
                    component: CommentSet,
                },
                {
                    name: "commentDetail",
                    path: "detail/:id/",
                    component: CommentDetail,
                }
            ]
        },
        {//防止用户在地址栏乱输入东西
            path: '*',
            redirect: '/'
        }
    ]
})

export default router
