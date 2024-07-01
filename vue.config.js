const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    publicPath:"",
    //关闭语法检查
    lintOnSave: false,

    devServer: {
        host: '127.0.0.1',
        port: 8880,
        client: {
            //解决，websocket报错WebSocket connection to ws://127.0.0.1:8080/ws
            webSocketURL: 'ws://127.0.0.1:8880/ws',
        },
        // headers: {
        //     'Access-Control-Allow-Origin': '*',
        // },
        // // 就没生效
        // proxy: {
        //     '/api': { //"/api"是请求前缀，加前缀vue会认为你走代理，不加就不走代理
        //         target: 'backend:8888/',
        //         pathRewrite: {"^/api": ''},//把前缀替换为空字符
        //         changeOrigin: true  //true代表跨域伪装，false表示原地址访问，默认为true
        //     },
        // },
    }
})
