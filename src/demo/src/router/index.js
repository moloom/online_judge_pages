//该文件用于创建整个引用的路由器

import Vue from 'vue';
import VueRouter from "vue-router";

Vue.use(VueRouter);

import About from "@/pages/About";
import Home from "@/pages/Home";
import News from "@/pages/News";
import Message from "@/pages/Message";
import Detail from "@/pages/Detail";


const router= new VueRouter({
    routes:[//一级路由
        {
            name:"guanyu",//给路由命名,
            path:"/home",
            component:Home,
            children:[  //二级路由
                {
                    name:"xinwen",
                    path:"news",
                    component:News,
                },
                {
                    naem:"xiaoxi",
                    path:"message",
                    component:Message,
                    children:[
                        {
                            name:"xiangqing",
                            path:"detail",
                            component:Detail,
                        }
                    ]
                },
            ],
        },
        {
            path:"/About",
            component:About,
        },
    ],
})

//全局前置路由守卫，切换组件之前调用;参数：to是要切换到哪的信息，from是从哪里切换的信息，next是放行。
// next()是放行。
router.beforeEach((to,from,next)=>{
if(to.path!=='/home/news')//如果是去/home/news就不放行。
    next();
})
router.afterEach((to,from)=>{
    console.log(to,from);//
})
export default router;